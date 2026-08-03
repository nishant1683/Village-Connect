const paypal = require("../../helpers/paypal");
const supabase = require("../../db/supabase");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    if (paymentMethod === "paypal") {
      const create_payment_json = {
        intent: "sale",
        payer: { payment_method: "paypal" },
        redirect_urls: {
          return_url: `${process.env.CLIENT_URL}/shop/paypal-return`,
          cancel_url: `${process.env.CLIENT_URL}/shop/paypal-cancel`,
        },
        transactions: [
          {
            item_list: {
              items: cartItems.map((item) => ({
                name: item.title,
                sku: item.productId,
                price: item.price.toFixed(2),
                currency: "USD",
                quantity: item.quantity,
              })),
            },
            amount: {
              currency: "USD",
              total: totalAmount.toFixed(2),
            },
            description: "VillageConnect Order",
          },
        ],
      };

      paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            message: "Error while creating paypal payment",
          });
        }

        const { data: newOrder, error: dbError } = await supabase
          .from("orders")
          .insert({
            user_id: userId,
            cart_id: cartId,
            cart_items: cartItems,
            address_info: addressInfo,
            order_status: orderStatus,
            payment_method: paymentMethod,
            payment_status: paymentStatus,
            total_amount: totalAmount,
            order_date: orderDate,
            order_update_date: orderUpdateDate,
            payment_id: paymentId,
            payer_id: payerId,
          })
          .select()
          .single();

        if (dbError) {
          console.log(dbError);
          return res.status(500).json({ success: false, message: "Some error occured!" });
        }

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newOrder.id,
        });
      });
    } else {
      // Direct insertion for local/INR payment method
      const { data: newOrder, error: dbError } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          cart_id: cartId,
          cart_items: cartItems,
          address_info: addressInfo,
          order_status: "confirmed", // auto confirmed for local/INR payment
          payment_method: paymentMethod,
          payment_status: "paid", // set as paid
          total_amount: totalAmount,
          order_date: orderDate,
          order_update_date: orderUpdateDate,
          payment_id: "local_inr_" + Date.now(),
          payer_id: "local_inr_" + userId,
        })
        .select()
        .single();

      if (dbError) {
        console.log(dbError);
        return res.status(500).json({ success: false, message: "Some error occured!" });
      }

      // Reduce stock for each item
      for (let item of cartItems) {
        const { data: product } = await supabase
          .from("products")
          .select("id, total_stock, title")
          .eq("id", item.productId)
          .single();

        if (product) {
          await supabase
            .from("products")
            .update({ total_stock: product.total_stock - item.quantity })
            .eq("id", item.productId);
        }
      }

      // Delete the cart
      if (cartId) {
        await supabase.from("carts").delete().eq("id", cartId);
      }

      res.status(201).json({
        success: true,
        approvalURL: null,
        orderId: newOrder.id,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (!order) {
      return res.status(404).json({ success: false, message: "Order can not be found" });
    }

    // Update order payment info
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        order_status: "confirmed",
        payment_id: paymentId,
        payer_id: payerId,
        order_update_date: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (updateError) throw updateError;

    // Reduce stock for each item
    for (let item of order.cart_items) {
      const { data: product } = await supabase
        .from("products")
        .select("id, total_stock, title")
        .eq("id", item.productId)
        .single();

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.title}`,
        });
      }

      await supabase
        .from("products")
        .update({ total_stock: product.total_stock - item.quantity })
        .eq("id", item.productId);
    }

    // Delete the cart
    if (order.cart_id) {
      await supabase.from("carts").delete().eq("id", order.cart_id);
    }

    const { data: updatedOrder } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: updatedOrder,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("order_date", { ascending: false });

    if (error) throw error;

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found!" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }

    if (error) throw error;

    res.status(200).json({ success: true, data: order });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
};

module.exports = { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };

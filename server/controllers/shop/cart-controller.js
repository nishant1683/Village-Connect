const supabase = require("../../db/supabase");

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Check product exists
    const { data: product } = await supabase
      .from("products")
      .select("id")
      .eq("id", productId)
      .single();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Get or create cart for user
    let { data: cart } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (!cart) {
      const { data: newCart, error: cartError } = await supabase
        .from("carts")
        .insert({ user_id: userId })
        .select()
        .single();
      if (cartError) throw cartError;
      cart = newCart;
    }

    // Check if item already in cart
    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("cart_id", cart.id)
      .eq("product_id", productId)
      .single();

    if (existingItem) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("cart_items")
        .insert({ cart_id: cart.id, product_id: productId, quantity });
      if (error) throw error;
    }

    const cartData = await getPopulatedCart(userId);
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Fetch cart items (populated)
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory!",
      });
    }

    const cartData = await getPopulatedCart(userId);

    if (!cartData) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Update item quantity
const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const { data: cart } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found!" });
    }

    const { data: item } = await supabase
      .from("cart_items")
      .select("id")
      .eq("cart_id", cart.id)
      .eq("product_id", productId)
      .single();

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not present!" });
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", item.id);

    if (error) throw error;

    const cartData = await getPopulatedCart(userId);
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Delete a cart item
const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const { data: cart } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found!" });
    }

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cart.id)
      .eq("product_id", productId);

    if (error) throw error;

    const cartData = await getPopulatedCart(userId);
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Helper: get cart with populated product info
async function getPopulatedCart(userId) {
  const { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (!cart) return null;

  const { data: items } = await supabase
    .from("cart_items")
    .select("id, quantity, product_id, products(id, image, title, price, sale_price)")
    .eq("cart_id", cart.id);

  const populatedItems = (items || [])
    .filter((item) => item.products)
    .map((item) => ({
      productId: item.products.id,
      image: item.products.image,
      title: item.products.title,
      price: item.products.price,
      salePrice: item.products.sale_price,
      quantity: item.quantity,
    }));

  return {
    _id: cart.id,
    userId,
    items: populatedItems,
  };
}

module.exports = { addToCart, updateCartItemQty, deleteCartItem, fetchCartItems };

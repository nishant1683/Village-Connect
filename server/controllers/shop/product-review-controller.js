const supabase = require("../../db/supabase");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    // Check user has purchased the product
    const { data: orders } = await supabase
      .from("orders")
      .select("id, cart_items")
      .eq("user_id", userId);

    const hasPurchased = orders?.some((order) =>
      order.cart_items?.some((item) => item.productId === productId)
    );

    if (!hasPurchased) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    // Check if already reviewed
    const { data: existingReview } = await supabase
      .from("product_reviews")
      .select("id")
      .eq("product_id", productId)
      .eq("user_id", userId)
      .single();

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    // Insert review
    const { data: newReview, error } = await supabase
      .from("product_reviews")
      .insert({
        product_id: productId,
        user_id: userId,
        username: userName,
        review_message: reviewMessage,
        review_value: reviewValue,
      })
      .select()
      .single();

    if (error) throw error;

    // Recalculate average review
    const { data: allReviews } = await supabase
      .from("product_reviews")
      .select("review_value")
      .eq("product_id", productId);

    const averageReview =
      allReviews.reduce((sum, r) => sum + r.review_value, 0) / allReviews.length;

    await supabase
      .from("products")
      .update({ average_review: averageReview })
      .eq("id", productId);

    res.status(201).json({ success: true, data: newReview });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const { data: reviews, error } = await supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({ success: true, data: reviews });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = { addProductReview, getProductReviews };

const supabase = require("../../db/supabase");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    // Use Supabase ilike for case-insensitive search across multiple columns
    const { data: searchResults, error } = await supabase
      .from("products")
      .select("*")
      .or(
        `title.ilike.%${keyword}%,description.ilike.%${keyword}%,category.ilike.%${keyword}%,brand.ilike.%${keyword}%`
      );

    if (error) throw error;

    // Map snake_case Supabase fields to camelCase for frontend
    const mappedResults = (searchResults || []).map((p) => ({
      id: p.id,
      image: p.image,
      title: p.title,
      description: p.description,
      category: p.category,
      brand: p.brand,
      price: p.price,
      salePrice: p.sale_price,
      totalStock: p.total_stock,
      averageReview: p.average_review,
      created_at: p.created_at,
      updated_at: p.updated_at,
    }));

    res.status(200).json({ success: true, data: mappedResults });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = { searchProducts };

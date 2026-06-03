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

    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = { searchProducts };

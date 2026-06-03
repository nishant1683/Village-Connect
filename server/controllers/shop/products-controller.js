const supabase = require("../../db/supabase");

// Get filtered + sorted products
const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let query = supabase.from("products").select("*");

    if (category.length) {
      query = query.in("category", category.split(","));
    }

    if (brand.length) {
      query = query.in("brand", brand.split(","));
    }

    // Apply sort
    switch (sortBy) {
      case "price-lowtohigh":
        query = query.order("price", { ascending: true });
        break;
      case "price-hightolow":
        query = query.order("price", { ascending: false });
        break;
      case "title-atoz":
        query = query.order("title", { ascending: true });
        break;
      case "title-ztoa":
        query = query.order("title", { ascending: false });
        break;
      default:
        query = query.order("price", { ascending: true });
        break;
    }

    const { data: products, error } = await query;

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// Get single product details
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };

const supabase = require("../../db/supabase");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const { data, error } = await supabase
      .from("features")
      .insert({ image })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const { data: images, error } = await supabase
      .from("features")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({ success: true, data: images });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occured!" });
  }
};

module.exports = { addFeatureImage, getFeatureImages };

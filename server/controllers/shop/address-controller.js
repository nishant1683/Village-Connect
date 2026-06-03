const supabase = require("../../db/supabase");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const { data, error } = await supabase
      .from("addresses")
      .insert({ user_id: userId, address, city, pincode, phone, notes })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const { data: addressList, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;

    res.status(200).json({ success: true, data: addressList });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { address, city, pincode, phone, notes } = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const { data, error } = await supabase
      .from("addresses")
      .update({ address, city, pincode, phone, notes })
      .eq("id", addressId)
      .eq("user_id", userId)
      .select()
      .single();

    if (!data) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const { data, error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", addressId)
      .eq("user_id", userId)
      .select()
      .single();

    if (!data) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    if (error) throw error;

    res.status(200).json({ success: true, message: "Address deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../../db/supabase");

// Register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const { data: newUser, error } = await supabase
      .from("users")
      .insert({ username: userName, email, password: hashPassword, role: "user" })
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const { data: checkUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Supabase login query error:", error);
      return res.status(500).json({
        success: false,
        message: "Database error. Please try again later.",
      });
    }

    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });
    }

    // Validate the selected role against the user's actual role in the database
    if (role && role !== checkUser.role) {
      return res.json({
        success: false,
        message:
          role === "admin"
            ? "You are not authorized as an admin. Please login as a user."
            : "This account has admin privileges. Please login as admin.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser.id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser.id,
        userName: checkUser.username,
      },
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  let token = req.cookies ? req.cookies.token : null;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

// New User Login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: checkUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Supabase login query error:", error);
      const isConnError = error.message?.includes("fetch failed") || error.details?.includes("ENOTFOUND");
      const errMsg = isConnError
        ? "Database connection failed. Please check your SUPABASE_URL in server/.env or ensure your Supabase project is active."
        : "Database error during login.";
      return res.status(500).json({ success: false, message: errMsg });
    }

    if (!checkUser) {
      return res.json({ success: false, message: "User doesn't exist! Please register first" });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({ success: false, message: "Incorrect password! Please try again" });
    }

    if (checkUser.role !== "user") {
      return res.json({ success: false, message: "Access denied. Please log in through the Admin Portal." });
    }

    const token = jwt.sign(
      {
        id: checkUser.id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.username,
        name: checkUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: checkUser.id,
        name: checkUser.username,
        userName: checkUser.username,
        email: checkUser.email,
        role: checkUser.role,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// New User Register
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return res.json({ success: false, message: "User Already exists with the same email! Please try again" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const { data: newUser, error } = await supabase
      .from("users")
      .insert({ username: name, email, password: hashPassword, role: "user" })
      .select()
      .single();

    if (error) throw error;

    const token = jwt.sign(
      {
        id: newUser.id,
        role: newUser.role,
        email: newUser.email,
        userName: newUser.username,
        name: newUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.username,
        userName: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// New Admin Login
const adminLogin = async (req, res) => {
  const { email, password, adminCode } = req.body;
  try {
    if (adminCode !== process.env.ADMIN_SECRET_CODE) {
      return res.json({ success: false, message: "Invalid Admin Access Code!" });
    }

    const { data: checkUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Supabase login query error:", error);
      const isConnError = error.message?.includes("fetch failed") || error.details?.includes("ENOTFOUND");
      const errMsg = isConnError
        ? "Database connection failed. Please check your SUPABASE_URL in server/.env or ensure your Supabase project is active."
        : "Database error during login.";
      return res.status(500).json({ success: false, message: errMsg });
    }

    if (!checkUser) {
      return res.json({ success: false, message: "Admin user doesn't exist!" });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({ success: false, message: "Incorrect password! Please try again" });
    }

    if (checkUser.role !== "admin") {
      return res.json({ success: false, message: "Access denied. This portal is for administrators only." });
    }

    const token = jwt.sign(
      {
        id: checkUser.id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.username,
        name: checkUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: checkUser.id,
        name: checkUser.username,
        userName: checkUser.username,
        email: checkUser.email,
        role: checkUser.role,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Verify Token
const verifyToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "admin") {
      return res.status(200).json({
        valid: true,
        admin: {
          id: decoded.id,
          name: decoded.userName || decoded.name,
          userName: decoded.userName || decoded.name,
          email: decoded.email,
          role: decoded.role,
        },
      });
    } else {
      return res.status(200).json({
        valid: true,
        user: {
          id: decoded.id,
          name: decoded.userName || decoded.name,
          userName: decoded.userName || decoded.name,
          email: decoded.email,
          role: decoded.role,
        },
      });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};

// Change Password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user?.id;

  if (!oldPassword || !newPassword) {
    return res.json({
      success: false,
      message: "Please provide both current password and new password.",
    });
  }

  if (newPassword.length < 6) {
    return res.json({
      success: false,
      message: "New password must be at least 6 characters long.",
    });
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect current password. Please try again.",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    const { error: updateError } = await supabase
      .from("users")
      .update({ password: hashedNewPassword })
      .eq("id", userId);

    if (updateError) {
      throw updateError;
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error occurred while updating password.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  userLogin,
  userRegister,
  adminLogin,
  verifyToken,
  changePassword,
};


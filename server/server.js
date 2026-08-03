require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");

const app = express();
const PORT = process.env.PORT || 5000;

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === clientUrl || origin.startsWith("http://localhost:") || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

const supabase = require("./db/supabase");

app.listen(PORT, async () => {
  console.log(`Server is now running on port ${PORT}`);
  try {
    if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL.includes("YOUR_SUPABASE_PROJECT_REF")) {
      console.warn("⚠️  [Supabase]: Environment variables are using placeholders. Update server/.env with your Supabase credentials.");
    } else {
      const { error } = await supabase.from("users").select("id").limit(1);
      if (error) {
        console.warn("⚠️  [Supabase]: Connection check warning -", error.message);
      } else {
        console.log("✅ [Supabase]: Connected successfully to database!");
      }
    }
  } catch (err) {
    console.warn("⚠️  [Supabase]: Connection error -", err.message);
  }
});

module.exports = app;


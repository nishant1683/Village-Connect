require("dotenv").config();
const supabase = require("./db/supabase");

async function testConnection() {
  console.log("----------------------------------------");
  console.log("🔍 Testing Supabase SDK Connection...");
  console.log("----------------------------------------");

  const url = process.env.SUPABASE_URL;

  console.log(`📡 URL: ${url}`);
  try {
    const { data, error } = await supabase.from("users").select("id").limit(1);
    
    if (error) {
      console.error("❌ Connection failed with error:", error.message || error);
      if (error.code === "42P01") {
        console.log("💡 The table 'users' does not exist yet. Please run SUPABASE_SCHEMA.sql in Supabase SQL Editor.");
      }
      process.exit(1);
    } else {
      console.log("✅ Successfully connected to Supabase database!");
      console.log(`📊 Found ${data ? data.length : 0} user record(s) in database sample test.`);
      console.log("----------------------------------------");
      process.exit(0);
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err.message || err);
    process.exit(1);
  }
}

testConnection();

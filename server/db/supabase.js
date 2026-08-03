const { createClient } = require("@supabase/supabase-js");
const ws = require("ws");

const supabaseUrl = process.env.SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY || "placeholder-key";

const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    realtime: {
      transport: ws,
    },
  }
);

module.exports = supabase;

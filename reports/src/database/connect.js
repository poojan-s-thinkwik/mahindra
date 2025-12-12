import pg from "pg";
const { Pool } = pg;
import config from "../config.js";

const pool = new Pool({
  connectionString: config.connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  timezone: "Asia/Kolkata",
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.on("connect", () => {
  console.log("connected to postgresql DB");
});

export default pool;
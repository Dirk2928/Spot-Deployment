const mysql = require("mysql2");
require("dotenv").config();
const legendPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10
});
const geoPool = mysql.createPool({
    host: process.env.GEO_DB_HOST,
    port: parseInt(process.env.GEO_DB_PORT),
    user: process.env.GEO_DB_USER,
    password: process.env.GEO_DB_PASSWORD,
    database: process.env.GEO_DB_NAME,
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10
});

const legendDB = legendPool.promise();
const geoDB = geoPool.promise();

async function testConnection() {
    try {
        await legendDB.query("SELECT 1");
        console.log("✅ Connected to legendsss_db (defaultdb) on Aiven");
        await geoDB.query("SELECT 1");
        console.log("✅ Connected to geocoding_db on Aiven");
    } catch (err) {
        console.error("❌ DB ERROR:", err.message);
    }
}

module.exports = {
    legendDB,
    geoDB,
    testConnection
};
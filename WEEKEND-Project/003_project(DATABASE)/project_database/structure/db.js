const { Pool } = require("pg");

const pool = new Pool ({
	user: "postgres",
	host: "localhost",
	database: "belajar_db",
	password: "123",
	port: "5432"
});

module.exports = pool;

pool.query("SELECT NOW()", (err, res) => {
	if (err) console.log(err);
	else console.log("DB connected", res.rows[0]);
});
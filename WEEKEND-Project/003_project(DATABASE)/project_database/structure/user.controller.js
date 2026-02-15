const db = require("./db");

exports.getUsers = async (req, res) => {
	const result = await db.query("SELECT * FROM users");
	res.json(result.rows);
};
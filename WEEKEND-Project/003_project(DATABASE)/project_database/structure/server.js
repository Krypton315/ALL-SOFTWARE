const x = require("express");
const server = x();
const db = require("./db");

server.use(x.json());

const n = require("./user.route.js");
server.use("/api", n );

server.listen(3000, () => {
	console.log("Server is running");
});
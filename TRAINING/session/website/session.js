const session = require("express-session")
const express = require("express");

const app = express();

// middleware
app.use(express.json());

app.use(
	session({
		secret: "rahasia-session",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 // = 1 jam
		}
	})
);

// ---

function isLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

// ---

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // contoh dummy (biasanya dari DB)
  if (email === "admin@gmail.com" && password === "123") {
    req.session.user = {
      id: 1,
      email: email,
      role: "admin"
    };

    return res.json({ message: "Login berhasil" });
  }

  res.status(401).json({ message: "Login gagal" });
});

// ---

app.get("/profile", isLogin, (req, res) => {
  res.json({
    message: "Data profile",
    user: req.session.user
  });
});

// ---

app.get("/dashboard", isLogin, (req, res) => {
  res.json({ message: "Selamat datang di dashboard" });
});

app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Gagal logout" });
    }
    res.json({ message: "Logout berhasil" });
  });
});


app.listen(3000, () => {
	console.log(`Server is Running ${3000}`);
});

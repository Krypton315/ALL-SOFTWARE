exports.profile = (req, res) => {
  res.json({
    message: "Ini halaman user",
    user: req.user
  });
};

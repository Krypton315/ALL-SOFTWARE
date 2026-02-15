const rateLimitStore = {};

// middleware rate limiting
const rateLimiter = (req, res, next) => {
  const ip = req.ip; // identitas user (berdasarkan IP)
  const currentTime = Date.now();

  const limit = 5; // maksimal request
  const windowTime = 60 * 1000; // 1 menit

  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = {
      count: 1,
      startTime: currentTime
    };
    return next();
  }

  const elapsedTime = currentTime - rateLimitStore[ip].startTime;

  if (elapsedTime < windowTime) {
    if (rateLimitStore[ip].count >= limit) {
      return res.status(429).json({
        message: "Terlalu banyak request, coba lagi nanti"
      });
    }

    rateLimitStore[ip].count += 1;
    next();
  } else {
    // reset jika sudah lewat 1 menit
    rateLimitStore[ip] = {
      count: 1,
      startTime: currentTime
    };
    next();
  }
};

module.exports = rateLimiter;

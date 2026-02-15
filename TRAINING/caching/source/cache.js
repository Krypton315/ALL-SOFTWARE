const cache = {};

const setCache = (key, data, ttl = 60) => {
  cache[key] = {
    data,
    expired: Date.now() + ttl * 1000
  };
};

const getCache = (key) => {
  const cached = cache[key];

  if (!cached) return null;

  if (Date.now() > cached.expired) {
    delete cache[key];
    return null;
  }

  return cached.data;
};


module.exports = { setCache, getCache };

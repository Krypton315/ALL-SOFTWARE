// ====================================
// CACHE SERVICE
// In-memory caching dengan TTL
// ====================================

class CacheService {
  constructor() {
    this.cache = new Map();
    this.ttl = parseInt(process.env.CACHE_TTL) || 300000; // 5 menit default
  }

  /**
   * Set cache dengan TTL
   */
  set(key, value, customTTL = null) {
    const expiry = Date.now() + (customTTL || this.ttl);
    
    this.cache.set(key, {
      value,
      expiry,
    });

    console.log(`Cache set: ${key} (TTL: ${customTTL || this.ttl}ms)`);
  }

  /**
   * Get cache
   */
  get(key) {
    const cached = this.cache.get(key);

    if (!cached) {
      console.log(`Cache miss: ${key}`);
      return null;
    }

    // Check apakah sudah expired
    if (Date.now() > cached.expiry) {
      console.log(`Cache expired: ${key}`);
      this.cache.delete(key);
      return null;
    }

    console.log(`Cache hit: ${key}`);
    return cached.value;
  }

  /**
   * Delete cache
   */
  delete(key) {
    this.cache.delete(key);
    console.log(`Cache deleted: ${key}`);
  }

  /**
   * Clear semua cache
   */
  clear() {
    this.cache.clear();
    console.log('All cache cleared');
  }

  /**
   * Get cache stats
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Singleton instance
module.exports = new CacheService();
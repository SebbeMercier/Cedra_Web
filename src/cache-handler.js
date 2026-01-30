const Redis = require('ioredis');

/**
 * Custom Cache Handler for Next.js using Valkey 8.0
 * Provides distributed ISR state across multiple Nomad instances.
 */
class ValkeyCacheHandler {
  constructor(options) {
    this.options = options;
    const url = process.env.VALKEY_URL || 'valkey://localhost:6379';
    
    this.client = new Redis(url, {
      keyPrefix: 'cedra-front:', // Isolation du frontend
      enableOfflineQueue: true,
      connectTimeout: 1000,
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        // Exponential backoff
        return Math.min(times * 50, 2000);
      },
      reconnectOnError: (err) => {
        const targetError = 'READONLY';
        if (err.message.includes(targetError)) return true;
        return false;
      }
    });

    this.client.on('error', (err) => {
      // En dev, on log l'erreur mais on ne crash pas l'app
      if (process.env.NODE_ENV !== 'production') {
        console.warn('⚠️ Valkey non disponible (dev mode):', err.message);
      }
    });
  }

  async get(key) {
    try {
      const data = await this.client.get(key);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      // Fallback to fresh data if cache is down
      return null;
    }
  }

  async set(key, data, ctx) {
    try {
      const ttl = ctx.revalidate || 3600;
      const pipeline = this.client.pipeline();
      
      // Save the actual data
      pipeline.set(key, JSON.stringify(data), 'EX', ttl);
      
      // Manage tags for on-demand revalidation (revalidateTag)
      if (data.tags && Array.isArray(data.tags)) {
        for (const tag of data.tags) {
          pipeline.sadd(`tag:${tag}`, key);
          // Set expiry on tag set slightly longer than data
          pipeline.expire(`tag:${tag}`, ttl + 3600);
        }
      }
      
      await pipeline.exec();
    } catch (error) {
      console.error('Valkey Set Error:', error);
    }
  }

  async revalidateTag(tag) {
    try {
      // Get all keys associated with this tag
      const keys = await this.client.smembers(`tag:${tag}`);
      if (keys.length > 0) {
        // Delete all keys and the tag set itself
        await Promise.all([
          this.client.del(...keys),
          this.client.del(`tag:${tag}`)
        ]);
      }
    } catch (error) {
      console.error('Valkey RevalidateTag Error:', error);
    }
  }
}

module.exports = ValkeyCacheHandler;

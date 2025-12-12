import Redis from 'ioredis';

class RedisService {
    constructor() {
        if (!RedisService.instance) {
            this.redis = new Redis({
                host: 'localhost', // Change to your Redis host
                port: 6379, // Redis default port
                // username: 'default', // Set if using Redis ACL (Optional)
                password: 'foobared' // Set if Redis requires authentication
            });

            this.redis.on('connect', () => console.log('✅ Connected to Redis'));
            this.redis.on('error', (err) => console.error('❌ Redis Error:', err));

            RedisService.instance = this;
        }
        return RedisService.instance;
    }

    // Store Data (Supports JSON)
    async set(key, value, expiry = 3600) {
        const data = typeof value === 'object' ? JSON.stringify(value) : value;
        await this.redis.set(key, data, 'EX', expiry);
        console.log(`✅ Stored: ${key} ->`, value);
    }

    // Retrieve Data
    async get(key) {
        const data = await this.redis.get(key);
        return data ? (this.isJson(data) ? JSON.parse(data) : data) : null;
    }

    // Delete Data
    async delete(key) {
        await this.redis.del(key);
        console.log(`🗑️ Deleted key: ${key}`);
    }

    // Check if string is JSON
    isJson(str) {
        try { JSON.parse(str); return true; } catch (e) { return false; }
    }

    // Close Connection
    async close() {
        await this.redis.quit();
        console.log('🚪 Redis Connection Closed');
    }
}

// Singleton Instance
export default RedisService;

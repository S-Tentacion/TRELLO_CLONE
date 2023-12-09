import { MongoClient } from 'mongodb';

const { NEXT_PUBLIC_MONGODB_URI, NEXT_PUBLIC_MONGODB_DB } = process.env;

if (!NEXT_PUBLIC_MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!NEXT_PUBLIC_MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    const mongoURL =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_LOCAL_MONGODB
        : process.env.NEXT_PUBLIC_MONGODB_URI;

    cached.promise = MongoClient.connect(mongoURL, opts).then((client) => {
      return {
        client,
        db: client.db(NEXT_PUBLIC_MONGODB_DB)
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

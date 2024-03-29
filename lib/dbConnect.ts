/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MONGODB_URI to .env.local");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let globalWithMongoose = global as typeof globalThis & {
    mongoose: any;
};
let cached = globalWithMongoose.mongoose;

if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    // strict query: https://www.mongodb.com/community/forums/t/deprecationwarning-mongoose-the-strictquery/209637/2
    mongoose.set("strictQuery", false);

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                return mongoose;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;

// import mongoose from "mongoose";

// const MONGODB_URI: string = process.env.MONGODB_URI || "";

// if (!MONGODB_URI) {
//     throw new Error(
//         "Please define the MONGODB_URI environment variable inside .env.local"
//     );
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//     if (cached.conn) {
//         return cached.conn;
//     }

//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false,
//         };

//         cached.promise = mongoose
//             .connect(MONGODB_URI, opts)
//             .then((mongoose) => {
//                 return mongoose;
//             });
//     }
//     cached.conn = await cached.promise;
//     return cached.conn;
// }

// export default dbConnect;

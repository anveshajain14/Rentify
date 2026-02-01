module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/backend/lib/mongodb.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/backend/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = dbConnect;
}),
"[project]/backend/models/Product.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/backend/node_modules/mongoose)");
;
const ProductSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"]({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    category: {
        type: String,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    pricePerWeek: {
        type: Number
    },
    pricePerMonth: {
        type: Number
    },
    seller: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: 'User',
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    availability: [
        {
            startDate: {
                type: Date
            },
            endDate: {
                type: Date
            }
        }
    ]
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].models.Product || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].model('Product', ProductSchema);
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/backend/models/User.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/backend/node_modules/mongoose)");
;
const UserSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [
            'renter',
            'seller',
            'admin'
        ],
        default: 'renter'
    },
    avatar: {
        type: String,
        default: ''
    },
    shopBanner: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    policies: {
        type: String,
        default: ''
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    // Admin hardening: allow blocking a user without deleting their history.
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].model('User', UserSchema);
}),
"[project]/backend/lib/auth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthUser",
    ()=>getAuthUser,
    "removeAuthCookie",
    ()=>removeAuthCookie,
    "setAuthCookie",
    ()=>setAuthCookie,
    "signToken",
    ()=>signToken,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/lib/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/models/User.js [app-route] (ecmascript)");
;
;
;
;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
async function signToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: '7d'
    });
}
async function verifyToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}
async function getAuthUser() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    const decoded = await verifyToken(token);
    if (!decoded || !decoded.id) return null;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(decoded.id).select('-password');
    return user;
}
async function setAuthCookie(token) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
    });
}
async function removeAuthCookie() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('token');
}
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[project]/backend/lib/cloudinary.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/node_modules/cloudinary/cloudinary.js [app-route] (ecmascript)");
;
__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v2"].config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$cloudinary$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["v2"];
}),
"[project]/backend/api/products/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/lib/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/models/Product.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/lib/auth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/lib/cloudinary.js [app-route] (ecmascript)");
;
;
;
;
;
async function GET(req) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const seller = searchParams.get('seller');
        const approvedOnly = searchParams.get('approved') !== 'false';
        let query = {};
        if (category) query.category = category;
        if (seller) query.seller = seller;
        if (approvedOnly) query.isApproved = true;
        const products = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(query).populate('seller', 'name avatar location');
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            products
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: error.message
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthUser"])();
        if (!user || user.role !== 'seller') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Only sellers can list products'
            }, {
                status: 403
            });
        }
        if (!user.isApproved) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Seller profile must be approved by admin'
            }, {
                status: 403
            });
        }
        const formData = await req.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const category = formData.get('category');
        const pricePerDay = parseFloat(formData.get('pricePerDay'));
        const pricePerWeek = formData.get('pricePerWeek') ? parseFloat(formData.get('pricePerWeek')) : undefined;
        const pricePerMonth = formData.get('pricePerMonth') ? parseFloat(formData.get('pricePerMonth')) : undefined;
        const imageFiles = formData.getAll('images');
        if (!title || !description || !category || !pricePerDay || imageFiles.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Missing required fields'
            }, {
                status: 400
            });
        }
        const imageUrls = await Promise.all(imageFiles.map(async (file)=>{
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            return new Promise((resolve, reject)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$cloudinary$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].uploader.upload_stream({
                    folder: 'luxe-rent/products'
                }, (error, result)=>{
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }).end(buffer);
            });
        }));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const product = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
            title,
            description,
            category,
            pricePerDay,
            pricePerWeek,
            pricePerMonth,
            images: imageUrls,
            seller: user._id,
            isApproved: false
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Product submitted for approval',
            product
        }, {
            status: 201
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: error.message
        }, {
            status: 500
        });
    }
}
}),
"[project]/frontend/app/api/products/route.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$products$2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/api/products/route.js [app-route] (ecmascript)");
;
}),
"[project]/frontend/app/api/products/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$products$2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GET"],
    "POST",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$products$2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["POST"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$api$2f$products$2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/app/api/products/route.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$products$2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/api/products/route.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__dee3a3dc._.js.map
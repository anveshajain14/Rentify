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
        required: false
    },
    // Google OAuth
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
    authProvider: {
        type: String,
        enum: [
            'local',
            'google'
        ],
        default: 'local'
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
    isBlocked: {
        type: Boolean,
        default: false
    },
    // Email verification
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationOTP: {
        type: String,
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    otpResendCount: {
        type: Number,
        default: 0
    },
    otpResendWindow: {
        type: Date,
        default: null
    },
    // Password reset
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpiry: {
        type: Date,
        default: null
    },
    // Login 2FA (optional)
    loginOTP: {
        type: String,
        default: null
    },
    loginOTPExpiry: {
        type: Date,
        default: null
    },
    // Account lock after failed attempts
    failedLoginAttempts: {
        type: Number,
        default: 0
    },
    lockedUntil: {
        type: Date,
        default: null
    },
    // Invalidate all sessions on password reset
    sessionVersion: {
        type: Number,
        default: 0
    },
    // Saved addresses for checkout (per user)
    addresses: [
        {
            name: {
                type: String
            },
            phone: {
                type: String
            },
            street: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            pincode: {
                type: String
            },
            isDefault: {
                type: Boolean,
                default: false
            }
        }
    ]
}, {
    timestamps: true
});
// Must have at least one auth method
UserSchema.pre('save', async function() {
    if (!this.password && !this.googleId) {
        throw new Error('User must have either password or googleId');
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].model('User', UserSchema);
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
    ],
    // Refundable security deposit (optional, per product)
    securityDeposit: {
        type: Number,
        default: 0
    },
    // Seller can allow self-pickup
    allowPickup: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].models.Product || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].model('Product', ProductSchema);
}),
"[project]/backend/models/Review.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/backend/node_modules/mongoose)");
;
const SellerReplySchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"]({
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    _id: false
});
const ReviewSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"]({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    renter: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: 'Product',
        required: true
    },
    seller: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Optional, additive seller reply that never mutates the original review content
    sellerReply: {
        type: SellerReplySchema,
        default: null
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].models.Review || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].model('Review', ReviewSchema);
}),
"[project]/backend/models/Rental.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/backend/node_modules/mongoose)");
;
const addressSnapshotSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"]({
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
}, {
    _id: false
});
const RentalSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"]({
    product: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: 'Product',
        required: true
    },
    renter: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: [
            'pending',
            'paid',
            'failed'
        ],
        default: 'pending'
    },
    rentalStatus: {
        type: String,
        enum: [
            'upcoming',
            'active',
            'completed',
            'cancelled'
        ],
        default: 'upcoming'
    },
    stripeSessionId: {
        type: String
    },
    // Address & fulfillment
    shippingAddress: {
        type: addressSnapshotSchema
    },
    fulfillmentType: {
        type: String,
        enum: [
            'delivery',
            'pickup'
        ],
        default: 'delivery'
    },
    // Payment method used
    paymentMethod: {
        type: String,
        enum: [
            'card',
            'upi',
            'cod'
        ],
        default: 'card'
    },
    // Security deposit (refundable)
    securityDeposit: {
        type: Number,
        default: 0
    },
    depositStatus: {
        type: String,
        enum: [
            'held',
            'released',
            'deducted'
        ],
        default: 'held'
    },
    // Optional damage protection add-on
    damageProtection: {
        type: Boolean,
        default: false
    },
    damageProtectionFee: {
        type: Number,
        default: 0
    },
    // Late return penalty (calculated after return)
    latePenalty: {
        type: Number,
        default: 0
    },
    returnedAt: {
        type: Date
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].models.Rental || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$backend$2f$node_modules$2f$mongoose$29$__["default"].model('Rental', RentalSchema);
}),
"[project]/backend/api/seller/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/lib/mongodb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/models/User.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/models/Product.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Review$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/models/Review.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Rental$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/models/Rental.js [app-route] (ecmascript)");
;
;
;
;
;
;
async function GET(req, { params }) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$lib$2f$mongodb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const resolvedParams = typeof params.then === 'function' ? await params : params;
        const { id } = resolvedParams;
        const { searchParams } = new URL(req.url);
        const reviewPage = Math.max(1, parseInt(searchParams.get('reviewPage') || '1', 10));
        const reviewLimit = Math.min(20, Math.max(5, parseInt(searchParams.get('reviewLimit') || '10', 10)));
        const reviewSkip = (reviewPage - 1) * reviewLimit;
        const seller = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(id).select('-password');
        if (!seller || seller.role !== 'seller') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Seller not found'
            }, {
                status: 404
            });
        }
        if (!seller.isApproved) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: 'Seller not found'
            }, {
                status: 404
            });
        }
        const [products, reviewsResult, totalRentalsCompleted, onTimeReturnsCount, ratingAgg, totalReviews, rentalsPerProduct, reviewsPerProduct] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Product$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
                seller: id,
                isApproved: true
            }).sort({
                createdAt: -1
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Review$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
                seller: id
            }).populate('renter', 'name avatar').sort({
                createdAt: -1
            }).skip(reviewSkip).limit(reviewLimit).lean(),
            __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Rental$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments({
                seller: id,
                rentalStatus: 'completed'
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Rental$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments({
                seller: id,
                rentalStatus: 'completed',
                $expr: {
                    $lte: [
                        '$returnedAt',
                        '$endDate'
                    ]
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Review$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
                {
                    $match: {
                        seller: id
                    }
                },
                {
                    $group: {
                        _id: '$rating',
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                }
            ]),
            __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Review$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments({
                seller: id
            }),
            // Per-product rental counts for this seller (completed rentals only)
            __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Rental$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
                {
                    $match: {
                        seller: id,
                        rentalStatus: 'completed'
                    }
                },
                {
                    $group: {
                        _id: '$product',
                        rentalCount: {
                            $sum: 1
                        }
                    }
                }
            ]),
            // Per-product review stats for this seller
            __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Review$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
                {
                    $match: {
                        seller: id
                    }
                },
                {
                    $group: {
                        _id: '$product',
                        avgRating: {
                            $avg: '$rating'
                        },
                        reviewCount: {
                            $sum: 1
                        }
                    }
                }
            ])
        ]);
        const avgRatingResult = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$models$2f$Review$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
            {
                $match: {
                    seller: id
                }
            },
            {
                $group: {
                    _id: null,
                    avg: {
                        $avg: '$rating'
                    },
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);
        const averageRating = avgRatingResult[0]?.avg ?? 0;
        const activeListings = products.length;
        const responseRate = totalRentalsCompleted > 0 && totalReviews > 0 ? Math.min(100, Math.round(totalReviews / totalRentalsCompleted * 100)) : 98;
        const onTimeRate = totalRentalsCompleted > 0 ? onTimeReturnsCount / totalRentalsCompleted * 100 : 100;
        const reliabilityScore = Math.min(100, Math.round(averageRating / 5 * 40 + Math.min(35, totalRentalsCompleted * 3) + onTimeRate / 100 * 15 + responseRate / 100 * 10));
        const ratingDistribution = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };
        ratingAgg.forEach((r)=>{
            ratingDistribution[r._id] = r.count;
        });
        // Compute lightweight, additive "top picks" metadata per product.
        const rentalsMap = new Map((rentalsPerProduct || []).map((r)=>[
                r._id.toString(),
                r.rentalCount || 0
            ]));
        const reviewsMap = new Map((reviewsPerProduct || []).map((r)=>[
                r._id.toString(),
                {
                    avgRating: r.avgRating ?? 0,
                    reviewCount: r.reviewCount ?? 0
                }
            ]));
        const topPicks = products.map((p)=>{
            const idStr = p._id.toString();
            const rentalCount = rentalsMap.get(idStr) ?? 0;
            const reviewMeta = reviewsMap.get(idStr) || {
                avgRating: 0,
                reviewCount: 0
            };
            return {
                productId: idStr,
                rentalCount,
                avgRating: reviewMeta.avgRating,
                reviewCount: reviewMeta.reviewCount
            };
        }).sort((a, b)=>{
            if (b.rentalCount !== a.rentalCount) return b.rentalCount - a.rentalCount;
            if (b.avgRating !== a.avgRating) return b.avgRating - a.avgRating;
            return (b.reviewCount || 0) - (a.reviewCount || 0);
        }).slice(0, 3);
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            seller,
            products,
            reviews: reviewsResult,
            totalReviews,
            reviewPage,
            reviewLimit,
            stats: {
                averageRating: Math.round(averageRating * 10) / 10,
                totalRentalsCompleted,
                activeListings,
                responseRate,
                totalReviews,
                reliabilityScore
            },
            ratingDistribution,
            topPicks
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Server error';
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message
        }, {
            status: 500
        });
    }
}
}),
"[project]/frontend/app/api/seller/[id]/route.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$seller$2f5b$id$5d2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/api/seller/[id]/route.js [app-route] (ecmascript)");
;
}),
"[project]/frontend/app/api/seller/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$seller$2f5b$id$5d2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GET"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f$api$2f$seller$2f5b$id$5d2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/app/api/seller/[id]/route.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$api$2f$seller$2f5b$id$5d2f$route$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/api/seller/[id]/route.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00658feb._.js.map
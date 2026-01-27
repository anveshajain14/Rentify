(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/store/slices/authSlice.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchMe",
    ()=>fetchMe,
    "logout",
    ()=>logout,
    "setUser",
    ()=>setUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
;
const fetchMe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/fetchMe', async ()=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/api/auth/me');
    return response.data.user;
});
const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/logout', async ()=>{
    await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/api/auth/logout');
    return null;
});
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchMe.pending, (state)=>{
            state.loading = true;
        }).addCase(fetchMe.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
        }).addCase(fetchMe.rejected, (state)=>{
            state.loading = false;
            state.user = null;
        }).addCase(logout.fulfilled, (state)=>{
            state.user = null;
        });
    }
});
const { setUser } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/store/slices/cartSlice.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToCart",
    ()=>addToCart,
    "clearCart",
    ()=>clearCart,
    "default",
    ()=>__TURBOPACK__default__export__,
    "removeFromCart",
    ()=>removeFromCart,
    "updateCartItemDates",
    ()=>updateCartItemDates
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const CART_KEY = 'luxerent_cart';
function loadCart() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const s = localStorage.getItem(CART_KEY);
        if (!s) return [];
        const parsed = JSON.parse(s);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}
function saveCart(items) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (e) {}
}
const initialState = {
    items: loadCart()
};
const cartSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const { productId, product, startDate, endDate, duration } = action.payload;
            const exists = state.items.findIndex((i)=>i.productId === productId);
            if (exists >= 0) {
                state.items[exists] = {
                    productId,
                    product,
                    startDate,
                    endDate,
                    duration
                };
            } else {
                state.items.push({
                    productId,
                    product,
                    startDate,
                    endDate,
                    duration
                });
            }
            saveCart(state.items);
        },
        removeFromCart: (state, action)=>{
            state.items = state.items.filter((i)=>i.productId !== action.payload);
            saveCart(state.items);
        },
        updateCartItemDates: (state, action)=>{
            const idx = state.items.findIndex((i)=>i.productId === action.payload.productId);
            if (idx >= 0) {
                state.items[idx].startDate = action.payload.startDate;
                state.items[idx].endDate = action.payload.endDate;
                state.items[idx].duration = action.payload.duration;
                saveCart(state.items);
            }
        },
        clearCart: (state)=>{
            state.items = [];
            saveCart(state.items);
        }
    }
});
const { addToCart, removeFromCart, updateCartItemDates, clearCart } = cartSlice.actions;
const __TURBOPACK__default__export__ = cartSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/store/slices/wishlistSlice.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToWishlist",
    ()=>addToWishlist,
    "default",
    ()=>__TURBOPACK__default__export__,
    "removeFromWishlist",
    ()=>removeFromWishlist,
    "toggleWishlist",
    ()=>toggleWishlist
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const WISHLIST_KEY = 'luxerent_wishlist';
function loadWishlist() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const s = localStorage.getItem(WISHLIST_KEY);
        if (!s) return [];
        const parsed = JSON.parse(s);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}
function saveWishlist(ids) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    } catch (e) {}
}
const initialState = {
    productIds: loadWishlist()
};
const wishlistSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action)=>{
            const id = action.payload;
            if (!state.productIds.includes(id)) {
                state.productIds.push(id);
                saveWishlist(state.productIds);
            }
        },
        removeFromWishlist: (state, action)=>{
            state.productIds = state.productIds.filter((id)=>id !== action.payload);
            saveWishlist(state.productIds);
        },
        toggleWishlist: (state, action)=>{
            const id = action.payload;
            const idx = state.productIds.indexOf(id);
            if (idx >= 0) {
                state.productIds = state.productIds.filter((i)=>i !== id);
            } else {
                state.productIds.push(id);
            }
            saveWishlist(state.productIds);
        }
    }
});
const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
const __TURBOPACK__default__export__ = wishlistSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/store/slices/filtersSlice.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "resetFilters",
    ()=>resetFilters,
    "setAvailability",
    ()=>setAvailability,
    "setCategory",
    ()=>setCategory,
    "setDuration",
    ()=>setDuration,
    "setPriceRange",
    ()=>setPriceRange,
    "setRatingMin",
    ()=>setRatingMin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    category: 'All',
    priceMin: '',
    priceMax: '',
    duration: '',
    availabilityStart: '',
    availabilityEnd: '',
    ratingMin: ''
};
const filtersSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'filters',
    initialState,
    reducers: {
        setCategory: (state, action)=>{
            state.category = action.payload;
        },
        setPriceRange: (state, action)=>{
            if (action.payload.min !== undefined) state.priceMin = action.payload.min;
            if (action.payload.max !== undefined) state.priceMax = action.payload.max;
        },
        setDuration: (state, action)=>{
            state.duration = action.payload;
        },
        setAvailability: (state, action)=>{
            if (action.payload.start !== undefined) state.availabilityStart = action.payload.start;
            if (action.payload.end !== undefined) state.availabilityEnd = action.payload.end;
        },
        setRatingMin: (state, action)=>{
            state.ratingMin = action.payload;
        },
        resetFilters: ()=>initialState
    }
});
const { setCategory, setPriceRange, setDuration, setAvailability, setRatingMin, resetFilters } = filtersSlice.actions;
const __TURBOPACK__default__export__ = filtersSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/store/slices/recentlyViewedSlice.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addViewed",
    ()=>addViewed,
    "clearViewed",
    ()=>clearViewed,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const MAX_RECENT = 20;
const RECENT_KEY = 'luxerent_recently_viewed';
function load() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const s = localStorage.getItem(RECENT_KEY);
        if (!s) return [];
        const parsed = JSON.parse(s);
        return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
    } catch (e) {
        return [];
    }
}
function save(ids) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(0, MAX_RECENT)));
    } catch (e) {}
}
const initialState = {
    productIds: load()
};
const recentlyViewedSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'recentlyViewed',
    initialState,
    reducers: {
        addViewed: (state, action)=>{
            const id = action.payload;
            state.productIds = [
                id,
                ...state.productIds.filter((i)=>i !== id)
            ].slice(0, MAX_RECENT);
            save(state.productIds);
        },
        clearViewed: (state)=>{
            state.productIds = [];
            save(state.productIds);
        }
    }
});
const { addViewed, clearViewed } = recentlyViewedSlice.actions;
const __TURBOPACK__default__export__ = recentlyViewedSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/store/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/store/slices/authSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/store/slices/cartSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$slices$2f$wishlistSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/store/slices/wishlistSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$slices$2f$filtersSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/store/slices/filtersSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$slices$2f$recentlyViewedSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/store/slices/recentlyViewedSlice.js [app-client] (ecmascript)");
;
;
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        cart: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        wishlist: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$slices$2f$wishlistSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        filters: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$slices$2f$filtersSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        recentlyViewed: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$slices$2f$recentlyViewedSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/store/provider.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReduxProvider",
    ()=>ReduxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/store/index.js [app-client] (ecmascript)");
'use client';
;
;
;
function ReduxProvider(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        "data-orchids-id": "store\\provider.jsx:7:9",
        "data-orchids-name": "Provider",
        store: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$store$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/store/provider.jsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = ReduxProvider;
var _c;
__turbopack_context__.k.register(_c, "ReduxProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_store_0c689ef9._.js.map
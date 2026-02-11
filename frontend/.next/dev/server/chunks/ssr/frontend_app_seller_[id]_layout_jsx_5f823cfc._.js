module.exports = [
"[project]/frontend/app/seller/[id]/layout.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SellerShopLayout,
    "generateMetadata",
    ()=>generateMetadata
]);
const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3000") || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
async function generateMetadata({ params }) {
    try {
        const resolvedParams = typeof params.then === 'function' ? await params : params;
        const { id } = resolvedParams;
        const res = await fetch(`${baseUrl}/api/seller/${id}`, {
            next: {
                revalidate: 60
            }
        });
        if (!res.ok) return {
            title: 'Seller | LuxeRent'
        };
        const data = await res.json();
        const seller = data.seller || {};
        const title = `${seller?.name || 'Seller'} | LuxeRent Shop`;
        const description = seller?.bio?.slice(0, 160) || `Rent from ${seller?.name} on LuxeRent. ${seller?.location || ''}`.trim();
        const image = seller?.shopBanner || seller?.avatar;
        return {
            title,
            description,
            openGraph: {
                title,
                description,
                ...image && {
                    images: [
                        {
                            url: image,
                            width: 1200,
                            height: 630,
                            alt: seller?.name
                        }
                    ]
                },
                type: 'profile'
            }
        };
    } catch  {
        return {
            title: 'Seller | LuxeRent'
        };
    }
}
function SellerShopLayout({ children }) {
    return children;
}
}),
];

//# sourceMappingURL=frontend_app_seller_%5Bid%5D_layout_jsx_5f823cfc._.js.map
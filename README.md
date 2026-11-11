# Kini.com.bd — KiniCom BD (কিনি কম)

Responsive storefront for KiniCom BD. The site is a standalone HTML page styled to match the original Emerald Green and Slate light-theme redesign, with real catalog photography in `./images/`.

## Run locally

```bash
npm install
npm run dev
```

Or serve `index.html` and the `images/` directory with any static web server. `npm run build` creates a deployable Vite `dist/` folder. The copies in `public/images/` ensure the real product photos are included in the production build; keep those synchronized with `images/` when replacing assets.

## Brand and contact

- **Brand:** Kini.com.bd / KiniCom BD (কিনি কম)
- **Tagline:** “Premium Men’s Watches. আপনার পার্সোনালিটি আর স্ট্যাটাসের নিখুঁত সঙ্গী!”
- **Logo:** `./images/kini.com.jpg`
- **Phone / WhatsApp:** +880 1312-866114 / 01312-866114
- **Facebook:** <https://www.facebook.com/profile.php?id=61594176879075>
- **Address:** K.b Aman Ali Road, Chawkbazar, Chattogram, Bangladesh, 4203

## Store features

- Original light theme: Slate surfaces and Emerald `#059669` / `#10b981` controls, announcement bar, sticky glass header, responsive hero carousel, and flash-sale timer.
- Live product search, extensible category tabs (All, Watches, Jerseys, Wall Canvas), wishlist, quick view, toast notifications, and slide-over cart.
- Jersey size and optional personalization fields in quick view.
- Checkout collects customer details, delivery zone, and bKash Transaction ID; it calculates **৳70 inside Chattogram** or **৳130 outside Chattogram** and opens WhatsApp with the complete order summary.
- **Advance bKash payment only. Cash on Delivery is not offered.** bKash Personal: `01312-866114`.

## Order logging webhook

In `index.html`, set `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` to the deployed Google Apps Script Web App URL. On order submission, the storefront posts the order payload to that endpoint and opens the formatted order in WhatsApp (`+8801312866114`). The webhook is intentionally blank until the store owner supplies a deployment URL. Deploy the Apps Script as a web app with access configured to accept requests from your storefront.

## Catalog and image assets

The `PRODUCTS` array is in the inline script in `index.html`. Catalog photos are stored in `images/Watches/` and `images/Jersey/`. `public/images/` mirrors those image paths for Vite production builds. To add categories, add products with their category name; add a category button with the same name in the header.

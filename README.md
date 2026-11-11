# Kini.Com.Bd — KiniCom BD (কিনি কম)

Responsive static e-commerce storefront with an Emerald Green and Slate light theme. The catalog is loaded at runtime from the root `products.json` file; update that JSON to add or edit storefront products and variants.

## Run locally

```bash
npm install
npm run dev
```

Vite serves the storefront on port 5173. `npm run build` synchronizes the root `products.json` into `public/` before creating the deployable `dist/` directory. The copies in `public/images/` mirror the source assets in `images/` so Vite production builds can serve them at the same relative paths.

## Brand and contact

- **Store title:** Kini.Com.Bd
- **Tagline:** “Premium Men’s Watches. আপনার পার্সোনালিটি আর স্ট্যাটাসের নিখুঁত সঙ্গী!”
- **Logo:** `./images/kini.com.jpg`
- **Phone / WhatsApp:** +880 1312-866114 / 01312-866114
- **Facebook:** <https://www.facebook.com/profile.php?id=61594176879075>
- **Address:** K.b Aman Ali Road, Chawkbazar, Chattogram, Bangladesh, 4203

## Store features

- Light theme with Slate surfaces, Emerald `#059669` / `#10b981` controls, announcement bar, sticky glass header, carousel, and flash-sale timer.
- Runtime catalog via `fetch('./products.json')`; category pills for All Products, Watches (ঘড়ি), Jerseys (জার্সি), T-Shirts (টি-শার্ট), and Wall Canvas (ক্যানভাস).
- Search suggestions, wishlist, quick view, cart drawer, and toast notifications.
- T-shirts include M/L/XL/XXL sizing and a cotton fabric spec. Jerseys include size selection. Wall Canvas includes 12x18, 16x24, and 24x36 inch dimensions with frame finish selection.
- Checkout accepts advance bKash payment only, requires a TrxID, and calculates ৳70 delivery inside Chattogram or ৳130 outside. WhatsApp order summaries open to `+8801312866114`.
- Footer includes the discreet `Admin Portal` link to `admin.html`.

## Catalog format

`products.json` is the source catalog. A product uses `id`, `name`, `category`, `price`, `image`, and optional `originalPrice`, `description`, and `variants`. Example variant fields:

```json
{"sizes":["M","L","XL","XXL"],"fabric":"100% Premium Cotton"}
```

```json
{"dimensions":["12x18\"","16x24\"","24x36\""],"frames":["Black","Natural Wood","White"]}
```

Images are under `images/Watches/`, `images/Jersey/`, and `images/Products/`. Keep `public/images/` synchronized when adding or replacing assets. The admin page writes the catalog to the repository's root `products.json`.

## Payment policy

Advance bKash payment only. bKash Personal: `01312-866114`. Cash on Delivery is not offered.

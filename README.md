# Crave — Food Delivery Platform

A responsive food delivery demo built with React, Vite, Tailwind CSS, React Router, Context API, Framer Motion, and LocalStorage.

## Features

### Customer flow
- Responsive home page with search, food categories, offers, and restaurant cards
- Restaurant detail pages with menu category filters
- Add-to-cart, quantity controls, remove items, and persistent cart
- Price breakdown with delivery fee, tax, and `CRAVE10` coupon
- Checkout form with basic validation
- Demo payment options (Cash on Delivery and UPI demo)
- Order confirmation, order timeline, and order history

### Admin flow
- Admin login page at `/admin/login` with demo credentials
- Protected admin route and logout action
- Admin overview with order, delivered-revenue, restaurant, and menu counts
- Order search and status management
- Add, edit, search, and delete restaurant cards
- Full admin workspace with overview, orders, restaurants, menu items, customers, delivery partners, finance, promotions, support, reports, and settings
- Create, edit, search, and delete menu items
- Manage demo delivery partner availability, promotion status, and support ticket status
- Export order reports to CSV
- Browser LocalStorage persistence for admin-managed demo data; restaurant and menu changes are reflected on the customer pages in the same browser

## Getting started

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production files are created in the `dist` folder.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Import the repository into Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

For Netlify, use build command `npm run build` and publish directory `dist`.

## Admin demo login

- URL: `/admin/login`
- Email: `shashank@crave.com`
- Password: `CraveAdmin123!`
- After login, the admin dashboard opens at `/admin`. Use the Log out button to end the demo session.

## Demo notes and limitations

- Cart, orders, and admin changes are saved in the current browser's LocalStorage.
- Coupon code: `CRAVE10` (10% off).
- Checkout is a demo; it does not process real payments or send orders to a restaurant.
- Admin login uses hard-coded demo credentials and a LocalStorage flag. It is only for assignment demonstration, not secure authentication. Use a backend or trusted authentication provider before production.
- Restaurant photos load from Unsplash, so internet access is required for those images.

## Project structure

```text
src/
  components/      Navbar, RestaurantCard, MenuItem, protected admin route
  context/         Cart and admin authentication contexts
  pages/           Customer pages, admin login, and admin workspace
  data.js          Starter restaurant and menu data
  App.jsx          Routes and page shell
  main.jsx         App entry point
  index.css        Tailwind and custom styles
```

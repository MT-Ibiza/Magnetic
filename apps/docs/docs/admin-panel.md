---
sidebar_position: 5
title: Admin Panel
---

# ⚙️ Admin Panel

The **Magnetic Admin Panel** allows staff and admin users to manage services, bookings, clients, and more. It’s a React application deployed via DigitalOcean App Platform.

## 📌 Routes Overview

| Path                                      | Description                             |
| ----------------------------------------- | --------------------------------------- |
| `/dashboard`                              | Dashboard with quick insights and stats |
| `/services`                               | List of all services                    |
| `/services/new`                           | Create a new service                    |
| `/services/:id`                           | View service details                    |
| `/services/edit/:id`                      | Edit service                            |
| `/services/:serviceId/items/new`          | Add new item to a service               |
| `/services/:serviceId/items/:itemId/edit` | Edit item                               |
| `/products`                               | List of product variants and options    |
| `/packages`                               | Manage available packages               |
| `/packages/new`                           | Create a new package                    |
| `/packages/:id`                           | View package                            |
| `/packages/edit/:id`                      | Edit existing package                   |
| `/orders`                                 | View all orders                         |
| `/orders/:id`                             | View order details                      |
| `/bookings`                               | List all bookings                       |
| `/bookings/:id`                           | View individual booking details         |
| `/categories`                             | Manage service categories               |
| `/suppliers`                              | View/manage providers                   |
| `/clients`                                | List of registered users/clients        |
| `/clients/new`                            | Create a new user                       |
| `/clients/edit/:id`                       | Edit client details                     |
| `/clients/:id`                            | View client and related info            |
| `/users`                                  | Internal admin users management         |
| `/settings`                               | App-wide configuration                  |
| `/airtable`                               | Sync with Airtable (if connected)       |
| `/list/drinks`                            | Manage drink lists                      |
| `/list/drinks/new`                        | Add new drink                           |
| `/list/drinks/edit/:id`                   | Edit drink                              |
| `/list/boats`                             | Manage boat lists                       |
| `/list/boats/new`                         | Add new boat                            |
| `/list/boats/edit/:id`                    | Edit boat                               |

## 🔐 Access

These routes are protected and only accessible to authenticated users with the right role (`admin`, usually). Routing is handled via `react-router-dom`, with a `PrivateRoutes` wrapper ensuring access control.

## 📁 Structure

Main layout and access control are handled via:

```tsx
<Route element={<PrivateRoutes />}>
  <Route path="/" element={<Layout />}>
    {/* nested admin routes */}
  </Route>
</Route>
```

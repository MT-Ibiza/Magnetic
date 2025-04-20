# Bookings API

This API endpoint provides paginated access to booking data, including detailed information about orders, users, and items.

## Endpoint

`GET /api/v1/admin/bookings`

## Description

Fetches a paginated list of bookings from the database. Each booking includes information about the booking form, associated user or guest user, and the items in the order.

## Query Parameters

| Parameter  | Type   | Required | Description                   |
| ---------- | ------ | -------- | ----------------------------- |
| `page`     | Number | Yes      | The page number to retrieve.  |
| `pageSize` | Number | Yes      | The number of items per page. |

## Response

### Success Response

- **Status Code**: `200 OK`
- **Content-Type**: `application/json`

#### Example Response Body

```json
{
  "page": 1,
  "pageSize": 10,
  "totalItems": 100,
  "totalPages": 10,
  "bookings": [
    {
      "booking": {
        "id": 1,
        "cartItemId": "abc123",
        "createdAt": "2025-04-19T12:00:00Z",
        "updatedAt": "2025-04-19T12:00:00Z"
      },
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
      },
      "guestUser": null,
      "orderItems": [
        {
          "id": 1,
          "priceInCents": 1000,
          "quantity": 2,
          "cartItemId": "abc123",
          "variant": {
            "id": 1,
            "name": "Variant A",
            "priceInCents": 500
          },
          "item": {
            "name": "Product A",
            "serviceId": "service123",
            "drinkAttributes": {
              "id": 1
            },
            "images": [
              {
                "url": "https://example.com/image1.jpg"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

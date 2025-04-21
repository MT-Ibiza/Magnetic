# List Orders - Admin API

Retrieves a paginated list of all orders forms along with their related order data, including user details and order items.

---

## Endpoint

```
GET /api/v1/admin/orders
```

---

## Query Parameters

| Parameter  | Type   | Required | Description                               |
| ---------- | ------ | -------- | ----------------------------------------- |
| `page`     | number | Yes      | The current page number (starts at 1).    |
| `pageSize` | number | Yes      | The number of records to return per page. |

---

## JSON Response

```json
{
  "page": 1,
  "pageSize": 10,
  "totalItems": 35,
  "totalPages": 4,
  "orders": [
    {
      "id": 1470,
      "createdAt": "2025-04-15T08:22:20.136Z",
      "updatedAt": "2025-04-15T08:23:29.958Z",
      "userId": 6,
      "totalInCents": 640050,
      "subtotal": 0,
      "feeInCents": 12550,
      "vatInCents": 108905,
      "status": "success",
      "guestUserId": null,
      "guestUser": null,
      "user": {
        "id": 60,
        "name": "John Doe",
        "email": "john@gmail.com"
      },
      "items": [
        {
          "id": 257,
          "quantity": 1,
          "priceInCents": 302500,
          "itemId": 9,
          "orderId": 147,
          "type": "chef-weekly",
          "variantId": null,
          "cartItemId": 438,
          "createdAt": "2025-04-15T08:22:20.136Z",
          "updatedAt": "2025-04-15T08:22:20.136Z",
          "item": {
            "id": 9,
            "name": "Private Chef",
            "description": "",
            "priceInCents": 302500
          }
        },
        {
          "id": 258,
          "quantity": 1,
          "priceInCents": 325000,
          "itemId": 67,
          "orderId": 147,
          "type": "boat_rental",
          "variantId": null,
          "cartItemId": 437,
          "createdAt": "2025-04-15T08:22:20.136Z",
          "updatedAt": "2025-04-15T08:22:20.136Z",
          "item": {
            "id": 67,
            "name": "Pershing 5X",
            "description": "",
            "priceInCents": 325000
          }
        }
      ]
    }
  ]
}
```

---

## Example Request

```js
const fetchOrders = async (page = 1, pageSize = 10) => {
  const response = await fetch(`/api/v1/admin/orders?page=${page}&pageSize=${pageSize}`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  const data = await response.json();
  console.log(data);
};
```

---

## Notes

- The response includes both authenticated users and guest users if applicable.
- Items are filtered to only include those matching the `cartItemId` from the booking form.
- Data is returned in descending order of booking IDs (most recent first).

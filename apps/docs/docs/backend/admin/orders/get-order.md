# Get Order by ID - Admin API

Retrieves detailed information for a single order by its ID, including the associated user, guest user, and order items.

---

## Endpoint

```
GET /api/v1/admin/orders/{id}
```

---

## URL Parameters

| Parameter | Type   | Required | Description                   |
| --------- | ------ | -------- | ----------------------------- |
| `id`      | number | Yes      | The unique ID of the booking. |

---

## JSON Response

```json
{
  "id": 148,
  "createdAt": "2025-04-15T08:55:44.562Z",
  "updatedAt": "2025-04-15T08:56:15.802Z",
  "userId": 6,
  "totalInCents": 120000,
  "subtotal": 120000,
  "feeInCents": 0,
  "vatInCents": 0,
  "status": "success",
  "guestUserId": null,
  "guestUser": null,
  "user": {
    "id": 6,
    "name": "John Doe",
    "email": "john@gmail.com",
    "phone": "+999999999"
  },
  "items": [
    {
      "id": 259,
      "quantity": 1,
      "priceInCents": 120000,
      "itemId": 505,
      "orderId": 148,
      "type": "upgrade_plan",
      "variantId": null,
      "cartItemId": null,
      "createdAt": "2025-04-15T08:55:44.562Z",
      "updatedAt": "2025-04-15T08:55:44.562Z",
      "item": {
        "name": "Platinum",
        "images": [],
        "service": null
      }
    }
  ],
  "forms": []
}
```

---

## Example Request

```js
const fetchBookingById = async (id) => {
  const response = await fetch(`/api/v1/admin/orders/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch booking');
  }
  const data = await response.json();
  console.log(data);
};
```

---

## Notes

- The response includes order items details, forms, user or guest user.
- The user field will be null if the order is associated with a guest user only.
- Supports orders of type `drinks` and others, with tailored filtering based on the type.

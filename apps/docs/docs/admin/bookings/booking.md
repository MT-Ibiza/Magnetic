# Get Booking by ID - Admin API

Retrieves detailed information for a single booking by its ID, including the associated user, guest user, and order items.

---

## Endpoint

```
GET /api/v1/admin/bookings/{id}
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
  "booking": {
    "id": 123,
    "orderId": 456,
    "type": "drinks",
    "cartItemId": "xyz123",
    ...
  },
  "user": {
    "id": "user123",
    "name": "John Doe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "guestUser": null,
  "orderItems": [
    {
      "id": "item123",
      "priceInCents": 2500,
      "quantity": 2,
      "cartItemId": "xyz123",
      "item": {
        "id": "item1",
        "name": "Cappuccino",
        "priceInCents": 2500,
        "variants": [...],
        "images": [
          {
            "url": "https://example.com/image1.jpg"
          }
        ],
        "seasonPrices": [...]
      },
      "variant": {
        "id": "variant1",
        "name": "Large",
        "priceInCents": 2500
      }
    }
  ]
}
```

---

## Example Request

```js
const fetchBookingById = async (id) => {
  const response = await fetch(`/api/v1/admin/bookings/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch booking');
  }
  const data = await response.json();
  console.log(data);
};
```

---

## Notes

- The response includes order item details only if a `cartItemId` exists in the booking.
- The user field will be null if the booking is associated with a guest user only.
- Supports bookings of type `drinks` and others, with tailored filtering based on the type.

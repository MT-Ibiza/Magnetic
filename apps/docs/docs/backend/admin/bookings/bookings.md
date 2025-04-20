# List Bookings - Admin API

Retrieves a paginated list of all booking forms along with their related order data, including user details and order items.

---

## Endpoint

```
GET /api/v1/admin/bookings
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
  "bookings": [
    {
      "booking": {
        "id": 123,
        "cartItemId": "xyz123",
        "createdAt": "2024-04-10T12:00:00Z",
        ...
      },
      "user": {
        "id": "user123",
        "email": "user@example.com",
        ...
      },
      "guestUser": null,
      "orderItems": [
        {
          "id": "item123",
          "priceInCents": 2500,
          "quantity": 2,
          "variant": {
            "id": "variant1",
            "name": "Large",
            "priceInCents": 2500
          },
          "item": {
            "name": "Cappuccino",
            "serviceId": "service123",
            "drinkAttributes": [
              {
                "id": "attribute1"
              }
            ],
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

---

## Example Request

```js
const fetchBookings = async (page = 1, pageSize = 10) => {
  const response = await fetch(`/api/v1/admin/bookings?page=${page}&pageSize=${pageSize}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
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

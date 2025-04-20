# Get Service by ID - Admin API

Fetches detailed information for a specific service, including its categories, published items, and available packages.

---

## Endpoint

```
GET /api/v1/admin/services/:id
```

---

## URL Parameters

| Parameter | Type   | Required | Description              |
| --------- | ------ | -------- | ------------------------ |
| `id`      | number | Yes      | The unique ID of service |

---

## JSON Response

Returns a detailed service object.

```json
{
  "id": 1,
  "name": "Drink Service",
  "description": "Premium cocktail bar for events.",
  "serviceType": "drinks",
  "position": 1,
  "categories": [
    {
      "id": 10,
      "name": "Cocktails",
      "position": 1
    }
  ],
  "items": [
    {
      "id": 101,
      "name": "Mojito",
      "position": 1,
      "images": [
        {
          "url": "https://example.com/mojito.jpg"
        }
      ],
      "category": {
        "id": 10,
        "name": "Cocktails",
        "position": 1
      }
    }
  ],
  "packages": [
    {
      "id": 201,
      "name": "Gold"
    }
  ]
}
```

## Example Request

```js
const fetchService = async (id) => {
  const response = await fetch(`/api/v1/admin/services/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch service');
  }
  const data = await response.json();
  console.log(data);
};
```

## Notes

- Only published items are included in the response.
- Categories and packages are returned with minimal details (id, name, position).

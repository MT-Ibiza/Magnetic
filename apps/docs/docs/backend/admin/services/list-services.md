# List Services - Admin API

Retrieves a list of available services, including basic details and associated packages, ordered by their position.

---

## Endpoint

```
GET /api/v1/admin/services
```

---

## JSON Response

Returns an array of service objects.

```json
[
  {
    "id": 1,
    "name": "Bar Service",
    "description": "Premium cocktail bar for events.",
    "serviceType": "drinks",
    "position": 1,
    "packages": [
      {
        "id": 101,
        "name": "Gold"
      },
      {
        "id": 102,
        "name": "Platinum"
      }
    ]
  }
]
```

## Example Request

```js
const fetchServices = async () => {
  const response = await fetch('/api/v1/admin/services');
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  const data = await response.json();
  console.log(data);
};
```

## Notes

- Services are returned in ascending order by their position field.
- Each service includes its associated packages with minimal details (id and name only).

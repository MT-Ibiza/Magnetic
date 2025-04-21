# Get Product - Admin API

Retrieves a product from the database along with its associated categories, variants, and various attributes related to the product's service type. This endpoint provides detailed information about the product, including its images, service, and related attributes.

---

## Endpoint

```
GET /api/v1/admin/services/:id/items/:itemId
```

---

## URL Parameters

| Parameter | Type   | Required | Description                                            |
| --------- | ------ | -------- | ------------------------------------------------------ |
| `id`      | string | Yes      | The unique ID of the service that the item belongs to. |
| `itemId`  | string | Yes      | The unique ID of the item (product) to retrieve.       |

---

## JSON Response

Returns a detailed product object, including its categories, attributes, and variants.

```json
{
  "item": {
    "id": 1,
    "name": "Luxury Yacht",
    "description": "A luxurious yacht for private events and parties.",
    "priceInCents": 500000,
    "serviceId": 10,
    "images": [{ "url": "https://example.com/image1.jpg" }, { "url": "https://example.com/image2.jpg" }],
    "category": {
      "id": 5,
      "name": "Boats"
    },
    "boatAttributes": {
      "capacity": 50,
      "crew": 10,
      "fuelConsumption": "200L/hour"
    },
    "drinkAttributes": {
      "units": "bottles",
      "size": "750ml"
    },
    "variants": [
      {
        "id": 1,
        "name": "Standard",
        "priceInCents": 500000,
        "description": "Standard yacht package",
        "capacity": 50,
        "hours": 4
      }
    ]
  },
  "categories": [
    {
      "id": 5,
      "name": "Boats",
      "description": "Luxury boats for events and gatherings."
    }
  ]
}
```

## Example Request

```js
const getProduct = async (serviceId, itemId) => {
  const response = await fetch(`/api/v1/admin/services/${serviceId}/items/${itemId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const data = await response.json();
  console.log(data);
};
```

## Notes

- This endpoint retrieves a product (item) for a specific service, identified by id and itemId.

- The variants array includes different options for the product, such as different capacities or hours.

- The boatAttributes, drinkAttributes, transferAttributes, childcareAttributes, and securityAttributes provide specific details related to the product type.

- If no matching item is found, a 404 Not Found error should be returned.

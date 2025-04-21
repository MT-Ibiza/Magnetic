# Create Product - Admin API

Creates a new product under a specific service, including attributes such as price, description, images, and service-specific attributes.

---

## Endpoint

```
POST /api/v1/admin/services/:id/items
```

---

## URL Parameters

| Parameter | Type   | Required | Description                                                        |
| --------- | ------ | -------- | ------------------------------------------------------------------ |
| `id`      | number | Yes      | The unique ID of the service under which the item will be created. |

---

## Form Data

| Field                 | Type   | Required | Description                                        |
| --------------------- | ------ | -------- | -------------------------------------------------- |
| `name`                | string | Yes      | The name of the new service item.                  |
| `description`         | string | No       | A description of the service item.                 |
| `priceInCents`        | number | Yes      | The price of the item in cents.                    |
| `imageFiles`          | file[] | No       | The images associated with the service item.       |
| `categoryId`          | string | No       | The category ID to which the service item belongs. |
| `boatAttributes`      | object | No       | Boat-specific attributes (if applicable).          |
| `drinkAttributes`     | object | No       | Drink-specific attributes (if applicable).         |
| `transferAttributes`  | object | No       | Transfer-specific attributes (if applicable).      |
| `childcareAttributes` | object | No       | Childcare-specific attributes (if applicable).     |
| `securityAttributes`  | object | No       | Security-specific attributes (if applicable).      |

---

## JSON Response

Returns the created service item object.

```json
{
  "id": 1,
  "name": "Boat Rental",
  "description": "Luxury boat for private events.",
  "priceInCents": 500000,
  "categoryId": 10,
  "serviceId": 1,
  "images": [
    {
      "url": "https://example.com/image.jpg"
    }
  ],
  "boatAttributes": {
    "boatType": "Yacht",
    "port": "Marina Bay",
    "capacity": 10,
    "crew": 3
  }
}
```

## Example Request

```js
const createServiceItem = async (serviceId, formData) => {
  const response = await fetch(`/api/v1/admin/services/${serviceId}/items`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create service item');
  }

  const data = await response.json();
  console.log(data);
};
```

## Notes

- If imageFiles are provided, the images are uploaded and associated with the newly created service item.
- The attributes (boat, drink, transfer, childcare, security) are optional and only required for specific types of services.
- The categoryId links the service item to an existing category.

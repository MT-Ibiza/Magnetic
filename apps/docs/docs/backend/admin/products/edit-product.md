# Edit Product - Admin API

Updates an existing product (item) for a specific service. The product's details such as name, description, price, attributes, and images can be updated. Existing images can also be removed.

---

## Endpoint

```
PUT /api/v1/admin/services/:id/items/:itemId
```

---

## URL Parameters

| Parameter | Type   | Required | Description                                            |
| --------- | ------ | -------- | ------------------------------------------------------ |
| `id`      | number | Yes      | The unique ID of the service that the item belongs to. |
| `itemId`  | number | Yes      | The unique ID of the item (product) to update.         |

---

## Form Data

| Field                 | Type     | Description                                                     |
| --------------------- | -------- | --------------------------------------------------------------- |
| `name`                | string   | The name of the product.                                        |
| `description`         | string   | A detailed description of the product.                          |
| `priceInCents`        | number   | The price of the product in cents.                              |
| `boatAttributes`      | object   | Optional, JSON object containing boat-specific attributes.      |
| `drinkAttributes`     | object   | Optional, JSON object containing drink-specific attributes.     |
| `transferAttributes`  | object   | Optional, JSON object containing transfer-specific attributes.  |
| `childcareAttributes` | object   | Optional, JSON object containing childcare-specific attributes. |
| `securityAttributes`  | object   | Optional, JSON object containing security-specific attributes.  |
| `imageFiles`          | file[]   | An array of image files to upload for the product.              |
| `categoryId`          | string   | The ID of the category to associate the item with.              |
| `removeImagesIds`     | string[] | An array of image IDs to remove from the product.               |

---

## JSON Response

Returns the updated product (item) object, with updated information including new or removed images.

```json
{
  "id": 1,
  "name": "Luxury Yacht",
  "description": "Updated description of the luxury yacht.",
  "priceInCents": 500000,
  "serviceId": 10,
  "categoryId": 5,
  "boatAttributes": {
    "capacity": 50,
    "crew": 10,
    "fuelConsumption": "200L/hour"
  },
  "drinkAttributes": {
    "units": "bottles",
    "size": "750ml"
  },
  "images": [{ "url": "https://example.com/newimage1.jpg" }, { "url": "https://example.com/newimage2.jpg" }],
  "category": {
    "id": 5,
    "name": "Boats"
  }
}
```

## Example Request

```js
const updateProduct = async (serviceId, itemId, formData) => {
  const response = await fetch(`/api/v1/admin/services/${serviceId}/items/${itemId}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  const data = await response.json();
  console.log(data);
};
```

## Notes

- This endpoint allows you to update a product's information, including its name, description, price, and attributes such as boat or drink-specific properties.

- You can also upload new images and remove existing ones by passing their IDs.

- If no images are provided, the existing images remain unchanged.

- If the provided itemId or serviceId does not exist, a 404 Not Found error will be returned.

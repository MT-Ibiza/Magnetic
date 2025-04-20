# Create Service - Admin API

Creates a new service, including its details such as name, description, associated packages, and provider. Optionally, an image and terms and conditions can also be provided.

---

## Endpoint

```
POST /api/v1/admin/services
```

---

---

## Form Data

| Field                | Type     | Required | Description                                           |
| -------------------- | -------- | -------- | ----------------------------------------------------- |
| `name`               | string   | Yes      | The name of the new service.                          |
| `description`        | string   | Yes      | A detailed description of the service.                |
| `packageIds[]`       | string[] | Yes      | Array of package IDs to associate with the service.   |
| `providerId`         | string   | Yes      | The ID of the provider offering the service.          |
| `serviceType`        | string   | Yes      | The type of service (e.g., 'none', 'premium', etc.).  |
| `script`             | string   | Yes      | The script or description for the service.            |
| `imageFile`          | file     | No       | An image file associated with the service.            |
| `termsAndConditions` | string   | Yes      | The terms and conditions associated with the service. |

---

## JSON Response

Returns the created service object.

```json
{
  "id": 1,
  "name": "Luxury Yacht Rental",
  "description": "A luxurious yacht for private events and parties.",
  "providerId": 10,
  "serviceType": "premium",
  "imageUrl": "https://example.com/image.jpg",
  "script": "Experience luxury on the sea with our private yacht rental service.",
  "termsAndConditions": "Terms and conditions for yacht rental.",
  "packages": [
    {
      "id": 101,
      "name": "All-Inclusive Package"
    }
  ]
}
```

## Example Request

```js
const createService = async (formData) => {
  const response = await fetch('/api/v1/admin/services', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create service');
  }

  const data = await response.json();
  console.log(data);
};
```

## Notes

- If **imageFile** is provided, it will be uploaded and associated with the newly created service.
- The **packageIds[]** array allows you to associate multiple packages with the service.
- The **serviceType** should match a predefined set of service types (e.g., 'none', 'premium').

# Edit Service - Admin API

Updates an existing service with new details, including name, description, associated packages, provider, and image. Optionally, you can also update the service's script, terms and conditions, and other attributes.

---

## Endpoint

```
PUT /api/v1/admin/services/:id
```

---

## URL Parameters

| Parameter | Type   | Required | Description                                 |
| --------- | ------ | -------- | ------------------------------------------- |
| `id`      | string | Yes      | The unique ID of the service to be updated. |

---

## Form Data

| Field                | Type     | Required | Description                                            |
| -------------------- | -------- | -------- | ------------------------------------------------------ |
| `name`               | string   | Yes      | The name of the service.                               |
| `description`        | string   | Yes      | A detailed description of the service.                 |
| `packageIds[]`       | string[] | Yes      | Array of package IDs to associate with the service.    |
| `providerId`         | string   | Yes      | The ID of the provider offering the service.           |
| `serviceType`        | string   | Yes      | The type of service (e.g., 'none', 'premium').         |
| `script`             | string   | Yes      | The script or description for the service.             |
| `imageFile`          | file     | No       | An image file associated with the service.             |
| `termsAndConditions` | string   | Yes      | The terms and conditions associated with the service.  |
| `instructions`       | string   | Yes      | Additional instructions or guidelines for the service. |

---

## JSON Response

Returns the updated service object.

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
  ],
  "instructions": "Please follow the safety protocols while onboard."
}
```

## Example Request

```js
const updateService = async (serviceId, formData) => {
  const response = await fetch(`/api/v1/admin/services/${serviceId}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update service');
  }

  const data = await response.json();
  console.log(data);
};
```

## Notes

- If imageFile is provided, the existing image will be replaced by the new uploaded image.

- The packageIds[] array allows you to associate multiple packages with the service.

- The providerId should correspond to an existing provider in the database.

- The serviceType should match a predefined set of service types (e.g., 'none', 'premium').

- Make sure that the service exists by checking if the id corresponds to an existing service.

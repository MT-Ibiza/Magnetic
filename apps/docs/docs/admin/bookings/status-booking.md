# Update Booking Status - Admin API

Updates the status of a specific booking by ID. Optionally sends a notification email to the user associated with the booking.

---

## Endpoint

```
PUT /api/v1/admin/bookings/{id}/status
```

---

## URL Parameters

| Parameter | Type   | Required | Description                   |
| --------- | ------ | -------- | ----------------------------- |
| `id`      | number | Yes      | The unique ID of the booking. |

---

## Request Body

| Field    | Type   | Required | Description                                                                                             |
| -------- | ------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `status` | string | Yes      | The new status of the booking. Example: `"completed", "modification_requested", "cancelled", "pending"` |
| `text`   | string | No       | A response or message regarding the update.                                                             |

```json
{
  "status": "completed",
  "text": "Your booking has been marked as completed."
}
```

---

## JSON Response

Returns the updated booking object.

```json
{
  "id": 123,
  "status": "completed",
  "modificationResponse": "Your booking has been marked as completed.",
  ...
}
```

---

## Example Request

```js
const updateBookingStatus = async (id, status, text) => {
  const response = await fetch(`/api/v1/admin/bookings/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, text }),
  });

  if (!response.ok) {
    throw new Error('Failed to update booking status');
  }

  const data = await response.json();
  console.log(data);
};
```

---

## Notes

- Sends a confirmation email to the user if the booking is associated with a registered user.
- Email content includes booking ID and the item name.
- If the booking is of type `"drinks"`, the item name in the email will default to `"Drinks Service"`.

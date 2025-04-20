# GET /api/airtable/boats

This endpoint retrieves a list of boats from the Airtable API, enriched with data indicating whether each boat has already been imported into the internal Magnetic database.

---

## 🧩 Description

Fetches boats from Airtable (`Boats` view), checks if each record has already been imported (based on `airtableId`), and returns enriched records including name, size, capacity, pricing, and coordinates.

---

## 🔐 Authentication

Requires the following **environment variables** for authorization:

- `AIRTABLE_API_KEY`: Your Airtable Personal Access Token
- `AIRTABLE_BOATS_ID`: The base ID of the Airtable workspace

---

## 🧾 Query Parameters

| Parameter  | Type   | Required | Description                                     |
| ---------- | ------ | -------- | ----------------------------------------------- |
| `offset`   | string | No       | Airtable pagination token to fetch next records |
| `pageSize` | number | No       | Number of records per page (default: `10`)      |

---

## 📦 Response

```json
{
  "records": [
    {
      "id": "rec123...",
      "boat": "AZIMUT 68",
      "name": "Silver Bullet",
      "port": "Ibiza",
      "lengthInMeters": 20.7,
      "sizeInFeet": 68,
      "beamInMeters": 5.4,
      "capacity": 12,
      "price": 3000,
      "cabins": 3,
      "type": "Motor Yacht",
      "crew": "2 Crew Members",
      "fuelConsumption": 200,
      "included": "Crew, fuel, drinks",
      "iCal": "...",
      "locationMapUrl": "https://maps...",
      "coordinates": "38.9067,1.4206",
      "imported": true,
      "item": {
        "id": "clmnv123...",
        "serviceId": "clmnv456..."
      }
    }
  ],
  "offset": "itr567..."
}
```

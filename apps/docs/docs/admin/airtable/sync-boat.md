# Sync a boat from airtable

This endpoint is used to re import an existing boat record in the system based on the provided **airtableId**. If the boat exists in the system, its attributes will be updated.

---

## Endpoint

```
PUT /api/airtable/boat/import
```

---

## Description

- Updates the attributes of an existing boat based on the provided airtableId.
- If the boat does not exist in the database, returns a 404 error.
- If successful, returns the updated boat data.

---

## 🧾 Request Body

```json
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
  "crew": "2 Crew Members",
  "fuelConsumption": 200,
  "included": "Crew, fuel, drinks",
  "iCal": "...",
  "coordinates": "38.9067,1.4206"
}
```

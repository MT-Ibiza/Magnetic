# Import a boat from airtable

This endpoint is used to **import** a new boat from Airtable into the Magnetic system. It takes in a JSON payload containing boat details and saves the boat's attributes into the database.

---

## Endpoint

```
POST /api/airtable/boat/import
```

---

## Description

- Imports boat information from Airtable.
- Creates a new boat record in the database, including attributes such as boat name, capacity, fuel consumption, etc.
- If successful, returns the created boat data.

---

## Request Body

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

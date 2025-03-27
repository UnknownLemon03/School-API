
#  School-API

[Postman Collection url](https://www.postman.com/lemon8-2347/workspace/lemon-public/collection/33207851-7e99d0c4-a12d-4293-9a0b-b1aaa250d816?action=share&creator=33207851)


## API Reference

#### List Schools

```

  GET /listSchools?lat=123.23&lon=1

```

| Parameter | Type   | Description                              |
| :-------- | :----- | :--------------------------------------- |
| `lat`     | `float`| **Required**. Latitude of the location   |
| `lon`     | `float`| **Required**. Longitude of the location  |

#### Add School

```

  POST /addSchool

```

| Parameter  | Type   | Description                                   |
| :--------- | :----- | :-------------------------------------------- |
| `name`     | `string` | **Required**. Name of the school             |
| `address`  | `string` | **Required**. Address of the school          |
| `latitude` | `float` | **Required**. Latitude of the school location|
| `longitude`| `float` | **Required**. Longitude of the school location|


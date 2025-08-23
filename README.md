# TeltraTrackerBackend API Documentation

This document describes the API endpoints and available operations for the TeltraTrackerBackend.

## Base URL

Assuming the application is running locally, the base URL is:

```
http://localhost:3000
```

## Endpoints

### 1. Hello API

This endpoint returns all devices (with history and associated device types) along with all device types.

-   **Get all devices and device types**
    -   **URL:** `/api`
    -   **Method:** GET
    -   **Response Structure:**
        ```json
        {
          "devices": [
            {
              "id": ...,
              "name": ...,
              "simCard": ...,
              "deviceType": { "id": ..., "name": ... } || null,
              "dateAdded": ...,
              "status": ...,
              "history": [
                {
                  "oldSim": ...,
                  "newSim": ...,
                  "changedAt": ...
                }
              ]
            }
          ],
          "deviceTypes": [
            {
              "id": ...,
              "name": ...
            }
          ]
        }
        ```
    -   **Implemented in:** [`routes/hello.js`](./routes/hello.js)

### 2. Devices API

Endpoints for managing devices.

-   **Get all devices (without SIM history)**

    -   **URL:** `/api/devices/getAll`
    -   **Method:** GET
    -   **Response:** List of all devices.

-   **Get device by ID (with SIM history)**

    -   **URL:** `/api/devices/getById/:id`
    -   **Method:** GET
    -   **URL Parameters:**
        -   `id` - The unique ID of the device.
    -   **Response:** Details of the device along with its SIM history.

-   **Create a device**

    -   **URL:** `/api/devices/create`
    -   **Method:** POST
    -   **Request Body:**
        -   `name` (string) - The name of the device.
        -   `deviceTypeId` (number) - The ID representing the device type.
    -   **Response:** The newly created device object.

-   **Update device information (Name and Device Type)**

    -   **URL:** `/api/devices/update/:id`
    -   **Method:** PUT
    -   **URL Parameters:**
        -   `id` - The unique ID of the device.
    -   **Request Body:**
        -   `name` (string) - The new name for the device.
        -   `deviceTypeId` (number) - The new device type ID.
    -   **Response:** The updated device object.

-   **Update device status**

    -   **URL:** `/api/devices/updateStatus/:id`
    -   **Method:** PUT
    -   **URL Parameters:**
        -   `id` - The unique ID of the device.
    -   **Request Body:**
        -   `status` (boolean) - The new status (true for active, false for inactive).
    -   **Response:** The updated device object.

-   **Update device SIM and record history**

    -   **URL:** `/api/devices/updateSim/:id`
    -   **Method:** PUT
    -   **URL Parameters:**
        -   `id` - The unique ID of the device.
    -   **Request Body:**
        -   `newSim` (string) - The new SIM number.
    -   **Response:** A message indicating success, the SIM history record, and the updated device information.

-   **Delete a device**
    -   **URL:** `/api/devices/delete/:id`
    -   **Method:** DELETE
    -   **URL Parameters:**
        -   `id` - The unique ID of the device.
    -   **Response:** A success message upon deletion.

### 3. SIM API

Endpoint for retrieving SIM history.

-   **Get SIM history by SIM number**
    -   **URL:** `/api/sim/:sim`
    -   **Method:** GET
    -   **URL Parameters:**
        -   `sim` - The SIM number (old or new) to search for.
    -   **Response:** List of history records for the provided SIM number. Each record contains:
        -   Details of the device (id, name) associated with the change.
        -   `oldSim` and `newSim` values.
        -   `changedAt` timestamp (ordered in ascending order).

### 4. Device Types API

Endpoints for managing device types.

-   **Get all device types**

    -   **URL:** `/api/devicetype/`
    -   **Method:** GET
    -   **Response:** List of all device types.

-   **Get a single device type**

    -   **URL:** `/api/devicetype/:id`
    -   **Method:** GET
    -   **URL Parameters:**
        -   `id` - The unique ID of the device type.
    -   **Response:** The device type object if found.

-   **Create a new device type**

    -   **URL:** `/api/devicetype/`
    -   **Method:** POST
    -   **Request Body:**
        -   `name` (string) - The name of the device type.
    -   **Response:** The newly created device type object.

-   **Update an existing device type**

    -   **URL:** `/api/devicetype/:id`
    -   **Method:** PUT
    -   **URL Parameters:**
        -   `id` - The unique ID of the device type.
    -   **Request Body:**
        -   `name` (string) - The new name for the device type.
    -   **Response:** The updated device type object.

-   **Delete a device type**
    -   **URL:** `/api/devicetype/:id`
    -   **Method:** DELETE
    -   **URL Parameters:**
        -   `id` - The unique ID of the device type.
    -   **Response:** A success message upon deletion.

## Running the API

To run the API locally:

1. Install the dependencies:

    ```sh
    npm install
    ```

2. Run migrations and generate the Prisma client:

    ```sh
    npm run prisma:migrate
    npm run prisma:generate
    ```

3. Start the server:

    ```sh
    npm run dev
    ```

The server will be running on port 3000 (or the port specified in the `PORT` environment variable).

---

This documentation provides an overview of all the API endpoints offered by the backend. For further details, refer to the corresponding controller and route files:

-   [devicesController.js](./controllers/devicesController.js)
-   [simController.js](./controllers/simController.js)
-   [deviceTypesController.js](./controllers/deviceTypesController.js)
-   [hello.js](./routes/hello.js)

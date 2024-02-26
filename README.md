# js-assignment

## How to run?

1. Install docker and docker-compose
2. To start the service, run the following command from the home folder of the service: `docker-compose up -d --build`. All the logs will be printed to logs folder output.log file
3. If you want to run tests, comment out npm start cmd and uncomment npm test cmd in the Dockerfile:

```Dockerfile
# CMD ["sh", "-c", "npm test > /app/logs/output.log 2>&1"]
CMD ["sh", "-c", "npm start > /app/logs/output.log 2>&1"]

```

4. This endpoint allows you to create news for a specific match.

   **Endpoint**

   - **URL:** `/news/match`
   - **Method:** POST

   **Request Body**
   The request body must contain the following parameters:

   - **title (String):** Title of the news.
   - **description (String):** Description of the news.
   - **matchId (String):** ID of the match for which the news is created.

   **Response**

   - **Status Code:** 200 OK
   - **Content Type:** application/json

5. This endpoint allows you to create news for a specific tour.

   **Endpoint**

   - **URL:** `/news/tour`
   - **Method:** POST

   **Request Body**
   The request body must contain the following parameters:

   - **title (String):** Title of the news.
   - **description (String):** Description of the news.
   - **tourId (String):** ID of the tour for which the news is created.

   **Response**

   - **Status Code:** 200 OK
   - **Content Type:** application/json

6. This endpoint retrieves news related to a specific match.

   **Endpoint**

   - **URL:** `/news/match`
   - **Method:** GET

   **Request Parameters**

   - **matchId (String):** The ID of the match for which news is requested.

   **Response**

   - **Status Code:** 200 OK
   - **Content Type:** application/json

7. This endpoint retrieves news related to a specific tour. (Each news created for a match also belongs to the corresponding tour.)

   **Endpoint**

- **URL:** `/news/tour`
- **Method:** GET

**Request Parameters**

- tourId (String): The ID of the tour for which news is requested.

**Response**

- **Status Code:** 200 OK
- **Content Type:** application/json

8. This endpoint retrieves news related to a specific sport. (Each news created for a tour also belongs to the corresponding sport.)

   **Endpoint**

- **URL:** `/news/sport`
- **Method:** GET

**Request Parameters**

- sportId (String): The ID of the sport for which news is requested.

**Response**

- **Status Code:** 200 OK
- **Content Type:** application/json

9. This endpoint allows users to retrieve information about matches.

   **Endpoint**

   - **URL:** `/matches`
   - **Method:** GET

   **Request Parameters**
   No request parameters are required.

   **Response**

   - **Status Code:** 200 OK
   - **Content Type:** application/json

10. This endpoint allows users to retrieve information about tours.

    **Endpoint**

- **URL:** `/tours`
- **Method:** GET

**Request Parameters**
No request parameters are required.

**Response**

- **Status Code:** 200 OK
- **Content Type:** application/json

11. This endpoint retrieves matches associated with a specific tour by providing the tour name as a query parameter.

    **Endpoint**

- **URL:** `/tour/matches`
- **Method:** GET

**Request Parameters**

- **Name:** name
- **Type:** String
- **Description:** The name of the tour for which matches are to be retrieved.

**Response**

- **Status Code:** 200 OK
- **Content Type:** application/json

12. This endpoint retrieves all sports along with their associated tours and matches.

    **Endpoint**

- **URL:** `/sport/tour/match`
- **Method:** GET

**Request**
No request parameters are required.

**Response**

- **Status Code:** 200 OK
- **Content Type:** application/json

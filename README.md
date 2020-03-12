# mdlive-challenge
**Pagination:**

A simple HTTP API endpoint that performs pagination. The endpoint returns a JSON array with objects.
On this challenge I used Jest as a test runner, the server is running in port 3000.

Paginates on either the id or name fields of the apps object.
Provided seed data to populate and test the app.

To start this project use:
```
npm i
```
To run the app: 
```
npm run dev
```

To run the test:
```
npm run test
```

* In order to paginate and return the correct api data based on the requirements, I inplemented an algorithm 
to require the "by" query param and to specifically be named by "name" and "id".
I included also another function where it would give me the index number of the start and end variables to find all 
the right data that will be returned on the api.
Also I set up the max variable to be 50 by default even if its ask to be greater that 50. 
When all the right data was returned on the array named filteredApps it could be sorted by order.
In order to get all of it working without breaking anything else I used the Jest runner test.

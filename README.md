# mdlive-challenge

## Setup

Clone the repository:

`git clone https://github.com/apomarn/mdlive-challenge.git`

Install dependencies:

```
npm i
```

Run the app:

```
npm run dev
```

you can then go to your browser and send query params to the `/apps` endpoint

examples:

`localhost:3000/apps?by=id`

`localhost:3000/apps?by=id&start=10&end=30`

`localhost:3000/apps?by=id&max=40`

`localhost:3000/apps?by=name&start=two&end=five&order=desc`


Run the tests

```
npm run test
```

## Solution

I implemented an algorithm to require the "by" query param and to specifically be named by "name" and "id".

I also included another function (getIndex) that finds an id or name in the apps variable (seed data).

The max variable is 50 by default even if its ask to be greater that 50.

Filtered data can also be sorted sending the query param `order` which accepts `asc` and `desc` as value.

I used Jest as test runner to make sure I wasn't breaking anything while developing.

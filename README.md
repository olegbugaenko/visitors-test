# Instalation

Clone from repository

Run npm install

Create file .env in project root, and specify .env

```
  PORT=YOUR_PORT
  DATABASE_CONNECTION_STRING=DARABASE CONNECTION STRING
  AUTH_TOKEN=AUTH TOKEN
```

#Usage

Send new visitor request:

```$xslt
POST /visits

Body: {
    page-id: String,
    user-id: String,
    timestamp: JS-formatted timestamp
}

Response:
{
    "date": "2020-01-22T14:42:44.653Z",
    "_id": "5e285f6492aa295314cec4e0",
    "userId": "oleh",
    "pageId": "cart",
    "ip": "31.43.70.39",
    "os": "unknown",
    "browser": "PostmanRuntime",
    "country": "UA",
    "city": "Lviv",
    "__v": 0
}
```

Get visitors by pageId:

```$xslt
GET /visits/page/:pageId

Auhorization: Bearer <TOKEN>

Response: 
[
    {
        "date": null,
        "_id": "5e28562bd3419118ac5c4bbe",
        "userId": "oleg",
        "pageId": "home",
        "ip": "31.43.70.39",
        "os": "unknown",
        "browser": "PostmanRuntime",
        "country": "UA",
        "city": "Lviv",
        "__v": 0
    },
    {
        "date": null,
        "_id": "5e28566bd3419118ac5c4bc5",
        "userId": "oleh",
        "pageId": "home",
        "ip": "31.43.70.39",
        "os": "Windows",
        "browser": "chrome",
        "country": "UA",
        "city": "Lviv",
        "__v": 0
    }
]
```

Get visitors by browser

```$xslt
GET /visits/browser/:browserName

Auhorization: Bearer <TOKEN>

Response: 
[
    {
        "date": null,
        "_id": "5e28562bd3419118ac5c4bbe",
        "userId": "oleg",
        "pageId": "cart",
        "ip": "31.43.70.39",
        "os": "unknown",
        "browser": "chrome",
        "country": "UA",
        "city": "Lviv",
        "__v": 0
    },
    {
        "date": null,
        "_id": "5e28566bd3419118ac5c4bc5",
        "userId": "oleh",
        "pageId": "home",
        "ip": "31.43.70.39",
        "os": "Windows",
        "browser": "chrome",
        "country": "UA",
        "city": "Lviv",
        "__v": 0
    }
]
```


Get visitors by browser

```$xslt
GET /visits/browser/:browserName

Auhorization: Bearer <TOKEN>

Response: 
[
    {
        "date": null,
        "_id": "5e28562bd3419118ac5c4bbe",
        "userId": "oleg",
        "pageId": "cart",
        "ip": "31.43.70.39",
        "os": "unknown",
        "browser": "chrome",
        "country": "UA",
        "city": "Lviv",
        "__v": 0
    },
    {
        "date": null,
        "_id": "5e28566bd3419118ac5c4bc5",
        "userId": "oleh",
        "pageId": "home",
        "ip": "31.43.70.39",
        "os": "Windows",
        "browser": "chrome",
        "country": "UA",
        "city": "Lviv",
        "__v": 0
    }
]
```

Get visitors by country

```$xslt
GET /visits/browser/:countryCode

Auhorization: Bearer <TOKEN>

Response: 
[
    {
        "date": null,
        "_id": "5e28562bd3419118ac5c4bbe",
        "userId": "oleg",
        "pageId": "cart",
        "ip": "31.43.70.39",
        "os": "unknown",
        "browser": "chrome",
        "country": "UA",
        "city": "Lviv",
        "__v": 0
    },
    {
        "date": null,
        "_id": "5e28566bd3419118ac5c4bc5",
        "userId": "oleh",
        "pageId": "home",
        "ip": "31.43.70.39",
        "os": "Windows",
        "browser": "chrome",
        "country": "UA",
        "city": "Lviv",
        "__v": 0
    }
]
```

Get visitors rate

```$xslt
GET /visits/top

Auhorization: Bearer <TOKEN>

Response: 
[
    {
        userId: "oleh",
        count: 5,
        data: [
            {
                "date": null,
                "_id": "5e28562bd3419118ac5c4bbe",
                "userId": "oleh",
                "pageId": "cart",
                "ip": "31.43.70.39",
                "os": "unknown",
                "browser": "chrome",
                "country": "UA",
                "city": "Lviv",
                "__v": 0
            },
            {
                "date": null,
                "_id": "5e28566bd3419118ac5c4bc5",
                "userId": "oleh",
                "pageId": "home",
                "ip": "31.43.70.39",
                "os": "Windows",
                "browser": "chrome",
                "country": "UA",
                "city": "Lviv",
                "__v": 0
            },
            ...
        ]
    },
    ...
]
```


Get visitors rate by page

```$xslt
GET /visits/top/page/home

Auhorization: Bearer <TOKEN>

Response: 
[
    {
        userId: "oleh",
        count: 2,
        data: [
            {
                "date": null,
                "_id": "5e28562bd3419118ac5c4bbe",
                "userId": "oleh",
                "pageId": "home",
                "ip": "31.43.70.39",
                "os": "unknown",
                "browser": "chrome",
                "country": "UA",
                "city": "Lviv",
                "__v": 0
            },
            {
                "date": null,
                "_id": "5e28566bd3419118ac5c4bc5",
                "userId": "oleh",
                "pageId": "home",
                "ip": "31.43.70.39",
                "os": "Windows",
                "browser": "chrome",
                "country": "UA",
                "city": "Lviv",
                "__v": 0
            }
        ]
    }
]
```

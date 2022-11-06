# Blogging API

this is an api for blogs

---

## Requirements

1.  Users should be able to signUp and signIn.
2.  Jwt should be used as a stratagy when signing in.
3.  only signed un users should be allowed to create a blog.
4.  both users who are signed in and are not signed in should be able to get all
    blogs and a single blog.
5.  only users who created the blog should be allowed to edit or delete the blog
    they created.
6.  timetaken to read a particular blog should accounted for.

---

## Set-up

> > Port = 5005 || 4005,

> > npm run start -- to run the application with node,

> > npm run dev -- to run the application with nodemon,

> > npm run test -- to run the application with jest.

> > Install NodeJS, mongodb.

---

## Endpoints

---

<p> <b>SignIn , Login Endpoints</b></p>

-   Sign in : <b>/api/v1/auth/register </b>,

-   Login : <b>/api/v1/auth/signIn</b>,

<p> <b>Blog Routes</b></p>

-   createBlog : **/api/v1/articles**

-   getAllBlog : <b>/api/v1/articles </b>

-   getSingleBlog : <b>/api/v1/articles/:id</b>

-   updateBlog : <b>/api/v1/articles/:id </b>

-   deleteBlog : <b>/api/v1/articles/:id </b>

-   getAuserBlog : <b>/api/v1/articles/userarticle</b>

> > **the token is stored in a cookie called** ##accessToken

---

## Live Preview for the api

<a> https://barnyarticleapi.cyclic.app/ </a>

---

## Model

---

**User Model**

| User-Schema | Datatypes |
| ----------- | :-------: |
| Firstname   |  String   |
| Lastname    |  String   |
| Password    |  String   |
| email       |  String   |
| username    |  String   |

**Blog Model**

| Blog-Schema  | Datatypes |
| ------------ | :-------: |
| user         | ObjectId  |
| Title        |  String   |
| Description  |  String   |
| Author       |  String   |
| State        |  String   |
| Read_Count   |  Number   |
| Reading_Time |  String   |
| Tags         | String[]  |
| Body         |  String   |

---

## APIs

---

Signup User

-   Route: /api/v1/auth/register
-   Method: POST
-   Body:

```
{
  "email": "Gift@example.com",
  "password": "aaaaa",
  "firstname": "Gift",
  "lastname": "Henry",
  "username": 'gifty",
}
```

-   Responses

Success

```
{
    message: 'Signup successful',
    user: {
        "email": "Gift@example.com",
        "password": "aaaaa",
        "firstname": "Gift",
        "lastname": "Henry",
        "username": 'gifty",
    }
}
```

### Login User

-   Route: /api/v1/auth/signIn
-   Method: POST
-   Body:

```
{
  "Password": "aaaaa",
  "email": "Gift@example.com",
}
```

-   Responses

Success

```
{
    Token: 'hhhdbhdhjdywdkDUWGFYQDVQUJJVHjhsggwtvwbvvvvwahwjkjkagqjwgbqhhwhghahwhahjwh',
    Email: "Gift@example.com",
     Name:  "Gift Henry"
}
```

---

### Create Blog

-   Route: /api/v1/articles
-   Method: POST
-   Cookies
    -   accessToken
-   Body:

```
"title": "a new article",
"description": "new article",
 "body": "this is a new blog post i created "
"tags": ["Football", "UEFA" , "Manchester"  ]
}
```

-   Responses

```
id : 6363d816a2ee2e2486defc19
user : 6363d7b44dd381f486a0dc70
Title : "a new article"
Description :  "new article"
Author : "Gift Henry"
State : "draft"
Read_Count : 0
Reading_Time : "1 mins"
Tags : ["Football", "UEFA" , "Manchester"  ]
Body : "this is a new blog post i created "
}
```

### Get all blogs

-   Route: /api/v1/articles
-   Method: GET

-   Response

```
"message": [
        {
   id : 6363d816a2ee2e2486defc19
   user : 6363d7b44dd381f486a0dc70
   Title : "a new article"
   Description :  "new article"
   Author : "Gift Henry"
   State : "published"
   Read_Count : 0
   Reading_Time : "1 mins"
   Tags : ["Football", "UEFA" , "Manchester"  ]
   Body : "this is a new blog post i created "
 }]
```

### Get all blogs

-   Route: /api/v1/articles/:id
-   Method: GET

-   Response
    ```
    "message": [
          {
     id : 6363d816a2ee2e2486defc19
     user : 6363d7b44dd381f486a0dc70
     Title : "a new article"
     Description :  "new article"
     Author : "Gift Henry"
     State : "published"
     Read_Count : 1
     Reading_Time : "1 mins"
     Tags : ["Football", "UEFA" , "Manchester"  ]
     Body : "this is a new blog post i created "}]
    ```

### update blogs

-   Route: /api/v1/articles/:id
-   Method: PUT
-   Cookies
    -   accessToken
-   Body

    ```
    {
     "State": "published",
      "body": "im trying to delete this blog from my database",
     }
    ```

-   Response
    ```
    "message": [
          {
     id : 6363d816a2ee2e2486defc19
     user : 6363d7b44dd381f486a0dc70
     Title : "a new article"
     Description :  "new article"
     Author : "Gift Henry"
     State : "published"
     Read_Count : 1
     Reading_Time : "1 mins"
     Tags : ["Football", "UEFA" , "Manchester"  ]
     Body : "im trying to delete this blog from my database"}]
    ```

### deleted blogs

-   Route: /api/v1/articles/:id
-   Method: DELETE
-   Cookies
    -   accessToken
-   Body

```
    {
      id : 6363d816a2ee2e2486defc19
     }

```

-   Response

```
{
   "message": "Deleted Successfully"
}
```

### /api/v1/articles/userarticle

-   Route: /api/v1/articles/:id
-   Method: GET
-   Cookies
    -   accessToken
-   Response

```
"message": [
          {
     id : 6363d816a2ee2e2486defc19
     user : 6363d7b44dd381f486a0dc70
     Title : "a new article"
     Description :  "new article"
     Author : "Gift Henry"
     State : "published"
     Read_Count : 1
     Reading_Time : "1 mins"
     Tags : ["Football", "UEFA" , "Manchester"  ]
     Body : "im trying to delete this blog from my database"}]
```

## Contributors

---

Barny victor

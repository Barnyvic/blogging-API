**<u>Blogging API**

> > Port = 5005 || 4005,

<! Package Manager used is NPM --> <!- when you clone the project run npm i to
install the dependences needed -->

> > npm run start -- to run the application with node,

> > npm run dev -- to run the application with nodemon,

> > npm run test -- to run the application with jest.

<ins> **signIn , Login and Logout endpoints**</ins>

\*\* Sign in = /api/v1/auth/register,

\*\* Login = /api/v1/auth/signIn,

<ins> **>> Blog Routes <<** </ins>

\*\* createBlog ~~ Method POST >> route = /api/v1/articles

\*\* getAllBlog ~~ Method GET >> route = /api/v1/articles

\*\* getSingleBlog ~~ Method GET >> route = /api/v1/articles/:id

\*\* updateBlog ~~ Method PUT >> route = /api/v1/articles/:id

\*\* deleteBlog ~~ Method DELETE >> route = /api/v1/articles/:id

\*\* getAuserBlog ~~ Method GET >> route = /api/v1/articles/userarticle

> > **the token is stored in a cookie called** ##accessToken

> > **Live Preview for the api** : https://barnyarticleapi.cyclic.app/

**Requirements**

1.  Users should be able to signUp and signIn.
2.  Jwt should be used as a stratagy when signing in.
3.  only signed un users should be allowed to create a blog.
4.  both users who are signed in and are not signed in should be able to get all
    blogs and a single blog.
5.  only users who created the blog should be allowed to edit or delete the blog
    they created.
6.  timetaken to read a particular blog should accounted for.

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

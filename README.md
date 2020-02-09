<h1 align="center">
e-class
</h1>

<p align="center">Mongodb - Express - Angular 8 - Nodejs <p>

### A simple e-class managment app with user authorization and roles

![Heroku](https://heroku-badge.herokuapp.com/?app=eclass-mp)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

> You need to have MongoDB and Nodejs installed to run the project locally

### API collection
You can find the relative collection on postman

[Postman Collection Web](https://documenter.getpostman.com/view/7448955/SWTHbFc4)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/0bf0af29d80e0300c45a)

### Installation and running

Install dependencies
```sh
$ npm run installserver
$ npm run installclient
```
Run the server and client app
```sh
$ npm run server
$ npm run client
```
### Initialise application
Create an admin account

Run from postman 
Generate Admin (GET)

(optional)
Login User (GET) using the Admin's credentials

(optional) Generate Data (GET) using Admin's JWT token (Bearer auth)




## Test the app

You can preview the app on

[e-class-mp](https://eclass-mp.herokuapp.com/login)

Testing accounts :
> Admin ->  email: admin@admin.com
 password: administrator

 > Teacher ->  email: teacher0@gmail.com
 password: password0

 > Student ->  email: student0@gmail.com
 password: password0

 ## Application Screenshots

Login screen
 <img src="https://drive.google.com/uc?id=19zZYLJpQZkaQS9blhdcT-PW0KjWbXs1S" />

Admin Accounts
 <img src="https://drive.google.com/uc?id=1aLz9eP60d2DMXH1fBrEJdpbsjue7KtUU" />

 New / Preview / Edit Account
 <img src="https://drive.google.com/uc?id=1cSsewDAga9uLxrNc35icZa1GOjJ8-p8-" />

 Admin courses
 <img src="https://drive.google.com/uc?id=1PIZ3Ok4d3F9mjwoSn1pQ9CYM2SxmSDjt" />

Teacher Dashboard
 <img src="https://drive.google.com/uc?id=1xiVH7mfafQoyvPl4vZa0IM1F9Cc_CYSg" />

 Student Dashboard
 <img src="https://drive.google.com/uc?id=140m1U0lzUWNCXR1YOd7alzBZrAVZ6W6f" />

License
----
MIT





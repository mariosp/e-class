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
You can find the related collection on postman

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

![login-screen](https://user-images.githubusercontent.com/3619970/74102969-dcaccb00-4b50-11ea-9a2f-1c8a2acf871f.PNG)

Admin Accounts

![admin-accounts](https://user-images.githubusercontent.com/3619970/74102971-dfa7bb80-4b50-11ea-9272-0e96524af22f.PNG)

 New / Preview / Edit Account
 
![edit-account](https://user-images.githubusercontent.com/3619970/74102974-e20a1580-4b50-11ea-95c8-541296ea487c.PNG)

 Admin courses
 
![courses](https://user-images.githubusercontent.com/3619970/74102976-e46c6f80-4b50-11ea-8187-2ac5af005ab5.PNG)

Teacher Dashboard

![teacher](https://user-images.githubusercontent.com/3619970/74102977-e6363300-4b50-11ea-89be-b0c606aca95a.PNG)

 Student Dashboard
 
![student](https://user-images.githubusercontent.com/3619970/74102978-ea625080-4b50-11ea-828a-a6a8ae364a49.PNG)

License
----
MIT

![login-screen](https://user-images.githubusercontent.com/3619970/74102969-dcaccb00-4b50-11ea-9a2f-1c8a2acf871f.PNG)
![admin-accounts](https://user-images.githubusercontent.com/3619970/74102971-dfa7bb80-4b50-11ea-9272-0e96524af22f.PNG)
![edit-account](https://user-images.githubusercontent.com/3619970/74102974-e20a1580-4b50-11ea-95c8-541296ea487c.PNG)
![courses](https://user-images.githubusercontent.com/3619970/74102976-e46c6f80-4b50-11ea-8187-2ac5af005ab5.PNG)
![teacher](https://user-images.githubusercontent.com/3619970/74102977-e6363300-4b50-11ea-89be-b0c606aca95a.PNG)
![student](https://user-images.githubusercontent.com/3619970/74102978-ea625080-4b50-11ea-828a-a6a8ae364a49.PNG)





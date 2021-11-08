# Daniel Beale's Board Game API

## [Live Hosted API](https://db-nc-games.herokuapp.com/)
Link to the API where you will find instructions with endpoints

## Summary

I have created this API as an example of my work and my skills. In this repository you will find a working API that will create and seed a PostgreSQL database, and provide endpoints to allow a user to get information from that database, as well as make changes to that database when provided with a front end interface or an API design platform such as Insomnia. 

Below you will find instructions on how to clone this file, install the required dependencies, how to seed your local database, and run tests to show that everything works correctly.

You will also find information on how to create the .env files needed, what versions of Node.js and Postgres, as well as relevant links such as where the API is hosted so you can play with the live version.

## Requirements
[Node.js](https://nodejs.org/en/) - version 16.5.0 or above

[Postgres](https://www.postgresql.org/) - version 13.4 or above

## Setting up the project

1) To start with you will need to clone the repo to your local machine. Click on the green code button above the files index on this page, and copy the link provided. Next use your terminal to enter the directory you would like to clone the repo in and enter this command:

```
$ git clone (paste repo URL here)
```
After running this command, the terminal will ask you for your github username and password.

2) Next you will need to install dependencies using the following command inside the newly created directory:

```
$ npm i
```
3) Create two new files in the main directory: .env.test & .env.development. In the .env.development file add this and save:

```
PGDATABASE=nc_games
```
4) Add this to the .env.test file and save:

```
PGDATABASE=nc_games_test
```
5) You can now setup the database and seed it by using these two commands:

```
$ npm run setup-dbs
$ npm run seed
```
6) Finally you can run the tests by entering this command while your terminal path is in the main repo directory: 

```
$ npm test __tests__/app.test.js
```



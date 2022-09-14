<div align="center" id="top"> 
  <img src="./src/assets/equity-wallet_back-end.gif" alt="Equity Wallet" />

  &#xa0;

  <!-- <a href="https://equitywallet.netlify.app">Demo</a> -->
</div>

<h1 align="center">Equity Wallet API</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/moisesPompilio
/
equity-wallet_back-end?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/moisesPompilio
/
equity-wallet_back-end?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/moisesPompilio
/
equity-wallet_back-end?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/moisesPompilio
/
equity-wallet_back-end?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/moisesPompilio
/
equity-wallet_back-end?color=56BEB8" />

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/moisesPompilio
/
equity-wallet_back-end?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/moisesPompilio
/
equity-wallet_back-end?color=56BEB8" /> -->
</p>

<!-- Status -->

<h4 align="center"> 
	🚧  Equity Wallet API 🚀 finished version 1.0.0  🚧
</h4> 

<hr>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag_starting">Starting</a> &#xa0; | &#xa0;
  <a href="#checkered_flag_docker">Docker</a> &#xa0; | &#xa0;
  <a href="#checkered_flag_test">Test</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/moisesPompilio" target="_blank">Author</a>
</p>

<br>

## :dart: About ##


Equity Wallet Back-end is an API in TypeScript, it is in Rest and CRUD pattern, use SOLID pattern in its construction. In this way the API uses modern and agile technology.
API has Docker and Swagger, so to be able to test the API it is necessary to have only Docker installed and execute the commands indicated in the Starting <a href="#checkered_flag_docker">Docker</a> &#xa0;, access the port in which you put the API to run in your browser and put "/docs"( example : htpp://localhost:3001/docs).

## :sparkles: Features ##

:heavy_check_mark: Creation of entities;\
:heavy_check_mark: Create the CRUD functions;\
:heavy_check_mark: Creation of the routes;\:heavy_check_mark: 
Implement Swagger;\
Implement Jest and Supertest;\
Implement Docker;\
:heavy_check_mark: encrypt the password;\
:heavy_check_mark: Login authentication and refresh token contraction;

## :rocket: Technologies ##

The following tools were used in this project:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [PostgresSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [UUID](https://www.npmjs.com/package/uuid)
- [JWT](https://jwt.io/)
- [Docker](https://www.docker.com/)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [Node](https://nodejs.org/en/) and [Docker](https://www.docker.com/) installed.

## :checkered_flag_starting: Starting ##

```bash
# Clone this project
$ git clone https://github.com/moisesPompilio/equity-wallet_back-end

# Access
$ cd equity-wallet

# Install dependencies
$ yarn

#it is necessary to create the .env file to configure the environment variables, the .env.example file contains all the necessary variables

# Run the project
$ yarn start

# The server will initialize in the <http://localhost:3000>
```

## :checkered_flag_docker: Docker ##

```bash
# Clone this project
$ git clone https://github.com/moisesPompilio/equity-wallet_back-end

# Access
$ cd equity-wallet

#it is necessary to create the .env file to configure the environment variables, the .env.example file contains all the necessary variables

# Run the project in the Docker
$ docker-compose up --build

# The server will initialize in the <http://localhost:3001>
```

## :checkered_flag_test: Test

```bash
# Clone this project
$ git clone https://github.com/moisesPompilio/equity-wallet_back-end

# Access
$ cd equity-wallet_back-end

# Install dependencies
$ yarn

#it is necessary to create the .env file to configure the environment variables, the .env.example file contains all the necessary variables

# Run the test in the project
$ yarn test
```

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with :heart: by <a href="https://github.com/moisesPompilio" target="_blank">Moises Pompilio</a>

&#xa0;

<a href="#top">Back to top</a>

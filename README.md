# Node.js Polycade Challenge

## Challenge

See about the challenge on folder [docs](https://github.com/matheusalbino/polycade-challenge-nodejs/blob/master/docs).

## Requirements

-   Node.js v12.x
-   npm v6.x
-   Docker & Docker Compose

## Usage

### Install dependencies

```
npm install // or npm i
```

### Initialize the database

Create a database instance

```
npm run create-database
```

Execute all migrations

```
npm run local-run-migrate
```

Execute all seeds

```
npm run local-run-seed
```

### Running the application

Normal mode:

```
npm run start
```

Development mode:

```
npm run watch
```

### Running the tests

Normal mode:

```
npm run test
```

Development mode:

```
npm run watch-test
```

## Development process

The first premise used in this process is don't change the technologies on the initial project files, in the dependencies installation the npm show some alerts about the vulnerabilities and outdated dependencies, so I updated the dependencies to solve some problems.

I use TDD (Test Driven Development) to make this challenge, also I use the endpoints description to make the acceptance requirements. I enable the clearMocks option on jest configuration to automatically clear mock calls and instances between every test.

I applied a folder structure where the responsibilities can be separated making the code more organized, divided by:

```
- docs
- src
 |- config
 |- controller
 |- database
 |- model
 |- route
 |- server
- test
```

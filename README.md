# Payment API Sample

A demonstrative pattern for a light-weight payment API using Typescript:
 
* `class-validator` and `class-transformer` used to handle validation logic as inspired by NestJS
* Singleton pattern used for `AuthService` for persistence
* TODO: Write unit tests (*.spec.ts) for greater reliability
* TODO: For some reason, errors are not being returned by controller if thrown in a Promise with async await

Inspired by: 

* [Implementing DTOs, Mappers & the Repository Pattern using the Sequelize ORM [with Examples] - DDD w/ TypeScript](https://khalilstemmler.com/articles/typescript-domain-driven-design/repository-dto-mapper/)

* [Node.js and TypeScript Tutorial: Build a CRUD API](https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/#Create-Express-Controllers)

## Setup

1. `yarn` to install packages
2. `yarn start` to run the app 
# Kata TDD TypeScript

This repository is intended to store solutions to various katas using **TDD** and **TypeScript**.

## How to use it ?

- If the project has been cloned, run `npm install`.
- In the `/src` folder, create a new folder named `<kata-name>` if it does not already exist.
- Inside that folder, create a subfolder with the current date, e.g `10-12-2024`. A kata can be solved multiple times, and we want to keep track of previous solutions.
- Inside that folder, create two files : `<kata-name>.ts` and `<kata-name>.test.ts`.
- Run the test file using `npm run test:watch ./src/<kata-name>/<date>/<kata-name>.test.ts`.

## About the specifications

The specifications are defined in a file called `SPEC.md`, located in the root of kata folders. Feel free to adapt the specifications or increase the challenge by adding constraints or new rules.
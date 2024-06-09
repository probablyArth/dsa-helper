# server

Template for express, typescript, zod projects by @probablyarth

# Environment variables

```sh
PORT=8000
CLIENT_ORIGIN_URL=http://localhost:3000 # (url of the client)
OPENAI_API_KEY=your-open-api-key
```

# Glossary

- ## Absolute imports

  non-library imports that use absolute path instead of relative.

  for ex:

  ```
  .
  ├── apps
  │   └── server.ts
  ├── env
  │   └── index.ts
  ├── folder1
  │   └── folder2
  │       └── a.ts
  ├── index.ts
  └── middlewares
      └── logger.middleware.ts
  ```

  ```typescript
  // folder1/folder2/a.ts

  // this is a relative import
  import { getEnv } from '../../env/index.ts';

  // this is an absolute import
  import { getEnv } from 'env/index.ts';
  ```

# Features

- support for [absolute imports](#absolute-imports) in both development and build using `tscpaths` and `tsconfig-paths`
- `zod` for validating `.env` vars.
- `dotenv` for parsing `.env` files.
- `morgan` for logging.
- `jest` and `supertest` for tests.
- `express` for http server.
- `prettier` for formatting.
- `eslint` for linting and forcing code styles.

# How-to(s)

- ## How to use absolute imports

  Absolute imports are not resolved by the default typescript build tool, `tscpaths` takes care of it.

  if you want to create imports from a folder let's say `src/folder1` and name it `folder1`

  add this entry in the `tsconfig.json`

  ```jsonc
  {
    //tsconfig.json
    "compilerOptions": {
      //...rest of the config

      "paths": {
        //..other paths

        "folder1/*": ["folder1/*"],
      },
    },
  }
  ```

  you don't need to mention `src/folder1/*` because the `baseUrl` is set to `./src` which is changeable in the `tsconfig.json`

  ```jsonc
  //tsconfig.json
  {
    "compilerOptions": {
      "baseUrl": "./src", // <--change here
    },
  }
  ```

- ## How to add env vars to the pre-existing zod schema

  just add the key in the `envSchema` object in `./src/env/index.ts` and give it the value of `z.string()`

  ```typescript
  // ./src/env/index.ts
  .
  .
  .
  .

  const envSchema = z.object({
    // other variables
    yourKey: z.string(),
  });
  ```

## setup

- Install the dependencies

  ```sh
  npm i
  ```

- create a `.env` file from `.env.example`

  ```sh
  cp .env.example .env
  ```

## Running the server

- Follow the instructions mentioned in [setup](#setting-up)

- for development server

  ```sh
  npm run dev
  ```

- for running production build

  ```sh
  npm run build && npm start
  ```

- using Docker

  builidng docker image

  ```sh
  docker build -t <image_name> .
  ```

  running docker image

  ```sh
  docker run -e PORT=8000 -p 8000:8000 <image_name>

  Note: PORT is an env variable
  ```

## Running tests

```
npm run test
```

## Linting

```sh
npm run lint
```

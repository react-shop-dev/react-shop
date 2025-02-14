# A CLI utility to bootstrap react shop ecommerce project

## Usage

```sh
npx react-shop-create@latest <app-name>
#or
npx react-shop-create@latest <app-name> [options]
```

If no options was entered - you'll be asked to enter a description (optional), setup authentication, fake data and choose linter + UI library.

## Arguments
```sh
app-name           Required. Name of your store
```

## Options

```sh
-v, --version      Display the current version
--auth             Include authentication in the project
--seed             Seed fake data into the project
--ui <library>     Select UI library (choices: "material", "tailwind", "none")
                    
--linter <linter>  Select Linter (choices: "eslint", "biome", "none")
-h, --help         display help for command
```

## Example

Full setup with auth, seed, linter and Material UI:

```sh
 npx react-shop-create my-shop --auth --seed --linter biome --ui material
```

## Licence
This package is MIT licensed

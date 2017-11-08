# entity
CLARK business rules encapsulated in TypeScript modules

## Installation instructions
This package goes _inside_ your other CLARK repositories. First install the `taxonomy` package; instructions are here:  https://github.com/Cyber4All/entity.git

Then, from the working directory of your CLARK repo workspace, follow these steps:
1) run `git clone https://github.com/Cyber4All/entity.git`
2) Add `/entity` to your `.gitignore` file.

To add this package to your `npm run build` workflow, add `tsc -p entity/` to your `package.json`'s `prebuild` script. Example:
```
"prebuild": "tsc -p taxonomy/ && tsc -p entity/"
```

## Usage instructions
See jsdocs for each .ts file.

TODO: Generate and link to documentation for each .ts file...
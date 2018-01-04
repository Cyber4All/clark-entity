## Installation
`npm install --save clark-entity`

# Entities
CLARK business rules encapsulated in TypeScript modules

## Interfaces

#### `OutcomeSuggestion` (`outcome.ts`)
Property | Type | Description
---|---|---
`id`||the unique database id for this outcome. Use it in `db-interactor` events.
`author`|`string`|the person or organization responsible for this outcome
`name`|`string`|the object, knowledge unit, or label this outcome is associated with
`date`|`string`|the date this outcome was developed
`outcome`|`string`|the actual text of this outcome

TODO: generate documentation for everything else... (we should be able to use jsdocs)


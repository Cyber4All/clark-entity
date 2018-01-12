# Entities
CLARK business rules encapsulated in TypeScript modules

## Installation
`npm install --save clark-entity`

## Serialization

The standard JSON.stringify function _does not work_ on entities. If you are sending an entity over a network, you must first convert its information to a string by:
```javascript
let serialized = <Entity>.serialize(entity);
```
On the receiving end, you must unserialize by:
```javascript
let entity = <Entity>.unserialize(serialized, parent);
```
If you are not working with a parent entity, pass `null` as the second argument.

## Interfaces

#### `OutcomeSuggestion` (`outcome.ts`)
Property | Type | Description
---|---|---
`id`||the unique database id for this outcome. Use it in `db-interactor` events.
`author`|`string`|the person or organization responsible for this outcome
`name`|`string`|the object, knowledge unit, or label this outcome is associated with
`date`|`string`|the date this outcome was developed
`outcome`|`string`|the actual text of this outcome

#### `ObjectSuggestion` (`learning-object.ts`)
Property | Type | Description
---|---|---
`id`||the unique database id for this object. Use it in `db-interactor` events.
`author`|`string`|the name of the person responsible for this object
`name`|`string`|the name of this object
`date`|`string`|the date this object was developed
`length`|`string`|the module-class (nanomodule, course, etc.) of this object

TODO: generate documentation for everything else... (we should be able to use jsdocs)


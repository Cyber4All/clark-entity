# Entities
CLARK business rules encapsulated in TypeScript modules

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

TODO: generate documentation for everything else... (we should be able to use jsdocs)

## Installation & Updates
This package is included as a submodule in relevant CLARK repositories. If you have
pulled the latest version of a relevant repository and it is missing any submodules,
use the following commands:
```
git submodule init
git submodule update --remote --merge
```
When changes are pushed to this repo, you will need to repeat the 
`git submodule update --remote --merge` command to include them in your instances of 
any repositories using it.

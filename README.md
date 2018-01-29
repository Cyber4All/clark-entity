# Entities
CLARK business rules encapsulated in TypeScript modules

## Installation
`npm install --save clark-entity`

## Test
`npm run test`

## Serialization

The standard JSON.stringify function will work on entities, but data will be extraneous. If you are sending an entity over a network, you must first convert its information to a string by:
```javascript
let serialized = <Entity>.serialize(entity);
```
On the receiving end, you must unserialize by:
```javascript
let entity = <Entity>.unserialize(serialized, parent);
```
If you are not working with a parent entity, pass `null` as the second argument.

## Interfaces
* [User](#User)
* [LearningGoal](#LearningGoal)
* [LearningOutcome](#LearningOutcome)
* [StandardOutcome](#StandardOutcome)
* [InstructionalStrategy](#InstructionalStrategy)
* [AssessmentPlan](#AssessmentPlan)


<a name="User"></a>
#### `User` (`user.ts`)
A class to represent Bloomin' Onion users.

**Kind**: global class

* [User](#User)
    * [new User(username, name)](#new_User_new)
    * [.username](#User+username)
    * [.name](#User+name)
    * [.email](#User+email)
    * [.pwd](#User+pwd)
    * [.objects](#User+objects)
    * [.addObject()](#User+addObject) ⇒ <code>LearningObject</code>
    * [.removeObject(i)](#User+removeObject) ⇒ <code>LearningObject</code>

<a name="new_User_new"></a>

### new User(username, name)
Construct a new User, given starting user id and name.


| Param    | Type                | Description                       |
| -------- | ------------------- | --------------------------------- |
| username | <code>string</code> | the user's unique log-in username |
| name     | <code>string</code> | the user's real-life name         |

<a name="User+username"></a>

### user.username
**Kind**: instance property of [<code>User</code>](#User)
**Properties**

| Name | Type                | Description                     |
| ---- | ------------------- | ------------------------------- |
| id   | <code>string</code> | a user's unique log-in username |

<a name="User+name"></a>

### user.name
**Kind**: instance property of [<code>User</code>](#User)
**Properties**

| Name | Type                | Description             |
| ---- | ------------------- | ----------------------- |
| name | <code>string</code> | a user's real-life name |

<a name="User+email"></a>

### user.email
**Kind**: instance property of [<code>User</code>](#User)
**Properties**

| Name  | Type                | Description            |
| ----- | ------------------- | ---------------------- |
| email | <code>string</code> | a user's email on file |

<a name="User+pwd"></a>

### user.pwd
**Kind**: instance property of [<code>User</code>](#User)
**Properties**

| Name    | Type                | Description                      |
| ------- | ------------------- | -------------------------------- |
| pwdhash | <code>string</code> | a user's password authentication |

<a name="User+objects"></a>

### user.objects
**Kind**: instance property of [<code>User</code>](#User)
**Properties**

| Name    | Type                                      | Description                                                                                                                                                                                                                        |
| ------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| objects | <code>Array.&lt;LearningObject&gt;</code> | (immutable)       an array of a user's learning objects NOTE: individual elements are freely accessible, but the array       reference itself is immutable, and elements canonly be       added and removed by the below functions |

<a name="User+addObject"></a>

### user.addObject() ⇒ <code>LearningObject</code>
Adds a new, blank learning object to this user.

**Kind**: instance method of [<code>User</code>](#User)
**Returns**: <code>LearningObject</code> - a reference to the new learning object
<a name="User+removeObject"></a>

### user.removeObject(i) ⇒ <code>LearningObject</code>
Removes the user's i-th learning object.

**Kind**: instance method of [<code>User</code>](#User)
**Returns**: <code>LearningObject</code> - the learning object which was removed

| Param | Type                | Description                                |
| ----- | ------------------- | ------------------------------------------ |
| i     | <code>number</code> | the index to remove from the objects array |


<a name="LearningObject"></a>

## LearningObject (`learning-object.ts`)
A class to represent a learning object.

**Kind**: global class

* [LearningObject](#LearningObject)
    * [new LearningObject(source)](#new_LearningObject_new)
    * [.author](#LearningObject+author)
    * [.name](#LearningObject+name)
    * [.date](#LearningObject+date)
    * [.length](#LearningObject+length)
    * [.goals](#LearningObject+goals)
    * [.outcomes](#LearningObject+outcomes)
    * [.repository](#LearningObject+repository)
    * [.addGoal()](#LearningObject+addGoal)
    * [.removeGoal(i)](#LearningObject+removeGoal) ⇒ [<code>LearningObject</code>](#LearningObject)
    * [.addOutcome()](#LearningObject+addOutcome) ⇒ <code>AssessmentPlan</code>
    * [.removeOutcome(i)](#LearningObject+removeOutcome) ⇒ [<code>LearningObject</code>](#LearningObject)

<a name="new_LearningObject_new"></a>

<a name="LearningOutcome"></a>

### new LearningObject(source)
Construct a new, blank LearningOutcome.


| Param  | Type              | Description                                                                                                                                                                                                                                                                                                                       |
| ------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| source | <code>User</code> | the author the new object belongs to TODO: current constructor parameters (author required, name optional)       are in place for reverse compatibility, but actually they should       be backwards (name required, author optional [default to null]) TODO: constructor should confirm uniqueness of name if author is not null |

<a name="LearningObject+author"></a>

### learningObject.author
**Kind**: instance property of [<code>LearningObject</code>](#LearningObject)
**Properties**

| Name   | Type              | Description                                                |
| ------ | ----------------- | ---------------------------------------------------------- |
| author | <code>User</code> | (immutable)       the user this learning object belongs to |

<a name="LearningObject+name"></a>

### learningObject.name
**Kind**: instance property of [<code>LearningObject</code>](#LearningObject)
**Properties**

| Name   | Type                | Description                                                                                             |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------- |
| length | <code>string</code> | the object's identifying name, unique over a user TODO: ensure uniqueness of name if author is not null |

<a name="LearningObject+date"></a>

### learningObject.date
**Kind**: instance property of [<code>LearningObject</code>](#LearningObject)
**Properties**

| Name   | Type                | Description                                                                            |
| ------ | ------------------- | -------------------------------------------------------------------------------------- |
| length | <code>string</code> | the object's last-modified date FIXME: if there's a reason to use an actual Date class |

<a name="LearningObject+length"></a>

### learningObject.length
**Kind**: instance property of [<code>LearningObject</code>](#LearningObject)
**Properties**

| Name   | Type                | Description                                                                                                         |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| length | <code>string</code> | the object's class, determining its length (eg. module)       values are resetricted according to available lengths |

<a name="LearningObject+goals"></a>

### learningObject.goals
**Kind**: instance property of [<code>LearningObject</code>](#LearningObject)
**Properties**

| Name  | Type                                    | Description                                                                                                                                                                                                                            |
| ----- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| goals | <code>Array.&lt;LearningGoal&gt;</code> | (immutable)       goals this learning object should achieve NOTE: individual elements are freely accessible, but the array       reference itself is immutable, and elements canonly be       added and removed by the below functions |

<a name="LearningObject+outcomes"></a>

### learningObject.outcomes
**Kind**: instance property of [<code>LearningObject</code>](#LearningObject)
**Properties**

| Name     | Type                                       | Description                                                                                                                                                                                                                                          |
| -------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| outcomes | <code>Array.&lt;LearningOutcome&gt;</code> | (immutable)       outcomes this object should enable students to achieve NOTE: individual elements are freely accessible, but the array       reference itself is immutable, and elements can only be       added and removed by the below functions |

<a name="LearningObject+repository"></a>

### learningObject.repository
**Kind**: instance property of [<code>LearningObject</code>](#LearningObject)
**Properties**

| Name       | Type                    | Description                                                                    |
| ---------- | ----------------------- | ------------------------------------------------------------------------------ |
| repository | <code>Repository</code> | neutrino file/url storage TODO: extend constituents into full-fledged entities |

<a name="LearningObject+addGoal"></a>

### learningObject.addGoal()
Adds a new learning goal to this object.

**Kind**: instance method of [<code>LearningObject</code>](#LearningObject)
<a name="LearningObject+removeGoal"></a>

### learningObject.removeGoal(i) ⇒ [<code>LearningObject</code>](#LearningObject)
Removes the object's i-th learning goal.

**Kind**: instance method of [<code>LearningObject</code>](#LearningObject)
**Returns**: [<code>LearningObject</code>](#LearningObject) - the goal which was removed

| Param | Type                | Description                              |
| ----- | ------------------- | ---------------------------------------- |
| i     | <code>number</code> | the index to remove from the goals array |

<a name="LearningObject+addOutcome"></a>

### learningObject.addOutcome() ⇒ <code>AssessmentPlan</code>
Adds a new, blank learning outcome to this object.

**Kind**: instance method of [<code>LearningObject</code>](#LearningObject)
**Returns**: <code>AssessmentPlan</code> - a reference to the new outcome
<a name="LearningObject+removeOutcome"></a>

### learningObject.removeOutcome(i) ⇒ [<code>LearningObject</code>](#LearningObject)
Removes the object's i-th learning outcome.

**Kind**: instance method of [<code>LearningObject</code>](#LearningObject)
**Returns**: [<code>LearningObject</code>](#LearningObject) - the learning outcome which was removed

| Param | Type                | Description                                 |
| ----- | ------------------- | ------------------------------------------- |
| i     | <code>number</code> | the index to remove from the outcomes array |

<a name="LearningGoal"></a>

## LearningGoal (`learning-goal.ts`)
A class to represent a learning object's learning goal.

**Kind**: global class

* [LearningGoal](#LearningGoal)
    * [new LearningGoal(text)](#new_LearningGoal_new)
    * [.text](#LearningGoal+text)

<a name="new_LearningGoal_new"></a>

### new LearningGoal(text)
Construct a new Learning Goal with text.


| Param | Type                | Description                       |
| ----- | ------------------- | --------------------------------- |
| text  | <code>string</code> | the text of the new Learning Goal |

<a name="LearningGoal+text"></a>

### learningGoal.text
**Kind**: instance property of [<code>LearningGoal</code>](#LearningGoal)
**Properties**

| Name | Type                | Description                        |
| ---- | ------------------- | ---------------------------------- |
| text | <code>string</code> | text content of this learning goal |


## LearningOutcome (`learning-outcome.ts`)
A class to represent a learning outcome.

**Kind**: global class

* [LearningOutcome](#LearningOutcome)
    * [new LearningOutcome(source)](#new_LearningOutcome_new)
    * [.source](#LearningOutcome+source)
    * [.tag](#LearningOutcome+tag)
    * [.bloom](#LearningOutcome+bloom)
    * [.verb](#LearningOutcome+verb)
    * [.text](#LearningOutcome+text)
    * [.mappings](#LearningOutcome+mappings)
    * [.assessments](#LearningOutcome+assessments)
    * [.strategies](#LearningOutcome+strategies)
    * [.author](#LearningOutcome+author)
    * [.mapTo()](#LearningOutcome+mapTo) ⇒ <code>number</code>
    * [.unmap(i)](#LearningOutcome+unmap) ⇒ <code>Outcome</code>
    * [.addAssessment()](#LearningOutcome+addAssessment) ⇒ <code>AssessmentPlan</code>
    * [.removeAssessment(i)](#LearningOutcome+removeAssessment) ⇒ <code>LearningObject</code>
    * [.addStrategy()](#LearningOutcome+addStrategy) ⇒ <code>InstructionalStrategy</code>
    * [.removeStrategy(i)](#LearningOutcome+removeStrategy) ⇒ <code>LearningObject</code>

<a name="new_LearningOutcome_new"></a>

### new LearningOutcome(source)
Construct a new, blank LearningOutcome.


| Param  | Type                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| source | <code>LearningObject</code> | the learning object       the new learning outcome belongs to TODO: constructor should take EITHER source OR tag (the other should be null)       If tag is given (0 allowed),          If source exists, validate that tag is unique,          Otherwise, trust it       Otherwise, auto-increment tag as necessary based on source       The order of parameters should be consistent with LearningObject,          ultimatelythat should be (tag, source) |

<a name="LearningOutcome+source"></a>

### learningOutcome.source
**Kind**: instance property of [<code>LearningOutcome</code>](#LearningOutcome)
**Properties**

| Name   | Type                               | Description                                                                                 |
| ------ | ---------------------------------- | ------------------------------------------------------------------------------------------- |
| source | <code>LearningOutcomeSource</code> | (immutable)       the author, name, and date of the learning object this outcome belongs to |

<a name="LearningOutcome+tag"></a>

### learningOutcome.tag
**Kind**: instance property of [<code>LearningOutcome</code>](#LearningOutcome)
**Properties**

| Name | Type                | Description                                             |
| ---- | ------------------- | ------------------------------------------------------- |
| tag  | <code>number</code> | (immutable)       a unique (over the source) identifier |

<a name="LearningOutcome+bloom"></a>

### learningOutcome.bloom
**Kind**: instance property of [<code>LearningOutcome</code>](#LearningOutcome)
**Properties**

| Name        | Type                | Description                                                                                         |
| ----------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| instruction | <code>string</code> | the bloom taxon of this learning outcome       values are resetricted according to available levels |

<a name="LearningOutcome+verb"></a>

### learningOutcome.verb
**Kind**: instance property of [<code>LearningOutcome</code>](#LearningOutcome)
**Properties**

| Name        | Type                | Description                                                                                                   |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| instruction | <code>string</code> | the verb this outcome text starts with (eg. define)       values are resetricted according to the bloom taxon |

<a name="LearningOutcome+text"></a>

### learningOutcome.text
**Kind**: instance property of [<code>LearningOutcome</code>](#LearningOutcome)
**Properties**

| Name | Type                | Description                                            |
| ---- | ------------------- | ------------------------------------------------------ |
| text | <code>string</code> | full text description of this outcome, except the verb |

<a name="LearningOutcome+mappings"></a>

### learningOutcome.mappings
**Kind**: instance property of [<code>LearningOutcome</code>](#LearningOutcome)
**Properties**

| Name     | Type                               | Description                                                                                                                                                                                                                                           |
| -------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mappings | <code>Array.&lt;Outcome&gt;</code> | (immutable)       outcomes which presumably achieve similar things as this NOTE: individual elements are freely accessible, but the array       reference itself is immutable, andelements can only be       added and removed by the below functions |

<a name="LearningOutcome+assessments"></a>

### learningOutcome.assessments
**Kind**: instance property of [<code>LearningOutcome</code>](#LearningOutcome)
**Properties**

| Name        | Type                                      | Description                                                                                                                                                                                                                                    |
| ----------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| assessments | <code>Array.&lt;AssessmentPlan&gt;</code> | (immutable)       plans to assess how well the outcome is achieved NOTE: individual elements are freely accessible, but the array       reference itself is immutable, and elements can only be       added and removed by the below functions |

<a name="LearningOutcome+strategies"></a>

### learningOutcome.strategies
**Kind**: instance property of [<code>LearningOutcome</code>](#LearningOutcome)
**Properties**

| Name       | Type                                             | Description                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| strategies | <code>Array.&lt;InstructionalStrategy&gt;</code> | (immutable)       strategies on how to achieve the outcome NOTE: individual elements are freely accessible, but the array       reference itself is immutable, andelements can only be       added and removed by the below functions |

<a name="LearningOutcome+author"></a>

### learningOutcome.author
properties for consistency with the Outcome interface

**Kind**: instance property of [<code>LearningOutcome</code>](#LearningOutcome)
**Properties**

| Name    | Type                |
| ------- | ------------------- |
| author  | <code>string</code> |
| name    | <code>string</code> |
| date    | <code>string</code> |
| outcome | <code>string</code> |

<a name="LearningOutcome+mapTo"></a>

### learningOutcome.mapTo() ⇒ <code>number</code>
Maps an outcome to this learning outcome.

**Kind**: instance method of [<code>LearningOutcome</code>](#LearningOutcome)
**Returns**: <code>number</code> - the new length of the mappings array
<a name="LearningOutcome+unmap"></a>

### learningOutcome.unmap(i) ⇒ <code>Outcome</code>
Removes the outcome's i-th mapping.

**Kind**: instance method of [<code>LearningOutcome</code>](#LearningOutcome)
**Returns**: <code>Outcome</code> - the outcome which was removed

| Param | Type                | Description                                 |
| ----- | ------------------- | ------------------------------------------- |
| i     | <code>number</code> | the index to remove from the mappings array |

<a name="LearningOutcome+addAssessment"></a>

### learningOutcome.addAssessment() ⇒ <code>AssessmentPlan</code>
Adds a new, blank assessment plan to this outcome.

**Kind**: instance method of [<code>LearningOutcome</code>](#LearningOutcome)
**Returns**: <code>AssessmentPlan</code> - a reference to the new assessment plan
<a name="LearningOutcome+removeAssessment"></a>

### learningOutcome.removeAssessment(i) ⇒ <code>LearningObject</code>
Removes the outcome's i-th assessment plan.

**Kind**: instance method of [<code>LearningOutcome</code>](#LearningOutcome)
**Returns**: <code>LearningObject</code> - the assessment plan which was removed

| Param | Type                | Description                                    |
| ----- | ------------------- | ---------------------------------------------- |
| i     | <code>number</code> | the index to remove from the assessments array |

<a name="LearningOutcome+addStrategy"></a>

### learningOutcome.addStrategy() ⇒ <code>InstructionalStrategy</code>
Adds a new, blank instructional strategy to this outcome.

**Kind**: instance method of [<code>LearningOutcome</code>](#LearningOutcome)
**Returns**: <code>InstructionalStrategy</code> - a reference to the new strategy
<a name="LearningOutcome+removeStrategy"></a>

### learningOutcome.removeStrategy(i) ⇒ <code>LearningObject</code>
Removes the outcome's i-th instructional strategy.

**Kind**: instance method of [<code>LearningOutcome</code>](#LearningOutcome)
**Returns**: <code>LearningObject</code> - the strategy which was removed

| Param | Type                | Description                                   |
| ----- | ------------------- | --------------------------------------------- |
| i     | <code>number</code> | the index to remove from the strategies array |

<a name="StandardOutcome"></a>

## StandardOutcome (`standard-outcome.ts`)
A class to represent a standard outcome. Immutable.

**Kind**: global class

* [StandardOutcome](#StandardOutcome)
    * [new StandardOutcome(author, name, outcome)](#new_StandardOutcome_new)
    * [.author](#StandardOutcome+author)
    * [.name](#StandardOutcome+name)
    * [.date](#StandardOutcome+date)
    * [.outcome](#StandardOutcome+outcome)

<a name="new_StandardOutcome_new"></a>

### new StandardOutcome(author, name, outcome)
Create a new StandardOutcome.


| Param   | Type                | Description              |
| ------- | ------------------- | ------------------------ |
| author  | <code>string</code> | the new outcome's source |
| name    | <code>string</code> | the new outcome's label  |
| outcome | <code>string</code> | the new outcome's text   |

<a name="StandardOutcome+author"></a>

### standardOutcome.author
**Kind**: instance property of [<code>StandardOutcome</code>](#StandardOutcome)
**Properties**

| Name   | Type                | Description                                             |
| ------ | ------------------- | ------------------------------------------------------- |
| source | <code>string</code> | the organization or document this outcome is drawn from |

<a name="StandardOutcome+name"></a>

### standardOutcome.name
**Kind**: instance property of [<code>StandardOutcome</code>](#StandardOutcome)
**Properties**

| Name | Type                | Description                      |
| ---- | ------------------- | -------------------------------- |
| name | <code>string</code> | the label or unit of the outcome |

<a name="StandardOutcome+date"></a>

### standardOutcome.date
**Kind**: instance property of [<code>StandardOutcome</code>](#StandardOutcome)
**Properties**

| Name | Type                | Description                            |
| ---- | ------------------- | -------------------------------------- |
| date | <code>string</code> | the year this standard was established |

<a name="StandardOutcome+outcome"></a>

### standardOutcome.outcome
**Kind**: instance property of [<code>StandardOutcome</code>](#StandardOutcome)
**Properties**

| Name    | Type                | Description             |
| ------- | ------------------- | ----------------------- |
| outcome | <code>string</code> | the text of the outcome |

<a name="InstructionalStrategy"></a>

## InstructionalStrategy (`instructional-strategy.ts`)
A class to represent a learning outcome's instructional strategy.

**Kind**: global class

* [InstructionalStrategy](#InstructionalStrategy)
    * [new InstructionalStrategy(source)](#new_InstructionalStrategy_new)
    * [.sourceBloom](#InstructionalStrategy+sourceBloom)
    * [.instruction](#InstructionalStrategy+instruction)
    * [.text](#InstructionalStrategy+text)

<a name="new_InstructionalStrategy_new"></a>

### new InstructionalStrategy(source)
Construct a new, blank InstructionalStrategy.


| Param  | Type                         | Description                                                          |
| ------ | ---------------------------- | -------------------------------------------------------------------- |
| source | <code>LearningOutcome</code> | the learning outcome       the new instructional strategy belongs to |

<a name="InstructionalStrategy+sourceBloom"></a>

### instructionalStrategy.sourceBloom
**Kind**: instance property of [<code>InstructionalStrategy</code>](#InstructionalStrategy)
**Properties**

| Name        | Type                | Description                                                                 |
| ----------- | ------------------- | --------------------------------------------------------------------------- |
| sourceBloom | <code>string</code> | (immutable)       the outcome's bloom taxon this assessment plan belongs to |

<a name="InstructionalStrategy+instruction"></a>

### instructionalStrategy.instruction
**Kind**: instance property of [<code>InstructionalStrategy</code>](#InstructionalStrategy)
**Properties**

| Name        | Type                | Description                                                                                                           |
| ----------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| instruction | <code>string</code> | the class of this instructional strategy (eg. lecture)       values are resetricted according to source's bloom taxon |

<a name="InstructionalStrategy+text"></a>

### instructionalStrategy.text
**Kind**: instance property of [<code>InstructionalStrategy</code>](#InstructionalStrategy)
**Properties**

| Name | Type                | Description                                          |
| ---- | ------------------- | ---------------------------------------------------- |
| text | <code>string</code> | full text description of this instructional strategy |

<a name="AssessmentPlan"></a>

## AssessmentPlan (`assessment-plan.ts`)
A class to represent a learning outcome's assessment plan.

**Kind**: global class

* [AssessmentPlan](#AssessmentPlan)
    * [new AssessmentPlan(source)](#new_AssessmentPlan_new)
    * [.sourceBloom](#AssessmentPlan+sourceBloom)
    * [.plan](#AssessmentPlan+plan)
    * [.text](#AssessmentPlan+text)

<a name="new_AssessmentPlan_new"></a>

### new AssessmentPlan(source)
Construct a new, blank AssessmentPlan.


| Param  | Type                         | Description                                                   |
| ------ | ---------------------------- | ------------------------------------------------------------- |
| source | <code>LearningOutcome</code> | the learning outcome       the new assessment plan belongs to |

<a name="AssessmentPlan+sourceBloom"></a>

### assessmentPlan.sourceBloom
**Kind**: instance property of [<code>AssessmentPlan</code>](#AssessmentPlan)
**Properties**

| Name        | Type                | Description                                                                 |
| ----------- | ------------------- | --------------------------------------------------------------------------- |
| sourceBloom | <code>string</code> | (immutable)       the outcome's bloom taxon this assessment plan belongs to |

<a name="AssessmentPlan+plan"></a>

### assessmentPlan.plan
**Kind**: instance property of [<code>AssessmentPlan</code>](#AssessmentPlan)
**Properties**

| Name        | Type                | Description                                                                                                          |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| instruction | <code>string</code> | the class of this assessment plan (essay, test, etc.)       values are resetricted according to source's bloom taxon |

<a name="AssessmentPlan+text"></a>

### assessmentPlan.text
**Kind**: instance property of [<code>AssessmentPlan</code>](#AssessmentPlan)
**Properties**

| Name | Type                | Description                                          |
| ---- | ------------------- | ---------------------------------------------------- |
| text | <code>string</code> | full text description of this instructional strategy |
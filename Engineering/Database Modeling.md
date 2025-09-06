# Model

## Conceptual Model

- Map and dict represent what system does
- Technical consideration not necessary

## Logical Model

- Adaptation to the tailored system, ER Diagram
- Use (MySQL), independent of what database
- Denormalization we got lost, the person, why we don't use that

## Physical Model

- Implementation
- Queris gaming

# Fundamental Of Conceptual Modeling

 Input -> A map and dictionary representing what system does -> Output

## TM

### Definition

Everything is things and events
We can connects objects through relationships

- Event to resource: Involves a term
- Resource to resource: Create something from one term to another
 	- Application form
 	- Create intermediate table, correlation, if 1 to many
- Event to Event: a previous event is involved in a subsequent event
 	- CircleCI
 	- Left to right chronological
 	- The intermediate table is also needed if 1 to many
- Recursion

### How to Create

- Collect terms
 	- Have primary identity (primary key)
- categorize terms into events and resources
 	- Event: Whether that event that has a date is not
 	- Resource: anything else
 	- Arrange events in chronological order, the most important is on the events
 	- Events < resources -> this is not a good model
- establish relationships
 	- add (R) on the left
 	- State != value
  		- Unoccupied, occupied
- create sets from terms
 	- sets must be in mutually exclusive OR relationship

# Conclusion

Collecting terms
Classify the collected nouns into events and resources to form entities
construct relationship between terms
null represents a state of not yet existing, changing as values are fullfiled
create subsets to derive classification values
carefully verify that the conceptual model written is semantically correct

Receipt

- Store
- address
- phone
- date
- Registration Id
- Item


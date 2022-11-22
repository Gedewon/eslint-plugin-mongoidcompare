# Better Mongo Id comparison
MongoDB is a popular NoSQL database.
The primary key for each record (in ```javascript/typescript```) is an ``ObjectId``, a javascript object. 

However, this has one major unexpected behavior:

```ts 
const x = new ObjectId()
const y = new ObjectId(x.toString())
console.log(x.equals(y)) // true
console.log(x === y) // false

```
<strong>The fact that we have to use ``equals``  rather than the usual javascript  operator. leads to many false negatives with no typescript / eslint warnings!  </strong>

## Proposed Solution:
this eslint rule that warns on id1 === id2. 
The rule should search the abstract syntax tree sending a warning for instances of the operator === where both the left-hand-side and right-hand-side could be ObjectId

```ts 
const equalBad = (id1: ObjectId | null, id2: ObjectId | 2 | false) => {
  return id1 === id2 // triggers
}

const equalOk = (id1: ObjectId | string | null, id2: string | null) => {
  return  id1 === id2 // does not trigger
}

```

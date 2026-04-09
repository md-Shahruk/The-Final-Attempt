# Topics will be covered:
- Core types — string, number, boolean, arrays, tuples, any, unknown, never, void
- Union & intersection & literal types — A | B, A & B, "admin" | "user"
- Type narrowing — typeof, instanceof, in, truthiness checks
- Generics — writing reusable, type-safe code
- Utility types — Partial, Required, Pick, Omit, Record 
- Discriminated unions — the pattern that makes complex state safe

## Core Types in TypeScript
### Topic-1: The Tricky Four

#### `any` - truns off type checking. 
```js
   let x: any =  "Shahruk";
   x = 10; // work
   x.person.bar(); // ts won't catch this
```


#### `unknown` safe version of `any`. Must check what it is before using it.
```js
   let value: unknown = "hello";
   if (typeof value === "string") {
      console.log(value.toUpperCase());
    }
```

#### `never` a function never return(throws, or infinite loop)
```js
   function crash(msg: string): never {
      throw new Error(msg);
    }
```

### Topic-2: Union & intersection & literal types
#### Union Types - `A | B`
```js
   let id: string | number;
   id = "abc123";
   id = 10;
   id = true; // error
```

#### Literal Types - exact values, not just types
 - Insted of saying "a string" say this "specific" string
```js

  type Role = "admin" | "editor" | "viewer";
  let userRole: Role = "admin"; // fine
   
  type keyword: Just a name give to a type so it can reuse it.

    type ID = string | number;
    let userId: ID = 101;
    userId = "abc123";
```

#### Intersection Types - A & B
```js
    type HasName = { name: string };
    type HasAge = { age: number };

    type Person = HasName & HasAge;

    const user: Person = {
    name: "Shahruk",
    age: 25,
    }; // must have both name and age
```

### Topic-3: Type narrowing
`typeof` narrowing
```js
  Problem:

  function process(input: string | number) {
  console.log(input.toUpperCase()); // erro - what if input is a number?
  }
  - TypeScript refuses it beacause `toUpperCase()` dosent exist on numbers.So, need to narrow it first.

  Solve:
  function process(input: string | number) {
  if (typeof input === "string") {
    console.log(input.toUpperCase()); // It's string 
  } else {
    console.log(input.toFixed(2)); // It's number
  }
 }

```

`in` narrowing for Objects 
```js
    type Cat = { meow: () => void };
    type Dog = { bark: () => void };

    function makeSound(animal: Cat | Dog) {
    if ("meow" in animal) {
        animal.meow(); // TS know its Cat
    } else {
        animal.bark(); // TS know its Dog
    }
    }
```
`instanceof` narrowing for classes 
```js
  function handleError(error: Error | string) {
  if (error instanceof Error) {
    console.log(error.message); //  narrowed to Error
  } else {
    console.log(error); //  narrowed to string
  }
 } 
```
`Truthiness` narrowing
```js
  function greet(name: string | null) {
  if (name) {
    console.log("Hello " + name.toUpperCase()); // name is string
  } else {
    console.log("Hello stranger");
  }
 }
 - null, undefined, 0, "" are all falsy — TypeScript uses this to narrow.
```

### Topic-4:  Generics
```js
  Problem:
  function getFirst(arr: number[]): number {
  return arr[0];
  } // this only work for number but string? 

  function getFirst(arr: any[]): any {
  return arr[0];
   }
   // but lost all type safety.

   The Generic solution:
   function getFirst<T>(arr: T[]): T {
    return arr[0];
   }
   getFirst([1, 2, 3]);       // T = number, returns number
   getFirst(["a", "b", "c"]); // T = string, returns string

   - <T> — "this function has a type parameter called T"
   - arr: T[] — the argument is an array of T
   - :T — the return type is T


   function wrapInObject<T>(value: T): { data: T } {
     return { data: value };
    }

   wrapInObject(42);       // { data: number }
   wrapInObject("Shahruk");  // { data: string }


   Specific type → loses reusability
   any → loses safety
   Generic → keeps both
```

### Topic-5: Utility Types
```js
  base type: 
  type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  };

```
#### `Partial<T>`  makes all properties optional
```js
   type PartialUser = Partial<User>;

  // Equivalent to:
  // {
  //   id?: number;
  //   name?: string;
  //   email?: string;
  //   age?: number;
  // }

  function updateUser(id: number, changes: Partial<User>) {
  // changes can have any subset of User's fields
  }

  updateUser(1, { name: "Shahruk" }); // only sending name
```

#### `Required<T>`  makes all properties required
```js
   type OptionalUser = {
      id?: number;
      name?: string;
    };

    type FullUser = Required<OptionalUser>;
    // { id: number; name: string; } — no more ?
```
#### `Pick<T, K>`  take only the fields want
```js
   type UserPreview = Pick<User, "id" | "name">;

   // { id: number; name: string; }
```

#### `Omit<T, K>`  remove the fields don't want
```js
   type PublicUser = Omit<User, "email" | "age">;

  // { id: number; name: string; }
```

#### `Record<K, V>` — build an object type with known keys and value type
```js
   type Roles = Record<string, boolean>;

    const permissions: Roles = {
      canEdit: true,
      canDelete: false,
      canView: true,
    };

    More precise:
    type Page = "home" | "about" | "contact";
    type PageAccess = Record<Page, boolean>;

    const access: PageAccess = {
      home: true,
      about: true,
      contact: false,
    }; // TypeScript ensures all three keys are present
```
### Topic-6: Discriminated Unions
```js
   Problem:
   type Shape = {
    radius?: number;
    side?: number;
  };

  function getArea(shape: Shape) {
    if (shape.radius) {
      return Math.PI * shape.radius ** 2;
    }
    return shape.side! ** 2; //  using ! to force — unsafe
  }
  - both fields are optional, nothing guarantees which one exists 

  discriminated union solution:
  type Circle = {
  kind: "circle"; // discriminant
  radius: number;
    };

  type Square = {
    kind: "square"; // discriminant
    side: number;
  };

  type Shape = Circle | Square;

  function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2; //  TypeScript knows it's Circle
  }
  return shape.side ** 2; //  TypeScript knows it's Square

  Common literal field (discriminant)
  → TypeScript narrows the whole object
    → Only valid fields are accessible
      → Never miss a case
}
```
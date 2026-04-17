# Topics will be covered:
- interface vs type — when to use which, and why it matters in real codebases
- Mapped types — transforming existing types programmatically
- Conditional types — types that branch based on logic (T extends U ? X : Y)
- Template literal types — string manipulation at the type level
- Declaration files (.d.ts) — how TypeScript knows about JS libraries
- tsconfig.json deep dive — the flags that actually matter in production

#### Tooling
- ESLint + Prettier setup — code quality and formatting from scratch
- Build pipeline — esbuild or tsc build setup

## Topic-1: interface vs type 
### interface:
- mainly use for Object structure define 
- can extend like OOP style
- multiple declaration using by same name : auto merge 
  
### type
- more flexible
- not only object but also union, primitive, tuple, function can define
- but has a merge conflict for same name multiple declaration
  
```js
   interface:

   interface User{
    name: string;
    age: number;
   }

   type User{
    name: string;
    age: number;
   }

   - both are almost same
   

   # interface cannot do this:

   type Status = "success" | "error";  // union type
   type ID = string | number; // primitives type
   type Point = [number, number]; //create tuple

   interface (clean OOP style):

    interface Animal {
      name: string;
    }

    interface Dog extends Animal {
      breed: string;
    }

   type use intersection:

   type Animal = {
     name: string;
    };

   type Dog = Animal & {
     breed: string;
    };


    interface declaration merging:

    interface User {
    name: string;
    }

    interface User {
    age: number;
    }

    // final:
    User = {
    name: string;
    age: number;
    }

    type doesn't supporting merge:

    type User = { name: string };
    type User = { age: number }; //  error

    So,
    Use interface when:
        - When define Object structure
        - Large scalable app
        - Do maintain OOP style
        - Need Future extension
        - structure and scalability
    
    Use type when:
        - Need Union | primitive | tuple
        - Complex type composition
        - Functional style
        - flexibility + power 

```

```js
        interface Post{
            id: number;
            title: string;
            content: string;
        }

        type Status = "draft" | "published" | "archived";

        type PublishedPost = Post & {status:Status};

        const publishedPost:PublishedPost = {
            id: 1,
            title: "Interface learning",
            content: "  document",
            status:  "published",
        };
```

## Topic-2: Mapped Types 
- Create a new type by transforming an existing one.
```js
   Problem and Solve:
   interface User {
    id: number;
    name: string;
    email: string;
   }
   - if need a version where all feilds are optional and another where all feilds are read-only.Without mapped types write manually:
   interface User {
    id?: number;
    name?: string;
    email?: string;
   }

   but thats fine for 3 feilds but for 20 feilds? and what if `User` changes. Its difficult to update every by manually. Mapped fixs this problem:

   Mapped basic syntax:
   type MyMappedType = {
    [Key in keyof ExistingType]: ExistingType[Key];
   }
    - keyof ExistingType — gets all the keys of a type ("id" | "name" | "email")
    - Key in ... — loops over each key
    - ExistingType[Key] — keeps the original value type for each key 

    Real Example:

    Make all feilds Optional:
    type Optional<T> ={
        [Key in keyof T]?: T[Key];
    }
    type OptionalUser = Optional<User>;
   // same as { id?: number; name?: string; email?: string; }

    Make all feilds readonly:
    type Readonly<T> = {
       readonly [Key in keyof T]: T[Key];
    };

    type ReadonlyUser = Readonly<User>;
    // { readonly id: number; readonly name: string; readonly email: string; }

    Make all feilds nullable:
    type Nullable<T> = {
      [Key in keyof T]: T[Key] | null;
    };

    type NullableUser = Nullable<User>;
    // { id: number | null; name: string | null; email: string | null; }

```

```js
   1. Write a mapped type called Stringify<T> that takes any type and makes all fields string (regardless of their original type)
   2. Create a StringifiedUser using it

   type Stringify<T> ={
    [Key in keyof T]: string;
   }
   type StringifiedUser = Stringify<User>;
```

## Topic-3: Conditional Types
- Write types that makes decisons like an if/else but at the type level.
```js
  type MyType<T> = T extends SomeType? TypeIfTrue : TypeIfFale;

  Example:
  interface User{
    id: number;
    name: string;
    email: string;
    contact: number;
  }

  type StringFeilds<T> = {
    [Key in keyof T]: T[Key] extends string? T[Key]:never;
  }

  type UserStringFeilds = StringFeilds<User>;
  // { id: never; name: string; email: string; contact: never; }


  Another Example:
    type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

    type A = UnwrapPromise<Promise<string>>;  // string
    type B = UnwrapPromise<Promise<number>>;  // number
    type C = UnwrapPromise<boolean>;          // boolean - not a Promise, 
```
```js
   type IsArray<T> = T extends any[] ? "yes" : "no";

    type A = IsArray<string[]>;  // yes
    type B = IsArray<number>;    // no
    type C = IsArray<boolean[]>; // yes 
```

## Topic-4: Template literal types 
```js
    type Entity = "user" | "post" | "comment";
    type Action = "created" | "updated" | "deleted";

    type AppEvent = `${Entity}:${Action}`;
    // "user:created" | "user:updated" | "user:deleted"
    // "post:created" | "post:updated" | "post:deleted"
    // "comment:created" | "comment:updated" | "comment:deleted"

    function handleEvent(event: AppEvent) {
    console.log(event);
    }

    handleEvent("user:created");  // fine
    handleEvent("user:banned");   //not in the type

    type Size = "sm" | "md" | "lg";
    type Color = "red" | "blue";

    type ButtonClass = `$btn-${Size}-${Color}`

    function getButton(buttonClass: ButtonClass){
        log(buttonClass);
    }
    getButton("btn-sm-red"); // fine
    getButton("btn-md-green");  // not in the type

```
## Topic-5: Declaration Files (.d.ts):
- In TypeScript Declaratios Files lika a file where only write type-information, but there has no actually implementation(logic/code).

```js
   # A Simple  Example:
   // utils.js
  function add(a, b) {
    return a + b;
  }

  function greet(name) {
    return `Hello, ${name}!`;
  }

  module.exports = { add, greet }; 

  -  TypeScript knows nothing about this so create a declaration file alongside it
  // utils.d.ts
  export function add(a: number, b: number): number;
  export function greet(name: string): string;
  - now typescript understands the shape, also get type safety and autocomplete.
```
### Where need?
1. For use JS libraries
  - like lodash, express, so that Typescript can understand - .d.ts

`declare` keyword
```js
  // globals.d.ts
  declare const API_URL: string;
  declare function fetchUser(id: number): Promise<User>;

  declare module "my-js-lib" {
    export function doSomething(value: string): void;
  }
  -  not writing logic — just telling TypeScript "trust me, this exists and here's its shape."
```

## Topic-6: tsconfig.json
- This file controls how Typescript compiles code.


## Tooling
## Topic-1: ESLint + Prettier + Build Pipeline
#### What each tools does?
1. ESLint - catches code quality issues and bad patterns
2. Prettier - formats code automatically (indentation, quotes, spacing)
3. tsc - TypeScript's own compiler, good for type checking and simple builds
4. esbuild - extremely fast bundler/compiler, used in production pipelines
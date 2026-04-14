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
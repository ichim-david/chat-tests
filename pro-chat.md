
# Running and Understanding `01-example.ts` - Pro Level

This document provides a professional guide to running the TypeScript example (`01-example.ts`) and understanding the key concepts it demonstrates.

## Execution Environment Setup

To run `01-example.ts`, you'll need:

*   **Node.js:** A JavaScript runtime environment (LTS version recommended).
*   **npm (Node Package Manager):** Comes bundled with Node.js.
*   **TypeScript:** The TypeScript compiler (`tsc`).

**Installation:**

1.  **Node.js and npm:** Download and install the latest LTS version from [https://nodejs.org/](https://nodejs.org/).

2.  **TypeScript:** Install the TypeScript compiler globally:

    ```bash
    npm install -g typescript
    ```

## Running the Code

1.  **Compile:** Use the TypeScript compiler to transpile `01-example.ts` into JavaScript:

    ```bash
    tsc examples/01-example.ts
    ```

    This creates `01-example.js` in the same directory. This step *also performs type checking*, highlighting any errors.

2.  **Execute:** Run the compiled JavaScript using Node.js:

    ```bash
    node examples/01-example.js
    ```

## Key Concepts - In Depth

The `01-example.ts` file covers essential TypeScript features:

1.  **Basic Type Annotations:**

    *   Example: `const hello: string = "world";`
    *   **Purpose:** Explicitly defines the type of a variable. Improves code readability and helps the compiler catch type errors *before* runtime. This is the foundation of TypeScript's static typing.

2.  **Interfaces:**

    *   Example:
        ```typescript:examples/01-example.ts
        interface User {
          id: number;
          name: string;
          isActive: boolean;
        }
        ```
    *   **Purpose:** Define the *shape* of an object. Enforces a contract, ensuring objects have specific properties with specific types. This facilitates code consistency and early error detection.  Interfaces are a compile-time construct and don't exist in the generated JavaScript.

3.  **Classes and Access Modifiers:**

    *   Example:
        ```typescript:examples/01-example.ts
        class Person {
          private age: number;
          constructor(public name: string, age: number) {
            if (age < 0 || age > 150) {
              throw new Error('Invalid age value');
            }
            this.age = age;
          }

          greet(): string {
            return `Hello, my name is ${this.name}`;
          }
        }
        ```
    *   **Purpose:** `private age`: Demonstrates *encapsulation*. The `age` property can only be accessed *within* the `Person` class.  `public name`: The `name` property is accessible from anywhere. The constructor enforces validation of the `age`.
    *   **Benefit:** Controlled access to class members, leading to more robust and maintainable code.

4.  **Generic Functions:**

    *   Example:
        ```typescript:examples/01-example.ts
        /**
         * Applies the given function to the provided argument and returns the result.
         * @template T - The type of the argument and return value.
         * @param arg - The argument to pass to the function.
         * @returns The result of applying the function to the argument.
         */
        function identity<T>(arg: T): T {
          return arg;
        }
        ```
    *   **Purpose:** Write reusable code that works with *multiple types* without sacrificing type safety.  `identity<T>` can accept any type (`T`), and the return type will be the same (`T`).  This avoids code duplication and increases flexibility.

5.  **Tuples:**

    *   Example: `let userInfo: [string, number] = ["John", 25];`
    *   **Purpose:**  Arrays with a *fixed number of elements* where each element's type is known.  Order is significant.  `userInfo` must be an array where the first element is a string and the second is a number.

6.  **Enums:**

    *   Example:
        ```typescript:examples/01-example.ts
        enum Color {
          Red = "RED",
          Green = "GREEN",
          Blue = "BLUE",
        }
        ```
    *   **Purpose:** Define a set of named constants. Provides better readability and maintainability compared to using magic strings or numbers.  Using string enums (like this example) makes debugging easier.

7.  **Type Aliases:**

    *    Example: `type StringOrNumber = string | number;`
    *    **Purpose**: Give a name to a type expression to make it reusable. This improves the code readability.

8.  **Optional Parameters:**

    *   Example: `function logMessage(message: string, userId?: number): void { ... }`
    *   **Purpose:** The `?` makes `userId` optional. The function can be called with one argument (`message`) or two. Provides flexibility in function usage.

9.  **Union Types:**

    *   Example: `function printId(id: number | string) { ... }`
    *   **Purpose:** Allow a variable or parameter to hold values of different types.  `id` can be *either* a `number` *or* a `string`.

10. **Intersection Types**
    *   Example:
         ```typescript:examples/01-example.ts
         interface Address {
            street: string;
            city: string;
         }
         ```
     *   **Purpose**: Although it does not uses an Intersection Type. The code has an interface definition that could be used as a building block for this type.

These concepts, when combined, provide the foundation for building large, scalable, and maintainable applications with TypeScript.

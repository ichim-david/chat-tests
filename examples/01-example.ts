// Basic type annotation
/** A basic string variable assigned the value "world". */
/** A basic string variable assigned the value "world". */
const hello: string = "world";

// Basic number annotation
const num: number = 10;

// Boolean annotation
const isTrue: boolean = true;

// Array annotation
const arr: number[] = [1, 2, 3];

// Any type (not recommended, but possible)
let anything: any = "Can be anything";
anything = 123;

// Function annotation
function add(x: number, y: number): number {
  return x + y;
}
// Interface example
interface User {
  id: number;
  name: string;
  isActive: boolean;
  email?: string; // Optional property
  createdAt: Date;
}

/**
  * Represents a person with a name and age.
  */
class Person {
  private age: number;
  constructor(public name: string, age: number) {
    if (age < 0 || age > 150) {
      throw new Error('Invalid age value');
    }
    this.age = age;
  }

  /**
    * Returns a greeting message containing the person's name.
    * @returns A string with a personalized greeting.
    */
  greet(): string {
    return `Hello, my name is ${this.name}`;
  }



  /**
    * Returns the age of the person.
    * @returns The age as a number.
    */
  getAge(): number {
    return this.age;
  }

  /**
    * Sets the age of the person.
    * @param newAge The new age to set.
    * @throws Error if the age is invalid.
    */
  setAge(newAge: number): void {
    if (newAge < 0 || newAge > 150) {
      throw new Error('Invalid age value');
    }
    this.age = newAge;
  }





































































































































































































































}





function greet(name: string): string {
  return `Hello, ${name}!`;
}
// Function with optional parameter




function logMessage(message: string, userId?: number): void {
  console.log(message, userId || "Anonymous");
}



// Function with default parameter




function greetWithDefault(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}


ccc










































// Generic function
/**
  * Returns the argument passed to it, preserving its type.
  * @param arg The value to be returned.
  * @returns The same value that was passed in.
  */
/**
  * A generic function that returns the input argument, preserving its type.
  * @template T The type of the input argument.
  * @param {T} arg The value to be returned.
  * @returns {T} The same value that was passed in.
  */

/**
  * A tuple representing user information with a name and age.
  */

/**
  * An enumeration of color values.
  */

/**
  * A type alias representing a value that can be either a string or a number.
  */

/**
  * Logs a message with an optional user ID.
  * @param {string} message The message to log.
  * @param {number} [userId] Optional user identifier.
  */


/**
  * Represents an address with a street and city.
  */
/**
 * Prints a user ID, which can be either a number or a string.
 * @param {number | string} id The user identifier to print.
 */

/**
 * Represents an address with a street and city.
 */
function identity<T>(arg: T): T {
  return arg;
}

// Tuple type
let userInfo: [string, number] = ["John", 25];

// Enum example
/**
  * An enumeration of color values.
  */
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

// Type alias
type StringOrNumber = string | number;

const myStringOrVariable: StringOrNumber = "hello";

console.log(myStringOrVariable);
// Removing the infinite loop
// while (true) {
//   console.log("Hello, world!");
// }
// Function with default parameter
function greets(name: string, age: number = 25): string {
  return `Hello, ${name}! You are ${age} years old.`;
}
console.log(greets("John", 30));

console.log(greets("Jane"));

// Function with optional parameter
function logMessage(message: string, userId?: number): void {
  console.log(message, userId || "Anonymous");
}

// Union type example

function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

// Intersection type example
/**
  * Represents an address with a street and city.
  */
interface Address {
  street: string;
  city: string;
}

interface PersonAddress extends Person, Address {}

const personWithAddress: PersonAddress = {
  name: "Alice",
  age: 30,
  street: "123 Main St",
  city: "Anytown",
  greet: function(): string {
    return `Hello, my name is ${this.name} and I live at ${this.street}, ${this.city}`;
  },
  getAge: function(): number {
    return this.age;
  }
};

console.log(personWithAddress.greet());

//Discriminated Unions
interface Square {
  kind: "square";
  size: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Circle;

function area(s: Shape): number {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}


export function sum(a: number, b: number): number {
  return a + b;
}

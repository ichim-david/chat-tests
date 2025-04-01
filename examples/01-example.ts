// Basic type annotation
const hello: string = "world";

// Interface example
interface User {
  id: number;
  name: string;
  isActive: boolean;
}

// Class with access modifiers
class Person {
  private age: number;

  constructor(public name: string, age: number) {
    this.age = age;
  }

  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

// Generic function
/**
 * Applies the given function to the provided argument and returns the result.
 * @template T - The type of the argument and return value.
 * @param arg - The argument to pass to the function.
 * @returns The result of applying the function to the argument.
 */
function identity<T>(arg: T): T {
  return arg;
}

// Tuple type
let userInfo: [string, number] = ["John", 25];

// Enum example
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

// Type alias
type StringOrNumber = string | number;

// Function with optional parameter
function logMessage(message: string, userId?: number): void {
  console.log(message, userId || "Anonymous");
}

// Union type example
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

// Intersection type example
interface Address {
  street: string;
  city: string;
}

interface ContactInfo {
  email: string;
  phone: string;
}

type BusinessContact = Address & ContactInfo;

const business: BusinessContact = {
  street: "123 Main St",
  city: "Anytown",
  email: "info@example.com",
  phone: "555-1212",
};

// Literal Types
type Direction = "North" | "South" | "East" | "West";
function move(distance: number, direction: Direction) {
  console.log(`Moving ${distance} units ${direction}`);
}

// Readonly properties
interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property.

// Null and Undefined
let maybeString: string | undefined | null = undefined;

// Type assertion
const someValue: any = "this is a string";
const strLength: number = (someValue as string).length;

// Non-null assertion operator
function getLength(str: string | null | undefined): number {
  return str!.length; // Asserts that str is not null or undefined
}

// Index Signatures
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["Bob", "Alice"];
const secondElement = myArray[1]; // Alice

// Conditional Types
type Check<T> = T extends string ? true : false;
type IsString = Check<string>; // true
type IsNumber = Check<number>; // false

// Mapped Types
interface Options {
  [key: string]: any;
}

type ReadonlyOptions<T> = {
  readonly [K in keyof T]: T[K];
};

const readonlyOptions: ReadonlyOptions<Options> = {
  option1: "value1",
  option2: 123,
};

// Utility Types
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial<Todo>
const todoUpdate: Partial<Todo> = {
  completed: true,
};

// Pick<Todo, "title" | "completed">
const todoPreview: Pick<Todo, "title" | "completed"> = {
  title: "Clean room",
  completed: false,
};

// Omit<Todo, "description">
const todoWithoutDescription: Omit<Todo, "description"> = {
  title: "Pick up dry cleaning",
  completed: false,
};

// --- Additional Examples ---

// 1.  Advanced Generics with Constraints

interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property
  return arg;
}

// loggingIdentity(3); // Error, number doesn't have .length
loggingIdentity({ length: 10, value: 3 }); // Works

// 2.  Using `keyof` with Generics

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type '"m"' isn't assignable to 'a' | 'b' | 'c' | 'd'.

// 3.  Discriminated Unions

interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}

// 4.  `this` types

class BasicCalculator {
  public constructor(protected value: number = 0) {}

  public currentValue(): number {
    return this.value;
  }

  public add(operand: number): this {
      this.value += operand;
      return this;
  }

  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
}

let calc = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue(); // 11

// 5.  Mixin Pattern (using classes and interfaces)

// Reusable mixin class
class Timestamped {
  timestamp!: Date; //Definite assignment assertion

  setTimestamp() {
    this.timestamp = new Date();
  }
}

// Another mixin
class Activatable {
  isActive!: boolean; //Definite assignment assertion

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}

// Base class
class MyBaseClass {
    baseProperty: string = "base";
}

// Combine them using an interface and a helper function
interface MyClass extends MyBaseClass, Timestamped, Activatable {}

// Apply mixins using a helper function
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      if (name !== "constructor") {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
            Object.create(null)
        );
      }
    });
  });
}


// Create the class
class MyClass extends MyBaseClass {
    constructor() {
        super();
        this.setTimestamp(); // Can call methods from mixins
        this.activate();
    }
}
applyMixins(MyClass, [Timestamped, Activatable]);

let myInstance = new MyClass();
console.log(myInstance.baseProperty);
console.log(myInstance.timestamp);
console.log(myInstance.isActive);

// 6.  Default values for generic types
function createArray<T = number>(length: number, value: T): T[] {
    return Array<T>(length).fill(value);
}

const numArray = createArray(3, 5);     // [5, 5, 5] - number[]
const strArray = createArray(2, "hi");  // ["hi", "hi"] - string[]
const boolArray = createArray<boolean>(2, true); // [true, true] - boolean[]

// 7. Template Literal Types
type VerticalAlignment = "top" | "middle" | "bottom";
type HorizontalAlignment = "left" | "center" | "right";

// Creates "top-left", "top-center", "top-right", "middle-left", etc.
type Alignment = `${VerticalAlignment}-${HorizontalAlignment}`;

const myAlignment: Alignment = "bottom-right";
// const invalidAlignment: Alignment = "top-somewhere"; // Error

// 8.  The `never` type

// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must not have a reachable end point
function infiniteLoop(): never {
  while (true) {}
}

// 9.  Object Types
// object is anything that is not a primitive type
// (string, number, boolean, symbol, null, or undefined).

function processObject(obj: object) {
    console.log("Object:", obj);
}

processObject({ name: "Test" });
// processObject("test"); // Error: Argument of type 'string' is not assignable to parameter of type 'object'.
processObject(null); // Error
processObject(undefined); // Error

// 10. Definite Assignment Assertions
class MyDefiniteClass {
    myValue!: number; // Notice the !

    constructor() {
        this.initialize();
    }

    initialize() {
        this.myValue = 10;
    }
}
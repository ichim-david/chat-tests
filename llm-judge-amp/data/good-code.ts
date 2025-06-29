interface User {
  name: string;
  age: number;
}

function calculateSum(a: number, b: number): number {
  try {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Parameters must be numbers');
    }
    return a + b;
  } catch (error) {
    console.error('Error in calculateSum:', error);
    throw error;
  }
}

const users: User[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
];

function findUser(name: string): User | undefined {
  try {
    return users.find(user => user.name === name);
  } catch (error) {
    console.error('Error finding user:', error);
    return undefined;
  }
}

const result: number = calculateSum(5, 10);
console.log(`Result: ${result}`);

const user: User | undefined = findUser("Alice");
if (user) {
  console.log(`Found user: ${user.name}, age: ${user.age}`);
} else {
  console.log('User not found');
}

// Nothing initialized
enum RoleNotInitialized { ADMIN , READ_ONLY , AUTHOR , USER };
console.log(RoleNotInitialized.READ_ONLY.valueOf());

// If you initialize some enum's entries --> All must be done
// enum RoleNotAllInitialized { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 'AUTHOR', USER };

// Initialized some of them
enum RoleSomeInitialized { ADMIN  , READ_ONLY = 7 , AUTHOR , USER };
console.log(RoleSomeInitialized.READ_ONLY.valueOf());

// Entries' values can be different
enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 'AUTHOR' };

const person = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
};

// person.role.push('admin');
// person.role[1] = 10;

// person.role = [0, 'admin', 'user'];

if (person.role === Role.AUTHOR) {
  console.log('is author');
}

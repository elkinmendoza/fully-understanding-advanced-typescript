

// const ADMIN=0;
// const READ_ONLY=1;
// const AUTHOR=2;

enum Role { ADMIN="ADMIN", READ_ONLY = 100, AUTHOR= 'AUTHOR'};
const person
 = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.AUTHOR
    
}

// person.role= [0, 'admin',0];
// person.role[1] = 10;

let favoriteActivities:string[];

favoriteActivities = ['Sports']
console.log(person);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()); // !!! ERROR !!!
}


if (person.role === Role.ADMIN) {
    console.log('is ADMIN only');
}
const userName = 'Maximilian';

console.log(userName);

// const button = document.querySelector("button");                             // If we don't specify from where to get document --> it doesn't know
const button = document.querySelector("button")!;    // !   Indicate to typescript compiler that we manage it
// IMPORTANT: If you use "strictNullChecks": false --> You don't get an error, you can manage by yourself === not needed to add !
button.addEventListener('click', () => {
    console.log('Clicked!');
});

// Alternative to !
// Wrapping by conditional statement
if (button) {
    button.addEventListener('click', () => {
        console.log('Clicked!');
    });
}

// strictBindCallApply
// Check if the arguments passed match against it's expected
function clickHandler(message: string) {
    console.log('Clicked ' + message);
}
// .bind    Allows passing arguments to a function
// TODO: Check .bind method
// button.addEventListener('click', clickHandler.bind(null));           // it doesn't match what the arguments expected
button.addEventListener('click', clickHandler.bind(this,"Alfredo"));
// button.addEventListener('click', clickHandler.bind(this,2));         // it doesn't match what the arguments expected

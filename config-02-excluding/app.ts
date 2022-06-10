const userName = 'Maximilian';

console.log(userName);

// const button = document.querySelector("button");                             // If we don't specify from where to get document --> it doesn't know
const button = document.querySelector("button")!;    // !   Indicate to typescript compiler that we manage it
button.addEventListener('click', () => {
    console.log('Clicked!');
});
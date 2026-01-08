const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

console.log('Hamburger:', hamburger);
console.log('Nav Menu:', navMenu);

hamburger.addEventListener('click', () => {
    console.log('Hamburger clicked');
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

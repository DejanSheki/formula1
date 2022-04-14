const menuContact = document.querySelector('.menu-contact');
const circuitsPage = document.querySelector('.circuits-page');
const driversPage = document.querySelector('.drivers-page');
const mouse = document.querySelector('.cursor');
const constructorsPage = document.querySelector('.constructors-page');

// Cursor

function cursor(e) {
    mouse.style.top = `${e.clientY}px`;
    mouse.style.left = `${e.clientX}px`;
}
function activeCursor(e) {
    const item = e.target;
    if (item.classList.contains('circuits') || item.classList.contains('menu') || item.classList.contains('drivers') || item.classList.contains('constructors')) {
        mouse.classList.add("active");
    } else {
        mouse.classList.remove("active");
    }
}

// event listeners

window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);

document.addEventListener('click', (event) => {
    if (event.target.matches('.menu')) {
        menuContact.classList.add('menu-active');
        mouse.style.display = "none";
    }
    if (event.target.matches('.back')) {
        menuContact.classList.remove('menu-active');
        mouse.style.display = "block";
    }
    if (event.target.matches('.circuits')) {
        circuitsPage.classList.add('all-circuits');
        mouse.style.display = "none";
    }
    if (event.target.matches('.back-circuits')) {
        circuitsPage.classList.remove('all-circuits');
        mouse.style.display = "block";
    }
    if (event.target.matches('.drivers')) {
        driversPage.classList.add('drivers-page-active');
        mouse.style.display = "none";
    }
    if (event.target.matches('.drivers-back')) {
        driversPage.classList.remove('drivers-page-active');
        mouse.style.display = "block";
    }
    if (event.target.matches('.constructors')) {
        constructorsPage.classList.add('constructors-page-active');
        mouse.style.display = "none";
    }
    if (event.target.matches('.constructors-back')) {
        constructorsPage.classList.remove('constructors-page-active');
        mouse.style.display = "block";
    }
});

// select year 

const rightBtn = document.querySelectorAll('.right-btn');
const leftBtn = document.querySelectorAll('.left-btn');
const distance = 200;

leftBtn.forEach(event => {
    event.addEventListener('click', () => {
        event.nextElementSibling.scrollBy({
            left: -distance,
            behavior: 'smooth'
        });
    });
});

rightBtn.forEach(event => {
    event.addEventListener('click', () => {
        event.previousElementSibling.scrollBy({
            left: distance,
            behavior: 'smooth'
        });
    });
});

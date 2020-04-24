/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const navMenu = document.querySelector('.navbar__menu');
const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const button = document.querySelector('#back2Top');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */


/**
 * BUILD THE NAV
 */
sections.forEach(section => {
   const li = document.createElement('li');
   li.innerHTML = `<a href="#${section.id}"> ${section.dataset.nav} </a>`;
   li.setAttribute('data-link', `${section.id}`)
   li.className = "list-style";
   navList.appendChild(li);
});
navMenu.appendChild(navList);


/**
 * Scroll to section on link click
  */

navList.addEventListener('click', function(e) {
    e.preventDefault();
    const parent = e.target.hasAttribute('data-link') ? e.target : e.target.parentElement;
    const elementToScrollTo = document.getElementById(parent.dataset.link);
    elementToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth'})
});

/**
 * Adding a Button to go back to the top
 */

button.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

/**
 * Set sections as active
 * creating a callback function with entries as argument(in this case sections)
 * we check if entry (section) is being intersected
 * than we add active class
 */
const callback = entries => {
    entries.forEach(entry => {
        const navListElement = document.querySelector(
            `.list-style[data-link='${entry.target.id}']`,
        );
        const section = document.getElementById(entry.target.id)

        if (entry && entry.isIntersecting) {
            navListElement.classList.add('active')
            section.classList.add('active')
        } else {
            if (navListElement.classList.contains('active')) {
                navListElement.classList.remove('active')
            }

            if (section.classList.contains('active')) {
                section.classList.remove('active')
            }
        }
    })
};

/**
 * Option one root: by default tells the browser viewport , we set it to null
 * Option two rootMargin: margin around the root , by default is zero
 *Option three threshold: here we detect at which point of visibility our callback function will be executed
 *
 */

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6
};

/**
 * IntersectionObserver observe the intersection and it takes two parameter a callback function(the one we created above) and options
 * // than we target the element we want to be observed (so each section into sections with the specific id)
 */

const observer = new IntersectionObserver(callback, options)
sections.forEach(el => {
    observer.observe(document.getElementById(el.id))
});

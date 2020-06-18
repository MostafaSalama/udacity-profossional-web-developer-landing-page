// event fired when the dom is loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
	// this button will be used to scroll to the top of the page
	const scrollToTopButton = document.getElementById('to_top_button');
	// nav UL
	const nav = document.getElementById('navbar__list');
	// get all the sections
	const allSections = document.querySelectorAll('section');
	// this will present the current active
	// section and have initial value of the first section
	let currentActiveSection = allSections[0];
	// active link of the current active section
	// to add active class to it
	let activeLink = null ;
	// create an observer that will tell us
	// if the section in the viewport or not
	// API https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
	const observer = createObserver(callback);
	// observe all sections
	allSections.forEach((section) => {
		observer.observe(section);
		// create menu item for each section
		const li = createNavItem(section);
		// append it to the menu
		nav.appendChild(li);
	});
	// when scroll button is clicked it will scroll to the top of the page
	scrollToTopButton.addEventListener('click', scrollToTheTop);

	// this callback is used by the observer
	function callback(entries) {
		entries.forEach((entry) => {
			// if element is in viewport
			if (entry.isIntersecting) {
				const { target } = entry;
				currentActiveSection.classList.remove('your-active-class');
				target.classList.add('your-active-class');
				currentActiveSection = target ;
				if (activeLink) {
					// remove the active link class from the current active link
					activeLink.classList.remove('active-link');
					// change the current active link
					activeLink = document.getElementById(`${target.id}_link`);
					// add the class to the new active link
					activeLink.classList.add('active-link')
				}
				else {
					// get the anchor tag based on the active section
					activeLink = document.getElementById(`${target.id}_link`);
					activeLink.classList.add('active-link')
				}

			}
			else {
				// remove the active link class if no section in the viewport
				activeLink.classList.remove('active-link')
			}

		});
	}
});

// this function will create observer used to look
// at different elements and see if it in the viewport
function createObserver(callback) {
	const observer = new IntersectionObserver(callback, {
		root: null,
		threshold:0.7
	});
	return observer;
}
/**
 * create anchor element and li tag based on the parameter info
 * @param sectionElement {HTMLElement}
 * @returns {HTMLLIElement}
 */
function createNavItem(sectionElement) {
	const li = document.createElement('li');
	const a = document.createElement('a');
	a.classList.add('menu__link');
	// add text content from the data-nav in the section
	a.textContent = sectionElement.dataset.nav;
	a.href = `#${sectionElement.id}`;
	a.id = `${sectionElement.id}_link`
	a.addEventListener('click', scrollToSection(sectionElement));
	li.appendChild(a);
	return li;
}
/**
 * scroll to the specified element and return a function
 * to be used as the listener for the anchor tag
 * @param section {HTMLElement}
 * @returns {function(...[*]=)}
 */
function scrollToSection(section) {
	return function (ev) {
		ev.preventDefault();
		window.scrollTo({
			behavior: 'smooth',
			top: section.offsetTop,
		});
	};
}
/**
 * scroll to the top of the page
 */
function scrollToTheTop() {
	window.scrollTo({
		behavior: 'smooth',
		top: 0,
		left: 0,
	});
}

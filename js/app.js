// event fired when the dom is loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
	// this button will be used to scroll to the top of the page
	const scrollToTopButton = document.getElementById('to_top_button');
	// nav UL
	const nav = document.getElementById('navbar__list');
	const allSections = document.querySelectorAll('section');
	let currentActiveSection = allSections[0];
	const observer = createObserver(callback);
	allSections.forEach((section) => {
		observer.observe(section);
		const li = createNavItem(section);
		nav.appendChild(li);
	});
	scrollToTopButton.addEventListener('click', scrollToTheTop);
	function callback(entries) {
		entries.forEach((entry) => {
			const { target } = entry;
			currentActiveSection.classList.remove('your-active-class');
			target.classList.add('your-active-class');
			currentActiveSection = target ;

		});
	}
});

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

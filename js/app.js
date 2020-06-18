// event fired when the dom is loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
	// this button will be used to scroll to the top of the page
	const scrollToTopButton = document.getElementById('to_top_button');
	scrollToTopButton.addEventListener('click', scrollToTheTop);
});



/**
 * scroll to the specified element and return a function
 * to be used as the listener for the anchor tag
 * @param section {HTMLElement}
 * @returns {function(...[*]=)}
 */
function scrollToSection(section) {
	return function () {
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

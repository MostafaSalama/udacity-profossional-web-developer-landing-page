// event fired when the dom is loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
	// this button will be used to scroll to the top of the page
	const scrollToTopButton = document.getElementById('to_top_button');
	scrollToTopButton.addEventListener('click', scrollToTheTop);
});

/**
 * scroll to the top of the page
 */
function scrollToTheTop() {
    console.log('clicked')
	window.scrollTo({
		behavior: 'smooth',
		top: 0,
		left: 0,
	});
}

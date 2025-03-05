// Minimal JavaScript to handle page transitions
document.addEventListener('DOMContentLoaded', function() {
	// Get all comp-dd elements
	const menuItems = document.querySelectorAll('comp-dd');

	menuItems.forEach(item => {
		item.addEventListener('click', function() {
			// Get the target page ID
			const targetPageId = this.getAttribute('data-page');
			const targetPage = document.getElementById(targetPageId);

			// Get currently active page
			const currentPage = document.querySelector('.page-content.active');

			// Don't do anything if clicking on the already active page
			if (targetPage === currentPage) return;

			// Add exit class to current page
			if (currentPage) {
				currentPage.classList.add('exit');

				// After animation completes, remove active and exit classes
				setTimeout(() => {
					currentPage.classList.remove('active');
					currentPage.classList.remove('exit');

					// Make the target page active
					targetPage.classList.add('active');
				}, 500); // Match transition duration in CSS
			} else {
				// No current active page, just make target active
				targetPage.classList.add('active');
			}
		});
	});
});

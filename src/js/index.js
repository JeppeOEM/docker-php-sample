// Enhanced JavaScript for SPA functionality
document.addEventListener('DOMContentLoaded', function() {
	// Check if we have a current page from PHP
	if (window.currentPage) {
		// Initial page is already set by PHP, just update active menu item
		updateActiveMenuItem(window.currentPage);
	} else {
		// Fall back to route handling from URL
		handleRouteFromUrl();
	}

	// Get all comp-dd elements
	const menuItems = document.querySelectorAll('comp-dd');

	menuItems.forEach(item => {
		item.addEventListener('click', function(e) {
			e.preventDefault(); // Prevent default behavior

			// Get the target page ID
			const targetPageId = this.getAttribute('data-page');

			// Update the URL without refreshing the page
			const pageName = targetPageId.replace('-content', '');
			navigateToPage(pageName);
		});
	});

	// Listen for popstate event (when back/forward buttons are clicked)
	window.addEventListener('popstate', function(event) {
		handleRouteFromUrl();
	});
});

// Navigate to a specific page
function navigateToPage(pageName) {
	// Default to home if no page specified
	if (!pageName) pageName = 'home';

	// Update the URL
	const url = pageName === 'home' ? '/' : `/${pageName}`;
	history.pushState({ page: pageName }, '', url);

	// Update the UI
	showPage(`${pageName}-content`);
}

// Extract the current route from URL and handle it
function handleRouteFromUrl() {
	// Get the current path from the URL
	let path = window.location.pathname.substring(1); // Remove leading slash

	// Default to home if path is empty
	if (!path) path = 'home';

	// Remove trailing slash if present
	if (path.endsWith('/')) path = path.slice(0, -1);

	// Show the corresponding page
	showPage(`${path}-content`);
}

// Function to show a specific page
function showPage(targetPageId) {
	const targetPage = document.getElementById(targetPageId);

	// If target page doesn't exist, show home or 404
	if (!targetPage) {
		showPage('home-content');
		return;
	}

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

	// Update active state in menu
	updateActiveMenuItem(targetPageId.replace('-content', ''));
}

// Update the active menu item based on current page
function updateActiveMenuItem(pageName) {
	// Remove active class from all menu items
	document.querySelectorAll('comp-dd').forEach(item => {
		item.classList.remove('active');
	});

	// Add active class to current menu item
	const activeMenuItem = document.querySelector(`comp-dd[data-page="${pageName}-content"]`);
	if (activeMenuItem) {
		activeMenuItem.classList.add('active');
	}
}

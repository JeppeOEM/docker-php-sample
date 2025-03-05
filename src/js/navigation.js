/**
 * Navigation system with page transitions
 * Handles SPA navigation and animations between pages
 */
document.addEventListener('DOMContentLoaded', function() {
	// Get all navigation links
	const navLinks = document.querySelectorAll('comp-dd.nav-link');

	// Add click event listeners to each link
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			// Get the inner anchor from shadow DOM
			const anchor = this.shadowRoot.querySelector('a');
			e.preventDefault();

			// Get the target page ID from data attribute
			const targetPage = this.getAttribute('data-page');

			// Don't do anything if current page is clicked
			const currentActive = document.querySelector('.page-content.active');
			if (currentActive.id === targetPage) return;

			// Remove active attribute from all nav links
			document.querySelectorAll('comp-dd.nav-link').forEach(navLink => {
				navLink.removeAttribute('active');
			});

			// Add active attribute to clicked nav link
			this.setAttribute('active', '');

			// Animate current page out
			currentActive.classList.add('exit');

			// After exit animation completes, switch pages
			setTimeout(() => {
				// Hide all pages
				document.querySelectorAll('.page-content').forEach(page => {
					page.classList.remove('active');
					page.classList.remove('exit');
				});

				// Show target page
				document.getElementById(targetPage).classList.add('active');

				// Update URL hash
				window.location.hash = targetPage;
			}, 500); // Match this to your CSS transition time
		});
	});

	// Handle initial page load from URL hash
	function handleHashChange() {
		const hash = window.location.hash.substring(1) || 'home';
		const targetLink = document.querySelector(`comp-dd[data-page="${hash}"]`);

		if (targetLink) {
			// Remove active attribute from all links
			document.querySelectorAll('comp-dd.nav-link').forEach(navLink => {
				navLink.removeAttribute('active');
			});

			// Add active attribute to current link
			targetLink.setAttribute('active', '');

			// Hide all pages
			document.querySelectorAll('.page-content').forEach(page => {
				page.classList.remove('active');
			});

			// Show target page
			document.getElementById(hash).classList.add('active');
		}
	}

	// Handle hash change events
	window.addEventListener('hashchange', handleHashChange);

	// Handle initial page load
	handleHashChange();
});

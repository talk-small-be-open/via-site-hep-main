rendering
renderHeaderOn: html
	html div class: 't-header'; a: 'uk-sticky'; with: [ 
		html ukContainer: [
			html ukNavbar class: 'uk-navbar-transparent'; with: [
				self ifViewportSmall: [
					self renderNavbarSmallContentOn: html ]
				else: [
					self renderNavbarContentOn: html ]
	]]]
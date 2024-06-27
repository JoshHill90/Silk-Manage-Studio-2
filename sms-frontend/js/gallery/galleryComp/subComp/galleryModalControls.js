export class ModalControls {
	constructor(Gallery) {
		this.gallery = Gallery
	}
	// hides all modal pages, then shows the loading page
	onPageLoad() {
		// stat on details page
		this.hideAllPages()
		this.showLoading()
		this.btnListener()
		// need to lock btn's while the loading page is showing
	}
	// show the selected page 
	getPage(setPage) {
		this.hideAllPages();

		switch (setPage) {
			case "details":
				this.gallery.detailsPage.classList.remove("hide");
				this.gallery.detailsPage.classList.add("show");
				break;
			case "settings":
				this.gallery.settingsPage.classList.remove("hide");
				this.gallery.settingsPage.classList.add("show");
				break;
			case "share":
				this.gallery.sharePage.classList.remove("hide");
				this.gallery.sharePage.classList.add("show");
				break;
			case "images":
				this.gallery.imagesPage.classList.remove("hide");
				this.gallery.imagesPage.classList.add("show");
				break;
			case "delete":
				console.log(this.gallery.deletePage);
				this.gallery.deletePage.classList.remove("hide");
				this.gallery.deletePage.classList.add("show");
				break;
		}
	}

	// add's btn listiners for each btn to call the getPage fucntion
	btnListener() {
		this.gallery.detailsBtn.addEventListener('click', () => {
			this.getPage("details")
		})
		this.gallery.settingsBtn.addEventListener('click', () => {
			this.getPage("settings")
		})
		this.gallery.shareBtn.addEventListener('click', () => {
			this.getPage("share")
		})
		this.gallery.imagesBtn.addEventListener('click', () => {
			this.getPage("images")
		})
		this.gallery.deleteBtn.addEventListener('click', () => {
			this.getPage("delete")
		})
	}
	// shows the loading page
	showLoading() {
		this.gallery.loadingPage.classList.remove("hide")
		this.gallery.loadingPage.classList.add("show")

	}

	// hides all pages
	hideAllPages() {
		const pages = [
			this.gallery.detailsPage,
			this.gallery.sharePage,
			this.gallery.settingsPage,
			this.gallery.imagesPage,
			this.gallery.deletePage,
			this.gallery.loadingPage
		];

		pages.forEach(page => {
			page.classList.remove("show");
			page.classList.add("hide");
		});
	}

}
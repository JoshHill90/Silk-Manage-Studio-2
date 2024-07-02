export class GalleryFunctions {
	constructor(Gallery, Controls, GalleryListWindows) {
		this.BaseUrl = Gallery.BaseUrl
		this.backEndToken = Gallery.backEndToken

		this.displayShareForm = Gallery.displayShareForm
		this.displaySettingsForm = Gallery.displaySettingsForm
		this.deleteGalleryBtn = Gallery.deleteGalleryBtn
		this.createGalleryForm = Gallery.createGalleryForm
		this.controls = Controls
		this.galleryListWindows = GalleryListWindows
	}

	init() {
		this.displayShare()
		this.displaySettings()
		this.deleteGallery()
		this.createGallery()
	}

	displayShare() {
		this.displayShareForm.addEventListener('submit', (submited) => {

			submited.preventDefault();
			submited.target.hidden = true
			const galleryId = document.getElementById("gallIDHolder").value
			const ShareUrl = document.getElementById('ShareUrl');
			const expire = document.getElementById('expire').value
			const randomOrder = document.getElementById('randomOrder').checked
			const downloadsAllowed = document.getElementById('downloadsAllowed').checked
			const views = document.getElementById('views').value


			const formData = {
				'expiryDate': expire,
				"random": randomOrder,
				'downloads': downloadsAllowed,
				"views": views
			}

			fetch(this.BaseUrl + `gallery/api/v1/${galleryId}/share/`, {
				method: 'POST',
				body: JSON.stringify(formData),
				credentials: 'same-origin',
				headers: {
					'Authorization': 'Token ' + this.backEndToken,
					'X-CSRFToken': this.backEndToken,
					'Content-Type': 'application/json'
				}
			})
				.then(response => {
					//response check
					// if it's showing with an error, the system will toss and erro, if it's 
					if (!response.ok) {
						throw new Error(`HTTP error! Status: please refresh and try again`);
					}
					return response.json()
				})
				.then(data => {
					this.galleryListWindows.clearSharedLinkList()

					ShareUrl.value = data.url
					submited.target.hidden = false
				})
				.then(() => {
					this.galleryListWindows.getSharedLinks()
					document.getElementById('expire').value = 90;
					document.getElementById('randomOrder').checked = false;
					document.getElementById('downloadsAllowed').checked = false;
					document.getElementById('views').value = '';
				})
				.catch(error => {
					// Handle errors
					console.error('Error:', error);
					submited.target.hidden = false
				});
		})
	}

	displaySettings() {

		this.displaySettingsForm.addEventListener('click', (submited) => {
			this.controls.onPageLoad()
			submited.preventDefault();
			let setting1
			let setting2
			const galleryId = document.getElementById("gallIDHolder").value
			const visiableDisplay = document.getElementById('externalAccess').checked;
			const siteDisplay = document.getElementById('listAccess').checked;

			if (visiableDisplay) {
				setting1 = "on"
			} else {
				setting1 = "off"
			}

			if (siteDisplay) {
				setting2 = "on"
			} else {
				setting2 = "off"
			}

			let formData = [
				setting1,
				setting2,
			]

			fetch(this.BaseUrl + `gallery/api/v1/${galleryId}/settings/`, {
				method: 'PUT',
				body: JSON.stringify({ "settingsUpdate": formData }),
				credentials: 'same-origin',
				headers: {
					'Authorization': 'Token ' + this.backEndToken,
					'X-CSRFToken': this.backEndToken,
					'Content-Type': 'application/json'
				}

			})
				.then(response => {
					//response check
					// if it's showing with an error, the system will toss and erro, if it's 
					if (!response.ok) {
						throw new Error(`HTTP error! Status: please refresh and try again`);
					}
				})
				.then(() => {
					this.controls.getPage("settings")
				})
				.catch(error => {
					// Handle errors
					console.error('Error:', error);
				});
		})
	}


	deleteGallery() {
		deleteGalleryBtn.addEventListener('click', (submited) => {
			submited.preventDefault();
			this.controls.onPageLoad()
			const galleryId = document.getElementById("gallIDHolder").value

			fetch(this.BaseUrl + `gallery/api/v1/${galleryId}/delete/`, {
				method: 'DELETE',
				credentials: 'same-origin',
				headers: {
					'Authorization': 'Token ' + this.backEndToken,
					'X-CSRFToken': this.backEndToken,
					'Content-Type': 'application/json'
				}
			})
				.then(response => {
					//response check
					// if it's showing with an error, the system will toss and erro, if it's 
					if (!response.ok) {
						throw new Error(`HTTP error! Status: please refresh and try again`);
					}
					document.location.reload();
				})

				.catch(error => {
					// Handle errors
					console.error('Error:', error);
				});
		})
	}

	createGallery() {

		createGalleryForm.addEventListener('submit', (submited) => {
			submited.preventDefault();
			submited.target.hidden = true
			const namedDisplay = document.getElementById('createGalleryInput').value;
			let formData = { 'name': namedDisplay }
			fetch(this.BaseUrl + `gallery/api/v1/create/`, {
				method: 'POST',
				credentials: 'same-origin',
				body: JSON.stringify(formData),
				headers: {
					'Authorization': 'Token ' + this.backEndToken,
					'X-CSRFToken': this.backEndToken,
					'Content-Type': 'application/json'
				}
			})
				.then(response => {
					//response check
					// if it's showing with an error, the system will toss and erro, if it's 
					if (!response.ok) {
						throw new Error(`HTTP error! Status: please refresh and try again`);
					}
					document.location.reload();
				})

				.catch(error => {
					// Handle errors
					console.error('Error:', error);
				});
		})
	}

}

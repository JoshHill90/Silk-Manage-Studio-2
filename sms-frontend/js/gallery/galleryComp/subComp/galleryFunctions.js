export class GalleryFunctions {
	constructor(Gallery, Controls) {
		this.BaseUrl = Gallery.BaseUrl
		this.backEndToken = Gallery.backEndToken

		this.displayShareForm = Gallery.displayShareForm
		this.displaySettingsForm = Gallery.displaySettingsForm
		this.deleteGalleryBtn = Gallery.deleteGalleryBtn
		this.createGalleryForm = Gallery.createGalleryForm
		this.controls = Controls
	}

	init() {
		displayShare(this.displayShareForm, this.BaseUrl, this.backEndToken)
		displaySettings(this.displaySettingsForm, this.BaseUrl, this.backEndToken, this.controls)
		deleteGallery(this.deleteGalleryBtn, this.BaseUrl, this.backEndToken, this.controls)
		createGallery(this.createGalleryForm, this.BaseUrl, this.backEndToken)
	}
}

function displayShare(displayShareForm, BaseUrl, backEndToken) {
	displayShareForm.addEventListener('submit', (submited) => {
		submited.preventDefault();
		submited.target.hidden = true
		const galleryId = document.getElementById("gallIDHolder").value
		const ShareUrl = document.getElementById('ShareUrl');
		const expire = document.getElementById('expire').value
		const randomOrder = document.getElementById('randomOrder').checked
		const downloadsAllowed = document.getElementById('downloadsAllowed').checked
		const views = document.getElementById('views').value

		let random
		let download

		if (randomOrder) {
			random = "on"
		} else {
			random = "off"
		}

		if (downloadsAllowed) {
			download = "on"
		} else {
			download = "off"
		}

		const formData = {
			'expiryDate': expire,
			"random": random,
			'downloads': download,
			"views": views
		}

		fetch(BaseUrl + `gallery/api/v1/${galleryId}/share/`, {
			method: 'POST',
			body: JSON.stringify(formData),
			credentials: 'same-origin',
			headers: {
				'Authorization': 'Token ' + backEndToken,
				'X-CSRFToken': backEndToken,
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
				ShareUrl.value = data.url
				submited.target.hidden = false
			})
			.catch(error => {
				// Handle errors
				console.error('Error:', error);
				submited.target.hidden = false
			});
	})
}

function displaySettings(displaySettingsForm, BaseUrl, backEndToken, controls) {
	controls.hideAllPages()
	controls.showLoading()
	displaySettingsForm.addEventListener('click', (submited) => {
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

		fetch(BaseUrl + `gallery/api/v1/${galleryId}/settings/`, {
			method: 'PUT',
			body: JSON.stringify({ "settingsUpdate": formData }),
			credentials: 'same-origin',
			headers: {
				'Authorization': 'Token ' + backEndToken,
				'X-CSRFToken': backEndToken,
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


function deleteGallery(deleteGalleryBtn, BaseUrl, backEndToken, controls) {
	controls.hideAllPages()
	controls.showLoading()
	deleteGalleryBtn.addEventListener('click', (submited) => {
		submited.preventDefault();
		const galleryId = document.getElementById("gallIDHolder").value

		fetch(BaseUrl + `gallery/api/v1/${galleryId}/delete/`, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Authorization': 'Token ' + backEndToken,
				'X-CSRFToken': backEndToken,
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

function createGallery(createGalleryForm, BaseUrl, backEndToken) {

	createGalleryForm.addEventListener('submit', (submited) => {
		submited.preventDefault();
		submited.target.hidden = true
		const namedDisplay = document.getElementById('createGalleryInput').value;
		let formData = { 'name': namedDisplay }
		fetch(BaseUrl + `gallery/api/v1/create/`, {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify(formData),
			headers: {
				'Authorization': 'Token ' + backEndToken,
				'X-CSRFToken': backEndToken,
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


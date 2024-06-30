export class SharedModal {

	constructor(Gallery) {

		// Input values
		this.gallery = Gallery
		// Mutable values
		this.existingExpire = Gallery.existingExpire
		this.existingRandomOrder = Gallery.existingRandomOrder
		this.existingDownloadsAllowed = Gallery.existingDownloadsAllowed
		this.existingViews = Gallery.existingViews
		// Immutable values
		this.existingLink = Gallery.existingLink

		this.BaseUrl = Gallery.BaseUrl
		this.backEndToken = Gallery.backEndToken
	}

	init() {
		this.getSharedLink()
	}

	updateSharedLink() {

		const formData = {
			'expiryDate': this.existingExpire.value,
			"random": this.existingRandomOrder.checked,
			'downloads': this.existingDownloadsAllowed.checked,
			"views": this.existingViews.value
		}

		fetch(this.BaseUrl + `gallery/api/v1/shared-links/${this.gallery.sharedLinkId}/update/`, {
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
				return { "status": "success" }
			})
			.catch(error => {
				// Handle errors
				console.error('Error:', error);
				return { "status": `failed ${error}` }
			});

	}

	getSharedLink() {
		fetch(this.BaseUrl + `gallery/api/v1/shared-links/${this.gallery.sharedLinkId}/`, {
			method: 'GET',
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
			.then((data) => {
				const sharedLinkData = JSON.parse(data)
				console.log(sharedLinkData)
				this.existingExpire.value = this.daysUntil(sharedLinkData.data.expire)
				this.readSettings(sharedLinkData.data.random_order, sharedLinkData.data.export)
				this.existingLink.value = sharedLinkData.link
				this.selectOptionByValue(sharedLinkData.data.status)
			})
			.catch(error => {
				// Handle errors
				console.error('Error:', error);
				return { "status": `failed ${error}` }
			});

	}

	deleteSharedLink() {


		fetch(this.BaseUrl + `gallery/api/v1/shared-links/${this.gallery.sharedLinkId}/delete/`, {
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
				return { "status": `failed ${error}` }
			});

	}

	daysUntil(targetDate) {
		// Get today's date
		const today = new Date();

		// Parse the target date
		const target = new Date(targetDate);

		// Calculate the difference in time (in milliseconds)
		const diffTime = target - today;

		// Convert the difference from milliseconds to days
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return diffDays;
	}

	// to set the checkboxes for the settings page. 
	readSettings(random, download) {
		console.log(random, download)
		if (random) {
			this.existingRandomOrder.checked = true
		} else {
			this.existingRandomOrder.checked = false
		}

		if (download) {
			this.existingDownloadsAllowed.checked = true
		} else {
			this.existingDownloadsAllowed.checked = false
		}
	}
	selectOptionByValue(value) {
		console.log(this.existingViews)
		for (let option of this.existingViews.options) {
			if (option.value === value) {
				option.selected = true;
				break;
			}
		}
	}
}




export class SharedModal {

	constructor(Gallery, ImageModal, Modal) {

		// Input values
		this.gallery = Gallery
		this.imageModal = ImageModal
		this.modal = Modal
		// Mutable values
		this.existingExpire = Gallery.existingExpire
		this.existingRandomOrder = Gallery.existingRandomOrder
		this.existingDownloadsAllowed = Gallery.existingDownloadsAllowed
		this.existingViews = Gallery.existingViews
		// Immutable values
		this.existingLink = Gallery.existingLink

		this.BaseUrl = Gallery.BaseUrl
		this.backEndToken = Gallery.backEndToken

		this.SharedModalLoader = document.getElementById("SharedModalLoader")
		this.SharedModalRow = document.getElementById("SharedModalRow")
	}

	init() {
		this.gallery.noteHolder.innerHTML = ""
		this.gallery.sharedLinkNotes = []
		this.getSharedLink()
	}

	updateSharedLink() {
		this.SharedModalLoader.hidden = false
		this.SharedModalRow.hidden = true

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
				this.SharedModalLoader.hidden = true
				this.SharedModalRow.hidden = false
				return { "status": "success" }
			})
			.catch(error => {
				// Handle errors
				console.error('Error:', error);
				return { "status": `failed ${error}` }
			});

	}

	getSharedLink() {
		this.SharedModalLoader.hidden = false
		this.SharedModalRow.hidden = true

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
				this.SharedModalLoader.hidden = true
				this.SharedModalRow.hidden = false
				sharedLinkData.notes.forEach((note) => {
					this.gallery.sharedLinkNotes.push(note)
				})

				this.buildNotes()
			})
			.catch(error => {
				// Handle errors
				console.error('Error:', error);
				return { "status": `failed ${error}` }
			});

	}

	deleteSharedLink() {
		this.SharedModalLoader.hidden = false
		this.SharedModalRow.hidden = true

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

	buildNotes() {
		this.gallery.sharedLinkNotes.forEach((note) => {
			console.log(note)
			const noteCol = document.createElement("div")
			const noteTitleRow = document.createElement("div")
			const noteTitleColDate = document.createElement("div")
			const noteTitleColImage = document.createElement("div")
			const noteDate = document.createElement("p")
			const noteLink = document.createElement("button")
			const hrDiv = document.createElement("hr")
			const notePosted = document.createElement("p")


			noteTitleRow.classList.add("row")
			noteTitleColDate.classList.add("col-6")
			noteTitleColImage.classList.add("col-6")

			noteLink.type = "button"
			noteLink.setAttribute("data-bs-toggle", "modal")
			noteLink.setAttribute("data-bs-target", `#imageDetailsModal2`)
			noteLink.classList.add("img-tag-btn")
			noteLink.addEventListener('click', () => {
				this.modal.getImageDetails(note.image)
				this.gallery.notedImage
				this.imageModal.openImageDetails2(
					this.gallery.notedImage.title,
					this.gallery.notedImage.link,
					this.gallery.notedImage.tag
				)
			})
			noteLink.innerHTML = "Image"
			noteDate.innerHTML = `Date: ${note.date}`

			noteDate.classList.add("p-l")
			notePosted.classList.add("p-n")

			notePosted.innerHTML = note.note

			noteTitleColImage.appendChild(noteLink)
			noteTitleColDate.appendChild(noteDate)
			noteTitleRow.appendChild(noteTitleColDate)
			noteTitleRow.appendChild(noteTitleColImage)

			noteCol.appendChild(noteTitleRow)

			noteCol.appendChild(hrDiv)
			noteCol.appendChild(notePosted)
			noteCol.classList.add("col-12", "note-card", "mt-2", "mb-2")


			this.gallery.noteHolder.appendChild(noteCol)
		})


	}
}






export class GalleryObj {
	constructor(Gallery, Controls, GalleryDetailsObj, sharedLinkModal) {
		this.gallery = Gallery
		this.controls = Controls
		this.galleryDetails = GalleryDetailsObj
		this.sharedLinkModal = sharedLinkModal
	}

	getGalleries() {

		//console.log(backEndToken)
		fetch(this.gallery.BaseUrl + "gallery/api/v1/all/", {
			method: 'GET',
			headers: {
				'Authorization': 'Token ' + this.gallery.backEndToken,
				'X-CSRFToken': this.gallery.backEndToken,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				const jsonData = JSON.parse(data)
				const galleryData = jsonData.galleries

				for (let gallertIndex = 0; gallertIndex < galleryData.length; gallertIndex++) {
					let hasHeader
					console.log(galleryData[gallertIndex])

					if (galleryData[gallertIndex].header_image) {
						hasHeader = true
					} else {
						hasHeader = false
					}
					const id = galleryData[gallertIndex].id
					const nmberOfImages = galleryData[gallertIndex].images.length
					const galleryName = galleryData[gallertIndex].name
					const gallSettings = galleryData[gallertIndex].settings

					this.gallery.galleryList.push({
						"header_image": hasHeader,
						"id": id,
						"images": nmberOfImages,
						"name": galleryName,
						"settings": gallSettings
					})

				}
				this.buildGallery()
			})
			.catch((error) => console.error('Error fetching gallery data:', error));
	}

	getSharedLinks() {
		//console.log(backEndToken)
		fetch(this.gallery.BaseUrl + "gallery/api/v1/shared-links/", {
			method: 'GET',
			headers: {
				'Authorization': 'Token ' + this.gallery.backEndToken,
				'X-CSRFToken': this.gallery.backEndToken,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				const jsonData = JSON.parse(data)
				const sahredLinkData = jsonData.links

				for (let linkIndex = 0; linkIndex < sahredLinkData.length; linkIndex++) {
					console.log("id", sahredLinkData[linkIndex].id)
					this.gallery.sharedLinks.push({
						"expire": sahredLinkData[linkIndex].expire,
						"display": sahredLinkData[linkIndex].display,
						"status": sahredLinkData[linkIndex].status,
						"id": sahredLinkData[linkIndex].id
					})

				}
				this.buildSharedLinks()

			})
			.catch((error) => console.error('Error fetching gallery data:', error));
	}

	buildGallery() {
		const galleryWindow = document.getElementById("galleryWindow")

		const loader = document.getElementById("semicircleGal")

		loader.classList.remove("show")
		loader.classList.add("hide")

		this.gallery.galleryList.forEach((gallery) => {
			//console.log("builder", gallery)
			const galRow = document.createElement("div")
			const nameCol = document.createElement("div")
			const imageNumberCol = document.createElement("div")
			const imageHeaderCol = document.createElement("div")

			const nameText = document.createElement("p")
			const imageNumberText = document.createElement("p")
			const imageHeaderText = document.createElement("p")

			nameText.innerHTML = gallery.name
			imageNumberText.innerHTML = gallery.images
			imageHeaderText.innerHTML = gallery.header_image

			galRow.appendChild(nameCol)
			galRow.appendChild(imageNumberCol)
			galRow.appendChild(imageHeaderCol)

			galRow.classList.add("row", "gallery-list-row", "mt-2", "mb-2")
			nameCol.classList.add("col-6")
			imageNumberCol.classList.add("col-3")
			imageHeaderCol.classList.add("col-3")

			nameCol.appendChild(nameText)
			imageNumberCol.appendChild(imageNumberText)
			imageHeaderCol.appendChild(imageHeaderText)
			galRow.setAttribute("data-bs-toggle", "modal")
			galRow.setAttribute("data-bs-target", "#galleryDetails")
			galleryWindow.appendChild(galRow)
			galRow.addEventListener("click", () => {
				this.galleryDetails.init(gallery.id)
			})
		})
	}

	buildSharedLinks() {
		const galleryWindow = document.getElementById("sahredWindow")

		const loader = document.getElementById("semicircleLink")

		loader.classList.remove("show")
		loader.classList.add("hide")

		this.gallery.sharedLinks.forEach((gallery) => {
			//console.log("builder", gallery)
			const galRow = document.createElement("div")
			const nameCol = document.createElement("div")
			const imageNumberCol = document.createElement("div")
			const imageHeaderCol = document.createElement("div")

			const nameText = document.createElement("p")
			const imageNumberText = document.createElement("p")
			const imageHeaderText = document.createElement("p")

			nameText.innerHTML = gallery.display
			imageNumberText.innerHTML = gallery.expire
			imageHeaderText.innerHTML = gallery.status

			galRow.appendChild(nameCol)
			galRow.appendChild(imageNumberCol)
			galRow.appendChild(imageHeaderCol)

			galRow.classList.add("row", "gallery-list-row", "mt-2", "mb-2")
			nameCol.classList.add("col-6")
			imageNumberCol.classList.add("col-3")
			imageHeaderCol.classList.add("col-3")

			nameCol.appendChild(nameText)
			imageNumberCol.appendChild(imageNumberText)
			imageHeaderCol.appendChild(imageHeaderText)
			galRow.setAttribute("data-bs-toggle", "modal")
			galRow.setAttribute("data-bs-target", "#sharedLinkList")
			galleryWindow.appendChild(galRow)
			galRow.addEventListener("click", () => {
				console.log(gallery.id)
				this.gallery.sharedLinkId = gallery.id
				this.sharedLinkModal.init()
			})
		})
	}
}

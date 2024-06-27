import { imageCardCreator, ceatchGalleryImage, clearCheckedImages } from "../../images/imageComp/subComp/imageCard"

export class GalleryDetailsObj {
	constructor(Gallery, Controls, Modal) {
		this.imageData = Gallery.imageData
		this.gallerId = Gallery.gallerId
		this.galleryData = Gallery.galleryData
		this.BaseUrl = Gallery.BaseUrl
		this.backEndToken = Gallery.backEndToken
		this.galleryModalName = Gallery.galleryModalName
		this.galleryModalIDHolder = Gallery.galleryModalIDHolder
		this.controls = Controls
		this.modal = Modal
	}

	init(galleryID) {
		this.gallerId = galleryID
		this.getGalleryDetails()
		document.getElementById("closeBtn").addEventListener("click", () => {
			this.clearGalleryDetails()
		})

	}

	getGalleryDetails() {
		this.controls.hideAllPages()
		this.controls.showLoading()

		fetch(this.BaseUrl + `/gallery/api/v1/${this.gallerId}/`, {
			method: 'GET',
			headers: {
				'Authorization': 'Token ' + this.backEndToken,
				'X-CSRFToken': this.backEndToken,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				const jsonData = JSON.parse(data)
				const galleryData = jsonData.gallery
				const images = jsonData.images

				const galleryid = galleryData.id
				const galleryName = galleryData.name
				const gallSettings = galleryData.settings

				this.galleryData["name"] = galleryName
				this.galleryData["id"] = galleryid
				this.galleryData["settings"] = gallSettings
				this.gallerId = galleryid

				let imageIdList = []

				for (let galleryImageIndex = 0; galleryImageIndex < images.length; galleryImageIndex++) {
					let imgId = images[galleryImageIndex].id
					let tags = []

					for (let tagI = 0; tagI < images[galleryImageIndex].tags; tagI++) {
						tags.push(images[galleryImageIndex].tags[tagI])
					}
					imageIdList.push(imgId)
					this.imageData.push({
						"id": imgId,
						"title": images[galleryImageIndex].title,
						"tags": tags,
						"imageLink": images[galleryImageIndex].image_link
					})

				}
				ceatchGalleryImage(imageIdList)
				setGallerySettings(gallSettings)
				this.controls.getPage("details")
				this.buildCurrentImages()
				this.galleryModalName.innerHTML = this.galleryData.name
				this.galleryModalIDHolder.value = this.galleryData.id
				return

			})
			.catch((error) => console.error('Error fetching gallery data:', error));
	}
	buildCurrentImages() {
		const currentGalleryRow = document.getElementById("currentGalleryRow")

		//console.log(this.imageData.length)
		for (let currentTmageIndex = 0; currentTmageIndex < this.imageData.length; currentTmageIndex++) {

			let imageLink = this.imageData[currentTmageIndex].imageLink
			let imageId = this.imageData[currentTmageIndex].id
			let imageCard = imageCardCreator(imageLink, imageId, "currentGalleryRow")
			currentGalleryRow.appendChild(imageCard)
		}
	}

	clearGalleryDetails() {
		//console.log("clear")
		clearCheckedImages()
		this.modal.clearModalParts()
		galleryControls.setUpInitPage()
		galleryControls.setLoading()
		this.imageData = []
		this.gallerId = null
		this.galleryData = {}
	}
}

// to set the checkboxes for the settings page. 
function setGallerySettings(binarySettings) {
	//console.log(binarySettings)
	let firstBite = binarySettings[0]
	let secondBite = binarySettings[1]

	if (firstBite === "on") {
		externalAccess.checked = true
	} else {
		externalAccess.checked = false
	}

	if (secondBite == "on") {
		listAccess.checked = true
	} else {
		listAccess.checked = false
	}
}
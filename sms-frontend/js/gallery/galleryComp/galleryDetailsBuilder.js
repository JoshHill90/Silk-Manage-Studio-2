import { imageCardCreator, ceatchGalleryImage, clearCheckedImages } from "../../images/imageComp/subComp/imageCard"

export class GalleryDetailsObj {
	constructor(Gallery, Controls, Modal, ImageModal) {
		this.imageData = Gallery.imageData

		this.galleryData = Gallery.galleryData
		this.BaseUrl = Gallery.BaseUrl
		this.backEndToken = Gallery.backEndToken
		this.galleryModalName = Gallery.galleryModalName
		this.galleryModalIDHolder = Gallery.galleryModalIDHolder
		this.controls = Controls
		this.modal = Modal
		this.gallery = Gallery
		this.imageModal = ImageModal
	}

	init(galleryID) {
		this.gallery.gallerId = galleryID
		this.getGalleryDetails()
		document.getElementById("closeBtn").addEventListener("click", () => {
			this.clearGalleryDetails()
		})

	}

	getGalleryDetails() {
		this.controls.hideAllPages()
		this.controls.showLoading()

		fetch(this.BaseUrl + `/gallery/api/v1/${this.gallery.gallerId}/`, {
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
				this.gallery.gallerId = galleryid

				this.gallery.imageIdList = []

				for (let galleryImageIndex = 0; galleryImageIndex < images.length; galleryImageIndex++) {
					let imgId = images[galleryImageIndex].id
					let tags = []
					//console.log(images[galleryImageIndex].tag)
					if (images[galleryImageIndex].tag) {
						for (let tagI = 0; tagI < images[galleryImageIndex].tag.length; tagI++) {
							tags.push(images[galleryImageIndex].tag[tagI])
						}
					}

					this.gallery.imageIdList.push(imgId)
					this.imageData.push({
						"id": imgId,
						"title": images[galleryImageIndex].title,
						"tags": tags,
						"imageLink": images[galleryImageIndex].image_link
					})

				}
				ceatchGalleryImage(this.gallery.imageIdList)
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

		//console.log(this.imageData.length)
		for (let currentImageIndex = 0; currentImageIndex < this.imageData.length; currentImageIndex++) {

			let imageLink = this.imageData[currentImageIndex].imageLink
			let imageId = this.imageData[currentImageIndex].id
			let imageTitle = this.imageData[currentImageIndex].title
			let imageTag = this.imageData[currentImageIndex].tags
			let imageCard = imageCardCreator(
				imageLink,
				imageId,
				imageTitle,
				imageTag,
				"imageDetailsModal",
				"detailsCards",
				this.imageModal
			)
			this.gallery.currentGalleryRow.appendChild(imageCard)
		}
	}

	clearGalleryDetails() {
		//console.log("clear")
		clearCheckedImages()
		this.modal.clearModalParts()
		this.controls.onPageLoad()
		this.imageData = []
		this.gallery.gallerId = null
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
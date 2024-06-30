export class GalleryDetailFunctions {
	constructor(Gallery, Controls, galleryDetails) {
		this.BaseUrl = Gallery.BaseUrl
		this.backEndToken = Gallery.backEndToken
		this.controls = Controls
		this.galleryDetails = galleryDetails
	}

	init() {

		document.getElementById("addImagesBtn").addEventListener("click", () => {
			this.controls.hideAllPages()
			this.controls.showLoading()
			const allImages = document.querySelectorAll(".allImgCards");
			let checkedIds = []
			allImages.forEach((imgCard) => {

				if (imgCard.checked) {
					checkedIds.push(imgCard.id)
				}

			})

			fetch(this.BaseUrl + `gallery/api/v1/${this.galleryDetails.gallerId}/add/`, {
				method: 'POST',
				body: JSON.stringify({ "galleryArray": checkedIds }),
				headers: {
					'Authorization': 'Token ' + this.backEndToken,
					'X-CSRFToken': this.backEndToken,
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res.json())
				.then(() => {
					document.location.reload();
					return
				})
				.catch((error) => {
					console.error('Error fetching gallery data:', error)
					this.controls.getPage("details")
					alert("There was a problem with this request, please refresh and retry")
					return
				});

		})

		document.getElementById("removeImageBtn").addEventListener("click", () => {
			this.controls.hideAllPages()
			this.controls.showLoading()
			const allImages = document.querySelectorAll(".detailsCards");
			let checkedIds = []
			allImages.forEach((imgCard) => {

				if (imgCard.checked) {
					checkedIds.push(imgCard.id)
				}

			})

			fetch(this.BaseUrl + `gallery/api/v1/${this.galleryDetails.gallerId}/remove/`, {
				method: 'POST',
				body: JSON.stringify({ "galleryArray": checkedIds }),
				headers: {
					'Authorization': 'Token ' + this.backEndToken,
					'X-CSRFToken': this.backEndToken,
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res.json())
				.then(() => {
					document.location.reload();
					return
				})
				.catch((error) => {
					console.error('Error fetching gallery data:', error)
					this.controls.getPage("details")
					alert("There was a problem with this request, please refresh and retry")
					return
				});

		})

		document.getElementById("clearGalleryBtn").addEventListener("click", () => {
			this.controls.hideAllPages()
			this.controls.showLoading()

			fetch(this.BaseUrl + `gallery/api/v1/${this.galleryDetails.gallerId}/clear/`, {
				method: 'POST',
				headers: {
					'Authorization': 'Token ' + this.backEndToken,
					'X-CSRFToken': this.backEndToken,
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res.json())
				.then(() => {
					document.location.reload();
					return
				})
				.catch((error) => {
					console.error('Error fetching gallery data:', error)
					this.controls.getPage("details")
					alert("There was a problem with this request, please refresh and retry")
					return
				});

		})

		document.getElementById("setHeaderBtn").addEventListener("click", () => {

			const selectedImages = document.querySelectorAll(".detailsCards");
			let allImages = []

			selectedImages.forEach((selectImage) => {
				if (selectImage.checked === true) {
					allImages.push(selectImage)
				}

			})
			let headerId
			console.log(selectedImages)
			if (allImages.length > 1) {
				alert("Please select only one image for a header")
				return

			} else if (allImages.length === 0) {
				alert("Please select a image")
				return
			} else {
				headerId = allImages[0].id
				this.controls.hideAllPages()
				this.controls.showLoading()
			}


			fetch(this.BaseUrl + `gallery/api/v1/${this.galleryDetails.gallerId}/header/${headerId}/`, {
				method: 'POST',
				headers: {
					'Authorization': 'Token ' + this.backEndToken,
					'X-CSRFToken': this.backEndToken,
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res.json())
				.then(() => {
					document.location.reload();
					return
				})
				.catch((error) => {
					console.error('Error fetching gallery data:', error)
					this.controls.getPage("details")
					alert("There was a problem with this request, please refresh and retry")
					return
				});

		})
	}
}
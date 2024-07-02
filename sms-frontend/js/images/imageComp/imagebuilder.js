import { imageCardCreator } from "./subComp/imageCard.js"

export class ImageBuilder {
	constructor(ImagePage, ImageModal) {
		this.imagePage = ImagePage
		this.imageModal = ImageModal
	}

	async init() {
		await this.setAllImages()
		this.createImageCards()
		this.createAllImagePageList()
	}

	clearImageHolder() {
		this.imagePage.allImages = []
		this.imagePage.imgHolderMain.innerHTML = ""
	}

	async getAllImages() {
		try {
			const response = await fetch(this.imagePage.BaseUrl + `gallery/api/v1/images/${this.imagePage.currentPage
				}/?orderBy=${this.imagePage.sortBy.value
				}${this.imagePage.searchTags.value ? `&tags=${this.imagePage.searchTags.value}` : ""
				}`, {
				method: 'GET',
				headers: {
					'Authorization': 'Token ' + this.imagePage.backEndToken,
					'X-CSRFToken': this.imagePage.backEndToken,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			const resp = JSON.parse(data)
			const allImagesResp = resp.images;
			const lastPageResp = resp.last_page;
			const respdata = { "lastpage": lastPageResp, "allImages": allImagesResp };

			return respdata;

		} catch (error) {
			console.error('Error fetching gallery data:', error);
			throw error;
		}
	}

	async setAllImages() {

		const responseData = await this.getAllImages()
		this.imagePage.lastpage = responseData.lastpage
		responseData.allImages.forEach((image) => {
			this.imagePage.allImages.push(image)
		})
	}

	createImageCards() {

		this.imagePage.allImages.forEach((image) => {
			let imgCard = imageCardCreator(
				image.image_link,
				image.id,
				image.title,
				image.tag,
				"imageDetailsModal",
				"mainCards",
				this.imageModal
			)
			this.imagePage.imgHolderMain.appendChild(imgCard)
		})
	}
	createAllImagePageList() {
		// only used if the lisrt is less then 5 

		this.imagePage.lastpage
		//console.log(this.imagePage.currentPage, "current page")
		this.imagePage.numPage1

		if (this.imagePage.lastpage < 5 || this.imagePage.currentPage <= 3) {
			this.imagePage.numPageList.forEach((value, index) => {

				if (index + 1 <= this.imagePage.lastpage) {
					//console.log(index + 1)
					value.innerHTML = index + 1

				} else {
					value.hidden = true
				}
				this.setCurrentPageColor(value, (index + 1))

			})
		} else {
			this.imagePage.numPageList.forEach((aNumElm, index) => {
				aNumElm.hidden = false
				aNumElm.innerHTML = (this.imagePage.currentPage + (index - 2))
				this.setCurrentPageColor(aNumElm, this.imagePage.currentPage)
				//console.log(aNumElm.innerHTML, this.imagePage.lastpage)
				if (aNumElm.innerHTML > this.imagePage.lastpage) {
					console.log(aNumElm.innerHTML)
					aNumElm.hidden = true

				} else {
					aNumElm.hidden = false
				}
			})

		}
		this.imagePage.allImgNext.hidden = false
		this.imagePage.allImgLast.hidden = false
		this.imagePage.allImgBack.hidden = false
		this.imagePage.allImgFirsts.hidden = false
		// for next and back buttons
		console.log(this.imagePage.lastpage, this.imagePage.currentPage)
		if ((this.imagePage.currentPage + 1) == this.imagePage.lastpage) {
			this.imagePage.allImgNext.hidden = true
		}
		if (this.imagePage.currentPage == this.imagePage.lastpage) {
			this.imagePage.allImgNext.hidden = true
			this.imagePage.allImgLast.hidden = true
		}
		if (this.imagePage.currentPage === 2) {
			this.imagePage.allImgBack.hidden = true
		}
		if (this.imagePage.currentPage === 1) {
			this.imagePage.allImgBack.hidden = true
			this.imagePage.allImgFirsts.hidden = true
		}
	}
	setCurrentPageColor(value) {
		// set current number color
		if (value.innerHTML == this.imagePage.currentPage) {
			value.classList.add("set-page")
		} else {
			value.classList.remove("set-page")
		}
	}
	async getImageDetails(imageID) {

		this.imagePage.notedImage = {}
		this.imagePage.allImages.forEach((image) => {
			if (imageID == image.id) {
				this.imagePage.notedImage["title"] = image.title
				this.imagePage.notedImage["tag"] = image.tag
				this.imagePage.notedImage["link"] = image.image_link
			}
		})
	}
}
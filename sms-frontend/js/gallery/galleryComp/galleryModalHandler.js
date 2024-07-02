
export class GalleryModal {

	constructor(Gallery) {
		this.gallery = Gallery
	}

	async getAllImages() {
		try {
			const response = await fetch(this.gallery.BaseUrl + `gallery/api/v1/images/${this.gallery.currentPage
				}/?orderBy=${this.gallery.sortBy.value
				}${this.gallery.searchTags.value ? `&tags=${this.gallery.searchTags.value}` : ""
				}`, {
				method: 'GET',
				headers: {
					'Authorization': 'Token ' + this.gallery.backEndToken,
					'X-CSRFToken': this.gallery.backEndToken,
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


	clearModalParts() {
		this.gallery.galleryModalName.innerHTML = "";
		this.gallery.currentGalleryRow.innerHTML = "";
	}
	clearCurrentGalleryModal() {
		this.gallery.currentGalleryRow.innerHTML = "";
	}
	createAllImagePageList() {
		// only used if the lisrt is less then 5 

		this.gallery.lastpage
		//console.log(this.gallery.currentPage, "current page")
		this.gallery.numPage1

		if (this.gallery.lastpage < 5 || this.gallery.currentPage <= 3) {
			this.gallery.numPageList.forEach((value, index) => {

				if (index + 1 <= this.gallery.lastpage) {
					//console.log(index + 1)
					value.innerHTML = index + 1

				} else {
					value.hidden = true
				}
				this.setCurrentPageColor(value, (index + 1))

			})
		} else {
			this.gallery.numPageList.forEach((aNumElm, index) => {
				aNumElm.hidden = false
				aNumElm.innerHTML = (this.gallery.currentPage + (index - 2))
				this.setCurrentPageColor(aNumElm, this.gallery.currentPage)
				//console.log(aNumElm.innerHTML, this.gallery.lastpage)
				if (aNumElm.innerHTML > this.gallery.lastpage) {
					console.log(aNumElm.innerHTML)
					aNumElm.hidden = true

				} else {
					aNumElm.hidden = false
				}
			})

		}
		this.gallery.allImgNext.hidden = false
		this.gallery.allImgLast.hidden = false
		this.gallery.allImgBack.hidden = false
		this.gallery.allImgFirsts.hidden = false
		// for next and back buttons
		console.log(this.gallery.lastpage, this.gallery.currentPage)
		if ((this.gallery.currentPage + 1) == this.gallery.lastpage) {
			this.gallery.allImgNext.hidden = true
		}
		if (this.gallery.currentPage == this.gallery.lastpage) {
			this.gallery.allImgNext.hidden = true
			this.gallery.allImgLast.hidden = true
		}
		if (this.gallery.currentPage === 2) {
			this.gallery.allImgBack.hidden = true
		}
		if (this.gallery.currentPage === 1) {
			this.gallery.allImgBack.hidden = true
			this.gallery.allImgFirsts.hidden = true
		}
	}
	setCurrentPageColor(value) {
		// set current number color
		if (value.innerHTML == this.gallery.currentPage) {
			value.classList.add("set-page")
		} else {
			value.classList.remove("set-page")
		}
	}

	async getImageDetails(imageID) {

		this.gallery.notedImage = {}
		this.gallery.allImages.forEach((image) => {
			if (imageID == image.id) {
				this.gallery.notedImage["title"] = image.title
				this.gallery.notedImage["tag"] = image.tag
				this.gallery.notedImage["link"] = image.image_link
			}
		})
	}
}




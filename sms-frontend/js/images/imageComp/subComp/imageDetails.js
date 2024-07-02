export class ImageModal {
	constructor(Modal) {
		this.imageNameElm = Modal.imageNameElm
		this.imageLinkElm = Modal.imageLinkElm
		this.imageTagElm = Modal.imageTagElm
		this.imageDetailHolder = Modal.imageDetailHolder

		this.imageNameElm2 = Modal.imageNameElm2
		this.imageLinkElm2 = Modal.imageLinkElm2
		this.imageTagElm2 = Modal.imageTagElm2
		this.imageDetailHolder2 = Modal.imageDetailHolder2
	}

	openImageDetails(imgName, imgLink, imgTags) {
		this.imageNameElm.innerHTML = ""
		this.imageLinkElm.innerHTML = ""
		this.imageTagElm.innerHTML = ""

		this.imageNameElm.innerHTML = imgName
		this.imageLinkElm.innerHTML = `<a href=${imgLink} target="_blank">Link</a>`
		this.imageDetailHolder.style.backgroundImage = `url("${imgLink}")`

		console.log(this.imageDetailHolder.style.backgroundImage)
		if (imgTags.length > 0) {

			imgTags.forEach(tag => {
				const tagBtn = document.createElement("button")
				tagBtn.classList.add("img-tag-btn")
				tagBtn.innerHTML = tag.name
				this.imageTagElm.appendChild(tagBtn)
			})
		}


	}

	openImageDetails2(imgName, imgLink, imgTags) {
		this.imageNameElm2.innerHTML = ""
		this.imageLinkElm2.innerHTML = ""
		this.imageTagElm2.innerHTML = ""

		this.imageNameElm2.innerHTML = imgName
		this.imageLinkElm2.innerHTML = `<a href=${imgLink} target="_blank">Link</a>`
		this.imageDetailHolder2.style.backgroundImage = `url("${imgLink}")`

		console.log(this.imageDetailHolder2.style.backgroundImage)
		if (imgTags.length > 0) {

			imgTags.forEach(tag => {
				const tagBtn = document.createElement("button")
				tagBtn.classList.add("img-tag-btn")
				tagBtn.innerHTML = tag.name
				this.imageTagElm2.appendChild(tagBtn)
			})
		}
	}
}
export class ImageModal {
	constructor(Modal) {
		this.imageNameElm = Modal.imageNameElm
		this.imageLinkElm = Modal.imageLinkElm
		this.imageTagElm = Modal.imageTagElm
		this.imageDetailHolder = Modal.imageDetailHolder

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
}


export function imageCardCreator(imageLink, imageId, modalName) {


	// create card
	const cardColumn = document.createElement("div")
	const cardBody = document.createElement("div")
	const cardCheckBox = document.createElement("input")
	const cardImage = document.createElement("div")
	const cardInfoIcon = document.createElement("div")

	// add calsses
	cardColumn.classList.add("col", "mt-2", "mb-2")
	cardBody.classList.add("image-card-body")
	cardImage.classList.add("card-image")
	cardInfoIcon.classList.add("card-info")
	cardCheckBox.type = "checkbox"
	cardCheckBox.id = imageId

	cardCheckBox.hidden = true
	cardCheckBox.classList.add(modalName)
	cardImage.style.backgroundImage = `url('${imageLink}')`
	// set image

	// append elements
	cardBody.appendChild(cardCheckBox)
	cardColumn.appendChild(cardBody)
	cardBody.appendChild(cardInfoIcon)
	cardBody.appendChild(cardImage)

	//set Modal settings
	cardInfoIcon.setAttribute("data-bs-toggle", "modal")
	cardInfoIcon.setAttribute("data-bs-target", `#${modalName}`)

	// create button to open image details
	cardInfoIcon.addEventListener("click", () => {
		//console.log(imageId)
	})
	imageSelection(cardBody, cardCheckBox)
	return cardColumn
}

export function imageSelection(imageElemnt, cardCheckBox) {

	imageElemnt.addEventListener("click", () => {
		// check if checkbox is selected if so, unslecet and vice versa
		if (cardCheckBox.checked === false) {
			cardCheckBox.checked = true
			imageElemnt.classList.add("image-card-body-active")
		} else {
			cardCheckBox.checked = false
			imageElemnt.classList.remove("image-card-body-active")
		}
	})

}

export function ceatchGalleryImage(imageIdList) {
	const allImages = document.querySelectorAll(".imageDetails");

	allImages.forEach((imgCard) => {

		if (imageIdList.includes(parseInt(imgCard.id))) {
			console.log("hit")
			imgCard.checked = true
			imgCard.parentNode.classList.add("image-card-body-active")
		}
	})
}

export function clearCheckedImages() {
	const allImages = document.querySelectorAll(".imageDetails");

	allImages.forEach((imgCard) => {

		imgCard.checked = false
		imgCard.parentNode.classList.remove("image-card-body-active")

	})
}


export function constructAllImageCardBuild(allImages, allImageHolder) {
	for (let allImageIndex = 0; allImageIndex < allImages.length; allImageIndex++) {
		//console.log(allImageHolder)
		let imageCol = imageCardCreator(allImages[allImageIndex].image_link, allImages[allImageIndex].id, "imageDetails")
		allImageHolder.appendChild(imageCol)
	}
}
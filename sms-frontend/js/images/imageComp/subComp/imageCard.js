

export function imageCardCreator(imageLink, imageId, imageTitle, imageTags, modalName, cardMarker, modalObject) {


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
	cardInfoIcon.classList.add("card-info", "text-center")
	cardCheckBox.type = "checkbox"
	cardCheckBox.id = imageId

	cardCheckBox.hidden = true
	cardCheckBox.classList.add(cardMarker)
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
	cardInfoIcon.innerHTML = `<i class="fa-solid fa-2xs fa-magnifying-glass"></i>`

	// create button to open image details
	cardInfoIcon.addEventListener("click", (e) => {
		e.stopPropagation();
		modalObject.openImageDetails(imageTitle, imageLink, imageTags)
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
	const allImages = document.querySelectorAll(".allImgCards");

	allImages.forEach((imgCard) => {

		if (imageIdList.includes(parseInt(imgCard.id))) {
			console.log("hit")
			imgCard.checked = true
			imgCard.parentNode.classList.add("image-card-body-active")
		}
	})
}

export function clearCheckedImages() {
	const allImages = document.querySelectorAll(".allImgCards");

	allImages.forEach((imgCard) => {

		imgCard.checked = false
		imgCard.parentNode.classList.remove("image-card-body-active")

	})
}


export function selectAndDeselect() {
	const allSlectedImages = document.querySelectorAll('.allImgCards[type="checkbox"]:checked');
	const allImages = document.querySelectorAll('.allImgCards');
	console.log(allImages)
	if (allSlectedImages.length > 0) {
		allImages.forEach((imgCard) => {

			imgCard.checked = false
			imgCard.parentNode.classList.remove("image-card-body-active")

		})
	} else {
		console.log("select")
		allImages.forEach((imgCard) => {

			imgCard.checked = true
			imgCard.parentNode.classList.add("image-card-body-active")

		})
	}
}

export function constructAllImageCardBuild(allImages, allImageHolder, imageModal) {
	for (let allImageIndex = 0; allImageIndex < allImages.length; allImageIndex++) {

		let imageCol = imageCardCreator(
			allImages[allImageIndex].image_link,
			allImages[allImageIndex].id,
			allImages[allImageIndex].title,
			allImages[allImageIndex].tag,
			"imageDetailsModal", "allImgCards",
			imageModal
		)
		allImageHolder.appendChild(imageCol)
	}
}
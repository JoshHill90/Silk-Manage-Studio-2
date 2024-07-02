import { SubNav } from "../sideNavComp/subNav";
import sideNave from "../sideNavComp/sideNav.js"
import { ImageModal } from "./imageComp/subComp/imageDetails.js";
import { ImageBuilder } from "./imageComp/imagebuilder.js";
import { BaseUrl } from "../main.js"
import { ImageControls } from "./imageComp/subComp/imageControls.js";

class ImagePage {
	constructor() {
		// page controls and state
		this.toggleButton = document.querySelector('.toggle-btn')
		this.state = null

		this.subNavObject = document.getElementById('subNavObj')

		this.backEndToken = document.cookie.split('smstoken=')[1].split(";")[0];
		this.BaseUrl = BaseUrl;

		this.allImages = []
		this.currentPage = 1;
		this.lastpage = null;
		this.imgHolderMain = document.getElementById("imgHolderMain")

		//search and filter 
		this.searchTags = document.getElementById("tags")
		this.sortBy = document.getElementById("sortBy")
		this.searchAllImg = document.getElementById("searchAllImg")
		this.selectAll = document.getElementById("selectAll")

		this.numPage1 = document.getElementById("num1")
		this.numPage2 = document.getElementById("num2")
		this.numPage3 = document.getElementById("num3")
		this.numPage4 = document.getElementById("num4")
		this.numPage5 = document.getElementById("num5")

		this.goToPageSelector = document.getElementById("goToPageSelctor")

		// next and back buttons for all images 
		this.allImgFirsts = document.getElementById("allImgFirsts")
		this.allImgBack = document.getElementById("allImgBack")
		this.allImgNext = document.getElementById("allImgNext")
		this.allImgLast = document.getElementById("allImgLast")

		this.numPageList = [
			this.numPage1,
			this.numPage2,
			this.numPage3,
			this.numPage4,
			this.numPage5
		]
	}
}

class ImagePageManager {
	constructor() {
		this.imagePage = new ImagePage()
		this.modal = new ImageModal(this.imagePage)
		this.imageBuilder = new ImageBuilder(this.imagePage, this.modal)
		this.controls = new ImageControls(this.imagePage)
		this.subNav = new SubNav(this.imagePage,)
		this.sideNav = sideNave
	}

	init() {
		this.imageBuilder.init()
		this.allImageBtnListener()
		this.allImagePageSelectionListiner()
	}

	async setAllImages() {
		this.imageBuilder.clearImageHolder()
		this.imageBuilder.init()
		this.allImageBtnListener()
	}

	pageAllImage() {
		//console.log("pages", this.imagePage.lastpage)
		this.imagePage.allImagesPageList = []
		if (this.imagePage.lastpage > 1) {
			for (let l = 1; l <= this.imagePage.lastpage; l++) {
				this.imagePage.allImagesPageList.push(l)
			}
		}
		this.modal.createAllImagePageList()
	}
	allImageBtnListener() {
		this.imagePage.allImgFirsts.addEventListener('click', () => {
			//console.log("clicked nexts")
			this.firstPageOfImages()
		})
		this.imagePage.allImgBack.addEventListener('click', () => {
			//console.log("clicked back")
			this.backAPageforImages()
		})
		this.imagePage.allImgNext.addEventListener('click', () => {
			//console.log("clicked nexts")
			this.nextPageforImages()
		})
		this.imagePage.allImgLast.addEventListener('click', () => {
			//console.log("clicked nexts")
			this.lastPageOfImages()
		})

		this.imagePage.numPageList.forEach((bNumElm) => {
			bNumElm.addEventListener("click", () => {
				let pagevalue = bNumElm.innerHTML
				this.selectPageOfImages(pagevalue)
			})
		})

	}

	allImagePageSelectionListiner() {
		this.imagePage.goToPageSelector.innerHTML = ""
		for (let pageIndex = 0; pageIndex < this.imagePage.lastpage; pageIndex++) {

			let pageNumOpt = document.createElement("option")
			pageNumOpt.innerHTML = pageIndex + 1
			pageNumOpt.value = pageIndex + 1
			if (this.imagePage.currentPage === (pageIndex + 1)) {
				pageNumOpt.selected = true
			}
			this.imagePage.goToPageSelector.appendChild(pageNumOpt)
		}

		this.imagePage.goToPageSelector.addEventListener("change", () => {

			let selectedPage = this.imagePage.goToPageSelector.value
			this.selectPageOfImages(selectedPage)
		})
		console.log(this.imagePage.lastpage)
	}

	async firstPageOfImages() {
		this.controls.showLoader();
		this.imagePage.currentPage = 1
		await this.setAllImages()
		this.pageAllImage()
		this.controls.getPage("images")
	}

	async nextPageforImages() {
		this.controls.showLoader();
		this.imagePage.currentPage = this.imagePage.currentPage + 1
		await this.setAllImages()
		this.pageAllImage()
		this.controls.getPage("images")
	}

	async backAPageforImages() {
		this.controls.showLoader();
		this.imagePage.currentPage = this.imagePage.currentPage - 1
		await this.setAllImages()
		this.pageAllImage()
		this.controls.getPage("images")
	}

	async lastPageOfImages() {
		this.controls.showLoader();
		this.imagePage.currentPage = this.imagePage.lastpage
		await this.setAllImages()
		this.pageAllImage()
		this.controls.getPage("images")
	}

	async selectPageOfImages(pageValue) {
		console.log("go to", pageValue)
		this.controls.showLoader();
		this.imagePage.currentPage = parseInt(pageValue)
		await this.setAllImages()
		this.pageAllImage()
		this.controls.getPage("images")
	}

	setSearchListener() {
		this.imagePage.selectAll.addEventListener("click", () => {
			selectAndDeselect()
		})
		this.imagePage.searchAllImg.addEventListener("click", async (event) => {
			event.preventDefault();

			this.controls.showLoader();
			console.log(this.imagePage.searchTags.value)
			await this.setAllImages()
			this.pageAllImage()
			this.controls.getPage("images")
		});

	}

}




document.addEventListener("DOMContentLoaded", () => {
	const galleryManager = new ImagePageManager();
	galleryManager.init();
});
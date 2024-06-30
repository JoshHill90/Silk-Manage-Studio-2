import { GalleryModal } from "./galleryComp/galleryModalHandler.js";
import { constructAllImageCardBuild, selectAndDeselect } from "../images/imageComp/subComp/imageCard.js"
import { ModalControls } from "./galleryComp/subComp/galleryModalControls.js";
import { GalleryFunctions } from "./galleryComp/subComp/galleryFunctions.js"
import { GalleryDetailFunctions } from "./galleryComp/subComp/galleryImageFunctions.js"
import { GalleryObj } from "./galleryComp/gallerybuilder.js";
import { GalleryDetailsObj } from "./galleryComp/galleryDetailsBuilder.js";
import { ceatchGalleryImage } from "../images/imageComp/subComp/imageCard.js";
import { BaseUrl } from "../main.js"
import { ImageModal } from "../images/imageComp/subComp/imageDetails.js";
import { SharedModal } from "./galleryComp/shareModal.js";

class Gallery {
	constructor() {
		this.allImagesPageList = [];
		this.limitedAllImagePageList = []
		this.allImages = [];
		this.currentPage = 1;
		this.lastpage = null;
		this.settings = [];
		this.galleryList = [];
		this.sharedLinks = [];

		// selected gallery Details vars
		this.imageData = []
		this.gallerId = null
		this.galleryData = {}


		// base values
		this.backEndToken = document.cookie.split('smstoken=')[1].split(";")[0];
		this.BaseUrl = BaseUrl;

		// modal button
		this.detailsBtn = document.getElementById("detailsBtn");
		this.settingsBtn = document.getElementById("settingsBtn");
		this.shareBtn = document.getElementById("shareBtn");
		this.imagesBtn = document.getElementById("imagesBtn");
		this.deleteBtn = document.getElementById("deleteBtn");
		this.closeBtn = document.getElementById("closeBtn");

		// modal sections
		this.detailsPage = document.getElementById("detailsPage");
		this.sharePage = document.getElementById("sharePage");
		this.settingsPage = document.getElementById("settingsPage");
		this.imagesPage = document.getElementById("imagesPage");
		this.deletePage = document.getElementById("deletePage");

		//modal Loading page
		this.loadingPage = document.getElementById("loadingPage");

		//page controls for all images 
		this.allImagePager = document.getElementById("allImagePager")

		// element that holds all images 
		this.allImageHolder = document.getElementById("allImagesRow")

		// name displayed in mondal top
		this.galleryModalName = document.getElementById("ModalName");
		this.galleryModalIDHolder = document.getElementById("gallIDHolder")
		this.currentGalleryRow = document.getElementById("currentGalleryRow");

		// settings input values 
		this.externalAccess = document.getElementById("externalAccess");
		this.listAccess = document.getElementById("listAccess");

		//gallery functions
		this.displayShareForm = document.getElementById('shareDisplayForm');
		this.displaySettingsForm = document.getElementById("updateSettingsBtn")
		this.deleteGalleryBtn = document.getElementById("deleteGalleryBtn")
		this.createGalleryForm = document.getElementById("createGalleryForm")

		// page nunmbers for the all image section 
		this.numPage1 = document.getElementById("num1")
		this.numPage2 = document.getElementById("num2")
		this.numPage3 = document.getElementById("num3")
		this.numPage4 = document.getElementById("num4")
		this.numPage5 = document.getElementById("num5")

		this.numPageList = [
			this.numPage1,
			this.numPage2,
			this.numPage3,
			this.numPage4,
			this.numPage5
		]

		this.goToPageSelector = document.getElementById("goToPageSelctor")

		// next and back buttons for all images 
		this.allImgFirsts = document.getElementById("allImgFirsts")
		this.allImgBack = document.getElementById("allImgBack")
		this.allImgNext = document.getElementById("allImgNext")
		this.allImgLast = document.getElementById("allImgLast")

		//search and filter 
		this.searchTags = document.getElementById("tags")
		this.sortBy = document.getElementById("sortBy")
		this.searchAllImg = document.getElementById("searchAllImg")
		this.selectAll = document.getElementById("selectAll")

		// image id list
		this.imageIdList = []

		// image Detail modal 
		this.imageNameElm = document.getElementById("imageDeName")
		this.imageLinkElm = document.getElementById("imageDeLink")
		this.imageTagElm = document.getElementById("imageDeTag")
		this.imageDetailHolder = document.getElementById("imageDetailHolder")


		this.existingExpire = document.getElementById("existingExpire")
		this.existingRandomOrder = document.getElementById("existingRandomOrder")
		this.existingDownloadsAllowed = document.getElementById("existingDownloadsAllowed")
		this.existingViews = document.getElementById("existingViews")
		this.existingLink = document.getElementById("existingLink")
		this.sharedLinkId = null
		this.updateSharedLinkBtn = document.getElementById("updateSharedLink")
		this.deleteSharedLinkBtn = document.getElementById("deleteSharedLink")
	}

}

class GalleryManager {
	constructor() {
		this.gallery = new Gallery();
		this.controls = new ModalControls(this.gallery);
		this.modal = new GalleryModal(this.gallery)
		this.imageModal = new ImageModal(this.gallery)
		this.sharedLinkModal = new SharedModal(this.gallery)
		this.galleryFunctions = new GalleryFunctions(this.gallery, this.controls)
		this.galleryDetails = new GalleryDetailsObj(this.gallery, this.controls, this.modal, this.imageModal)
		this.galleryListWindows = new GalleryObj(this.gallery, this.controls, this.galleryDetails, this.sharedLinkModal)
		this.galleryDetailFunctions = new GalleryDetailFunctions(this.gallery, this.controls, this.galleryDetails)



	}

	init() {
		this.controls.onPageLoad();
		this.setAllImages()
		this.setSearchListener()
		this.galleryListWindows.getGalleries()
		this.galleryListWindows.getSharedLinks()

		this.galleryDetailFunctions.init()
		this.galleryFunctions.init()
		this.allImageBtnListener()
		this.setcopyListener()
		this.setLinkUpdateListener()
		this.setLinkDeleteListener()
	}

	async setAllImages() {
		const resp = await this.modal.getAllImages()

		this.setLastPage(resp.lastpage)
		this.pageAllImage()
		this.gallery.allImageHolder.innerHTML = "";
		this.gallery.allImages = []
		for (let allImageIndex = 0; allImageIndex < resp.allImages.length; allImageIndex++) {

			this.gallery.allImages.push(resp.allImages[allImageIndex])

		}
		this.buildAllImages()
		this.allImagePageSelectionListiner()

	}

	pageAllImage() {
		//console.log("pages", this.gallery.lastpage)
		this.gallery.allImagesPageList = []
		if (this.gallery.lastpage > 1) {
			for (let l = 1; l <= this.gallery.lastpage; l++) {
				this.gallery.allImagesPageList.push(l)
			}
		}
		this.modal.createAllImagePageList()
	}

	setLastPage(lastPageResp) {
		//console.log("set last page", lastPageResp)
		this.gallery.lastpage = lastPageResp
	}

	buildAllImages() {

		constructAllImageCardBuild(this.gallery.allImages, this.gallery.allImageHolder, this.imageModal)
	}

	allImageBtnListener() {
		this.gallery.allImgFirsts.addEventListener('click', () => {
			//console.log("clicked nexts")
			this.firstPageOfImages()
		})
		this.gallery.allImgBack.addEventListener('click', () => {
			//console.log("clicked back")
			this.backAPageforImages()
		})
		this.gallery.allImgNext.addEventListener('click', () => {
			//console.log("clicked nexts")
			this.nextPageforImages()
		})
		this.gallery.allImgLast.addEventListener('click', () => {
			//console.log("clicked nexts")
			this.lastPageOfImages()
		})

		this.gallery.numPageList.forEach((bNumElm) => {
			bNumElm.addEventListener("click", () => {
				let pagevalue = bNumElm.innerHTML
				this.selectPageOfImages(pagevalue)
			})
		})


	}

	allImagePageSelectionListiner() {
		this.gallery.goToPageSelector.innerHTML = ""
		for (let pageIndex = 0; pageIndex < this.gallery.lastpage; pageIndex++) {

			let pageNumOpt = document.createElement("option")
			pageNumOpt.innerHTML = pageIndex + 1
			pageNumOpt.value = pageIndex + 1
			if (this.gallery.currentPage === (pageIndex + 1)) {
				pageNumOpt.selected = true
			}
			this.gallery.goToPageSelector.appendChild(pageNumOpt)
		}

		this.gallery.goToPageSelector.addEventListener("change", () => {

			let selectedPage = this.gallery.goToPageSelector.value
			this.selectPageOfImages(selectedPage)
		})
		console.log(this.gallery.lastpage)
	}

	async firstPageOfImages() {
		this.controls.onPageLoad();
		this.gallery.currentPage = 1
		await this.setAllImages()
		this.pageAllImage()
		ceatchGalleryImage(this.gallery.imageIdList)
		this.controls.getPage("images")
	}

	async nextPageforImages() {
		this.controls.onPageLoad();
		this.gallery.currentPage = this.gallery.currentPage + 1
		await this.setAllImages()
		this.pageAllImage()
		ceatchGalleryImage(this.gallery.imageIdList)
		this.controls.getPage("images")
	}

	async backAPageforImages() {
		this.controls.onPageLoad();
		this.gallery.currentPage = this.gallery.currentPage - 1
		await this.setAllImages()
		this.pageAllImage()
		ceatchGalleryImage(this.gallery.imageIdList)
		this.controls.getPage("images")
	}

	async lastPageOfImages() {
		this.controls.onPageLoad();
		this.gallery.currentPage = this.gallery.lastpage
		await this.setAllImages()
		this.pageAllImage()
		ceatchGalleryImage(this.gallery.imageIdList)
		this.controls.getPage("images")
	}

	async selectPageOfImages(pageValue) {
		console.log("go to", pageValue)
		this.controls.onPageLoad();
		this.gallery.currentPage = parseInt(pageValue)
		await this.setAllImages()
		this.pageAllImage()
		ceatchGalleryImage(this.gallery.imageIdList)
		this.controls.getPage("images")
	}

	setSearchListener() {
		this.gallery.selectAll.addEventListener("click", () => {
			selectAndDeselect()
		})
		this.gallery.searchAllImg.addEventListener("click", async (event) => {
			event.preventDefault();

			this.controls.onPageLoad();
			console.log(this.gallery.searchTags.value)
			await this.setAllImages()
			this.pageAllImage()
			ceatchGalleryImage(this.gallery.imageIdList)
			this.controls.getPage("images")
		});

	}

	setcopyListener() {
		document.getElementById('copyLink').addEventListener('click', () => {
			const inputElement = document.getElementById('ShareUrl');
			inputElement.select();
			inputElement.setSelectionRange(0, 99999); // For mobile devices

			// Copy the text inside the input field to the clipboard
			navigator.clipboard.writeText(inputElement.value).then(() => {
				console.log('Copied to clipboard successfully!');
			}).catch(err => {
				console.error('Failed to copy: ', err);
			});
		});
	}

	setLinkUpdateListener() {
		this.gallery.updateSharedLinkBtn.addEventListener("click", () => {
			this.sharedLinkModal.updateSharedLink()
		})

	}

	setLinkDeleteListener() {
		this.gallery.deleteSharedLinkBtn.addEventListener("click", () => {
			this.sharedLinkModal.deleteSharedLink()
		})

	}
}




document.addEventListener("DOMContentLoaded", () => {
	const galleryManager = new GalleryManager();
	galleryManager.init();
});
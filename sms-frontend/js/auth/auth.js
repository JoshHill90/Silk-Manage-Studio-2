import { coockieCheck } from './cookies.js';
import { BaseUrl, SiteURL } from "../main.js"
document.addEventListener("DOMContentLoaded", () => {
	const cookie = coockieCheck()
	if (cookie === null) {
		authStop()
		console.log("auth")
	}
	return
})

function authStop() {
	const currentUrl = window.location.href;
	if (currentUrl == SiteURL) {
		window.location.href = `../../site/auth.html`
	}
	const currentPageHTML = currentUrl.split("site/")[1]
	const currentPage = currentPageHTML.split(".html")[0]
	console.log(currentPage)
	const targetUrl = "/site/auth.html";

	// Check if the current URL does not end with the target URL
	if (!currentUrl.includes(targetUrl)) {
		window.location.href = `../../site/auth.html?lookingFor=${currentPage}`;
	}
}
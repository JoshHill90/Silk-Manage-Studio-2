

export class SubNav {
	constructor(Nav) {
		this.nav = Nav
		this.toggleButton = document.querySelector('.toggle-btn')
		this.state = null
		this.subNavObject = document.getElementById('subNavObj')
	}

	init() {
		this.addListener();
		console.log("Initialization complete");

	}
	addListener() {
		if (this.toggleButton) {
			this.toggleButton.addEventListener("click", () => {

				this.toggle();
			});
		} else {
			console.error("Toggle button not found");
		}
	}
	toggle() {
		if (this.subNavObject) {
			if (this.state === "show") {
				this.subNavObject.style.left = "50px";
			} else {
				this.subNavObject.style.left = "138px";
			}
		} else {
			console.error("Sub navigation object not found");
		}
	}
};

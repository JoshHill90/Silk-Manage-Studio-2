import { BaseUrl } from "../main.js"
import { sideNave } from "../sideNavComp/sideNav.js"

const loader = document.getElementById("semicircle");
const loginForm = document.getElementById("loginForm")

window.onloadTurnstileCallback = function () {
	turnstile.render('#turnstile-container', {
		sitekey: '0x4AAAAAAAco5QlzUEVI7Az1',
		callback: function (token) {
			document.cookie = `cf-turnstile-response=${token}`;
		},
	});
};


async function captchaCheck() {
	const capchaData = document.cookie.split("cf-turnstile-response=")[1];
	const jsonData = JSON.stringify({
		"cf-turnstile-response": capchaData
	});

	try {
		const response = await fetch(BaseUrl + "user/api/v1/capcha/", {
			method: 'POST',
			body: jsonData,
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			alert("Hhmm... Something happened, please try again.")
			window.location.reload
			throw new Error('Failed to fetch CAPTCHA data');
		}

		const data = await response.json();
		if (data.status === "success") {
			console.log(data.status);
			return 'success'; // Return 'success' if CAPTCHA validation succeeds
		} else {
			throw new Error('CAPTCHA validation failed');
		}
	} catch (error) {
		console.error('Error fetching CAPTCHA data:', error);
		window.location.reload
		throw error; // Propagate the error if CAPTCHA check fails
	}
}

function loginAPI(username, pssword) {

	const urlParams = window.location.search;
	const returnToPage = urlParams.split('lookingFor=')[1];

	const jsonData = JSON.stringify({
		"Username": username,
		"Password": pssword
	})

	fetch(BaseUrl + "user/api/v1/login/", {
		method: 'POST',
		body: jsonData,
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((res) => {
			if (!res.ok) {
				alert("Invalid Login, please check your input or register for access");

				return;
			}

			showform()
			return res.json()
		})
		.then((data) => {
			const smstoken = data.token
			console.log(returnToPage)
			document.cookie = `smstoken=${smstoken}`
			if (returnToPage && returnToPage != "auth") {

				document.location.href = `${returnToPage}.html`
			} else if (returnToPage && returnToPage == "auth") {
				document.location.href = `dash.html`
			} else {
				document.location.href = `dash.html`
			}
		})
		.catch((error) => {
			console.error('Error fetching gallery data:', error)
		});

}

document.getElementById("loginBtn").addEventListener("click", async (submited) => {
	submited.preventDefault

	showLoader()
	const validCaptcha = await captchaCheck()
	console.log(validCaptcha)
	if (validCaptcha === "success") {
		// Validate username and password
		let userId = document.getElementById("userId").value.trim();
		let password = document.getElementById("password").value.trim();

		if (!isValidUsername(userId)) {
			alert("Invalid username format. Username should not contain escape keys.");
			showform()
			return;
		}

		if (!isValidPassword(password)) {
			alert("Invalid password format. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
			showform()
			return;
		}
		loginAPI(userId, password);

	}
})

function isValidUsername(username) {
	// Check if username contains escape keys
	// You can modify this regex pattern as needed
	let pattern = /[\\`'"$]/;
	return !pattern.test(username);
}

function isValidPassword(password) {
	// Password must be at least 8 characters long
	// Must include at least one uppercase letter, one lowercase letter,
	// one digit, and one special character
	let uppercaseRegex = /[A-Z]/;
	let lowercaseRegex = /[a-z]/;
	let digitRegex = /[0-9]/;
	let specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-]/;

	if (password.length < 8) {
		return false;
	}

	if (!uppercaseRegex.test(password)) {
		return false;
	}

	if (!lowercaseRegex.test(password)) {
		return false;
	}

	if (!digitRegex.test(password)) {
		return false;
	}

	if (!specialCharRegex.test(password)) {
		return false;
	}

	return true;
}

function showLoader() {
	loginForm.classList.add("hide")
	loader.classList.add("show")
	loginForm.classList.remove("show")
	loader.classList.remove("hide")
}

function showform() {
	loginForm.classList.add("show")
	loader.classList.add("hide")
	loginForm.classList.remove("hide")
	loader.classList.remove("show")
}
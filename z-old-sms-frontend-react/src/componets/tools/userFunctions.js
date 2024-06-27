




//logOut
export function logout() {
    // Extract the token value from the cookie
    const tokenValue = document.cookie.split('token=')[1].split(';')[0];

    fetch('http://localhost:5173/auth/api/v1/logout/', {
        method: "POST",
        headers: {
            'Authorization': 'Token ' + tokenValue,
            'X-CSRFToken': tokenValue, 
            "Content-Type": "application/json"
        },
    })
	.then(jsonResp => {
		document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		
		if (!jsonResp.ok) {
			throw new Error(`HTTP error! Status: please refresh and try again`);
		}
		document.location.reload();
	})
	
};

// signup form
//NewUserForm.addEventListener("submit", (e) => {
//    e.preventDefault();
//  
//	let formEmail = document.getElementById("id_email");
//	let formUsername = document.getElementById("id_username");
//	let formPassword = document.getElementById("id_password");
//	let formRepassword = document.getElementById("id_repassword");
//
//	let inputData = {
//		'email' : formEmail.value,
//		'username':formUsername.value, 
//		'password':formPassword.value,
//	}
//	const formData = JSON.stringify({'data':inputData})
//	fetch('http://localhost:5173/auth/api/v1/signup/', {
//		method: "POST",
//		body: formData,
//		headers: {
//			"Content-Type": "application/json"
//		},
//	})
//	.then(jsonResp => {
//		if (!jsonResp.ok) {
//			throw new Error(`HTTP error! Status: please refresh and try again`);
//		}
//		return jsonResp.json();
//		
//	})
//	.then(data => {
//		document.cookie = `token=${data.token}`;
//		document.location.reload();
//	})
//});

// login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

	let loginUsername = document.getElementById("id_username_login");
	let loginPassword = document.getElementById("id_password_login");

	let inputData = {
		'username':loginUsername.value, 
		'password':loginPassword.value,
	}

	const formData = JSON.stringify({'data':inputData})



});
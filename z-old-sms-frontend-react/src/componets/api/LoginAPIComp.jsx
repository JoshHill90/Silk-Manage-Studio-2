
export const loginAPI = (data) => {
	fetch('http://127.0.0.1:8000/user/api/v1/login/', {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		},
	})
	.then(response => {
		if (!response.ok) {
			// Check status code here
			if (response.status === 404) {
				// Handle 404 Not Found error
				return alert('User information not found, please check your login info and try again');
			} else if (response.status === 401) {
				// Handle 401 Unauthorized error
				return alert('Error: Unauthorized');
			} else {
				// Handle other errors
				return alert('HTTP error! Status:', response.status);
			}

		} else {
			return response.json();
		}
	})
	.then(data => {
		document.cookie = `smstoken=${data.token}`;
		document.location.reload();

		return
	})
}
export function coockieCheck() {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith('smstoken=')) {
			return cookie.split('=')[1];
		}
	}
	return null;
}
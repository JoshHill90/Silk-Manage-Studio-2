
export function CreateGal (name) {

		
	const response = fetch("http://127.0.0.1:8000/gallery/api/v1/create/", {
	method: 'POST',
	body: JSON.stringify({ name }),
	headers: {
		'Authorization': 'Token ' + document.cookie.split('token=')[1],
		'X-CSRFToken': document.cookie.split('token=')[1],
		'Content-Type': 'application/json'
	}
	});
	if (response.ok) {
		throw new Error('Failed to create new item');
	}
	return true;

}



export function SetHeader(imageID, galleryID) {


	fetch(`http://127.0.0.1:8000/gallery/api/v1/${galleryID}/header/${imageID}/`, {
		method: 'POST',
		headers: {
			'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
			'X-CSRFToken': document.cookie.split('smstoken=')[1],
			'Content-Type': 'application/json'
		}
	})
	.then((res) => {
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		return res.json();
	})

	.catch((error) => {
		alert('Error setting gallery header:', error);
		
	});

}

export function RemoveImages(galleryArray, galleryID) {

	fetch(`http://127.0.0.1:8000/gallery/api/v1/${galleryID}/remove/`, {
	method: 'POST',
	body: JSON.stringify({ galleryArray }),
	headers: {
		'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
		'X-CSRFToken': document.cookie.split('smstoken=')[1],
		'Content-Type': 'application/json'
	}})
	.then((res) => {
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		return res.json();
	})

	.catch((error) => {
		alert('Error setting gallery header:', error);
		
	});

}

export function ClearGal(galleryID) {
	fetch(`http://127.0.0.1:8000/gallery/api/v1/${galleryID}/clear/`, {
	method: 'POST',
	headers: {
		'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
		'X-CSRFToken': document.cookie.split('smstoken=')[1],
		'Content-Type': 'application/json'
		}
		})
		.then((res) => {
			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			console.log('cleared')
		})

		.catch((error) => {
			alert('Error setting gallery header:', error);
			
		});
}

export function AddImages(galleryArray, galleryID) {

	fetch(`http://127.0.0.1:8000/gallery/api/v1/${galleryID}/add/`, {
	method: 'POST',
	body: JSON.stringify({ galleryArray }),
	headers: {
		'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
		'X-CSRFToken': document.cookie.split('smstoken=')[1],
		'Content-Type': 'application/json'
	}})
	.then((res) => {
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		return res.json();
	})

	.catch((error) => {
		alert('Error adding images to gallery:', error);
		
	});

}

export function UpdateGallerySettings(settingsUpdate, galleryID) {

	fetch(`http://127.0.0.1:8000/gallery/api/v1/${galleryID}/settings/`, {
	method: 'POST',
	body: JSON.stringify({ settingsUpdate }),
	headers: {
		'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
		'X-CSRFToken': document.cookie.split('smstoken=')[1],
		'Content-Type': 'application/json'
	}})
	.then((res) => {
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		return res.json();
	})

	.catch((error) => {
		alert('Error updating settings for gallery:', error);
		
	});

}

export function CreateShareLink(expiryDate, galleryID) {

	fetch(`http://127.0.0.1:8000/gallery/api/v1/${galleryID}/share/`, {
	method: 'POST',
	body: JSON.stringify({ expiryDate }),
	headers: {
		'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
		'X-CSRFToken': document.cookie.split('smstoken=')[1],
		'Content-Type': 'application/json'
	}})
	.then((res) => {
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		return res.json();
	})

	.catch((error) => {
		alert('Error updating settings for gallery:', error);
		
	});

}

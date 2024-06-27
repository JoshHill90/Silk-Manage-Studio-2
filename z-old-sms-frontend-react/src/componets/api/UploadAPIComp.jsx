
export async function BatchLinkCall() {
	try {
		const response = await fetch(`http://127.0.0.1:8000/gallery/api/v1/token/`, {
			method: 'GET',

			headers: {
				'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
				'X-CSRFToken': document.cookie.split('smstoken=')[1],
				'Content-Type': 'application/json'
			}
		});
	
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
  
		const data = await response.json();
		return data; 
	} catch (error) {
		alert('Error getting token:', error.message);
		return

	}
}

export async function FrontendUpload(token, batchURL, imageArray, silkID, keepName, customTitle) {
	const cfIDData = []
	
    for (let imageFileObject = 0; imageFileObject < imageArray.length; imageFileObject++) {


		try {
			const imageDiv = document.getElementById(`colorLoader${imageFileObject}`)
			
			imageDiv.classList.remove('image-loader_cube--color-1')
			imageDiv.classList.add('image-loader_cube--color-2')
			const imgMultiPart = new FormData();

			if (keepName === true) {
				const SetName = `${customTitle} - ${imageFileObject + 1}`
				imgMultiPart.append("file", imageArray[imageFileObject], SetName);
			} else {
				(imgMultiPart.append("file", imageArray[imageFileObject]))
			}

			console.log(imgMultiPart)
			const metadata = { "silk_id": silkID };
			imgMultiPart.append('metadata', JSON.stringify(metadata));
			
			const response = await fetch(batchURL, {
				method: "post",
				body: imgMultiPart,
				headers: {
					'authorization': `Bearer ${token}`
			}})
		
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json()
			
			cfIDData.push(data.result.id)

			imageDiv.classList.remove('image-loader_cube--color-2')
			imageDiv.classList.add('image-loader_cube--color-3')
		} catch (error) {
			const imageDiv = document.getElementById(`colorLoader${imageFileObject}`)
			imageDiv.classList.remove('image-loader_cube--color-1')
			imageDiv.classList.remove('image-loader_cube--color-2')
			imageDiv.classList.add('image-loader_cube--color-E')
			console.log('Error uploading image:', error);
		}

	}

	return cfIDData

}

export async function BackendImageCreate(images, displays, tags) {
	const data = {"images": images,'displays': displays,'tags': tags}
	const imageInProcess = document.querySelectorAll('.image-loader_cube--color-3')
	for (let i = 0; i < imageInProcess.length; i++) {
		imageInProcess[i].classList.remove('image-loader_cube--color-3')
		imageInProcess[i].classList.add('image-loader_cube--color-4')
	}
	fetch('http://127.0.0.1:8000/gallery/api/v1/image/create/', {
		method: "post",
		body: (JSON.stringify(data)),
		headers: {
			'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
			'X-CSRFToken': document.cookie.split('smstoken=')[1],
			'Content-Type': 'application/json'
		}})
	.then((res) => {
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		window.location.href = '/images'
		return
	})

	.catch((error) => {
		alert('Error creating database objects:', error);
		
	});

}
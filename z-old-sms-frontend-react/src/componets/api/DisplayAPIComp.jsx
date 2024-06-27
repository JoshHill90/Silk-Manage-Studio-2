import { useState, useEffect } from 'react';


export const GetDisplayAPI = () => {
    const [galleryData, setGallery] = useState([]);

    const fetchGalleryData = async () => {
        fetch("http://127.0.0.1:8000/gallery/api/v1/all/", {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
                'X-CSRFToken': document.cookie.split('smstoken=')[1],
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const jsonData = JSON.parse(data)
                setGallery(jsonData.galleries);
            })
            .catch((error) => console.error('Error fetching gallery data:', error));
    };

    useEffect(() => {
        fetchGalleryData(); // Fetch data initially
    }, []);

    return { galleryData, fetchGalleryData };
};

export function GetDisplayDetailsAPI(id) {
    const [GalInfoData, setGallery] = useState([]);

    if (id >= 1) {
        fetch(`http://127.0.0.1:8000/gallery/api/v1/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
                'X-CSRFToken': document.cookie.split('smstoken=')[1],
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const jsonData = JSON.parse(data)
                setGallery([jsonData]);
                console.log(GalInfoData)
            })
            .catch((error) => console.error('Error fetching gallery data:', error));
    }

    return GalInfoData
}

export function GetAllImagesAPI(currentPage) {
    const [imageDataSet, setImages] = useState([]);

    const fetchImages = (currentPage) => {


        fetch(`http://127.0.0.1:8000/gallery/api/v1/images/${currentPage}/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Token ' + document.cookie.split('smstoken=')[1],
                'X-CSRFToken': document.cookie.split('smstoken=')[1],
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const jsonData = JSON.parse(data)

                setImages([jsonData.images, jsonData.last_page]);


            })
            .catch((error) => console.error('Error fetching gallery data:', error));
    }


    useEffect(() => {
        fetchImages(currentPage);

    }, [currentPage]);

    return { imageDataSet, fetchImages };
}


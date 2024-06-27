import { useState, useEffect } from 'react';

export default function GalListWindow({ galleryData, setGalleryID }) {

	const handelModalCall = (selectedID) => {

		setGalleryID(selectedID)
		console.log(selectedID)
	}

	//console.log(galleryData)
	return (
		<div className="gallery-scroll-height gal-list-box">
			<div className='row mt-2 mb-4 gal-list-item'>
				<div className='col-6 overflow-hidden'>
					Gallery Name
				</div>
				<div className='col-3 text-center overflow-hidden'>
					Header Image
				</div>
				<div className='col-3 text-center overflow-hidden'>
					Number of Images
				</div>
			</div>
			{galleryData.map((gallery, galleryIndex) => (

				<div
					className='row mt-2 gal-list-item'
					key={galleryIndex}
					onClick={() => handelModalCall(gallery.id)}
					data-bs-toggle="modal"
					data-bs-target="#GalInfoModal"
				>
					<div className='col-6 overflow-hidden'>
						<p className='p-b'>
							{gallery.name}
						</p>
					</div>
					<div className='col-3 text-center overflow-hidden'>
						<p className='p-b'>
							{gallery.header_image ? "Yes" : "No"}
						</p>
					</div>
					<div className='col-3 text-center overflow-hidden'>
						<p className='p-b'>
							{gallery.images.length}
						</p>
					</div>
				</div>
			))}
		</div>
	)
}
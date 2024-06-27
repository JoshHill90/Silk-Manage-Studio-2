import { AddSquIcon } from "../FontAwesome/FontAwesomeComp"
import { BtnIcon } from "../btn/BtnComp"
import { GalCreateForm } from "./gallery_parts/GalCreateComp";
import GalListWindow from "./gallery_parts/GalListComp";
import { useState } from "react";
import { GetDisplayAPI, GetAllImagesAPI } from "../api/DisplayAPIComp";
import SubNav from "../nav/sub/SubNabComp";
import "./../../css/gallery/Gallery.css"
import { useEffect } from "react";
import GallerryDetailsModal from "./gallery_parts/GalInfoComp";

export default function GalleryPage() {
	const [galleryID, setGalleryID] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	
	const { galleryData, fetchGalleryData } = GetDisplayAPI();
	const { imageDataSet, fetchImages } = GetAllImagesAPI(currentPage);


	return (
		<div className="container">
			<GallerryDetailsModal allImages={imageDataSet} galleryID={galleryID} setCurrentPage={setCurrentPage} currentPage={currentPage} />
			<div className="row">
				<div className=" mt-2 mb-2 col-10">
					<h1 className="H1-L">
						Galleries

					</h1>
				</div>
				<hr className="HR" />
			</div>

			<div className="row">

				<SubNav
					Row1={
						<BtnIcon
							toggle="collapse"
							target="#collapsCreateGallery"
							aExpanded="false"
							aControls="collapsCreateGallery"
							text='Create'
							textHint='Create New Gallery'
							icon={<AddSquIcon />}
						/>}
					Row2={<GalCreateForm />}
				/>

				<div className="mt-4 mb-4 col">
					<GalListWindow
						galleryData={galleryData}
						setGalleryID={setGalleryID}
					/>
				</div>
			</div>
		</div>
	)
}

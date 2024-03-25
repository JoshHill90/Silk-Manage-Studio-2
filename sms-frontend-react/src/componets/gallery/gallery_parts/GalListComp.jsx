import { GetDisplayAPI, GetDisplayDetailsAPI, GetAllImagesAPI } from '../../api/DisplayAPIComp'	
import { HeaderIcon, NoHeaderIcon } from '../../FontAwesome/FontAwesomeComp';
import { GalListHeader } from './subcomp/GalListSubComp.jsx'
import { RefreshIcon } from "../../FontAwesome/FontAwesomeComp"
import { SmBtnIcon } from "../../btn/BtnComp"
import { useState, useEffect } from 'react';
import GalInfoForm from './GalInfoComp'
import './../.././../css/common/laoding.css'

export default function GalListWindow() {
    const [galleriesData, setGalleriesData] = useState([]);
	const [GalId, setGalId] = useState(0)
	const [GalData, setGalInfo] = useState([])
	const [allImages, setAllImages ] = useState([{
		"id": 'Loading...',
		'title': 'Loading...',
		'tag': [],
		'image_link': "Loading..."
	}, {'last_page': 1}])
	const [currentPage, setCurrentPage] = useState(1)
	const [loadingList, setLoadingList] = useState(true);
	const { responseData, fetchGalleryData } = GetDisplayAPI();
	const { GalInfoData, fetchGalleryInfo } =  GetDisplayDetailsAPI(GalId)
	const { imageDataSet, fetchImages } = GetAllImagesAPI(currentPage);
	
	useEffect(() => {
		setGalleriesData(responseData);
		setLoadingList(responseData.length === 0);

	}, [responseData]);

	useEffect(() => {

		() => {GetAllImagesAPI(currentPage)} 
		setAllImages(imageDataSet)
	}, [imageDataSet, fetchImages, currentPage])

	useEffect(() => {
		fetchGalleryInfo
		setGalInfo(GalInfoData);

	}, [GalInfoData]);

	function clearGal(id)  {
		if (GalData && GalData.length > 0  ) {

			if (id == GalId) {
				setGalInfo(GalData)
			} else {
				setGalInfo([])
			}
		} 
	}
	

	return(
		<>
		<GalInfoForm GalData={GalData} allImages={allImages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> 

		<div className="col-12">
			
			
		{loadingList ? (
				<div>
					
					<div className="loader1">
						<div className="circle"></div>
						<div className="circle"></div>
						<div className="circle"></div>
						<div className="circle"></div>
					</div>
				</div>
			) : (

			<div className="gal-list-box mt-4">
				<div className='row'>
					<div className="col-12">
					<GalListHeader />
					<div className="col-2">
						<SmBtnIcon text='Refresh Gallery' click={ fetchGalleryData } icon={<RefreshIcon />} />
					</div>
					{galleriesData.map((gallery, index) => (
						<div key={index}>
							<div
								onClick={ () => {
									clearGal(gallery.id)
									setGalId(gallery.id)
									
								}}
								type="button" 
								data-bs-toggle="modal" 
								data-bs-target="#GalInfoModal"
								className='row gal-list-item mt-2'
							>
								<div className="col-4">
									<p className="P-L">{gallery.name}</p>
								</div>
								<div className="col-4 text-center ">
									<p className="P-L">{gallery.images.length}</p>
								</div>
								<div className="col-4 text-center ">
									<p className="P-B">{gallery.header_image ? <HeaderIcon /> : < NoHeaderIcon/>}</p>
								</div>
							</div>
						</div>
					))}
					</div>
				</div>
			</div>
			) }

		</div>
				
		</>
		
	)
}
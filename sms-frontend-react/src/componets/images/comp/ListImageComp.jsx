import { useEffect, useState } from "react"
import { GetAllImagesAPI } from "../../api/DisplayAPIComp"
import PageNumbering from "./PageNumberingComp"
import ImageInfoModal from "./ImageInfoComp"
import ImageSearch from "./ImageSearchComp"
export default function ImageList() {
	
	const [allImages, setAllImages] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [lastPage, setLastPage] = useState([])
	const [resData, setResData] = useState([])
	const { imageDataSet, fetchImages } = GetAllImagesAPI(currentPage);
	useEffect(() => {
		setCurrentPage(1)
		
		return
	}, [])

	useEffect(() => {
		setResData(imageDataSet)
		
		return setResData(imageDataSet)
	}, [imageDataSet])

	useEffect(() => {

		if (resData.length > 0 ) {
			fetchImages

			setAllImages(resData[0])
			setLastPage(resData[1])
			
		}

	}, [resData, fetchImages, allImages])


	return(
		<div className="row">
			<div className="col-3">

				<PageNumbering setResData={setResData} setAllImages={setAllImages} currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} />
				<ImageSearch />
			</div>
			<div className="col-9 image-scroll-height">

				{!allImages.length > 0 ? (
					<div className="loader1">
						<div className="circle"></div>
						<div className="circle"></div>
						<div className="circle"></div>
						<div className="circle"></div>
					</div>
				) : (
						<div className="row"> 
						{allImages.map(image => (
							
							<div key={image.id} className='col-12 col-md-6 col-lg-4'>


								
									<div >
										<ImageInfoModal
											id={image.id} 
											tags={image.tag} 
											title={image.title} 
											link={image.image_link} 
										/>
									</div>
							
								
							</div>    
						))}
						</div>
				
				)}


			</div>
		</div>

	)
}
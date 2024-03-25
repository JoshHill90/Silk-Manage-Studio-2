import { useEffect, useState } from 'react';
import { AddImages } from '../../../api/GalleryControlAPI.jsx';
import ImageInfoModal from '../../../images/comp/ImageInfoComp.jsx';
import { ArrowLeftIcon, ArrowRightIcon, DubArrowLeftIcon, DubArrowRightIcon} from '../../../FontAwesome/FontAwesomeComp.jsx';

export default function GalleryAllImages({AllImagesSet, galleryID, setAllImagesSet, setCurrentPage, currentPage, lastPage }) {
	const [addImageArray, setAddImageArray] = useState([])
	const [updateGalID, setUpdateGalID] = useState (null)
	const [pageCall, setPageCall] = useState(null)

	useEffect(()=> {
		if (updateGalID !== null) {
			AddImages(addImageArray, updateGalID)
		}
	}, [addImageArray, updateGalID])

	useEffect(() => {
		
		handlePageNumber(pageCall)
		return setPageCall(null)
	}, [pageCall])

	const handlePageNumber = (pageCallF) => {
		
		if (pageCallF === 'first') {
			setCurrentPage(1)
		} else if (pageCallF === 'last') {
			setCurrentPage(lastPage)
		} else if (pageCallF === 'next') {
			setCurrentPage(currentPage + 1)
		} else if (pageCallF === 'prev') {
			setCurrentPage(currentPage - 1)
		}

	}

	const handleAddImages = () =>{
		const newImagesArray = []
		const newCheckedImages = document.querySelectorAll('.ImageCheck:checked')
		
		newCheckedImages.forEach(element => {
			
			newImagesArray.push(element.id)
		})
		setAddImageArray(newImagesArray)
		setUpdateGalID(galleryID)
	}

	return (
		<div className='col-12'>
			<div className="collapse" id="collapseSearch">
				<form>
					<div className='row'>
						<div className='col-6'>
							<div className="mb-3">
								<label htmlFor="id_tags" className="form-label P-L">Tags</label>
								<input type="text" name='id_tags' className="form-control" id="id_tags" aria-describedby="tags" />
							</div>

						</div>
						<div className='col-6'>
							<div className="mb-3">
								<label htmlFor="id_project" className="form-label P-L">Project</label>
								<input type="text" name='id_project' className="form-control" id="id_project" aria-describedby="tags" />
							</div>

						</div>
						<div className='col-6'>
							<div className="mb-3">
								<label htmlFor="id_client" className="form-label P-L">Client</label>
								<input type="text" name='id_client' className="form-control" id="id_client" aria-describedby="tags" />
							</div>

						</div>
						<div className='col-3'>
							<div className="mb-3">
								<label htmlFor="id_start" className="form-label P-L">Start</label>
								<input type="date" name='id_start' className="form-control" id="id_start" aria-describedby="tags" />
							</div>

						</div>
						<div className='col-3'>
							<div className="mb-3">
								<label htmlFor="id_end" className="form-label P-L">End</label>
								<input type="date" name='id_end' className="form-control" id="id_end" aria-describedby="tags" />
							</div>

						</div>
						<div className='col-6 col-md-4'>
							<button className='btn-cust-2 mt-2 w-100'>
								Search
							</button>
						</div>
						<div className='col-6 col-md-4'>
							<button className='btn-cust-2 mt-2 w-100'>
								Clear Search
							</button>
						</div>
					</div>
				</form>
			</div>

			<div className='row mt-4 mb-4'>
			<div className='col-6 col-md-2'>
					<button 
						className='btn-cust-2 mt-2 w-100' 
						type="button" data-bs-toggle="collapse" 
						data-bs-target="#collapseSearch" 
						aria-expanded="false" 
						aria-controls="collapseSearch"
					>
						Search
					</button>
				</div>
				<div className='col-6 col-md-2'>
					<button className='btn-cust-2 mt-2 w-100' 
						onClick={()=>
							handleAddImages()
						}>
						Add
					</button>
				</div>


			</div>

			<div className='row'>
				<div className='col-12 col-md-6'>
					<p className='P-B'>All Images</p>
				</div>
				<div className='col-12 col-md-6'>
					<div className='row text-center'>

						<div className='col-2'>
							<button className='btn-icon' onClick={() => {
								setPageCall('first')
								setAllImagesSet([])
								}}>
								<DubArrowLeftIcon />
							</button>
						</div>

						<div className='col-2'>
							<button className='btn-icon' onClick={() => {
								setPageCall('prev')
								setAllImagesSet([])
								}}>
									<ArrowLeftIcon />
							</button>
						</div>

						<div className='col-4'>
							<p className='P-B'>{currentPage}/{lastPage}</p>
						</div>

						<div className='col-2'>
							<button className='btn-icon' onClick={() => {
								setPageCall('next')
								setAllImagesSet([])
								}}>
									<ArrowRightIcon />
							</button>
						</div>

						<div className='col-2'>
							<button className='btn-icon' onClick={() => {
								setPageCall('last')
								setAllImagesSet([{
									"id": 'Loading...',
									'title': 'Loading...',
									'tag': [],
									'image_link': "Loading..."
								}, {'last_page': 1}])
								}}>
								<DubArrowRightIcon />
							</button>
						</div>

					</div>
				</div>
			</div>
			<hr className='HR'/>

			<div className='overflow-auto'>
				<div className="row image-scroll-height-2"> 
				{AllImagesSet.map(image => (
					
					<div key={image.id} className='col-12 col-md-6 col-lg-4'>
						{image.id === "Loading..." ? 
						
							<div className="loader1">
								<div className="circle"></div>
								<div className="circle"></div>
								<div className="circle"></div>
								<div className="circle"></div>
							</div>

						:( 
							<div >
								<ImageInfoModal 
									id={image.id} 
									tags={image.tag} 
									title={image.title} 
									link={image.image_link} 
								/>
							</div>
						)}
						
					</div>    
				))}
				</div>
			</div>
		</div>
	)
}
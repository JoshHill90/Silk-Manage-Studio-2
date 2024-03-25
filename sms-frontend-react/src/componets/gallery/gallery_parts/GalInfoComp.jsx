// GalInfoForm component
import { useEffect, useState } from 'react';
import '../../../css/btn/checkBox.css'
import '../../../css/gallery/images.css'

import CurrentGallery from './subcomp/CurrentGalComp.jsx';
import GalleryAllImages from './subcomp/AllImageGalComp.jsx';
import GallerySettings from './subcomp/SettingGalComp.jsx';
import ShareGallery from './subcomp/ShareGalcomp.jsx';
function ViewPortHandler({viewPort, gallerySet, AllImagesSet, setAllImages, setCurrentPage, currentPage}) {
    
        if (viewPort === 'gallery') {
            return (
                <CurrentGallery gallerySet={gallerySet} />
            )
        } else if (viewPort === 'all') {
            return (
                <GalleryAllImages galleryID={gallerySet.gallery.id} AllImagesSet={AllImagesSet[0]} setAllImages={setAllImages} setCurrentPage={setCurrentPage} currentPage={currentPage} lastPage={AllImagesSet[1]} />
            )
        } else if (viewPort === 'settings') {
            return (
                <GallerySettings currentSettings={gallerySet.gallery.settings} galleryID={gallerySet.gallery.id} />
            )
        } else if (viewPort === 'share') {
            return (
                <ShareGallery galleryID={gallerySet.gallery.id} />
            )
        } else if (viewPort === 'delete') {
            return (
                <div className='col-12'>
				<form id='deleteDisplayForm'>
					<button className='btn-cust'>
						Delete Gallery
					</button>
				</form>
			</div>
            )
        } 
    
}

export default function GalInfoForm({GalData, allImages, setCurrentPage, currentPage}) {
    
    const [loading, setLoading] = useState(true);
    const[ viewPort, setViewPort] = useState('gallery')
    const [AllImagesSet, setAllImagesSet] = useState([
		[
			{
				"id":'Loading...',
				'title':'Loading...',
				'tag':[],
				'image_link': "Loading..."
			}
		]
	])
    
    const [gallerySet, setGallerySet] = useState([		
        {
            'gallery': {
            'id': 0, 
            'settings': [
                'off',
                'off',
                'off',
                'off'
            ], 
            'name': 'Loading...', 
            'header_image': false
            }, 'images':[
                {
                    "id":'Loading...',
                    'title':'Loading...',
                    'tag':[],
                    'image_link': "Loading..."
                }
            ]
        }]);

    useEffect(() => {
        if (allImages.length > 0) {
        setAllImagesSet(() => allImages)
        } else {

			setAllImagesSet(
				[
					{
						"id":'Loading...',
						'title':'Loading...',
						'tag':[],
						'image_link': "Loading..."
					}
			]
		)
				
		}
    }, [allImages])

    useEffect(()=> {
        if (GalData && GalData.length > 0) {

            setGallerySet(GalData)
            setLoading(false)
        } else if (GalData.id === 0){
            setLoading(true)
        } else {
            setLoading(true) 
        }
    }, [GalData])

    return (
        <div className="modal fade" id="GalInfoModal" tabIndex="-1" aria-labelledby="GalInfoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content modal-gallery">
                {loading ? (          
                        <div className="loader1">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                ) : (
                    <div className='container'>

                        <div className='modal-body modal-gallery '>
                            <nav className="navbar navbar-expand-lg">
                                <div className="container-fluid">
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center w-100">
                                            <li className="nav-item me-lg-3 w-100">
                                                <button className="btn btn-cust w-100" onClick={() => setViewPort('gallery')}>
                                                    <p className='P-L'>Gallery Images</p>
                                                </button>
                                            </li>
                                            <li className="nav-item me-lg-3 w-100">
                                                <button className="btn btn-cust w-100" onClick={() => setViewPort('all')}>
                                                <p className='P-L'>All Images</p>
                                                </button>
                                            </li>
                                            <li className="nav-item me-lg-3 w-100">
                                                <button className="btn btn-cust w-100" onClick={() => setViewPort('settings')}>
                                                <p className='P-L'>Settings</p>
                                                </button>
                                            </li>
                                            <li className="nav-item me-lg-3 w-100">
                                                <button className="btn btn-cust w-100" onClick={() => setViewPort('share')}>
                                                <p className='P-L'>Share</p>
                                                </button>
                                            </li>
                                            <li className="nav-item me-lg-3 w-100">
                                                <button className="btn btn-cust w-100" onClick={() => setViewPort('delete')}>
                                                <p className='P-L'>Delete</p>
                                                </button>
                                            </li>
                                            <li className="nav-item me-lg-3 w-100">
                                                <button type="button" className="btn btn-cust w-100" data-bs-dismiss="modal" aria-label="Close">
                                                <p className='P-L'>Close</p>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>

                            <hr className='HR' />
                            {gallerySet.map((data) => (
                                <div key={data.gallery.id}>


                                    <div  className='row'>
                                        {loading ? <h1 className='H1-B'>Loading</h1> : <ViewPortHandler viewPort={viewPort} gallerySet={data} setAllImages={setAllImagesSet} AllImagesSet={AllImagesSet} setCurrentPage={setCurrentPage} currentPage={currentPage} /> }
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                    )}
                </div>
            </div>
            
        </div>
    )
}

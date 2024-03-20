// GalInfoForm component
import { useEffect, useState } from 'react';
import '../../../css/btn/checkBox.css'
import ImageInfoModal from '../../images/comp/ImageInfoComp.jsx';
import CurrentGallery from './subcomp/CurrentGalComp.jsx';


function ViewPortHandler({viewPort, gallerySet, AllImagesSet}) {


        if (viewPort === 'gallery') {
            return (
                <CurrentGallery gallerySet={gallerySet} />
            )
        } else if (viewPort === 'all') {
            return (
                <div className='col-12'>

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

                            </div>
                        </form>

                    <div className='row'>
                        <div className='col-6 col-md-4'>
                            <button className='btn-cust-2 mt-2 w-100'>
                                Add
                            </button>
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


                    <p className='P-B'>All Images</p>
                    <hr className='HR'/>

                    <div className='overflow-auto'>
                        <div className="row image-scroll-height-2"> 
                        {AllImagesSet[0].map(image => (
                            
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
                                {console.log(image, 'image from all')}
                            </div>    
                        ))}
                        </div>
                    </div>
                </div>
            )
        } else if (viewPort === 'settings') {
            return (
                <div>
                    
                <h1 className='H1-B'>Gallery Settings</h1>

                <form id='galSettingsForm'>
				
					<div className='row'>
						<div className='col-10'>
							<p className='P-L'>Visibal:</p>
							<p className='P-N'>
								Toggle the switch to <b>ON</b> to set the gallery visibility to private. 
								Doing so will prevent this gallery from being seen by anyone except 
								users with access to this application. Please note that setting the 
								gallery to private does not affect its visibility on the client-facing 
								site.
							</p>
						</div>
						<div className='col-2'>
							<div className="form-check form-switch">
								<input className="form-check-input" type="checkbox" name="visiable" id="id_visiable" />
							</div>
						</div>
						<div className='col-10'>
							<p className='P-L'>Site Gallery:</p>
							<p className='P-N'>
								Toggle the switch to <b>ON</b> to display the gallery on the client facing site.
							</p>
						</div>
						<div className='col-2'>
							<div className="form-check form-switch">
								<input className="form-check-input" type="checkbox" name="site" id="id_site"/>
							</div>
						</div>
						<div className='col-10'>
							<p className='P-L'>Random Order:</p>
							<p className='P-N'>
								Toggle the switch to <b>ON</b> to display the gallery in random order. This option affects 
								only images on the client-facing site.
							</p>
						</div>
						<div className='col-2'>
							<div className="form-check form-switch">
								<input className="form-check-input" type="checkbox" name="random" id="id_random" />
							</div>
						</div>
						<div className='col-10'>
							<p className='P-L'>Lock:</p>
							<p className='P-N'>
								Toggle the switch to <b>ON</b> to prevent the gallery from being deleted.
								Unused galleries will be deleted 90 days after creation. To prevent deletion, 
								you can lock the gallery. This does not apply to using the Delete Gallery button. 
								that will still delete the gallery. 					
							</p>
						</div>
						<div className='col-2'>
							<div className="form-check form-switch">
								<input className="form-check-input" type="checkbox" name="lock" id="id_lock" />								
							</div>
						</div>
					</div>
					<button className='btn-cust'>Update Settings</button>		
                </form>	
            </div>
            )
        } else if (viewPort === 'share') {
            return (
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-12 mt-4 mb-4 col-md-4'>
                            <form method="post" id='shareDisplayForm'>
                                <div className='col-12'>
                                    <label className='P-N' htmlFor="id_daysExpire">Set days until link expires</label>
                                    <input className='form-control' defaultValue='90' type="number" name="daysExpire" maxLength="255" required="" id="id_daysExpire" />
                                </div>
                                <button className=' mt-4 btn-cust'>
                                    Create Gallery Link
                                </button>
                            </form>
                        </div>
                        
                        <div className='col-4'>
                            <hr />
                            <label className='P-N' htmlFor="id_shared_gallery">Please Copy this URL: <i className="fa-regular fa-copy"></i></label>
                            
                            <input className='form-control' defaultValue='' type="text" name="ShareUrl" maxLength="3000" required="" id="ShareUrl" disabled />
                        </div>
                    </div> 
                </div>
 
           
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

export default function GalInfoForm({GalData, allImages}) {
    
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
                <div className="modal-content bg-color-bg">
                {loading ? (          
                        <div className="loader1">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                ) : (
                    <div className='container'>

                        <div className='modal-body'>
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
                                        {loading ? <h1 className='H1-B'>Loading</h1> : <ViewPortHandler viewPort={viewPort} gallerySet={data} AllImagesSet={AllImagesSet} /> }
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

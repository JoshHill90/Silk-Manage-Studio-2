// GalInfoForm component
import { useEffect, useState } from 'react';
import { HeaderIcon, NoHeaderIcon } from '../../FontAwesome/FontAwesomeComp';
import '../../../css/btn/checkBox.css'
import ImageInfoModal from '../../images/comp/ImageInfoComp.jsx';

function HeaderImage({isHeaderImage}) {
    if (isHeaderImage === 'Loading...'){
        return (<p className='P-L'>
            {isHeaderImage ? "Loading..." : "Does not Uses Header Image"}
        </p>)
    } else {
        return (<p className='P-L'>
            {isHeaderImage ? <HeaderIcon /> : < NoHeaderIcon/>}
            </p>)

    }
}


export default function GalInfoForm({GalData, allImages}) {
    const [loading, setLoading] = useState(true);
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
        console.log('all Inmages', allImages)
        if (allImages.length > 1) {
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
                    <div>
                        
                        <div className="modal-header  border-0">
                            <h1 className="H1-N">Gallery Info </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className='modal-body'>
                            {gallerySet.map((data) => (
                                <div key={data.gallery.id}>
                                    <div  className="gallery-title" >
                                        <div  className='row'>
                                            <div className='col-12 col-md-6'>
                                                
                                                <div className='row'>
                                                    <div className='col-2'>
                                                        <p className='P-N'>ID:</p>
                                                        <p className='P-N'>Name:</p>
                                                        <p className='P-N'>Header:</p>
                                                    </div>
                                                    <div className='col-6'>
                                                        <p className='P-L'>{data.gallery.id}</p>
                                                        <p className='P-L'>{(data.gallery.name)}</p>
                                                        <HeaderImage isHeaderImage={data.gallery.header_image} />
                                                    </div>
                                                </div>
                                            </div>



                                            <div className='col-12 col-md-6'>
                                                <p className='P-N'>Gallery Settings:</p>
                                                <div className='row'>
                                                    <div className='col-4'>
                                                        <p className='P-N'>visible</p>
                                                        <p className='P-N'>Site Gallery</p>
                                                        <p className='P-N'>Random Order</p>
                                                        <p className='P-N'>Lock</p>
                                                    </div>
                                                    <div className='col-8'>
                                                        <p className='P-N'>{data.gallery.settings[0]}</p>
                                                        <p className='P-N'>{data.gallery.settings[1]}</p>
                                                        <p className='P-N'>{data.gallery.settings[2]}</p>
                                                        <p className='P-N'>{data.gallery.settings[3]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div  className='row'>
                                        <div className='col-12'>
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="GalImages-tab" data-bs-toggle="tab" data-bs-target="#GalImages-tab-pane" type="button" role="tab" aria-controls="GalImages-tab-pane" aria-selected="true">GalImages</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="AllImages-tab" data-bs-toggle="tab" data-bs-target="#AllImages-tab-pane" type="button" role="tab" aria-controls="AllImages-tab-pane" aria-selected="false">AllImages</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Contact</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false" disabled>Disabled</button>
                                                </li>
                                            </ul>

                                            
                                            <div className="tab-pane fade" id="nav-AllImages" role="tabpanel" aria-labelledby="nav-AllImages-tab" tabIndex="0"> </div>
  
                                            <div className="tab-pane fade show active" id="nav-GalImages" role="tabpanel" aria-labelledby="nav-GalImages-tab" tabIndex="0">
                                                <p className='P-B'>Images</p>
                                                <hr className='HR'/>



                                                <div className='overflow-auto'>
                                                    <div className="row image-scroll-height-2"> 
                                                    {data.images.map(image => (
                                                        <div key={image.id} className='col-12 col-md-6 col-lg-4'>
                                                            {image.id == "Loading..." ? 
                                                            
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
                                            <div className="tab-pane fade show active" id="nav-GalImages" role="tabpanel" aria-labelledby="nav-GalImages-tab" tabIndex="0">
                                                <p className='P-B'>Images</p>
                                                <hr className='HR'/>
  
                                                <div className='overflow-auto'>
                                                    <div className="row image-scroll-height-2"> 
                                                    {AllImagesSet.map(image => (
                                                        <div key={image.id} className='col-12 col-md-6 col-lg-4'>
                                                            {image.id == "Loading..." ? 
                                                            
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
                                        </div>
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

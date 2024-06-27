// GalInfoForm component

import '../../../css/btn/checkBox.css'
import '../../../css/gallery/images.css'
import { GetDisplayDetailsAPI } from '../../api/DisplayAPIComp.jsx';
import CurrentGallery from './subcomp/CurrentGalComp.jsx';
import GalleryAllImages from './subcomp/AllImageGalComp.jsx';
import GallerySettings from './subcomp/SettingGalComp.jsx';
import ShareGallery from './subcomp/ShareGalcomp.jsx';
import DeleteGallery from './subcomp/DeleteGalleryComp.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
function ViewPortHandler({ viewPort, gallerySet, AllImagesSet, setAllImages, setCurrentPage, currentPage }) {

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
            <DeleteGallery galleryID={gallerySet.gallery.id} />
        )
    }

}

export default function GallerryDetailsModal({ galleryID, allImages, setCurrentPage, currentPage, fetchImages }) {
    const [viewPort, setViewPort] = useState("gallery")
    const [galData, setGalData] = useState([])
    const { galleryDetails } = GetDisplayDetailsAPI(galleryID)
    console.log(galleryDetails)


    return (
        <div className="modal fade" id="GalInfoModal" tabIndex="-1" aria-labelledby="GalInfoModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content modal-gallery">

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

                            {isNaN(galleryID) ? null : galleryDetails.map((data) => (

                                <div key={data.gallery.id}>

                                    <div className='row'>

                                        <ViewPortHandler viewPort={viewPort} gallerySet={data} fetech={fetchImages} AllImagesSet={allImages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

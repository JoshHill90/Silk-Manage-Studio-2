import { useEffect, useState } from 'react';
import { ClearGal, SetHeader, RemoveImages } from '../../../api/GalleryControlAPI.jsx';
import { HeaderIcon, NoHeaderIcon } from '../../../FontAwesome/FontAwesomeComp.jsx';
import ImageInfoModal from '../../../images/comp/ImageInfoComp.jsx';
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


export default function CurrentGallery({gallerySet}) {
	const [clearGalID, setClearGalID] = useState(null);
	const [headerGalID, setHeaderGalID] = useState(null);
	const [headerImageID, setHeaderImageID] = useState(null);
    const [removeGalID, setRemoveGalID] = useState(null);
	const [removeArray, setRemoveArray] = useState([]);

    useEffect(() => {
        if (clearGalID !== null){
            ClearGal(clearGalID);
        }
		return(setClearGalID(null))
    }, [clearGalID]);

	useEffect(() => {
        if (headerGalID !== null){
            SetHeader(headerImageID, headerGalID);
        }
		return (setHeaderGalID(null))
    }, [headerImageID, headerGalID]);

	useEffect(() => {
        if (removeGalID !== null){
            RemoveImages(removeArray, removeGalID);
        }
		return (setRemoveGalID(null))
    }, [removeArray, removeGalID]);

	const clearGalHandler = () => {
		setClearGalID(gallerySet.gallery.id);
	}

	const headerGalHandler = () => {

		const checkedElement = document.querySelectorAll('.ImageCheck:checked');
		if (checkedElement.length > 1 || checkedElement.length === 0) {
			alert('Please only select one image for header. If you do not see what image is selected please select and deselect all then select the image you would like to set as the header.')
		} else {
			setHeaderGalID(gallerySet.gallery.id);
			setHeaderImageID(checkedElement[0].id)

		}
	}

	const removeGalHandler = () => {
		const checkedIds = [];
		const checkedElements = document.querySelectorAll('.ImageCheck:checked');
	
		checkedElements.forEach(element => {
			checkedIds.push(element.id);
		});
		setRemoveArray(checkedIds);
		setRemoveGalID(gallerySet.gallery.id);

	}
	return(
	<div className='col-12'>
		<div  className="gallery-title" >
			<div  className='row'>
				<div className='col-12 col-md-6'>
					
					<div className='row'>
						<div className='col-12'>
							<p className='P-B'>Gallery Details</p>
						</div>
						<div className='col-2'>
							<p className='P-N'>ID:</p>
							<p className='P-N'>Name:</p>
							<p className='P-N'>Header:</p>
						</div>
						<div className='col-6'>
							<p className='P-L'>{gallerySet.gallery.id}</p>
							<p className='P-L'>{(gallerySet.gallery.name)}</p>
							<HeaderImage isHeaderImage={gallerySet.gallery.header_image} />
						</div>
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='row'>
						<div className='col-12'>
							<p className='P-B'>Controls</p>
						</div>
						<div className='col-6'>
							<button className='btn-cust-2 mt-2 w-100' 
								onClick={()=>headerGalHandler()}>
								<p className='P-B'>Header</p>
							</button>
						</div>
						<div className='col-6'>
							<button className='btn-cust-2 mt-2 w-100' 
								onClick={()=>clearGalHandler()}>
								<p className='P-B'>Clear</p>
							</button>
							</div>
							<div className='col-6'>
							<button className='btn-cust-2 mt-2 w-100'
								onClick={()=>removeGalHandler()}>
								<p className='P-B'>Remove</p>
							</button>
						</div>
					</div>
				</div>
			</div>

		</div>
		<p className='P-B'>Gallery Images</p>
		<hr className='HR'/>

		<div className='overflow-auto'>
			<div className="row image-scroll-height-2"> 
			{gallerySet.images.map(image => (
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
	)
}
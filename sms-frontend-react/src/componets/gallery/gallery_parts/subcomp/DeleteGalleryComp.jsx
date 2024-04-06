
import { DeleteGalleryApi } from "../../../api/GalleryControlAPI"
export default function DeleteGallery({galleryID}) {

	const handleDeleteCall = ()=> {
		console.log(galleryID)
		DeleteGalleryApi(galleryID)

	}

	return (
		<div className='col-12'>
		<form id='deleteDisplayForm'>
			<button className='btn-cust' onClick={(e)=>{
				e.preventDefault()
				console.log('check delete')
				handleDeleteCall()}}>
				Delete Gallery
			</button>
		</form>
	</div>
	)
}
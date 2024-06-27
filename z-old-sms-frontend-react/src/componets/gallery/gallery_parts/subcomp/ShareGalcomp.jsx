import { useEffect, useState } from "react"
import { CreateShareLink } from "../../../api/GalleryControlAPI"



export default function ShareGallery({galleryID}) {
	const [sharedLink, setSharedLink] = useState([])
	const [expiryDate, setExpiryDate] = useState(0)
	const [shareCallState, setShareCallState] = useState(false)

	useEffect(()=> {setSharedLink('')}, [])

	useEffect(  ()=> {
		async function fetchLink() {
			if (shareCallState === true) {
				const respLink = await CreateShareLink(expiryDate, galleryID)
				
				setSharedLink(respLink.url)
			}
		}
		fetchLink()
		
		return setShareCallState(false)
	}, [shareCallState, expiryDate, galleryID])

	const handleLinkRequest = () =>{
		const exDays = document.getElementById('id_daysExpire').value
		setExpiryDate(exDays)
	}

	const handleShareLink = () =>{

		setSharedLink(!sharedLink)
	}


	return (
		<div className='col-12'>
			<div className='row'>
				<div className='col-12 mt-4 mb-4 col-md-4'>
					<form method="post" id='shareDisplayForm'>
						<div className='col-12'>
							<label className='P-N' htmlFor="id_daysExpire">Set days until link expires</label>
							<input className='form-control' onChange={handleLinkRequest} value={expiryDate} type="number" name="daysExpire" maxLength="255" required="" id="id_daysExpire" />
						</div>
						<button className='mt-4 btn-cust' onClick={(e) => {
							e.preventDefault();
							setShareCallState(true)
						}}>
							Create Gallery Link
						</button>
					</form>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 mt-4 mb-4 col-md-4'>
					<hr />
					<label className='P-N' htmlFor="id_shared_gallery">Please Copy this URL: <i className="fa-regular fa-copy"></i></label>
					
					<input className='form-control' value={sharedLink} onChange={()=>handleShareLink} type="text" name="ShareUrl" id="ShareUrl" disabled />
				</div>
			</div> 
		</div>
	)
}
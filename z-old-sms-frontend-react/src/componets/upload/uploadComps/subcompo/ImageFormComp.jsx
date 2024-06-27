import { useState } from "react"
import { CloseIcon } from "../../../FontAwesome/FontAwesomeComp"
import { FrontendUpload, BackendImageCreate } from "../../../api/UploadAPIComp"
import { useNavigate } from 'react-router-dom';


export default function ImageDetailsForm({displayData, tagData, batchURL, silkID, batchToken, imageArray, setPreviewState, previewState}) {
	const [selectTags, setSelectTags] = useState([])
	const [keepName, setKeepName] = useState(false)
	const [fomr1State, setFomr1State] = useState(false)
	const [fomr2State, setFomr2State] = useState(false)	
	const [tagText, setTagText] = useState('');
	const [displaySelected, setDisplaySelected] = useState([])
	const history = useNavigate();


	const imageHandler = (inputState) => {
		if (inputState.checked === true) {
			setKeepName(true)
		} else {
			setKeepName(false)
		}
	}

	const tagHandler = (event) => {
		if (event.key === 'Enter') {
            event.preventDefault();
            const trimmedText = tagText.trim();
            if (trimmedText !== '') {
				
                setSelectTags([...selectTags, trimmedText]);
                setTagText('');
            }
        }

	}

	const displayHandler = (gallery, element) => {
		if (element.checked === true){
			setDisplaySelected([...displaySelected, gallery]) 
		} else if (element.checked === false) {
			setDisplaySelected(displaySelected.filter((i) => i !== gallery))
		}
		
	} 

	const removeTaghandler = (tagName) => {
		console.log(tagName)
		setSelectTags(selectTags.filter((i) => i !== tagName));
	}

	const tagList = () =>{

		return (
			selectTags.map((tag, index) =>(
				<div key={index}>
					<div className="tag-list-item mt-2 row">
						<div className="col-1">
							<button className="btn-icon-sm close-button" onClick={(e) => {
								e.preventDefault()	
								removeTaghandler(tag)
							}}>
								<CloseIcon  />
							</button>
						</div>
						<div className="col-6">
							<p className="P-A">
								{tag}
							</p>
						</div>
					</div>
				</div>
			))
		)
	}



	const imageFormHandler = async () => {
		const customTitle = document.getElementById('id_title').value
		
		if (keepName === false) {
			
			if(customTitle === '') {
				alert('please enter avalid Title, or siwtch to using the defailt title')
				return 
			}
		}

		const imageForBackend = [];
		const backendPromises = [];
		
		try {
			setFomr1State(true)
			const cfIDData = await FrontendUpload(batchToken, batchURL, imageArray, silkID, previewState, keepName, customTitle);

			if (keepName === true) {
				for (let index = 0; index < cfIDData.length; index++) {
					imageForBackend.push({ 'id': cfIDData[index], 'name': imageArray[index].name });
				}
			} else if (keepName === false) {
				for (let index = 0; index < cfIDData.length; index++) {
					imageForBackend.push({ 'id': cfIDData[index], 'name': `${customTitle} - ${index + 1}` });
				}
			}
			setFomr1State(false)
			setFomr2State(true)
			backendPromises.push(BackendImageCreate(imageForBackend, displaySelected, selectTags, history));
			await Promise.all(backendPromises);
			
			return 
		} catch (error) {
			console.error('Error in imageFormHandler:', error);
			
		}
	};
		
	if (previewState === 'pre-upload') {
		return (
			<div className='col-6 image-form'>
				<h1 className='H1-N'>Set Image Details</h1>
				<form id='imageForm' className='form-group P-N' >

					<div className='row'>

						<div className='col-12 mb-4'>
							<div className="form-check form-switch">
								<label htmlFor="useTitle" className='form-check-label'>Keep image names</label>
								<input type="checkbox" onChange={(e) => imageHandler(e.target)} name="useTitle" role="switch" className="form-check-input mt-2" id="useTitle" />
							</div>
						</div>
						<div className='col-12 mb-4'>
							<label hidden={keepName ? true: false} className='mt-2'>
								Set titles for images in the collection. Names will increment automatically
							</label>
							<input hidden={keepName ? true: false} type="text" placeholder="Title" name="title" className="form-control"  maxLength="255" required={keepName ? false: true} id="id_title" />
						</div>

						<div className='col-12 mb-4'>

							<label htmlFor="exampleDataList" className="form-label">Add or Create a tag</label>
							<input
								className="form-control"
								onChange={(event) => setTagText(event.target.value)}
								onKeyDown={tagHandler}
								value={tagText}
								list="datalistOptions"
								id="exampleDataList"
							/>
							<datalist id="datalistOptions">
								{tagData.map((tags) => (
									<option key={tags.id} value={tags.name} />
								))}
							</datalist>

							<label className='mt-2'>To remove tag select the X</label>

							<div className='row diplay-tags' id='displayTagRow'>
								<div className='col-12 mb-4'>
								{tagList()}
								</div>
							</div>

						</div>

						<div className='col-12 mb-4'>


							<label className='mb-2' >Select gallery to include images</label>

							<div className='row diplay-tags' id='displayTagRow'>
								{displayData.map((display) => (
								<div key={display.id}  className='col-12 col-md-4'>
									
									<div className="form-check">
										<label className="checkBox">
											<input className="form-check-input checkBox" type="checkbox" value={display.id} onChange={(e)=>displayHandler(display.name, e.target)} id={`d${display.id}`} />
											<div className="transition"></div>
											
										</label>
										<p className="P-B">{display.name}</p>
									</div>
									
								</div>
								))}


							</div>
						</div>
						<div className='col-12 mt-4 mb-4'>
							<button id='submit' 
								type="submit"
								className="btn-cust"
								onClick={(e) => {
									e.preventDefault();
									setPreviewState('uploading-step1')
									imageFormHandler()

							}}>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		)
	} else if (previewState === 'uploading-step1') {
		return	(		
			<div className='col-6 image-form'>
				<p className='P-N mt-4 text-center'>Processing Uploads</p>
				<p className='P-N mt-4 text-center' hidden={fomr1State ?  false:true }>Uploading Images to Cloud</p>
				<p className='P-N mt-4 text-center' hidden={fomr2State ?  false:true }>Pushing Images to Database</p>
			</div>
		)
	}
}
import { useEffect, useState } from "react"
import { BatchLinkCall} from "../../api/UploadAPIComp";
import ImageIntake from "./subcompo/ImageIntakeComp";
import ImageDetailsForm from "./subcompo/ImageFormComp";
import ImagePaths from "./subcompo/ImagePathPReviewComp";
import ImageLoading from "./subcompo/ImageLoadingComp";



function ImageUploadForm({setFormState, imageArray, formState, setImageArray, previewState, setPreviewState}) {
	const [batchToken, setBathToken] = useState([])
	const [silkID, setSilkID] = useState([])
	const [batchURL, setBathURL] = useState([])
	const [displayData, setDisplayData] = useState([])
	const [tagData, setTagData] = useState([])
	const [loadingState, setLoadingState] = useState('Thinking...')
	
	const imageCheck = async () => {
		setLoadingState('Checking Images and Credentials')

		setFormState('loading')
		const fileLimit = 100
		
		if (imageArray.length === 0) {
			// Using the displayError function for consistent error handling
			alert ("Please select at least one image file of a valid format to upload.");
			return setFormState('step1');
		}
			// validation 
		if (imageArray.length > fileLimit) {
			alert (`Please select up to ${fileLimit} files.`);
			return setFormState('step1');
		}
	
		for (let fileObj = 0; fileObj < imageArray.length; fileObj++) {
			const maxSize = ((imageArray[fileObj].size / 1024) / 1024).toFixed(4);
			const allowedFiles = /\.(png|gif|jpg|jpe?g|svg)$/i;
	
			if (imageArray[fileObj].name === "item" || maxSize >= 10) {
				alert ("Please check your images, individual images can be no larger than 10Mb");
				return setFormState('step1');
			}
	
			if (!allowedFiles.exec(imageArray[fileObj].name)) {
				alert ("Only valid image types can be uploaded, PNG, GIF, JPEG, JPG, SVG");
				return setFormState('step1');
			}
		}


		const jsonData = await BatchLinkCall();
		setBathToken(jsonData.data.cf_token)
		setBathURL(jsonData.data.cf_url)
		setDisplayData(jsonData.data.galleries)
		setTagData(jsonData.data.tags)
		setSilkID(jsonData.data.silk_id)
		setFormState('step2')  

	}

	if (formState === 'step1') {
		return (
			<ImageIntake imageCheck={imageCheck} setImageArray={setImageArray} />
		)
	} else if (formState === 'step2') {
		return (
			<ImageDetailsForm displayData={displayData} tagData={tagData} batchURL={batchURL} silkID={silkID} batchToken={batchToken} imageArray={imageArray} setPreviewState={setPreviewState} previewState={previewState} /> 
		) 
	} else if (formState === 'loading') {
		return (
			<ImageLoading loadingState={loadingState}/>
		)
	}
}

export default function UploadIntake() {
	const [imageArray, setImageArray] = useState([])
	const [formState, setFormState] = useState('')
	const [previewState, setPreviewState] = useState('pre-upload')
	useEffect(() => {
		setPreviewState('pre-upload')
		setFormState('step1')
	}, [])


	return (
		<div className='row mb-4' id='uploadsection'>
			<ImageUploadForm setFormState={setFormState} imageArray={imageArray} setImageArray={setImageArray} formState={formState} setPreviewState={setPreviewState} previewState={previewState}/>
			<div className='col-6'>
				<div className="intake-form img-preview-box overflow-auto">
					<p className='P-L'>
						Images
					</p>
					<div className="row">
						<ImagePaths  previewState={previewState}  setPreviewArray={setImageArray} pathToImage={imageArray} />
					</div>
				
				</div>
			</div>
		</div>
	)
}

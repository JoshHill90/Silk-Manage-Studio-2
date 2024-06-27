import { useEffect } from "react"
import { CloseIcon } from "../../../FontAwesome/FontAwesomeComp";
import upLoadImage from '../../../../css/image/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
export default function ImagePaths({pathToImage, setPreviewArray, previewState}) {
	

	useEffect(()=> {
		setPreviewArray(pathToImage)
		
	},[pathToImage, setPreviewArray])

	const handleRemoveImage = (indexToRemove) => {

		const updatedImagesArray = [...imagesArray];
		updatedImagesArray.splice(indexToRemove, 1);
		setPreviewArray(updatedImagesArray);
	
	};

	const imagesArray = Object.values(pathToImage ?? {});
	if (previewState === 'pre-upload'){
		if (imagesArray && imagesArray.length > 0) {
			return imagesArray.map((path, index) => (
				<div key={index} style={{position:'relative'}} className="image-holder previmg col">
					
					<input className="pathInput" hidden defaultValue={URL.createObjectURL(path)} id={`fp${index}`} name='path' />
					<input className="fileName" hidden defaultValue={path.name} id={`fp${index}`} name='title' />
					<button onClick={()=> {
						
						handleRemoveImage(index)
						
						}} 
						className="btn-icon-sm close-button-img">
						<CloseIcon  />
					</button>
					<div className="image-loader mt-4">

						<div id={`colorLoader${index}`} className="image-loader_cube"></div>
							<div className="image-loader_cube image-loader_cube--glowing">

								<img className="img-preview" src={URL.createObjectURL(path)} />
							</div>
					</div>

				</div>
			));
		} else {
			return (
				<>
					<p className="P-B text-center">waiting for upload...</p>
					<img
						className="placeholder-img"
						src={upLoadImage}
						alt="Placeholder"
					/>
				</>
			);
		}
	} else if (previewState === 'uploading-step1') {
		
		if (imagesArray && imagesArray.length > 0) {
			
			return imagesArray.map((path, index) => (
				
				<div key={index} style={{position:'relative'}} className="image-holder col">
					
					<input className="pathInput" hidden defaultValue={URL.createObjectURL(path)} id={`fp${index}`} name='path' />
					<input className="fileName" hidden defaultValue={path.name} id={`fp${index}`} name='title' />

					<div className="image-loader mt-4">
						<div id={`colorLoader${index}`} className="image-loader_cube image_cube--color image-loader_cube--color-1"></div>
						<div className="image-loader_cube image-loader_cube--glowing">
							
							<img className="img-preview image-uploading" src={URL.createObjectURL(path)} />
						</div>
					</div>
				</div>
			));
		} 
	}
}
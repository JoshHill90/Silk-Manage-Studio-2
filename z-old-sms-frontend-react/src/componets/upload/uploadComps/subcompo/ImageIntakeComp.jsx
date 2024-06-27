export default function ImageIntake({imageCheck, setImageArray}) {
	
	const uploadHandler = (imageData) => {
		
		setImageArray(imageData)
	}

	
	return (
		<div className='col-6 text-center intake-form'>
			<form className='form-group file-upload-form' id="uploadForm">
				<label htmlFor="imageUpload" className="file-upload-label">

					<span className="browse-button">Browse file</span>
					<input 
						name="files[]" 
						type="file" 
						id="imageUpload" 
						multiple 
						accept="image/*"
						
						onChange={(e)=>{
							
							uploadHandler(e.target.files)

						}}
					/>
					
				</label>
			</form>
			<button onClick={()=>{ imageCheck()
			}} className="btn-cust mt-3" id='uploadButton' name='uploadButton' >Next</button>
			<hr className="HR" />
			<p className='P-B'>Upload Procedure and Limitations</p>
			<p className='P-L'>Bulk uploads are limit to 60 at a time.</p>
			<p className='P-S'>
			
			You are welcome to upload images in the following formats:
			<br />
			PNG, GIF, JPEG, SVG
			<br />
			Please keep in mind the following size and dimension limitations:
			<br />
			The maximum image dimension allowed is 12,000 pixels.<br />
			Maximum image area is limited to 100 megapixels.<br />
			Images have a 10 megabyte (MB) size limit.<br />
			GIF animations are limited to 100 megapixels total (sum of sizes of all frames).
			</p>
		</div>
	)
}
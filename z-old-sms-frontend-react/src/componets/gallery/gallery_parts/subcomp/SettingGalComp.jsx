
import { useEffect, useState } from "react"
import { UpdateGallerySettings } from "../../../api/GalleryControlAPI"


export default function GallerySettings({currentSettings, galleryID}) {
	const [settings1, setSetting1] = useState(false)
	const [settings2, setSetting2] = useState(false)
	const [settings3, setSetting3] = useState(false)
	const [settings4, setSetting4] = useState(false)
	console.log(currentSettings)

	useEffect(()=> {
		if (currentSettings[0] === 'on') {
			
			setSetting1(true)
		} 
		if (currentSettings[1] === 'on') {
			setSetting2(true)
		} 
		if (currentSettings[2] === 'on') {
			setSetting3(true)
		} 
		if (currentSettings[3] === 'on') {
			setSetting4(true)
		} 
	}, [])

	const settingsFormHandler = () => {
		const formData = document.querySelectorAll('.galSettings')
		const settingsData = [];
		formData.forEach((element) => {
			settingsData.push(element.value)
			
		})
		UpdateGallerySettings(settingsData, galleryID)
	}

	const handleSettings1 = () => {
		setSetting1(!settings1)
	}
	const handleSettings2 = () => {
		setSetting2(!settings2)
	}
	const handleSettings3 = () => {
		setSetting3(!settings3)
	}
	const handleSettings4 = () => {
		setSetting4(!settings4)
	}


	return(
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
							<input 
								
								className="form-check-input galSettings" 
								type="checkbox" 
								name="visiable" 
								id="id_visiable" 
								onChange={handleSettings1}
								checked={settings1}
								value={settings1 ? 'on' : 'off'}
							/>
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
							<input 
								className="form-check-input galSettings" 
								type="checkbox" 
								name="site" 
								id="id_site"
								onChange={handleSettings2}
								checked={settings2}
								value={settings2 ? 'on' : 'off'}
							/>
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
							<input 
								className="form-check-input galSettings" 
								type="checkbox" 
								name="random" 
								id="id_random" 
								onChange={handleSettings3}
								checked={settings3}
								value={settings3 ? 'on' : 'off'}
							/>
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
							<input 
								className="form-check-input galSettings" 
								type="checkbox" 
								name="lock" 
								id="id_lock" 
								onChange={handleSettings4}
								checked={settings4}
								value={settings4 ? 'on' : 'off'}
							/>								
						</div>
					</div>
				</div>
				<button 
					className='btn-cust'
					onClick={(e) => {
						e.preventDefault();
						settingsFormHandler();
					}}
				>
					Update Settings
				</button>		
			</form>	
		</div>
	)
}
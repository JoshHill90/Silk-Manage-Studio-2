import "../../../css/gallery/images.css"
import { useState, useEffect } from "react";

export default function ImageInfoModal({id, title, link, tags}) {
	const [LoadinImages, setLoadinImages] = useState(true);
	const [isChecked, setIsChecked] = useState(false);

	useEffect (() => {
		if (id && id > 1) {
			setLoadinImages(false)
		} else {
			setLoadinImages(true)
		}
		
	}, [id])
	
	const handleImageToggle = () => {
		setIsChecked(!isChecked);
	};

	

	return (

		<div 
		onClick={handleImageToggle} 
		className={`imageCard ${isChecked ? 'image-checked' : ''}`}
		>
			{LoadinImages ? (

					
			<div className="loader1">
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="circle"></div>
			</div>

			) : (

			
			<div className="image" style={{ backgroundImage: `url(${link})` }}>
							<input 
				hidden
				type="checkbox" 
				checked={isChecked} 
				onChange={handleImageToggle}
				id={id} 
				/>
				<div className="cardInfo">
					<div className='row'>
						<div className="col-2">
							<p className="P-N">Title:</p>
							<p className="P-N">ID</p>
						</div>
						<div className="col-10">
							<p className="P-N">{title}</p>
							<p className="P-N">{id}</p>
						</div>
						<div className="col-12">
							<p className="P-N">Image Tags:</p>
						
							<div className="row">
								{tags.map(tags => (
									<div key={tags.id} className="col-4">
										<p className="P-L"> {tags.name} </p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			)}
		</div>
	)
}
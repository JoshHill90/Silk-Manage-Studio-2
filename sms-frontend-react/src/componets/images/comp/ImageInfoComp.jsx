import "../../../css/gallery/images.css"
import { useState } from "react";

export default function ImageInfoModal({id, title, link, tags}) {

	const [isChecked, setIsChecked] = useState(false);

	
	const handleImageToggle = () => {
		setIsChecked(!isChecked);
	};

	

	return (

		<div 
		onClick={handleImageToggle} 
		className={`imageCard ${isChecked ? 'image-checked' : ''}`}
		>


			
			<div className="image" style={{ backgroundImage: `url(${link})` }}>
							<input 
								hidden
								className="ImageCheck"
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
						</div>
						<p className="P-L">
							{tags.map((tag, index) => index === tags.length - 1 ? tag.name : `${tag.name}, `)}
							</p>

						<div className="col-4">
					
						</div>
					</div>
				</div>
			</div>
		
		</div>
	)
}
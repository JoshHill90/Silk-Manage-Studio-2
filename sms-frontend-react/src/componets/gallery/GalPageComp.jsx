import { AddSquIcon } from "../FontAwesome/FontAwesomeComp"
import { BtnIcon } from "../btn/BtnComp"
import {GalCreateForm} from "./gallery_parts/GalCreateComp";
import GalListWindow from "./gallery_parts/GalListComp";


import "./../../css/gallery/Gallery.css"

function GalleryPage() {
	
	return(
		<div className="container">

			<div className="row">
				<div className=" mt-2 mb-2 col-10">
					<h1 className="H1-L">
						Galleries
						
					</h1>
				</div>
				<div className="col-2 mt-2 mb-2 col-md-2">
					
					<BtnIcon 
					toggle="collapse" 
					target="#collapsCreateGallery" 
					aExpanded="false" 
					aControls="collapsCreateGallery"
					text='Create New Gallery' 
					icon={<AddSquIcon />} 
					/>
				</div>
				<hr className="HR"/>
			</div>

			<div className="row">
				
				<div className=" mt-4 mb-4 col-12">
					<div className="collapse" id="collapsCreateGallery" >
						<GalCreateForm/>
					</div>
				</div>
				<div className="mt-4 mb-4 col-12">
					<GalListWindow />
				</div>
			</div>
		</div>
	)
}

export default GalleryPage
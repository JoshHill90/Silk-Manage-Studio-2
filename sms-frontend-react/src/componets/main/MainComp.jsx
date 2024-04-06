
import BtnPadComp from '../btn/BtnPadComp'
import iconUploadImg from '../../css/image/icon1 (1).png'
import iconImageImg from '../../css/image/icon (2).png'
import iconGalleriesImg from '../../css/image/icon (3).png'
import iconSettingsImg from '../../css/image/icon (4).png'
function MainPage() {
	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-6 mt-3 mb-3">
					
					<BtnPadComp link={"/gallery"} title='Galleries' image={iconGalleriesImg} blip=''/>
					
				</div>
				<div className="col-12 col-md-6 mt-3 mb-3">
				
					<BtnPadComp link={"/images"} title='Images' image={iconImageImg} blip='' />

				</div>
				<div className="col-12 col-md-6 mt-3 mb-3">
				
					<BtnPadComp link={"/upload"} title='Upload' image={iconUploadImg} blip='' />
				
				</div>
				<div className="col-12 col-md-6 mt-3 mb-3">
				<BtnPadComp title='Users' image={iconSettingsImg} blip=''/>
				</div>
			</div>
		</div>
	);
}

export default MainPage
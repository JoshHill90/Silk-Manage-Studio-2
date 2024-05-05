
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
					
					<BtnPadComp 
						link={"/gallery"} 
						title='Galleries' 
						image={iconGalleriesImg} 
						blip='Welcome to the Gallery Control Page. Here, 
						you have complete control over your galleries. You can manage images, 
						customize gallery settings, and effortlessly share your galleries with others.'
					/>
					
				</div>
				<div className="col-12 col-md-6 mt-3 mb-3">
				
					<BtnPadComp 
						link={"/images"} 
						title='Images' 
						image={iconImageImg} 
						blip='Explore your entire collection in one place. 
						The All Images Page offers a comprehensive view of all 
						your uploaded images. Easily browse through your portfolio, 
						update your content wil the latest version, view past versions 
						and find inspiration for your next project.' 
					/>

				</div>
				<div className="col-12 col-md-6 mt-3 mb-3">
				
					<BtnPadComp 
						link={"/upload"} 
						title='Upload' 
						image={iconUploadImg} 
						blip='Time to add some new photos. On the Upload Image Page, 
						you can effortlessly upload and share your images with the world. 
						Simply select your images, add tags to categorize images, select your gallery, 
						and watch as your portfolio comes to life!' 
					/>
				
				</div>
				<div className="col-12 col-md-6 mt-3 mb-3">
				<BtnPadComp 
					title='Users' 
					image={iconSettingsImg} 
					blip="Your account, your way. 
					With Account Settings, you're in control. Customize your profile, update 
					your preferences, and manage your subscription effortlessly. Stay organized 
					and ensure your experience is tailored to your needs."
				/>
				</div>
			</div>
		</div>
	);
}

export default MainPage
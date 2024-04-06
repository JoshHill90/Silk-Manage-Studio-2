
import './../../css/btn/Btn.css';


function MainBtnPad({title, image, blip, link}) {

	const pageHandler= () => {
		window.location.href=link
		return
	}
	return (
		<div className="btn-pad"
		onClick={pageHandler}>
			<p className="P-A text-center">{ title }</p>
			<img className='main-pad' src={image} />
			<p className='P-L'>
				{blip}
			</p>
		</div>
	);
}


export default MainBtnPad
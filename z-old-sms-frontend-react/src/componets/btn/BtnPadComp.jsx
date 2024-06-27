
import './../../css/btn/Btn.css';


function MainBtnPad({title, image, blip, link}) {

	const pageHandler= () => {
		window.location.href=link
		return
	}
	return (
		<div className="btn-pad"
		onClick={pageHandler}>
			<h1 className="H1-D">{ title }</h1>
			<img className='main-pad' src={image} />
			<div className='pad-text'>
				<p className='P-D'>
					{blip}
				</p>
			</div>
		</div>
	);
}


export default MainBtnPad
import {HomeIcon, ImageIcon, ImagesIcon, UploadIcon} from '../FontAwesome/FontAwesomeComp.jsx';


import './../../css/nav/Nav.css';
// eslint-disable-next-line react/prop-types
function TreeNav({ navigateTo }) {

	return (
	<header className="Nav-Box ">
		<div className="Nav-Part">
		<p className="P-N" onClick={() => navigateTo('/')}>
			<HomeIcon /> Home
		</p>
		</div>
		<div className="Nav-Part">
			<p className="P-N" onClick={() => navigateTo('/gallery')}>
				<ImagesIcon /> Galleries
			</p>
		</div>
		<div className="Nav-Part">
			<p className="P-N" onClick={() => navigateTo('/images')}>
				<ImageIcon /> Images
			</p>
		</div>
		<div className="Nav-Part">
			<p className="P-N" onClick={() => navigateTo('/upload')}>
				<UploadIcon /> Upload
			</p>
		</div>

	</header>
	);
}

export default TreeNav
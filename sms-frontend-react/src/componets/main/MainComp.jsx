import { Link } from 'react-router-dom';
import BtnPadComp from '../btn/BtnPadComp'

function MainPage() {
	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-6 mt-3 mb-3">
					<Link to="/gallery">
						<BtnPadComp title='Galleries'/>
					</Link>
				</div>
				<div className="col-12 col-md-6 mt-3 mb-3">
				<BtnPadComp title='Images' />
				</div>
				<div className="col-12 col-md-6 mt-3 mb-3">
				<BtnPadComp title='Upload' />
				</div>
				<div className="col-12 col-md-6 mt-3 mb-3">
				<BtnPadComp title='Users' />
				</div>
			</div>
		</div>
	);
}

export default MainPage
import UploadIntake from './uploadComps/UploadIntakeComp'
import '../../css/upload/upload.css'
export default function UploadPage() {

	return (
		<div className="container">
			<div className="container">

				<div className="row">
					<div className=" mt-2 mb-2 col-10">
						<h1 className="H1-L">
							Upload
							
						</h1>
					</div>
					<hr className="HR"/>
				</div>

				<div className="row">

					<div className="mt-4 mb-4 col-12">
					<UploadIntake />
					</div>
				</div>
			</div>
		</div>
	)
}
import '../../css/upload/upload.css'
import ImageList from './comp/ListImageComp'
export default function ImagePage() {

	return (
		<div className="container">
			<div className="container">

				<div className="row">
					<div className=" mt-2 mb-2 col-10">
						<h1 className="H1-L">
							Images
							
						</h1>
					</div>
					<hr className="HR"/>
				</div>

				<div className="row">

					<div className="mt-4 mb-4 col-12">
						<ImageList />
					</div>
				</div>
			</div>
		</div>
	)
}
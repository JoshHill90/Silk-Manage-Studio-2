import '../../../../css/common/laoding.css'
export default function ImageLoading({loadingState}) {

	return(
		<div className='col-6 text-center intake-form'>
			<div className="loader2">
				<p className='P-N'>{loadingState}</p>
				<div className="circle2"></div>
				<div className="circle2"></div>
				<div className="circle2"></div>
				<div className="circle2"></div>
			</div>
		</div>
	)
}
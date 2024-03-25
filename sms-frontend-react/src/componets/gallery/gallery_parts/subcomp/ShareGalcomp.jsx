export default function ShareGallery() {

	return (
		<div className='col-12'>
			<div className='row'>
				<div className='col-12 mt-4 mb-4 col-md-4'>
					<form method="post" id='shareDisplayForm'>
						<div className='col-12'>
							<label className='P-N' htmlFor="id_daysExpire">Set days until link expires</label>
							<input className='form-control' defaultValue='90' type="number" name="daysExpire" maxLength="255" required="" id="id_daysExpire" />
						</div>
						<button className=' mt-4 btn-cust'>
							Create Gallery Link
						</button>
					</form>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 mt-4 mb-4 col-md-4'>
					<hr />
					<label className='P-N' htmlFor="id_shared_gallery">Please Copy this URL: <i className="fa-regular fa-copy"></i></label>
					
					<input className='form-control' defaultValue='' type="text" name="ShareUrl" maxLength="3000" required="" id="ShareUrl" disabled />
				</div>
			</div> 
		</div>
	)
}
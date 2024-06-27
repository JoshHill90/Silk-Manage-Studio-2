import { FilterIcon } from "../../FontAwesome/FontAwesomeComp"
export default function ImageSearch() {
	return(
		<div className='row'>
			<div className="col-12 text-center collapse" id="collapseSearch">
				<form>
						<div className='row'>
							<div className='col-12'>
								
								<div className="mb-3">
									<label htmlFor="id_tags" className="form-label P-L">Tag</label>
									<input type="text" name='id_tags' className="form-control" id="id_tags" aria-describedby="tags" />
								</div>

							</div>
							<div className='col-12'>
								<label className="form-label P-L">Date Range</label>
							</div>
							<div className='col-6'>
								<div className="mb-3">
									<label htmlFor="id_start" className="form-label P-L">Start</label>
									<input type="date" name='id_start' className="form-control" id="id_start" aria-describedby="tags" />
								</div>

							</div>
							<div className='col-6'>
								<div className="mb-3">
									<label htmlFor="id_end" className="form-label P-L">End</label>
									<input type="date" name='id_end' className="form-control" id="id_end" aria-describedby="tags" />
								</div>

							</div>
							<div className='col-6'>
								<button className='btn-cust mt-2'>
									Search
								</button>
							</div>
							<div className='col-6'>
								<button className='btn-cust-2 mt-2'>
									Clear Search
								</button>
							</div>
						</div>
				</form>
			</div>
				
			<div className='col-12 text-center'>
				
				<button 
					className='btn-icon-sm mt-4' 
					type="button" data-bs-toggle="collapse" 
					data-bs-target="#collapseSearch" 
					aria-expanded="false" 
					aria-controls="collapseSearch"
				>
					<FilterIcon />
				</button>
			</div>
		</div>
		

	)
}
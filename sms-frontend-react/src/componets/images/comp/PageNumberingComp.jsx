import { useEffect, useState } from "react"
import { DubArrowLeftIcon, DubArrowRightIcon, ArrowLeftIcon, ArrowRightIcon} from "../../FontAwesome/FontAwesomeComp"

function pageChange(setResData, setAllImages, setCurrentPage) {
	return new Promise(resolve => {
		setResData([])
		setAllImages([])
		setCurrentPage(0)
		setTimeout(resolve, 500);
	});
}

export default function PageNumbering({setResData, setAllImages, currentPage, setCurrentPage, lastPage,}) {
	const [pageCall, setPageCall] = useState([])
	const [pageNumbers, setPageNumbers] = useState([])
	const [fullPageNumbers, setFullPageNumbers] = useState([])
	const [rangeLow, setRangeLow] = useState([])
	const [rangeHigh, setRangeHigh] = useState([])

	useEffect(() => {
		if (pageCall === 'first') {
			goToPage(1)
		} else if (pageCall === 'last') {
			goToPage(lastPage)
		} else if (pageCall === 'next') {
			goToPage(currentPage + 1)
		} else if (pageCall === 'prev') {
			goToPage(currentPage - 1)
		}
		return setPageCall('')
	}, [pageCall, currentPage, lastPage])

	useEffect(()=>{
		
		const pageList = []

		if (currentPage === 1 || currentPage === 2 && lastPage > 5) {
			setRangeLow(1)
			setRangeHigh(5)
		} else if (currentPage >= (lastPage - 1) && lastPage > 5) {
			setRangeLow(lastPage - 4)
			setRangeHigh(lastPage)
		} else if (lastPage > 5) {
			setRangeLow(currentPage - 2)
			setRangeHigh(currentPage + 2)
		}
		for(let i = rangeLow; i <= rangeHigh; i++){
			pageList.push(i)
		}
		setPageNumbers(pageList)
		
	}, [lastPage, currentPage, rangeLow, rangeHigh])

	useEffect(() => {
		const fullpageList = []
		for(let numi = 1; numi <= lastPage; numi++ ) {
			fullpageList.push(numi)
		}
		setFullPageNumbers(fullpageList)
	}, [lastPage])


	const goToPage = (page) => {
		const selectPage = parseInt(page)
		pageChange(setResData, setAllImages, setCurrentPage).then(setCurrentPage(selectPage))
	}


	return(
		<div className='row'>
			<div className='col-12'>
				<p className='P-B'>Page Controls</p>
			</div>
			<div className='col-12'>
				<div className='row text-center'>

					<div className='col-2'>
						<button className={`${1 === currentPage ? 'btn-icon-disabled-sm':'btn-icon-sm'}`}
						
							onClick={() => {
							if(1 !== currentPage){setPageCall('first')}
							}}>
							<DubArrowLeftIcon />
						</button>
					</div>

					<div className='col-2'>
					<button className={`${1 === currentPage ? 'btn-icon-disabled-sm':'btn-icon-sm'}`}
							
							onClick={() => {
								if(1 !== currentPage){setPageCall('prev')}
							}}>
								<ArrowLeftIcon />
						</button>
					</div>

					<div className='col-4'>
						<p className='P-B'>{currentPage}/{lastPage}</p>
					</div>

					<div className='col-2'>
						<button className={`${lastPage === currentPage ? 'btn-icon-disabled-sm':'btn-icon-sm'}`}
							
							onClick={() => {
								if(lastPage !== currentPage){setPageCall('next')}
							}}>
								<ArrowRightIcon />
						</button>
					</div>

					<div className='col-2'>
						<button className={`${lastPage === currentPage ? 'btn-icon-disabled-sm':'btn-icon-sm'}`}
							
							onClick={() => {
								if(lastPage !== currentPage){setPageCall('last')}
							}}>
							<DubArrowRightIcon />
						</button>
					</div>
					<div className='col-12 tex-center'>
						<ul className="horizontal-list">
						{pageNumbers.map(page => (
							<li className={`select-num ${page === currentPage ? 'P-B':'P-A' }`} onClick={() => goToPage(page)} key={page}>{page}</li>
						))}
						</ul>

					</div>
					<div className='col-12 tex-center'>
						<form onSubmit={(event) => {
								event.preventDefault(); 
								goToPage(event.target.pageSelect.value)
								console.log(event.target.pageSelect.value);
							}}>
							<p className="P-B">Select a page</p>
							<select className="form-control" name="pageSelect">
								{fullPageNumbers.map(page => (
									<option value={page} selected={page === currentPage ? true:false} key={page}>{page}</option>
								))}
							</select>
							<button className="mt-4 btn-cust-2">Go To</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
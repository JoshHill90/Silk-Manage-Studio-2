import { useEffect, useState } from "react"

export default function BtbHamberger({ activeStatus, setActiveStatus }) {
	const [checkManage, setCheckManage] = useState(false)



	const HamHandler = () => {

		if (activeStatus === true) {
			setActiveStatus(false)
			console.log("close")
		} else {
			setActiveStatus(true)
			console.log("open")
		}

	}


	return (
		<div className="ham-holder">
			<label className="bar" htmlFor="checkHam">
				<input type="checkbox" id="checkHam" onChange={() => HamHandler()} />

				<span className="top"></span>
				<span className="middle"></span>
				<span className="bottom"></span>
			</label>
		</div>
	)
}
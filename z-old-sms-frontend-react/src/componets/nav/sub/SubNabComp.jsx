import { useState } from "react"
import "../../../css/btn/subNavControl.css"
import BtbHamberger from "../../btn/BtnHamComp"
export default function SubNav({ Row1, Row2, Row3, Row4, Row5, Row6 }) {
	const [isActive, setIsActive] = useState(true)
	console.log(isActive)
	return (
		<div className={isActive ? "subNav-mini col-1" : "subNav col-4"} >
			<BtbHamberger activeStatus={isActive} setActiveStatus={setIsActive} />

			<div className="row" hidden={isActive ? true : false}>
				<div className="col-12">
					{Row1}
				</div>
				<div className="col-12">
					{Row2}
				</div>
				<div className="col-12">
					{Row3}
				</div>
				<div className="col-12">
					{Row4}
				</div>
				<div className="col-12">
					{Row5}
				</div>
				<div className="col-12">
					{Row6}
				</div>
			</div>
		</div>
	)
}
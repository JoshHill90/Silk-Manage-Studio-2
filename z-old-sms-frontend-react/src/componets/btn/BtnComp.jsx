import ToolTip from '../tools/ToolTipComp';
import './../../css/btn/Btn.css';


export function BtnCust({ title }) {
	return (
		<button className="btn-cust">
			<p className="P-A text-center">{title}</p>
		</button>
	);
}

export function BtnIcon({ icon, text, textHint, toggle, target, aExpanded, aControls, click }) {
	return (
		<button className="btn-icon text-center tooltip-obj"
			data-bs-toggle={toggle}
			data-bs-target={target}
			aria-expanded={aExpanded}
			aria-controls={aControls}
			onClick={click}
		>
			{icon} {text}

			<ToolTip text={textHint} />
		</button>
	);
}

export function SmBtnIcon({ icon, text, toggle, target, aExpanded, aControls, click }) {
	return (
		<button
			className="btn-icon-sm text-center tooltip-obj"
			data-bs-toggle={toggle}
			data-bs-target={target}
			aria-expanded={aExpanded}
			aria-controls={aControls}
			onClick={click}
		>
			{icon}
			<ToolTip text={text} />
		</button>
	);
}

export function BtnImage({ title }) {
	return (
		<button className="btn-cust">
			<p className="P-A text-center">{title}</p>
		</button>
	);
}

export function BtnGalList() {
	return (
		<div className="btn-list-item mt-2"

		>

		</div>
	);
}


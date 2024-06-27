export default function SplitNums(galData)  {
	if ( !galData) {
		return
	}
	console.log(galData)
	const SplitNumber = galData.split("").map(Number);
	return { SplitNumber }
}
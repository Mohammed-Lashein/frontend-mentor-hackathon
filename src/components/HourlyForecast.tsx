function Header() {
	return (
		<div className='flex justify-between items-center pb-200'>
			<h4 className='font-semibold text-xl'>HourlyForecast</h4>
			{/* DaysDropdown.. to do */}
		</div>
	)
}
function HourlyForecast() {
	return (
		<div className='grow bg-neutral-800 p-300 rounded-20 relative'>
			<Header />
		</div>
	)
}
export default HourlyForecast

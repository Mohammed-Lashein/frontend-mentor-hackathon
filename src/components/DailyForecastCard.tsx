type DailyForecastCardProps = {
	day: string
	icon: string
	// Note that the temperatures are returned from the api as numbers, so I don't know if the
	// conversion will be handled by the reducers or by this component through internal utilities.
	// I am keeping things simple for now and just using strings
	maxTemperature: string
	minTemperature: string
}
function DailyForecastCard({ day, icon, maxTemperature, minTemperature }: DailyForecastCardProps) {
	return (
		<div className='font-dm-sans border border-neutral-600 bg-neutral-800 rounded-12 flex flex-col gap-200 items-center p-200 '>
			<p>{day}</p>
			<p>
				<img
					src={icon}
					alt=''
				/>
			</p>
			<div className='temperature-range flex justify-between self-stretch'>
				<p>{maxTemperature}</p>
				<p>{minTemperature}</p>
			</div>
		</div>
	)
}
export default DailyForecastCard

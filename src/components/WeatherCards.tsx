import WeatherCard from './WeatherCard'

function WeatherCards() {
	const dataForCards = [
		{
			label: 'Feels Like',
			value: '20°',
		},
		{
			label: 'Humidity',
			value: '46%',
		},
		{
			label: 'Wind',
			value: '14 km/h',
		},
		{
			label: 'Precipitation',
			value: '0mm',
		},
	]
	return (
		<div className='grid grid-cols-4 pt-400 gap-300'>
			{dataForCards.map(({ label }) => (
				<WeatherCard key={label} />
			))}
		</div>
	)
}
export default WeatherCards

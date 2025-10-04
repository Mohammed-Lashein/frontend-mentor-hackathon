import { useAppSelector } from '../hooks'
import WeatherCard from './WeatherCard'

function WeatherCards() {
	const data = useAppSelector(({weatherData}) => ([
		{
			label: 'Feels Like',
			value: weatherData.current.temperature_2m + weatherData.current_units.temperature_2m,
		},
		{
			label: 'Humidity',
			value: weatherData.current.humidity + weatherData.current_units.humidity,
		},
		{
			label: 'Wind',
			value: weatherData.current.wind_speed_10m + weatherData.current_units.wind_speed_10m,
		},
		{
			label: 'Precipitation',
			value: weatherData.current.precipitation + weatherData.current_units.precipitation,
		},

	]
	))
	const dataForCards = data
	return (
		<div className='grid grid-cols-4 pt-400 gap-300'>
			{dataForCards.map(({ label, value }) => (
				<WeatherCard
					label={label}
					value={value}
					key={label}
				/>
			))}
		</div>
	)
}
export default WeatherCards

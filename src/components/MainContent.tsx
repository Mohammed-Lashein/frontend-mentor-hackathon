import HourlyForecast from './HourlyForecast'
import WeatherData from './WeatherData'

function MainContent() {
	return (
		<div className='grid lg:grid-cols-[2fr_1fr] pt-600 gap-8'>
			<WeatherData />
			<HourlyForecast />
		</div>
	)
}
export default MainContent

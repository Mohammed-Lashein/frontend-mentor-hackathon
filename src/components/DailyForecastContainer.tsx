import iconRain from '@/assets/images/icon-rain.webp'
import iconDrizzle from '@/assets/images/icon-drizzle.webp'
import iconSunny from '@/assets/images/icon-sunny.webp'
import iconPartlyCloudy from '@/assets/images/icon-partly-cloudy.webp'
import iconStorm from '@/assets/images/icon-storm.webp'
import iconSnow from '@/assets/images/icon-snow.webp'
import iconFog from '@/assets/images/icon-fog.webp'
import DailyForecastCard from './DailyForecastCard'
import { useAppSelector } from '../hooks'
import { getAbbreviatedWeekDayName, getCorrectIconPathAccordingToWeatherCode } from '../utils'

// as named in Figma -- I better quote some names from figma design instead of
// trying to come up with components names
function DailyForecastContainer() {
   const dailyForecastData = useAppSelector((state) => ({
    days: state.weatherData.daily.time.map((day: string) => getAbbreviatedWeekDayName(day)),
    maxTemperature: state.weatherData.daily.apparent_temperature_max,
    minTemperature: state.weatherData.daily.apparent_temperature_min,
    weatherCode: state.weatherData.daily.weather_code || []
  }))
	return (
		<div className='pt-600'>
			<h3 className='text-xl font-dm-sans font-semibold'>Daily forecast</h3>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-200 pt-250 '>
				{Array.from({length: 7}).map((_, i) => (
					<DailyForecastCard
						day={dailyForecastData.days[i]}
						icon={getCorrectIconPathAccordingToWeatherCode(dailyForecastData.weatherCode[i])}
						maxTemperature={dailyForecastData.maxTemperature[i] + '°'}
						minTemperature={dailyForecastData.maxTemperature[i] + '°'}
						key={i} // I will change the key to be the day name since it is unique in a week when we get the data from the api
					/>
				))}
			</div>
		</div>
	)
}
export default DailyForecastContainer

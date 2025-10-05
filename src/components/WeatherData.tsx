import iconSunny from '@/assets/images/icon-sunny.webp'
import WeatherCards from './WeatherCards'
import DailyForecastContainer from './DailyForecastContainer'
import { getCorrectIconPathAccordingToWeatherCode, getFullWeekDayName } from '../utils'
import { useAppSelector } from '../hooks'

function displayDate() {
  /* 
    This function will be responsible for displaying the date in the format in the design.
  */
//  create a new date
const date = new Date()
//  call .toDateString() on it
//  split the date and destructure the elements in it
const [, month, dayNumberRelativeToTheMonth, year] = date.toDateString().split(' ')
//  call the utility getFullWeekDaysNamesStartingFromToday and pass the date to it in iso format
  const day = getFullWeekDayName(date.toISOString())
//  return the date in the expected format
return `${day}, ${month} ${dayNumberRelativeToTheMonth}, ${year}`
}

function WeatherData() {
  const temperatureNow = useAppSelector((state) => state.weatherData.current.temperature_2m)
  const currentWeatherCode = useAppSelector((state) => state.weatherData.current.weather_code)
	return (
		<div>
			<div className="today-weather bg-[url('/bg-today-small.svg')] sm:bg-[url('/bg-today-large.svg')] bg-no-repeat  h-[17.875rem] flex justify-between items-center bg-cover p-12 rounded-16">
				<div className='flex items-center justify-between weather-details flex-col sm:flex-row w-full'>
					<div className='today-weather-info'>
						<h2 className='text-3xl font-dm-sans'>Cairo, Egypt</h2>
						<p className='date'>{displayDate()}</p>
					</div>
					<div className='flex items-center temperature gap-5'>
            <p className='w-28'>
						<img
							src={getCorrectIconPathAccordingToWeatherCode(currentWeatherCode)}
							alt='current_weather_icon'
						/>
            </p>
						<p className='text-8xl font-bricolage'>{temperatureNow}°</p>
					</div>
				</div>
			</div>

      <WeatherCards />
      <DailyForecastContainer />
		</div>
	)
}

export default WeatherData

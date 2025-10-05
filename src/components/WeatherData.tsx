import WeatherCards from './WeatherCards'
import DailyForecastContainer from './DailyForecastContainer'
import { useAppSelector } from '../hooks'
import { getCorrectIconPathAccordingToWeatherCode, getFullWeekDaysNamesStartingFromToday } from '../utils'

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
  const day = getFullWeekDaysNamesStartingFromToday(date.toISOString())
//  return the date in the expected format
return `${day}, ${month} ${dayNumberRelativeToTheMonth}, ${year}`
}


function WeatherData() {
  const temperatureNow = useAppSelector((state) => state.weatherData.current.temperature_2m)
  const currentWeatherCode = useAppSelector((state) => state.weatherData.current.weather_code)
	return (
		<div>
			<div className="today-weather bg-[url('/bg-today-large.svg')] bg-no-repeat  h-[17.875rem] flex justify-between items-center grow-[2] bg-cover p-12 rounded-16">
				<div className='flex items-center justify-between w-full weather-details'>
					<div className='today-weather-info'>
						<h2 className='text-3xl font-dm-sans'>Cairo, Egypt</h2>
            {/* will require a utility to display the date like so */}
						<p className='date'>{displayDate()}</p> 
					</div>
					<div className='flex items-center temperature'>
						<img
							src={getCorrectIconPathAccordingToWeatherCode(currentWeatherCode)}
							alt=''
							width={100}
						/>
						<p className='text-6xl font-bricolage'>{temperatureNow}°</p>
					</div>
				</div>
			</div>

      <WeatherCards />
      <DailyForecastContainer />
		</div>
	)
}

export default WeatherData

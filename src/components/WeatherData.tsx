import iconSunny from '@/assets/images/icon-sunny.webp'
import WeatherCards from './WeatherCards'
import DailyForecastContainer from './DailyForecastContainer'
function WeatherData() {
	return (
		<div>
			<div className="today-weather bg-[url('/bg-today-small.svg')] sm:bg-[url('/bg-today-large.svg')] bg-no-repeat  h-[17.875rem] flex justify-between items-center bg-cover p-12 rounded-16">
				<div className='flex items-center justify-between weather-details flex-col sm:flex-row w-full'>
					<div className='today-weather-info'>
						<h2 className='text-3xl font-dm-sans'>Berlin, Germany</h2>
						<p className='date'>Tuesday, Aug 5, 2025</p>
					</div>
					<div className='flex items-center temperature'>
						<img
							src={iconSunny}
							alt=''
							width={100}
						/>
						<p className='text-6xl font-bricolage'>20°</p>
					</div>
				</div>
			</div>

      <WeatherCards />
      <DailyForecastContainer />
		</div>
	)
}

export default WeatherData

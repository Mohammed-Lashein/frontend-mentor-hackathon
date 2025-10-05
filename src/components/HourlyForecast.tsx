import React, { useEffect, useState } from 'react'
import iconDropdown from '@/assets/images/icon-dropdown.svg'
import iconRain from '@/assets/images/icon-rain.webp'
import iconDrizzle from '@/assets/images/icon-drizzle.webp'
import iconSunny from '@/assets/images/icon-sunny.webp'
import iconPartlyCloudy from '@/assets/images/icon-partly-cloudy.webp'
import iconStorm from '@/assets/images/icon-storm.webp'
import iconSnow from '@/assets/images/icon-snow.webp'
import iconFog from '@/assets/images/icon-fog.webp'
import { useAppSelector } from '../hooks'
import { extractTimeFromDateISOFormat, getCorrectIconPathAccordingToWeatherCode } from '../utils'

type TriggerButtonProps = {
	selectedDay: string
	setIsDaysListOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function TriggerButton({ setIsDaysListOpen, selectedDay }: TriggerButtonProps) {
	function toggleUnitsList() {
		setIsDaysListOpen((prev) => !prev)
	}
	return (
		<button
			className='bg-neutral-600 py-2 px-4 rounded-md flex justify-center items-center gap-125 cursor-pointer'
			onClick={toggleUnitsList}
		>
			<p>{selectedDay}</p>
			<img
				src={iconDropdown}
				alt='dropdown icon'
			/>
		</button>
	)
}
type DaysListProps = {
	days: string[]
	selectedDay: string
	setSetselectedDay: React.Dispatch<React.SetStateAction<string>>
	setIsDaysListOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedDayIndex: React.Dispatch<React.SetStateAction<number>>
}
function DaysList({ days, selectedDay, setSetselectedDay, setIsDaysListOpen, setSelectedDayIndex }: DaysListProps) {
	return (
		<div className='rounded-6 border border-neutral-600 bg-neutral-800 p-2 w-[13.75rem] absolute right-6 top-20'>
			{days.map((day, i) => (
				<button
					className={`hover:bg-neutral-700 p-125 rounded-6 w-full text-left cursor-pointer ${
						day === selectedDay ? 'bg-neutral-700' : ''
					}`}
					key={i}
					onClick={(e) => {
            e.stopPropagation()
						setSetselectedDay(days[i])
						setIsDaysListOpen(false)
            setSelectedDayIndex(i)
					}}
				>
					{day}
				</button>
			))}
		</div>
	)
}

function DaysDropdown({setSelectedDayIndex}: {setSelectedDayIndex: React.Dispatch<React.SetStateAction<number>>}) {
	const [isDaysListOpen, setIsDaysListOpen] = useState(false)
  const days = useAppSelector((state) => state.weekdaysNamesStartingFromToday)
	// const [selectedDay, setSetselectedDay] = useState(days[0])
  const isLoading = useAppSelector((state) => state.isLoading)
	const [selectedDay, setSetselectedDay] = useState(days[0])

  useEffect(() => {
    /* 
      Adding days array as a dev deps is important, because initially it is an [], but after extracting data
      from the store it is an array filled with elements.
    */
      setSetselectedDay(days[0])
  }, [days])

  if(isLoading) {
    return <h1>loading</h1>
  }

	return (
		<div>
			<TriggerButton
				setIsDaysListOpen={setIsDaysListOpen}
				selectedDay={selectedDay}
			/>
			{isDaysListOpen && (
				<DaysList
					days={days}
					selectedDay={selectedDay}
					setSetselectedDay={setSetselectedDay}
					setIsDaysListOpen={setIsDaysListOpen}
          setSelectedDayIndex={setSelectedDayIndex}
				/>
			)}
		</div>
	)
}

function Header({setSelectedDayIndex}: {setSelectedDayIndex: React.Dispatch<React.SetStateAction<number>>}) {
	return (
		<div className='flex justify-between items-center pb-200'>
			<h4 className='font-semibold text-xl'>HourlyForecast</h4>
			<DaysDropdown setSelectedDayIndex={setSelectedDayIndex}/>
		</div>
	)
}

type HourlyWeatherCardProps = {
	icon: string
	time: string
	temperature: string
}
function HourlyWeatherCard({ icon, time, temperature }: HourlyWeatherCardProps) {
	return (
		<div className='border bg-neutral-700 border-neutral-600 pt-125 pr-200 pb-125 pl-150 font-dm-sans rounded-8 hover:bg-neutral-600'>
			<div className='grid grid-cols-[auto_1fr_auto] gap-100 items-center'>
				<div className='w-10 h-10 image-container'>
					<img
						src={icon}
						alt='weather image icon'
					/>
				</div>
				<p className='text-xl font-medium'>{time}</p>
				<p>{temperature}</p>
			</div>
		</div>
	)
}
function HourlyForecast() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const data = useAppSelector((state) => {
    return {
    time: state.weatherData.hourly.time.slice(24 * selectedDayIndex, 24 + (24 * selectedDayIndex)),
    weatherCode: state.weatherData.hourly.weather_code.slice(24 * selectedDayIndex, 24 + (24 * selectedDayIndex)),
    temperature:  state.weatherData.hourly.temperature_2m.slice(24 * selectedDayIndex, 24 + (24 * selectedDayIndex)),
  }
  })
	const dailyForecastData = [
		{
			time: '3 PM',
			icon: iconRain,
			temperature: '20°',
		},
		{
			time: '3 PM',
			icon: iconDrizzle,
			temperature: '20°',
		},
		{
			time: '3 PM',
			icon: iconSunny,
			temperature: '20°',
		},
		{
			time: '3 PM',
			icon: iconPartlyCloudy,
			temperature: '20°',
		},
		{
			time: '3 PM',
			icon: iconStorm,
			temperature: '20°',
		},
		{
			time: '3 PM',
			icon: iconSnow,
			temperature: '20°',
		},
		{
			time: '3 PM',
			icon: iconFog,
			temperature: '20°',
		},
		{
			time: '3 PM',
			icon: iconFog,
			temperature: '20°',
		},
		{
			time: '3 PM',
			icon: iconFog,
			temperature: '20°',
		},
		{
			time: '3 PM',
			icon: iconFog,
			temperature: '20°',
		},
	]

	return (
		<div className='grow bg-neutral-800 p-300 rounded-20 relative'>
			<Header setSelectedDayIndex={setSelectedDayIndex}/>
			<div className='hourly-weather-cards-container flex flex-col gap-200 overflow-scroll h-[630px] pt-2'>
				{/* {dailyForecastData.map(({ time, icon, temperature }, i) => (
					<HourlyWeatherCard
						time={time}
						icon={icon}
						temperature={temperature}
						key={i}
					/>
				))} */}
				{Array.from({length: 23}).map((_, i) => (
					<HourlyWeatherCard
						time={extractTimeFromDateISOFormat(data.time[i])}
						icon={getCorrectIconPathAccordingToWeatherCode(data.weatherCode[i])}
						temperature={data.temperature[i] + '°'}
						key={i}
					/>
				))}
			</div>
		</div>
	)
}
export default HourlyForecast

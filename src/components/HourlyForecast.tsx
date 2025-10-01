import React, { useState } from 'react'
import iconDropdown from '@/assets/images/icon-dropdown.svg'
import iconRain from '@/assets/images/icon-rain.webp'
import iconDrizzle from '@/assets/images/icon-drizzle.webp'
import iconSunny from '@/assets/images/icon-sunny.webp'
import iconPartlyCloudy from '@/assets/images/icon-partly-cloudy.webp'
import iconStorm from '@/assets/images/icon-storm.webp'
import iconSnow from '@/assets/images/icon-snow.webp'
import iconFog from '@/assets/images/icon-fog.webp'

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
	setIsDaysListOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function DaysList({ days, selectedDay, setSetselectedDay, setIsDaysListOpen }: DaysListProps) {
	return (
		<div className='rounded-6 border border-neutral-600 bg-neutral-800 p-2 w-[13.75rem] absolute right-6 top-20'>
			{days.map((day, i) => (
				<button
					className={`hover:bg-neutral-700 p-125 rounded-6 w-full text-left cursor-pointer ${
						day === selectedDay ? 'bg-neutral-700' : ''
					}`}
					key={i}
					onClick={() => {
						setSetselectedDay(days[i])
						setIsDaysListOpen(false)
					}}
				>
					{day}
				</button>
			))}
		</div>
	)
}

function DaysDropdown() {
	const [isDaysListOpen, setIsDaysListOpen] = useState(false)
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
	const [selectedDay, setSetselectedDay] = useState(days[0])

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
				/>
			)}
		</div>
	)
}

function Header() {
	return (
		<div className='flex justify-between items-center pb-200'>
			<h4 className='font-semibold text-xl'>HourlyForecast</h4>
			<DaysDropdown />
		</div>
	)
}
function HourlyWeatherCard() {
  return <div>HourlyWeatherCard</div>
}
function HourlyForecast() {
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
			<Header />
			<div className='hourly-weather-cards-container flex flex-col gap-200 overflow-scroll h-[630px] pt-2'>
				{dailyForecastData.map((data, i) => (
					<HourlyWeatherCard
						key={i}
					/>
				))}
			</div>
		</div>
	)
}
export default HourlyForecast

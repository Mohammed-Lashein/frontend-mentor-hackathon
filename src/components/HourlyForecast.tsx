import React, { useState } from 'react'
import iconDropdown from '../assets/images/icon-dropdown.svg'

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
function HourlyForecast() {
	return (
		<div className='grow bg-neutral-800 p-300 rounded-20 relative'>
			<Header />
		</div>
	)
}
export default HourlyForecast

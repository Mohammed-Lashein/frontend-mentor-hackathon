import React, { useState } from 'react'
import iconDropdown from '@/assets/images/icon-dropdown.svg'
import iconUnits from '@/assets/images/icon-units.svg'
import checkmarkIcon from '../assets/images/icon-checkmark.svg'

type TriggerButtonProps = {
	setIsUnitsListOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function TriggerButton({ setIsUnitsListOpen }: TriggerButtonProps) {
	function toggleUnitsList() {
		setIsUnitsListOpen((prev) => !prev)
	}
	return (
		<>
			<button
				className='bg-neutral-800 p-2 rounded-md flex justify-center items-center gap-[var(--spacing-125)] cursor-pointer hover:bg-neutral-700'
				onClick={toggleUnitsList}
			>
				<img
					src={iconUnits}
					alt=''
				/>
				<p>Units</p>
				<img
					src={iconDropdown}
					alt=''
				/>
			</button>
			{/*  */}
		</>
	)
}

function UnitsList() {
	const [temperatureUnit, setTemperatureUnit] = useState('celsius')
	const [windSpeed, setWindSpeed] = useState('km/h')
	const [precipitation, setPrecipitation] = useState('mm')

	return (
		<div className='rounded-md border border-neutral-600 bg-neutral-800 p-2 w-[13.75rem] absolute top-[3.5rem]'>
			<button className='hover:bg-neutral-700 p-[var(--spacing-125)] rounded-md w-full text-left cursor-pointer'>
				Switch to {'imperial'}
			</button>
			<div className='flex flex-col items-start pb-2 gap-[var(--spacing-50)]'>
				<p className='Label text-sm text-neutral-500 px-2'>Temperature</p>
				{/* p-1 px-3 */}
				<button
					className={`hover:bg-neutral-700  p-[var(--spacing-100)] rounded-md w-full text-left cursor-pointer flex justify-between ${
						temperatureUnit === 'celsius' && 'bg-neutral-700'
					}`}
				>
					Celsius (°C) {temperatureUnit === 'celsius' && <img src={checkmarkIcon} />}
				</button>
				<button
					className={`hover:bg-neutral-700  p-[var(--spacing-100)] rounded-md w-full text-left cursor-pointer flex justify-between ${
						temperatureUnit === 'fahrenheit' && 'bg-neutral-700'
					}`}
					onClick={() => setTemperatureUnit('fahrenheit')}
				>
					Fahrenheit (°F) {temperatureUnit === 'fahrenheit' && <img src={checkmarkIcon} />}
				</button>
			</div>
			<hr />

			<div className='flex flex-col items-start pb-2 gap-[var(--spacing-50)]'>
				<p className='Label text-sm text-neutral-500 p-[var(--spacing-75)]'>WindSpeed</p>
				{/* p-1 px-3 */}
				<button
					className={`hover:bg-neutral-700  p-[var(--spacing-100)] rounded-md w-full text-left cursor-pointer flex justify-between ${
						windSpeed === 'km/h' && 'bg-neutral-700'
					}`}
					onClick={() => setWindSpeed('km/h')}
				>
					km/h {windSpeed === 'km/h' && <img src={checkmarkIcon} />}
				</button>
				<button
					className={`hover:bg-neutral-700  p-[var(--spacing-100)] rounded-md w-full text-left cursor-pointer flex justify-between ${
						windSpeed === 'mph' && 'bg-neutral-700'
					}`}
					onClick={() => setWindSpeed('mph')}
				>
					mph {windSpeed === 'mph' && <img src={checkmarkIcon} />}
				</button>
			</div>
			<hr />

			<div className='flex flex-col items-start pb-2 gap-[var(--spacing-50)]'>
				<p className='Label text-sm text-neutral-500  p-[var(--spacing-75)]'>Precipitation</p>
				{/* p-1 px-3 */}
				<button
					className={`hover:bg-neutral-700  p-[var(--spacing-100)] rounded-md w-full text-left cursor-pointer flex justify-between ${
						precipitation === 'mm' && 'bg-neutral-700'
					}`}
					onClick={() => setPrecipitation('mm')}
				>
					Millimeters (mm) {precipitation === 'mm' && <img src={checkmarkIcon} />}
				</button>
				<button
					className={`hover:bg-neutral-700  p-[var(--spacing-100)] rounded-md w-full text-left cursor-pointer flex justify-between ${
						precipitation === 'in' && 'bg-neutral-700'
					}`}
					onClick={() => setPrecipitation('in')}
				>
					Inches (in) {precipitation === 'in' && <img src={checkmarkIcon} />}
				</button>
			</div>
		</div>
	)
	{
		/*  */
	}
}

function UnitsDropdown() {
	const [isUnitsListOpen, setIsUnitsListOpen] = useState(false)

	return (
		<div className='flex flex-col items-end  p-[var(--spacing-75)] gap-2 relative'>
			<TriggerButton setIsUnitsListOpen={setIsUnitsListOpen} />
			{isUnitsListOpen && <UnitsList />}
		</div>
	)
}
export default UnitsDropdown

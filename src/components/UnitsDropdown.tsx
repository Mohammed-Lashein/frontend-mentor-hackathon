import React, { useEffect, useRef, useState } from 'react'
import iconDropdown from '@/assets/images/icon-dropdown.svg'
import iconUnits from '@/assets/images/icon-units.svg'
import checkmarkIcon from '../assets/images/icon-checkmark.svg'
import { useAppDispatch, useAppSelector } from '../hooks'
import { changeTemperatureUnitToCelsius, changeTemperatureUnitToFahrenheit, changeWindSpeedToKmPerHour, changeWindSpeedToMph } from '../actions-creators'

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
				className='bg-neutral-800 p-2 rounded-md flex justify-center items-center gap-125 cursor-pointer hover:bg-neutral-700'
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
	const [currentMeasurementSystem, setCurrentMeasurementSystem] = useState<'metric' | 'imperial'>('metric')

	const dispatch = useAppDispatch()


	function toggleCurrentMeasurementSystem() {
		if (currentMeasurementSystem === 'metric') {
			// change to imperial
			setCurrentMeasurementSystem('imperial')
			setTemperatureUnit('fahrenheit')
			setWindSpeed('mph')
			setPrecipitation('in')
		} else {
			// change to metric
			setCurrentMeasurementSystem('metric')
			setTemperatureUnit('celsius')
			setWindSpeed('km/h')
			setPrecipitation('mm')
		}
	}

	return (
		<div className='rounded-md border border-neutral-600 bg-neutral-800 p-2 w-[13.75rem] absolute top-[3.5rem] z-[2]'>
			<button
				className='hover:bg-neutral-700 p-125 rounded-md w-full text-left cursor-pointer'
				onClick={() => toggleCurrentMeasurementSystem()}
			>
				Switch to {currentMeasurementSystem === 'metric' ? 'imperial' : 'metric'}
			</button>
			<div className='flex flex-col items-start pb-2 gap-50'>
				<p className='Label text-sm text-neutral-500 px-2'>Temperature</p>
				<button
					className={`hover:bg-neutral-700  p-100 rounded-md w-full text-left cursor-pointer flex justify-between ${
						temperatureUnit === 'celsius' && 'bg-neutral-700'
					}`}
					onClick={() => dispatch(changeTemperatureUnitToCelsius())}
				>
					Celsius (°C) {temperatureUnit === 'celsius' && <img src={checkmarkIcon} />}
				</button>
				<button
					className={`hover:bg-neutral-700  p-100 rounded-md w-full text-left cursor-pointer flex justify-between ${
						temperatureUnit === 'fahrenheit' && 'bg-neutral-700'
					}`}
				onClick={() => {
					 setTemperatureUnit('fahrenheit') // WILL BE removed
					 dispatch(changeTemperatureUnitToFahrenheit())
				}}
				>
					Fahrenheit (°F) {temperatureUnit === 'fahrenheit' && <img src={checkmarkIcon} />}
				</button>
			</div>
			<hr />

			<div className='flex flex-col items-start pb-2 gap-50'>
				<p className='Label text-sm text-neutral-500 p-75'>WindSpeed</p>
				<button
					className={`hover:bg-neutral-700  p-100 rounded-md w-full text-left cursor-pointer flex justify-between ${
						windSpeed === 'km/h' && 'bg-neutral-700'
					}`}
					onClick={() => {
						setWindSpeed('km/h') // will be removed
						dispatch(changeWindSpeedToKmPerHour())
					}}
				>
					km/h {windSpeed === 'km/h' && <img src={checkmarkIcon} />}
				</button>
				<button
					className={`hover:bg-neutral-700  p-100 rounded-md w-full text-left cursor-pointer flex justify-between ${
						windSpeed === 'mph' && 'bg-neutral-700'
					}`}
					onClick={() => {
						setWindSpeed('mph') // will be removed
						dispatch(changeWindSpeedToMph())
					}}
				>
					mph {windSpeed === 'mph' && <img src={checkmarkIcon} />}
				</button>
			</div>
			<hr />

			<div className='flex flex-col items-start pb-2 gap-50'>
				<p className='Label text-sm text-neutral-500  p-75'>Precipitation</p>
				<button
					className={`hover:bg-neutral-700  p-100 rounded-md w-full text-left cursor-pointer flex justify-between ${
						precipitation === 'mm' && 'bg-neutral-700'
					}`}
					onClick={() => setPrecipitation('mm')}
				>
					Millimeters (mm) {precipitation === 'mm' && <img src={checkmarkIcon} />}
				</button>
				<button
					className={`hover:bg-neutral-700  p-100 rounded-md w-full text-left cursor-pointer flex justify-between ${
						precipitation === 'in' && 'bg-neutral-700'
					}`}
					onClick={() => setPrecipitation('in')}
				>
					Inches (in) {precipitation === 'in' && <img src={checkmarkIcon} />}
				</button>
			</div>
		</div>
	)
}

function UnitsDropdown() {
	const [isUnitsListOpen, setIsUnitsListOpen] = useState(false)
	const unitsDropdownRef = useRef<null | HTMLDivElement>(null) // solved .contains error!

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (unitsDropdownRef.current && !unitsDropdownRef.current.contains(e.target as Node)) {
				setIsUnitsListOpen(false)
			}
		}
		if (isUnitsListOpen && unitsDropdownRef !== null && unitsDropdownRef.current !== null) {
			document.addEventListener('click', handleClickOutside)
		}
		return () => {
			if (unitsDropdownRef.current) {
				document.removeEventListener('click', handleClickOutside)
			}
		}
	}, [isUnitsListOpen])

	return (
		<div
			className='flex flex-col items-end  p-75 gap-2 relative'
			ref={unitsDropdownRef}
		>
			<TriggerButton setIsUnitsListOpen={setIsUnitsListOpen} />
			{isUnitsListOpen && <UnitsList />}
		</div>
	)
}
export default UnitsDropdown

import React, { useEffect, useRef, useState } from 'react'
import iconDropdown from '@/assets/images/icon-dropdown.svg'
import iconUnits from '@/assets/images/icon-units.svg'
import checkmarkIcon from '../assets/images/icon-checkmark.svg'
import { useAppDispatch } from '../hooks'
import {
	changePrecipitationToInch,
	changePrecipitationToMm,
	changeTemperatureUnitToCelsius,
	changeTemperatureUnitToFahrenheit,
	changeWindSpeedToKmPerHour,
	changeWindSpeedToMph,
} from '../store/action-creators'

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
type UnitsListProps = {
	temperatureUnit: string
	setTemperatureUnit: React.Dispatch<React.SetStateAction<string>>
	windSpeed: string
	setWindSpeed: React.Dispatch<React.SetStateAction<string>>
	precipitation: string
	setPrecipitation: React.Dispatch<React.SetStateAction<string>>
	currentMeasurementSystem: string
	setCurrentMeasurementSystem: React.Dispatch<React.SetStateAction<"metric" | "imperial">>
}
function UnitsList({
	temperatureUnit,
	setTemperatureUnit,
	windSpeed,
	setWindSpeed,
	precipitation,
	setPrecipitation,
	currentMeasurementSystem,
	setCurrentMeasurementSystem,
}: UnitsListProps) {
	// const [temperatureUnit, setTemperatureUnit] = useState('celsius')
	// const [windSpeed, setWindSpeed] = useState('km/h')
	// const [precipitation, setPrecipitation] = useState('mm')
	// const [currentMeasurementSystem, setCurrentMeasurementSystem] = useState<'metric' | 'imperial'>('metric')

	const dispatch = useAppDispatch()

	function toggleCurrentMeasurementSystem() {
		if (currentMeasurementSystem === 'metric') {
			// change to imperial
			setCurrentMeasurementSystem('imperial')
			setTemperatureUnit('fahrenheit')
			setWindSpeed('mph')
			setPrecipitation('in')

			if (temperatureUnit !== 'fahrenheit') {
				/* These conditions guard against the case where we chose imperial units then switched to imperial.
        Without this condition, on clicking "switch to imperial" the reducer will deal with temperature
        values in fahrenheit as if they were in celsius (since we dispatched an action that will convert 
        the passed temperature data to it as celsius to fahrenheit).
        
        So we need to make sure that we are making the conversion to the expected measuring units only.
        In a nutshell, if the user selected fahrenheit then selected "switch to imperial", the temperature
        should stay the same.
        */
				dispatch(changeTemperatureUnitToFahrenheit())
			}
			if (windSpeed !== 'mph') {
				dispatch(changeWindSpeedToMph())
			}
			if (precipitation !== 'inch') {
				dispatch(changePrecipitationToInch())
			}
		} else {
			// change to metric
			setCurrentMeasurementSystem('metric')
			setTemperatureUnit('celsius')
			setWindSpeed('km/h')
			setPrecipitation('mm')
			if (temperatureUnit !== ' celsius') {
				dispatch(changeTemperatureUnitToCelsius())
			}
			if (windSpeed !== 'km/h') {
				dispatch(changeWindSpeedToKmPerHour())
			}
			if (precipitation !== 'mm') {
				dispatch(changePrecipitationToMm())
			}
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
					onClick={() => {
						if (temperatureUnit !== 'celsius') {
							setTemperatureUnit('celsius')
							dispatch(changeTemperatureUnitToCelsius())
						}
					}}
				>
					Celsius (°C) {temperatureUnit === 'celsius' && <img src={checkmarkIcon} />}
				</button>
				<button
					className={`hover:bg-neutral-700  p-100 rounded-md w-full text-left cursor-pointer flex justify-between ${
						temperatureUnit === 'fahrenheit' && 'bg-neutral-700'
					}`}
					onClick={() => {
						if (temperatureUnit !== 'fahrenheit') {
							setTemperatureUnit('fahrenheit')
							dispatch(changeTemperatureUnitToFahrenheit())
						}
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
						if (windSpeed !== 'km/h') {
							setWindSpeed('km/h')
							dispatch(changeWindSpeedToKmPerHour())
						}
					}}
				>
					km/h {windSpeed === 'km/h' && <img src={checkmarkIcon} />}
				</button>
				<button
					className={`hover:bg-neutral-700  p-100 rounded-md w-full text-left cursor-pointer flex justify-between ${
						windSpeed === 'mph' && 'bg-neutral-700'
					}`}
					onClick={() => {
						if (windSpeed !== 'mph') {
							setWindSpeed('mph')
							dispatch(changeWindSpeedToMph())
						}
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
					onClick={() => {
						if (precipitation !== 'mm') {
							setPrecipitation('mm')
							dispatch(changePrecipitationToMm())
						}
					}}
				>
					Millimeters (mm) {precipitation === 'mm' && <img src={checkmarkIcon} />}
				</button>
				<button
					className={`hover:bg-neutral-700  p-100 rounded-md w-full text-left cursor-pointer flex justify-between ${
						precipitation === 'in' && 'bg-neutral-700'
					}`}
					onClick={() => {
						if (precipitation !== 'in') {
							setPrecipitation('in')
							dispatch(changePrecipitationToInch())
						}
					}}
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
	const [temperatureUnit, setTemperatureUnit] = useState('celsius')
	const [windSpeed, setWindSpeed] = useState('km/h')
	const [precipitation, setPrecipitation] = useState('mm')
	const [currentMeasurementSystem, setCurrentMeasurementSystem] = useState<'metric' | 'imperial'>('metric')

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
			{isUnitsListOpen && (
				<UnitsList
					temperatureUnit={temperatureUnit}
					setTemperatureUnit={setTemperatureUnit}
					windSpeed={windSpeed}
					setWindSpeed={setWindSpeed}
					precipitation={precipitation}
					setPrecipitation={setPrecipitation}
					currentMeasurementSystem={currentMeasurementSystem}
					setCurrentMeasurementSystem={setCurrentMeasurementSystem}
				/>
			)}
		</div>
	)
}
export default UnitsDropdown

import React, { useState } from 'react'
import iconDropdown from '@/assets/images/icon-dropdown.svg'
import iconUnits from '@/assets/images/icon-units.svg'

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

function UnitsDropdown() {
	const [isUnitsListOpen, setIsUnitsListOpen] = useState(false)

	return (
		<div className='flex flex-col items-end  p-[var(--spacing-75)] gap-2 relative'>
			<TriggerButton setIsUnitsListOpen={setIsUnitsListOpen} />
		</div>
	)
}
export default UnitsDropdown

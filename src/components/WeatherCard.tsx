type WeatherCardProps = {
	label: string
	value: string
}
function WeatherCard({ label, value }: WeatherCardProps) {
	return (
		<div className='font-dm-sans border border-neutral-600 bg-neutral-800 rounded-[var(--radius-12)] flex flex-col gap-300 p-250 grow'>
			<p className='text-neutral-200'>{label}</p>
			<p className='text-white text-4xl font-light font-dm-sans'>{value}</p>
		</div>
	)
}
export default WeatherCard

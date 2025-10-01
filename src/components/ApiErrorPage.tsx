import iconError from '@/assets/images/icon-error.svg'
import iconRetry from '@/assets/images/icon-retry.svg'
function ApiErrorPage() {
	return (
		<div className='flex flex-col gap-300 items-center pt-800'>
			<div>
				<img
					src={iconError}
					alt='api-error-icon'
					className='w-11'
				/>
			</div>
			<h1 className='font-bricolage font-bold text-5xl'>Something went wrong</h1>
			<p className='text-neutral-200 text-center'>
				We couldn't connect to the server (API error). Please try <br /> again in a few moments.
			</p>
			<button className='text-white bg-neutral-700 py-150 px-200 rounded-xl cursor-pointer w-24 flex gap-2 items-center'>
				<span>
					<img
						src={iconRetry}
						alt='refresh-page-icon'
					/>
				</span>
				<span>Retry</span>
			</button>
		</div>
	)
}
export default ApiErrorPage

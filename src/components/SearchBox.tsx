import searchIcon from '@/assets/images/icon-search.svg'
function SearchBox() {
	return (
		<div className='flex gap-2'>
			<form className='flex gap-4 flex-col sm:flex-row w-full'>
				<div className='flex gap-4 rounded-md bg-neutral-800 p-200 sm:w-[32.75rem] justify-center'>
					<img
						src={searchIcon}
						alt='search icon'
					/>
					<input
						type='text'
						className='text-white bg-neutral-800 w-full focus:outline-none'
						placeholder='Search for a place...'
					/>
				</div>
				<button className='text-white bg-blue-500 py-200 px-300 rounded-12 hover:bg-blue-700 cursor-pointer'>Search</button>
			</form>
		</div>
	)
}
export default SearchBox

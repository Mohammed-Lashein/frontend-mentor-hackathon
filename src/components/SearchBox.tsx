import searchIcon from '../assets/images/icon-search.svg'
function SearchBox() {
	return (
		<div className='flex gap-2 justify-center'>
			<div className='flex gap-4 rounded-md bg-neutral-800 p-200 w-[32.75rem]'>
				{/* search box */}
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
		</div>
	)
}
export default SearchBox

import MainContent from './components/MainContent';
import Navbar from './components/Navbar'
import SearchBox from './components/SearchBox';

function App() {
	return (
		<div className='px-200 lg:px-16 py-8'>
			<Navbar />
			<h1 className='text-white text-3xl pt-600 pb-800 text-center text-[3.25rem] font-bricolage'>
				How's the sky looking today?{' '}
			</h1>
      <SearchBox />
      <MainContent />
		</div>
	)
}

export default App

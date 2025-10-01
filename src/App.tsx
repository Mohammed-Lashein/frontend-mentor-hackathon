import Navbar from "./components/Navbar"

function App() {
  return <div className=' px-16 py-8'>
    <Navbar />
    <h1 className='text-white text-3xl pt-[var(--spacing-600)] pr-[var(--spacing-1400)] pb-[var(--spacing-800)] pl-[var(--spacing-1400)] text-center text-[3.25rem] font-bricolage'>
			How's the sky looking today?{' '}
		</h1>

  </div>
}

export default App

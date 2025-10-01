import UnitsDropdown from './UnitsDropdown'
import logosvg from '../assets/images/logo.svg'
function Navbar() {
  return (
        <div>
      <nav className="flex items-center justify-between">
        {/* <div className="w-20 h-10"> */} 
        {/* adding a width to the div will make the image be displayed smaller than normal */}
        <div>
          <img src={logosvg} alt="" />
        </div>
        <UnitsDropdown />
      </nav>
    </div>

  )
}
export default Navbar
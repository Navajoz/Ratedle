import logo from '../assets/github-mark-white.png'
export default function Header() {
  return (
    <div className="bg-inherit py-6  text-white border-b-2 border-b-white flex justify-between">
      <div>
      <h1 className="text-5xl font-bold ml-4">RATEDLE</h1>
      </div>
      <a href="https://github.com/Navajoz"  target="_blank" rel="noopener noreferrer"><img src={logo} className='w-12 mr-4'/></a>
    </div>
  )
}

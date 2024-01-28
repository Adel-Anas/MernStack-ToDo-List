import SearchIcon from './assets/Search-icon.png'
function App() {

  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return ( 
    
    <>
      <div className="h-full w-full bg-[#465178] flex items-center justify-center pt-20">
        <div className="shadow-2xl rounded-md w-[480px] h-[800px] mb-11 py-6 bg-gradient-to-b from-[#7F7BAB] to-[#283977] flex flex-col">
          <div className='flex items-center justify-evenly mb-7'>
            <input type="text" className='w-[320px] h-[45px] rounded pl-2 outline-none border border-white ' placeholder='Add Task'/>
            <img src={SearchIcon} alt="search icon" className='w-[35px] h-[35px]'/>
          </div>
          <div className='flex items-center justify-center mb-6'>
            <p className='text-3xl text-white'>{formattedDate}</p>
          </div>
          <div className='pl-10 flex gap-4 mb-6'>
            <p className='text-white text-sm font-[400] font-[Poppins]'>CATEGORIES</p>
          </div>
          <div className='flex items-center justify-evenly mb-6'>
            <div className='w-[180px] h-[100px] rounded-3xl bg-[#99A1BC] flex flex-col gap-1 pl-8 pt-5 jusitfy-center'>
              <h1 className='text-xl text-white font-[Poppins]'>Work</h1>
              <h2 className='text-white'>2/5 Done</h2>
            </div>
            <div className='w-[180px] h-[100px] rounded-3xl bg-[#99A1BC] flex flex-col gap-1 pl-8 pt-5 jusitfy-center'>
              <h1 className='text-xl text-white font-[Poppins]'>Personal</h1>
              <h2 className='text-white'>3/5 Done</h2>
            </div>
          </div>
          <div className='pl-10 flex gap-3'>
            <p className='text-white text-md font-[Poppins] underline'>Today</p>
            <p className='text-white text-md font-[Poppins] underline'>This Week</p>
            <p className='text-white text-md font-[Poppins] underline'>This Month</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

import React from 'react'
import { NavLink } from 'react-router-dom'
import { SunMedium } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='w-full flex flex-row place-content-end gap-4  items-center mt-5 mb-5 bg-[#353535] p-3 rounded-xl'>
      <NavLink className='bg-[#00667e] rounded-xl text-pink-100 p-3 text-[18px] font-semibold'
      to="/"
      >
        Home
      </NavLink>
      

      <NavLink className='bg-[#00667e] rounded-xl text-pink-100 p-3 text-[18px] font-semibold'
      to="/pastes"
      >
        Pastes
      </NavLink>
      
      

    </div>
  )
}

export default Navbar

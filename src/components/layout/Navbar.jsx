import React from 'react'
import Button from '../common/Button'

const Navbar = () => {
  return (
      <div>
          <nav className="bg-dark-100 border-b border-border z-10 fixed w-full">
                <div className="flex h-16 px-10 justify-between items-center">
                    <h1 className="text-light-100 text-2xl font-bold">Study Sync</h1>
                    <div className="flex gap-3 text-sm">
                        <Button children={'Sign In'} ClassName='border-none' variant='inactive'/>
                        <Button children={'Sign Up'}/>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default Navbar
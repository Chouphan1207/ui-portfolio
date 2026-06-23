import Image from 'next/image'
import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoEllipsisHorizontal } from 'react-icons/io5'

const Widgets = () => {
  return (
    <div className='p-3 hidden lg:flex flex-col space-y-4 w-[400px] '>

      <div className='bg-[var(--input)] text-neutral-400 h-[44px] flex items-center space-x-3 rounded-full pl-5'>
        <FaMagnifyingGlass className='w-[20px] h-[20px]'/>
        <input type="text" placeholder='Search here' className='bg-transparent outline-none' />
      </div>
      <div className='bg-[var(--input)] rounded-xl p-3'>
        <h1 className='text-xl font-bold mb-2'>
          What&apos;s Happening?
        </h1>
        <div className='flex flex-col py-3 space-y-0.5'>
          <div className='flex justify-between text-primary text-[13px]'>
            <span>Trending in VietNam</span>
            <IoEllipsisHorizontal className='w-[20px]'/>
          </div>
          <span className='font-bold text-sm'>#ReactJS</span>
          <span className='text-neutral-400 text-xs'>240k likes</span>
        </div>
        <div className='flex flex-col py-3 space-y-0.5'>
          <div className='flex justify-between text-primary text-[13px]'>
            <span>Trending in VietNam</span>
            <IoEllipsisHorizontal className='w-[20px]'/>
          </div>
          <span className='font-bold text-sm'>#ReactJS</span>
          <span className='text-neutral-400 text-xs'>240k likes</span>
        </div>
        <div className='flex flex-col py-3 space-y-0.5'>
          <div className='flex justify-between text-primary text-[13px]'>
            <span>Trending in VietNam</span>
            <IoEllipsisHorizontal className='w-[20px]'/>
          </div>
          <span className='font-bold text-sm'>#ReactJS</span>
          <span className='text-neutral-400 text-xs'>240k likes</span>
        </div>
        <div className='flex flex-col py-3 space-y-0.5'>
          <div className='flex justify-between text-primary text-[13px]'>
            <span>Trending in VietNam</span>
            <IoEllipsisHorizontal className='w-[20px]'/>
          </div>
          <span className='font-bold text-sm'>#ReactJS</span>
          <span className='text-neutral-400 text-xs'>240k likes</span>
        </div>
      </div>
      <div className='bg-[var(--input)] rounded-xl p-3 space-y-4'>
        <h1 className='text-xl font-bold mb-2'>
          Who to Follow
        </h1>

        <div className='flex justify-between items-center'>
          <div className='flex  items-center space-x-3'>
            <Image 
            src={'/hero.jpg'} 
            width={'56'}
            height={'56'}
            alt='Picture of Teds'
            className='w-14 h-14 rounded-full'/>
            <div className='flex flex-col text-sm'>
              <span className='font-bold'>Teddy</span>
              <span>@Tedsphan</span>
            </div>
          </div>

          <button
          className='bg-secondary text-secondary w-[72px] h-[40px] rounded-full text-sm'
          > Follow</button>
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex  items-center space-x-3'>
            <Image 
            src={'/hero.jpg'} 
            width={'56'}
            height={'56'}
            alt='Picture of Teds'
            className='w-14 h-14 rounded-full'/>
            <div className='flex flex-col text-sm'>
              <span className='font-bold'>Teddy</span>
              <span>@Tedsphan</span>
            </div>
          </div>

          <button
          className='bg-secondary text-secondary w-[72px] h-[40px] rounded-full text-sm'
          > Follow</button>
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex  items-center space-x-3'>
            <Image 
            src={'/hero.jpg'} 
            width={'56'}
            height={'56'}
            alt='Picture of Teds'
            className='w-14 h-14 rounded-full'/>
            <div className='flex flex-col text-sm'>
              <span className='font-bold'>Teddy</span>
              <span>@Tedsphan</span>
            </div>
          </div>

          <button
          className='bg-secondary text-secondary w-[72px] h-[40px] rounded-full text-sm'
          > Follow</button>
        </div>
      </div>
    </div>
  )
}

export default Widgets
"use client"

import React from 'react'
import { services } from "../../../components/data";
import { motion } from "framer-motion";
import { Link } from 'lucide-react';
import { BackgroundBeams } from '@/components/home/BackgroundBeam';

const Services = () => {

  return (
    <section className='min-h-[80vh] flex flex-col justify-center items-center py-20'>
      <div className='container mx-auto py-20 px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5, ease: "easeIn" } }}
          className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {services.map((service, index) => {
              return <div
              key={index}
              className='flex-1 flex flex-col justify-center gap-6 group'>
                <div className='w-full flex justify-between items-center'>
                  <div className='text-5xl'>{service.id}</div>
                  <Link href={service.href}>
                  </Link>
                </div>
                {/* Headin  */}
                <h2>{service.title}</h2>
                {/* Description */}
                <p>{service.description}</p>
                {/* Border */}
                <div className='border-b-2 border-var(--primary) w-1/2 my-4'></div>
                {/* Button */}
              </div>
            })}
        </motion.div>
        <BackgroundBeams/>
      </div>
    </section>
  )
}

export default Services

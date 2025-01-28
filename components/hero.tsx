import React from 'react'
import { PlayIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <>
      <h1>Film title</h1>
      <p>
        Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Consequatur inventore facilis, veniam excepturi magni molestiae deleniti
        labore dolorem adipisci eaque. Placeat consectetur soluta quis sit ipsam
        iste molestias, similique culpa.
      </p>
    
      <div className="flex gap-4">
        
        <button className="hover:bg-secondary active:bg-secondary flex items-center justify-center gap-2 rounded-md bg-primary p-3 text-white transition duration-200 ease-in-out">
          Play
          <PlayIcon className="font-bold" />
        </button>        
        <button className="hover:bg-secondary hover:text-white active:bg-secondary flex items-center justify-center rounded-md border-2 border-primary hover:border-white bg-transparent p-3 text-primary transition duration-200 ease-in-out">
          <PlusIcon className="font-bold" />
        </button>
      </div>
      
    </>
  );
}

export const HeroCard = () => {
  return (
    <>
      <div>
        <Image src="/" alt=''/>
      </div>
    </>
  )
}
const Hero = () => {
  return (
    <div>
      <HeroSection />
    </div>
  )
}

export default Hero
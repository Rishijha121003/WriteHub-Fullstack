import React from 'react'
import { Button } from '../components/ui/button'
import Hero from '../components/Hero'
import LatestPosts from '../components/LatestPosts';
import HowItWorks from '../components/HowItWorks';
import TopAuthors from '../components/TopAuthors';
const Home = () => {
  return (
    <div className='pt-30'>
      <Hero />
      <HowItWorks />

      <LatestPosts />
      <TopAuthors />

    </div>
  )
}

export default Home

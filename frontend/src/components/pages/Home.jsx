import React, { useEffect, useState } from 'react'
import Hero from '../shared/Hero'
import axios from 'axios'

const Home = () => {
const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:5000/',
      );
      console.log(result);
      setData(result.data);
    };
    fetchData();

    
  }, [])


  return (
    <div className='bg-hero-pattern bg-cover bg-no-repeat  min-h-screen'>
        <Hero/>
        <div className='text-white'>
        </div>
      
    </div>
  )
}

export default Home

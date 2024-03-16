import React, { useEffect, useState } from "react";
import Hero from "../shared/Hero";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);
  return (
    <div className="bg-hero-pattern bg-cover bg-no-repeat  min-h-screen">
      <Hero />
      <div className="text-white"></div>
    </div>
  );
};

export default Home;

import {Button } from "../ui/button"

const Hero = () => {
  return (
    <section
      
      className=" relative md:w-3/4 md:mx-auto mx-4  flex flex-col items-center  "
    >
      <div className="py-16 text-5xl gap-4 font-extrabold flex flex-col items-center">
        <p className="text-gradient sm:text-6xl text-5xl  ">
          Secure <span className="sm:text-7xl  sm:-ml-4 ">T</span>
        </p>
        <p className="font-semibold text-white text-center sm:text-5xl text-4xl">
         Share your images securely
        </p>
        <p className="text-lg text-col2 font-normal text-center">
          SecureT is a platform to share your images securely with your friends and family.
          
        </p>
      </div>
      <div className="flex gap-4">
        <Button className="bg-gradient-to-r from-purple-500 to-purple-800 ">
          Get started
        </Button>
        <Button
          variant={"outline"}
          className="bg-col text-white hover:text-white focus:bg-transparent border-col4 hover:bg-transparent  "
        >
          Know more
        </Button>
      </div>
    </section>
  );
};

export default Hero;

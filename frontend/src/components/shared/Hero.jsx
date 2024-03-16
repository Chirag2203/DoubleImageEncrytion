import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className=" relative md:w-3/4 md:mx-auto mx-4  flex flex-col items-center pt-12  ">
      <div className="py-16 text-5xl gap-4 font-extrabold flex flex-col items-center">
        <p className="text-gradient sm:text-6xl text-5xl  ">
          Secure <span className="sm:text-7xl  sm:-ml-4 ">T</span>
        </p>
        <p className="font-semibold text-white text-center sm:text-5xl text-4xl">
          Share your images securely
        </p>
        <p className="text-lg text-col2 font-normal text-center w-3/4">
          SecureT is a platform which helps you share your images securely by
          using double image encryption and LSB steganography.
        </p>
      </div>
      <div className="flex gap-4">
        <Link to={"/encrypt"}>
        <Button className="bg-gradient-to-r from-purple-500 to-purple-800 ">
          Get started
        </Button>
        </Link>
        <Link to={"https://github.com/Chirag2203/DoubleImageEncrytion"}>
        <Button
          variant={"outline"}
          className="bg-col text-white hover:text-white focus:bg-transparent border-col4 hover:bg-transparent  hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-800"
        >
          Know more
        </Button></Link>
      </div>
    </section>
  );
};

export default Hero;

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import nitk from "../../assets/nitk.png";

const Hero = () => {
  return (
    <section className=" relative md:w-3/4 md:mx-auto mx-4  flex flex-col items-center pt-12  pb-4">
      <div className="py-16 text-5xl gap-4 font-extrabold flex flex-col items-center">
        <p className="text-gradient sm:text-6xl text-5xl pb-2  ">
          Secure - Image
        </p>
        <p className="font-semibold text-white text-center sm:text-5xl text-4xl">
          Share your images securely
        </p>
        <p className="text-lg text-col2 font-normal text-center w-3/4">
          We use Double Image Encryption (Chaos Maps and DNA Encoding) and then perform LSB steganography to hide the encrypted image in another image.
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
      <div className="flex flex-col items-start mt-8 gap-4">
        <div className="flex items-center justify-center gap-2">
        <img src={nitk} alt="nitk" className="w-16 h-16" />
        <p className="text-white text-xl font-medium">Developed in Department of Information Technology, NITK Surathkal</p>
        </div>
        <div className="flex flex-col gap-4  text-white justify-center items-center w-full">
          <p>BY</p>
          <p>Achyut Agarwal 211IT003</p>
          <p>Chirag Rajput 211IT018</p>
          <p>Siddharth Kelkar 211IT067</p>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;

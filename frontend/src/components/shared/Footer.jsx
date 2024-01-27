import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-tr from-black to-col3  shadow  dark:bg-gray-800 ">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="#" className="hover:underline">
            {" "}
            SecureT
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center gap-4 mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {/* <a href="https://chiragrajput.in" className="hover:text-col2">
            About me
          </a>
          <Link
            to={"https://github.com/Chirag2203/Zupple-labs"}
            className="hover:text-col2"
          >
            Source code
          </Link> */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IoMdMenu as menu } from "react-icons/io";
import { IoCloseSharp as close } from "react-icons/io5";
import { SiFsecure } from "react-icons/si";

const Header = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // navigation links
  const navLinks = [
    {
      title: "Home",
      id: "/",
    },
    {
      title: "Encrypt",
      id: "encrypt",
    },
    {
      title: "Decrypt",
      id: "decrypt",
    },
    // {
    //   title: "Hiding",
    //   id: "hiding",
    // },
    // {
    //   title: "Unhiding",
    //   id: "unhiding",
    // },
  ];

  //   for fixing the navbar after the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`px-8  px md:px-32 md:mx-auto  w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? " navGlass" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          
          <SiFsecure className="text-white" />
          <p className="text-white text-lg font-bold cursor-pointer flex ">
            Secure - Image
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-white"
              } hover:text-purple-500 text-sm uppercase font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={nav.id}>{nav.title}</Link>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-12 right-0 mx-4  min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4 glass rounded-md p-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-sm ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <Link to={nav.id}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

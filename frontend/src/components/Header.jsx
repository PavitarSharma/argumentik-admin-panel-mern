import React, { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "../hooks/useMediaQuery";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/userSlice";
import { toast } from "react-toastify";

const NavbarLink = ({ link, page, selectedPage, setSelectedPage }) => {
  const lowerCasePage = link.toLowerCase();
  return (
    <AnchorLink
      className={`${
        selectedPage === lowerCasePage ? "text-yellow" : ""
      } hover:text-yellow transition duration-500`}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </AnchorLink>
  );
};
const Header = ({ isTopOfPage, selectedPage, setSelectedPage }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);
  const isAboveSmallScreens = useMediaQuery("(min-width: 960px)");
  const navbarBackground = isTopOfPage ? "" : "bg-dark-fade";
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const role = user?.role;

  const logourUser = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout successfully");
  };

  return (
    <>
      <header>
        <nav
          className={`${navbarBackground} z-40 bg-dark-fade text-white w-full fixed top-0 py-6`}
        >
          <div className="flex items-center justify-between mx-auto px-12">
            <Link to="/">
              <h4 className="font-bold text-3xl uppercase cursor-pointer">
                WOODSIDE
              </h4>
            </Link>

            {/* Desktop Nav */}
            {isAboveSmallScreens ? (
              token ? (
                <div className="flex justify-between gap-16 text-sm font-semibold">
                  <NavbarLink
                    page="About us"
                    link="aboutus"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <NavbarLink
                    page="Lifestyle"
                    link="lifestyle"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <NavbarLink
                    page="Boutiques & Staff"
                    link="boutiques-and-staff"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />

                  {role === "admin" && (
                    <Link to="/admin">
                      <p className="hover:text-yellow transition duration-500">
                        Admin
                      </p>
                    </Link>
                  )}

                  <p
                    onClick={logourUser}
                    className="hover:text-yellow transition cursor-pointer duration-500"
                  >
                    Logout
                  </p>
                </div>
              ) : (
                <div>
                  <button
                    className="border-[1px] border-white px-6 rounded cursor-pointer py-2 hover:bg-white hover:text-deep-blue transition-all duration-500 shadow"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="ml-4 hover:border-[1px] hover:border-white px-6 rounded cursor-pointer py-2 bg-white hover:bg-transparent hover:text-white text-deep-blue transition-all duration-500 shadow"
                    onClick={() => navigate("/signUp")}
                  >
                    Sign Up
                  </button>
                </div>
              )
            ) : (
              <button
                className="rounded-full bg-gray-800 p-2 text-2xl font-bold"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <AiOutlineMenu className="" />
              </button>
            )}

            {/* Mobile Menu Popup */}
            {!isAboveSmallScreens && isMenuToggled && (
              <div className="fixed right-0 bottom-0 h-full bg-blue w-[300px]">
                <div className="flex justify-end p-12">
                  <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                    <AiOutlineClose />
                  </button>
                </div>

                {/* Menu Items */}
                {token ? (
                  <div className="flex flex-col gap-10  ml-[20%] text-2xl text-deep-blue">
                    <NavbarLink
                      page="About us"
                      link="aboutUs"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                    <NavbarLink
                      page="Lifestyle"
                      link="lifestyle"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                    <NavbarLink
                      page="Boutiques & Staff"
                      link="boutiques-and-staff"
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                    />
                    {role === "admin" && (
                      <Link to="/admin">
                        <p className="hover:text-yellow transition duration-500">
                          Admin
                        </p>
                      </Link>
                    )}
                    <p
                      onClick={logourUser}
                      className="hover:text-yellow transition cursor-pointer duration-500"
                    >
                      Logout
                    </p>
                  </div>
                ) : (
                  <div>
                    <button
                      className="border-[1px] border-white px-6 rounded cursor-pointer py-2 hover:bg-white hover:text-deep-blue transition-all duration-500 shadow"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                    <button
                      className="ml-4 hover:border-[1px] hover:border-white px-6 rounded cursor-pointer py-2 bg-white hover:bg-transparent hover:text-white text-deep-blue transition-all duration-500 shadow"
                      onClick={() => navigate("/signUp")}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

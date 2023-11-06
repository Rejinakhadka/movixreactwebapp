import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top"); //This creates that scrolling effect of menu
  const [lastScrollY, setLastScrollY] = useState(0); //This also for scrolling effect of menu
  const [mobileMenu, setMobileMenu] = useState(false); //for mobile size screen
  const [query, setQuery] = useState(""); //this is for search and text inside search box to fetch api according to the text
  const [showSearch, setShowSearch] = useState(""); //clickable for search
  const navigate = useNavigate(); // instance created
  const location = useLocation(); //hook instance

//this is for when we change location suppose movies or tv shows then it scrolls to top of next page
  useEffect(() => {
    window.scrollTo(0, 0);
}, [location]);   

  const controlNavbar = () => {
    if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
            setShow("hide");
        } else {
            setShow("show");
        }
    } else {
        setShow("top");
    }
    setLastScrollY(window.scrollY);
};

  useEffect(() =>{
    window.addEventListener("scroll", controlNavbar);
    return () =>
    {
      window.removeEventListener("scroll", controlNavbar);
    }
  },[lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`);
        setTimeout(() => {
            setShowSearch(false);
        }, 1000);
    }
};

const openSearch = () => {
  setMobileMenu(false);
  setShowSearch(true);
};

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  }
//this is for navigating to movies and tv shows
const navigationHandler = (type) => {
  if (type === "movie") {
      navigate("/explore/movie");
  } else {
      navigate("/explore/tv");
  }
  setMobileMenu(false);  //so that menu dropdown hides after clicking movie or tv shows
};


  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt=""></img>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() =>
          navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick= {() =>
          navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} /> 
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch}/>
          {mobileMenu ? <VscChromeClose  onClick={() => 
          setMobileMenu(false)}/>
           : <SlMenu onClick={openMobileMenu} />}
        </div>
        </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;
import { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";


import logo from "../../assets/movix-logo.svg";
import ContentWrapper from "../contentWrapper/ContentWrapper";

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
    window.scrollTo(0, 0);  //The scrollTo() method scrolls the document to specified coordinates.
}, [location]);   

const controlNavbar = () => {
  // Check if the vertical scroll position is greater than 200 pixels. window.scrollY is a method that checks the vertical scrolling of a browser
  if (window.scrollY > 200) {
      // Check if scrolling down and not in mobile menu mode
      if (window.scrollY > lastScrollY && !mobileMenu) {
          // If scrolling down and not in mobile menu mode, hide the navbar
          setShow("hide");
      } else {
          // If scrolling up or in mobile menu mode, show the navbar
          setShow("show");
      }
  } else {
      // If the vertical scroll position is less than or equal to 200 pixels, show the navbar
      setShow("top");  //because top css needs to be applied
  }
  
  // Update the last scroll position to the current scroll position
  setLastScrollY(window.scrollY);
};


//this is for when we scroll then it slowly hides where there is scroll event and controlNavbar function with lastScrolly as a dependency array
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
            setShowSearch(false);  //because it will hide after going to search page
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
    //Dynamic CSS classes .The className attribute dynamically adds CSS classes based on the values of state variables (mobileMenu, show). This is a common technique for dynamic styling in React.
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}> 
      <ContentWrapper>
        <div className="logo" onClick={() =>navigate("/")}>
          <img src={logo} alt=""></img>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => //callback function is a function that is passed as an argument in  another function or argument
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
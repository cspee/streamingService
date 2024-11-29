  import React from "react";
  import { NavLink } from "react-router-dom";
  import StreamingIcon from "../assets/StreamingIcon";
  import SearchIcon from "../assets/SearchIcon";
  import RingIcon from "../assets/RingIcon";
  export default function NavBar() {
    return (
      <div className="navBar">
        <div className="navBar-icon">
          <StreamingIcon />
          StreamVibe
        </div>
        <div className="navBar-links">
          <NavLink
            to={"/home"}
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Home
          </NavLink>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Movies & Shows
          </NavLink>
          <NavLink
            to={"/support"}
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Support
          </NavLink>
          <NavLink
            to={"/subscriptions"}
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Subscriptions
          </NavLink>
        </div>
        <div className="navActions"> <SearchIcon/> <RingIcon/> </div>
      </div>
    );
  }

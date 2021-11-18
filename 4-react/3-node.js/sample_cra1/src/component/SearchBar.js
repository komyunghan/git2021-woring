import React from "react";
import { Route, useNavigate } from "react-router-dom";
import Category from "./Category";
import "../style/SearchBar.css";
import DetailInfoPage from "../pages/DetailInfoPage";



const SearchBar = ({ location }) => {
  const Navigate = useNavigate();

  const gotoHome = () => {
    Navigate.push("/");
    window.location.reload();
  }

  return (
    <div className="searchBar">
      <div id="mainLogo" onClick={gotoHome}>
        <img
          src="https://place-now.s3.ap-northeast-2.amazonaws.com/logo/place_now_logo.png"
          alt="place-now logo"
        />
      </div>
      <Route path={location} exact component={Category} />
      <Route path={`${location}/place/:placeId`} component={DetailInfoPage} />


    </div>
  )


}

export default SearchBar;
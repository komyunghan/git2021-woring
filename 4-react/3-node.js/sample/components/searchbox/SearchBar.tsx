import React from "react";
import Link from "next/link";

const SearchBar = () => {
  return (
    <div className="searchBar">
      <div id="mainLogo">
      </div>
      <input
        id="pac-input"
        className="controls"
        type="text"
        placeholder="Search Box"
      />
      <Link href="/StoreList">
        <button>Dangol</button>
      </Link>
    </div>

  )
}


export default SearchBar;
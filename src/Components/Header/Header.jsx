import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function Header() {
  const history = useHistory();

  return (
    <div className="header-container header-container--bg">
      <div className="header-container__logo">
        <img
          onClick={() => history.push("/")}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt=""
        />
      </div>
      <div className="header-container__links">
        <Link to="/movies">
          <li>Movies</li>
        </Link>
        <Link to="/tv">
          <li>Tv</li>
        </Link>
      </div>
    </div>
  );
}

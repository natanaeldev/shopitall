import React from "react";
import "./SectionCard.scss";

import { Link, Outlet } from "react-router-dom";

function SectionCard() {
  return (
    <div className="sectioncard">
      <div className="sectioncard__wrapper">
        <div className="sectioncard__card sectioncard__card--man">
          <Link to={`/products/category/man`}>
            <div className="sectioncard__content">
              <h1 className="title">Man</h1>
              <span className="subtitles">Shop now</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="sectioncard__wrapper">
        <div className="sectioncard__card sectioncard__card--woman">
          <Link to={`/products/category/woman`}>
            <div className="sectioncard__content">
              <h1 className="title">Woman</h1>
              <span className="subtitles">Shop now</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="sectioncard__wrapper">
        <div className="sectioncard__card sectioncard__card--t-shirt">
          <Link to={`/products/category/man`}>
            <div className="sectioncard__content">
              <h1 className="title">T-shirt</h1>
              <span className="subtitles">Shop now</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="sectioncard__wrapper">
        <div className="sectioncard__card sectioncard__card--sneaker">
          <Link to={`/products/category/sneaker`}>
            <div className="sectioncard__content sectioncard__content--middle">
              <h1 className="title">Sneaker</h1>
              <span className="subtitles">Shop now</span>
            </div>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default SectionCard;

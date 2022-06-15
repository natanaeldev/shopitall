import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

import axios from "axios";

import "./SingleProduct.scss";
import ReviewsCard from "../ReviewsCard/ReviewsCard";
const apiKey = process.env.REACT_APP_API_URL;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SingleProduct({ currentUser, addProduct }) {
  const navigate = useNavigate();
  const params = useParams();
  let id = params.productid;

  const [singleProduct, setSingleProduct] = useState(null);

  const [open, setOpen] = React.useState({ open: false, Transition: Fade });

  const handleClick = (Transition) => {
    setOpen({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setOpen({
      ...open,
      open: false,
    });
  };

  const handleAddReviews = (e) => {
    e.preventDefault();
    let form = e.target;
    let review = form.comment.value;

    axios
      .post(`${apiKey}reviews/${id}`, {
        username: currentUser.username,
        review: review,
        products_id: params.productid,
      })
      .then((response) => {
        // loadReviews(id);
        form.reset();
      });
  };

  useEffect(() => {
    axios.get(`${apiKey}products/${id}`).then((response) => {
      setSingleProduct(response.data);
    });
  }, [id]);

  let date = (date) => {
    let dates = new Date(date);

    let day = dates.getDate();
    let month = dates.getMonth() + 1;
    let year = dates.getFullYear();
    let fullDate = `${month}/${day}/${year}`;

    return fullDate;
  };

  return (
    singleProduct && (
      <section className="singleproduct">
        <div className="singleproduct__top-button">
          <ArrowBackIcon onClick={() => navigate("/products")} />{" "}
          <span className="singleproduct__top-button-text">Back</span>
        </div>
        <div className="singleproduct__wrapper">
          <div className="singleproduct__item-box">
            <img
              className="singleproduct__img"
              src={singleProduct?.images}
              alt={singleProduct?.name}
            />
            <section className="singleproduct__details">
              <div className="singleproduct__pramary-info">
                <div className="singleproduct__pramary-info-header">
                  <span className="singleproduct__item-name">
                    {singleProduct?.name}
                  </span>
                  <span className="singleproduct__item-price">{`$${
                    isNaN(singleProduct?.default_price?.unit_amount / 100) ===
                    true
                      ? 0
                      : singleProduct?.default_price?.unit_amount / 100
                  }`}</span>
                </div>
                <div className="singleproduct__secundary-details">
                  <label
                    htmlFor="size"
                    className="singleproduct__secundary-details-label"
                  >
                    Size:
                  </label>
                  <select
                    name="size"
                    id="size"
                    className="singleproduct__secundary-details-select"
                  >
                    <option value="S">S</option>
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="XL">XL</option>
                  </select>
                  <button
                    className="singleproduct__item-button"
                    onClick={(e) => {
                      addProduct(singleProduct);
                      handleClick();
                    }}
                  >
                    Add to cart
                  </button>
                  {/* {items ? (
                    <span>Successfully added to the cart</span>
                  ) : (
                    <span>The Item wasn't added</span>
                  )} */}
                </div>
                <div className="singleproduct__description">
                  <h3 className="singleproduct__description-title">
                    Description
                  </h3>
                  {singleProduct?.description}
                </div>
              </div>
            </section>
          </div>
          <form
            action=""
            className="singleproduct__form"
            // onSubmit={handleAddReviews}
          >
            <label htmlFor="comment" className="singleproduct__form-label">
              Review
            </label>
            <textarea
              name="comment"
              id="comment"
              className="singleproduct__form-input"
              placeholder="Review"
            ></textarea>
            <button className="singleproduct__form-button">Review</button>
          </form>
          <section className="singleproduct__comments">
            {singleProduct.reviews &&
              singleProduct.reviews.map((review) => {
                return (
                  <ReviewsCard
                    key={review.id}
                    username={review.username}
                    date={date}
                    createAt={review.create_at}
                    review={review.review}
                  />
                );
              })}
          </section>
          <Snackbar
            open={open.open}
            TransitionComponent={open.Transition}
            autoHideDuration={600}
            onClose={handleClose}
          >
            <Alert
              TransitionComponent={open.Transition}
              severity="success"
              sx={{ width: "100%" }}
            >
              Product Added succesfully!
            </Alert>
          </Snackbar>
        </div>
      </section>
    )
  );
}

export default SingleProduct;

import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

import "./SingleProduct.scss";
import ReviewsCard from "../ReviewsCard/ReviewsCard";

function SingleProduct({ currentUser }) {
  const apiKey = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [newItems, setnewItems] = useState("");

  const handleAddReviews = (e) => {
    e.preventDefault();
    let form = e.target;
    let review = form.comment.value;

    axios
      .post(`${apiKey}reviews/${params.productid}`, {
        username: currentUser.username,
        review: review,
        products_id: params.productid,
      })
      .then((response) => {
        loadReviews(params.productid);
        form.reset();
      });
  };

  const handleCartItem = () => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const product = newItems;
    products.push(product[0]);
    localStorage.setItem("products", JSON.stringify(products));
  };

  const loadReviews = (id) => {
    axios
      .get(
        `https://shopitall-server.herokuapp.com/api/v1/products/reviews/${id}`
      )
      .then((response) => {
        setReviews(response.data);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://shopitall-server.herokuapp.com/api/v1/products/${params.productid}`
      )
      .then((response) => {
        setSingleProduct(response.data);
      });
    setnewItems(singleProduct);
    loadReviews(params.productid);
  }, [params.productid, singleProduct]);

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
              src={singleProduct[0].image}
              alt={singleProduct[0].product_name}
            />
            <section className="singleproduct__details">
              <div className="singleproduct__pramary-info">
                <div className="singleproduct__pramary-info-header">
                  <span className="singleproduct__item-name">
                    {singleProduct[0].product_name}
                  </span>
                  <span className="singleproduct__item-price">{`$${singleProduct[0].price}`}</span>
                </div>
                <div className="singleproduct__secundary-details">
                  <h2>Size:</h2>
                  <span>S</span>
                  <button
                    className="singleproduct__item-button"
                    onClick={(e) => {
                      // handleCartCount(e, JSON.parse(items));
                      handleCartItem();
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
                  {singleProduct[0].description}
                </div>
              </div>
            </section>
          </div>
          <form
            action=""
            className="singleproduct__form"
            onSubmit={handleAddReviews}
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
            {reviews &&
              reviews.map((review) => {
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
        </div>
      </section>
    )
  );
}

export default SingleProduct;

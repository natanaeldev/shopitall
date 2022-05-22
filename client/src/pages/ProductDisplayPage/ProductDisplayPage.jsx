import React, { useState, useEffect } from "react";
import Message from "../../components/MessagesComponent/MessagesComponent";
import CheckOutComponent from "../../components/CheckOutComponent/CheckOutComponent";

function ProductDisplayPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <CheckOutComponent />;
}

export default ProductDisplayPage;

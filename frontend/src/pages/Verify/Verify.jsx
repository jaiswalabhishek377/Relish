import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/storecontext.jsx";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  
  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      }, { headers: { token } });

      // When api got hit then sending a response
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  // Displaying the spinner untill the payment gets verified.
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
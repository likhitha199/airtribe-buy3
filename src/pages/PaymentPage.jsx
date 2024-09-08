import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();

  // Ensure totalAmount is destructured safely from location.state
  const totalAmount = location?.state?.totalAmount || 0; // Default to 0 if undefined

  return (
    <div>
      <h1>Payment</h1>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <PayPalScriptProvider options={{ "client-id": "AbtuGRVOw8N1seY8GgrLorvgmZAqNwVEuIvugRjye2aqRb1_ErJvWGFhyuGg1dJohf5CbrsaAQl4wyPM" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: totalAmount.toFixed(2), // Use dynamic totalAmount here
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert("Transaction completed by " + details.payer.name.given_name);
              // Handle post-payment success here
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PaymentPage;

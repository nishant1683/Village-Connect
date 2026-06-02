import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const orderData = JSON.parse(sessionStorage.getItem("currentOrderData"));

    if (paymentId && payerId) {
      // PayPal payment flow
      dispatch(capturePayment({ paymentId, payerId, orderId: orderData?.orderId })).then((data) => {
        setLoading(false); // Payment processed, stop loading
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderData");
          navigate("/shop/payment-success", { state: { paymentMethod: "paypal" } });
        } else {
          toast({
            title: "Payment failed. Please try again.",
            variant: "destructive",
          });
        }
      }).catch(() => {
        setLoading(false);
        toast({
          title: "An error occurred during the payment process.",
          variant: "destructive",
        });
      });
    } else if (orderData?.paymentMethod === "inr") {
      // INR payment flow (simulate successful payment)
      setTimeout(() => {
        setLoading(false);
        sessionStorage.removeItem("currentOrderData");
        navigate("/shop/payment-success", { state: { paymentMethod: "inr" } });
      }, 2000); // Simulating payment confirmation
    } else {
      setLoading(false);
      toast({
        title: "Invalid payment details.",
        variant: "destructive",
      });
    }
  }, [paymentId, payerId, dispatch, navigate, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
      {loading && (
        <div className="flex justify-center items-center p-5">
          <span>Loading...</span> {/* Add a loader here if you want */}
        </div>
      )}
    </Card>
  );
}

export default PaypalReturnPage;

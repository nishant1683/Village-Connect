import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <Card className="p-10 text-center shadow-lg">
      <CardHeader className="p-0 mb-5">
        <CardTitle className="text-4xl font-bold text-green-600">
          Payment Successful!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-gray-600">
          Your payment has been successfully processed. Thank you for your purchase!
        </p>
      </CardContent>
      <Button
        className="mt-5 bg-blue-500 text-white hover:bg-blue-700"
        onClick={() => navigate("/shop/account")}
      >
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;

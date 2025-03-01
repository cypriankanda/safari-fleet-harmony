
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const BookingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-12 bg-slate-50">
      <div className="safari-container">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Booking Request Submitted!</h1>
          
          <p className="text-gray-600 mb-6">
            Your booking request has been successfully submitted. Our team will review your request and
            get back to you within 24 hours with confirmation details.
          </p>
          
          <div className="bg-slate-50 p-4 rounded-md mb-6 text-left">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Our fleet manager will review your booking request</li>
              <li>You'll receive an email confirmation once approved</li>
              <li>Payment details will be provided in the confirmation email</li>
              <li>Vehicle and driver (if requested) will be assigned</li>
            </ol>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
            >
              Return to Home
            </Button>
            <Button onClick={() => navigate("/admin")}>
              Check Booking Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

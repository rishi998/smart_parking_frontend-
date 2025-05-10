import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTimesCircle, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

const FailedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reason = new URLSearchParams(location.search).get('reason');

  const errorMessages = {
    payment_not_completed: 'The payment was not completed. Please try again.',
    verification_error: 'We encountered an error verifying your payment.',
    declined: 'Your payment was declined. Please try a different payment method.',
    default: 'Something went wrong with your payment. Please try again.'
  };

  useEffect(() => {
    // Optional: Track failed payments in analytics
    if (reason) {
      console.log('Payment failed reason:', reason);
    }
  }, [reason]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <FaTimesCircle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Failed</h2>
          <div className="mt-3 flex items-center justify-center text-yellow-600">
            <FaExclamationTriangle className="mr-2" />
            <p className="text-sm font-medium">
              {errorMessages[reason] || errorMessages.default}
            </p>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">
            If you were charged but see this message, please contact support with your booking details.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/bookings')}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Bookings
          </button>
          <button
            onClick={() => navigate('/support')}
            className="w-full px-4 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedPage;
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getpaymenthistory } from "../../../../services/opreation/paymentAPI";
import { useEffect } from "react";
import { formatDate } from "../../../../utils/date";

const PurchaseHistory = () => {
  const [loading, setLoading] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const fetchPaymentHistory = async () => {
    setLoading(true);
    const toastId = toast.loading("Please wait....");
    try {
      const response = await getpaymenthistory(token);

      if (!response || !response.data) {
        toast.error("Server not response...");
        return;
      }

      setPaymentHistory(response.data);
      toast.success("Payment history fetch success");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, [token]);

  // console.log(paymentHistory);

  return (
    <div className="mt-10 bg-richblack-700 mr-4 shadow shadow-richblue-400 px-4 py-2 rounded-xl">
      {paymentHistory.map((payment) => (
        <div key={payment._id} className="flex justify-between">
          <div className="space-y-4">
            <p>Rs: {payment.amount}</p>
            <p>{payment.paymentStatus}</p>
          </div>
          <div className="space-y-4">
            <p>{formatDate(payment.createdAt)}</p>
            <p>{payment.paymentId}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseHistory;

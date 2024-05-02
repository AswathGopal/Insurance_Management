import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
export default function Payment() {
  const navigate = useNavigate();
  const [search_id,setid]=useSearchParams();
  const [search_plan, setplan] = useSearchParams();
  const val = search_id.get("id");
  const plan = search_plan.get("plan");
  
  useEffect(() => {
    axios
      .post("http://localhost:8000/verify", { token: Cookies.get("token") })
      .then((result) => {
        if (result.data.Status != "ok") navigate("/");
      })
      .then((err) => console.log(err));
  }, []);
  
  const handleClick=async()=>{   
    console.log("hi") 
      try {
      const result = await axios.post("http://localhost:8000/auth/insurance", {
        id: parseInt(val),
        plan: plan,
        token: Cookies.get("token"),
      });
      console.log(result.data.status);
      if (result.data.status) {
        alert(result.data.message)
      } else {
        alert(result.data.message)
      }
    } catch(err) {
      console.log(err);
    }  
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 md:px-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 md:px-10 md:py-12">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">Complete your purchase</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">Payment Methods</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <CreditCardIcon className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-50">Credit Card</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <WalletIcon className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-50">Digital Wallet</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <BanknoteIcon className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-50">Bank Transfer</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <CoinsIcon className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-50">Cryptocurrency</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">Credit/Debit Card</h2>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input id="cardNumber" placeholder="0000 0000 0000 0000" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="expiration">Expiration</label>
                    <input id="expiration" placeholder="MM/YY" type="text" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="cvc">CVC</label>
                    <input id="cvc" placeholder="123" type="text" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="cardName">Cardholder Name</label>
                  <input id="cardName" placeholder="John Doe" type="text" />
                </div>
                <Button className="w-full px-3 border"  onClick={handleClick}>Complete Purchase</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            Your payment information is securely processed and encrypted. We do not store your payment details.
          </div>
        </div>
      </div>
    </div>
  )
}

function BanknoteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  )
}


function CoinsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  )
}


function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}

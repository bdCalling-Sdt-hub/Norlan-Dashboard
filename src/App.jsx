import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Earning from "./Pages/Dashboard/Earning/Earning";
import HostInfo from "./Pages/Dashboard/HostInfo/HostInfo";
import HostRequest from "./Pages/Dashboard/HostInfo/HostRequest";
import KycForm from "./Pages/Dashboard/Kyc/KycForm";
import Notification from "./Pages/Dashboard/Notification/Notification";
import RentInformation from "./Pages/Dashboard/RentInformation/RentInformation";
import UserInfo from "./Pages/Dashboard/UserInfo/UserInfo";
import Wallet from "./Pages/Dashboard/Wallet/Wallet";
import Email from "./Pages/Email/Email";
import Otp from "./Pages/Otp/Otp";
import Signin from "./Pages/Signin/Signin";
import UpdatePass from "./Pages/UpdatePass/UpdatePass";
import NotFound from "./404";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import CarInformation from "./Pages/Dashboard/CarInformation/CarInformation";
import CarKyc from "./Pages/Dashboard/CarKyc/CarKyc";
import HostKyc from "./Pages/Dashboard/HostKyc/HostKyc";
import HostPayment from "./Pages/Dashboard/HostPayment/HostPayment";
import RentisIncome from "./Pages/Dashboard/RentisIncome/RentisIncome";
import Setting from "./Pages/Dashboard/Setting/Setting";
import SettingPage from "./Pages/Dashboard/Setting/SettingPage/SettingPage";
import StripeBills from "./Pages/Dashboard/StripeBills/StripeBills";
import UserKyc from "./Pages/Dashboard/UserKyc/UserKyc";
import UserPayment from "./Pages/Dashboard/UserPayment/UserPayment";
import AddSlider from "./Pages/Dashboard/AddSlider/Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Subscription from "./Pages/Dashboard/Subscription/Subscription";
import EditSubscription from "./Pages/Dashboard/EditSubscription/EditSubscription";

function App() {
  return (
    <>
      <div className="maincontainer">
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<DashboardHome />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/earning/:income" element={<Earning />} />
              <Route path="/add-slider" element={<AddSlider />} />
              <Route path="/user-info" element={<UserInfo />} />
        
              <Route path="/user-payment" element={<UserPayment />} />
              <Route path="/renti-income" element={<RentisIncome />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/edit-subscription" element={<EditSubscription />} />
              
              <Route path="/setting" element={<Setting />}></Route>
              <Route path="/setting/:dynamic" element={<SettingPage />} />
            </Route>

            <Route path="/signin" element={<Signin />} />
            <Route path="/email" element={<Email />} />
            <Route path="/forget-password" element={<Otp />} />
            <Route path="/update-password" element={<UpdatePass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

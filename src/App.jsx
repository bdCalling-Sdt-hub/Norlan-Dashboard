import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Earning from "./Pages/Dashboard/Earning/Earning";
import Notification from "./Pages/Dashboard/Notification/Notification";
import UserInfo from "./Pages/Dashboard/UserInfo/UserInfo";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Otp from "./Pages/Otp/Otp";
import Login from "./Pages/Login/Login";
import UpdatePass from "./Pages/UpdatePass/UpdatePass";
import NotFound from "./404";
import PrivateRoute from "./Pages/ProtectedRoute";
import Setting from "./Pages/Dashboard/Setting/Setting";
import SettingPage from "./Pages/Dashboard/Setting/SettingPage/SettingPage";
import AddSlider from "./Pages/Dashboard/AddSlider/Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Subscription from "./Pages/Dashboard/Subscription/Subscription";
import EditSubscription from "./Pages/Dashboard/EditSubscription/EditSubscription";
import Category from "./Pages/Dashboard/Category/Category";
import SubCategory from "./Pages/Dashboard/SubCategory/SubCategory";
import Events from "./Pages/Dashboard/Events";
import PersonalInfo from "./Components/Setting/PersonalInfo/PersonalInfo";
import Auth from "./Layout/Auth/Auth";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={ <Dashboard />}>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/earnings" element={<Earning />} />
              <Route path="/add-slider" element={<AddSlider />} />
              <Route path="/user-info" element={<UserInfo />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/edit-subscription" element={<EditSubscription />} />
              <Route path="/category" element={<Category />} />
              <Route path="/sub-category" element={<SubCategory />} />
              <Route path="/setting" element={<Setting />}></Route>
              <Route path="/setting/:dynamic" element={<SettingPage />} />
              <Route path="/events" element={<Events />} />
              <Route path="/profile" element={<PersonalInfo />} />
            </Route>

            {/* <Route exact path="/auth" element={ <Auth/> }> */}
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/otp-verify" element={<Otp />} />
              <Route path="/reset-password" element={<UpdatePass />} />
            {/* </Route> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

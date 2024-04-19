import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Earning from "./Pages/Dashboard/Earning/Earning";
import Notification from "./Pages/Dashboard/Notification/Notification";
import UserInfo from "./Pages/Dashboard/UserInfo/UserInfo";
import Email from "./Pages/Email/Email";
import Otp from "./Pages/Otp/Otp";
import Signin from "./Pages/Signin/Signin";
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

function App() {
  return (
    <>
      <div className="maincontainer">
        <Router>
          <Routes>
            <Route exact path="/" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> }>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/earning/:income" element={<Earning />} />
              <Route path="/add-slider" element={<AddSlider />} />
              <Route path="/user-info" element={<UserInfo />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/edit-subscription" element={<EditSubscription />} />
              <Route path="/category" element={<Category />} />
              <Route path="/sub-category" element={<SubCategory />} />
              <Route path="/setting" element={<Setting />}></Route>
              <Route path="/setting/:dynamic" element={<SettingPage />} />
              <Route path="/events" element={<Events />} />
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

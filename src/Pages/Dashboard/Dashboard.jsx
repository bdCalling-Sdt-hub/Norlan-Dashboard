/* eslint-disable no-unused-vars */
import {  MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Button,  Layout, Menu, Select, theme } from "antd";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { Badge } from "antd";
import { GiReceiveMoney } from "react-icons/gi";
import { MdPeopleOutline } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Styles from "./Dashboard.module.css";
import { FaRegBell } from "react-icons/fa6";
import { BiCrown } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineEvent } from "react-icons/md";
import ImgBaseURL from "../../../ImgBaseURL";
import { useProfileQuery } from "../../redux/apiSlices/authSlice";
const { Header, Sider, Content } = Layout;
import { IoIosLogOut } from "react-icons/io";
const { Option } = Select;



const items = [...Array(5).keys()].map((item, index) => {
  return {
    key: index,
    label: (
      <Link to="/notification" style={{}} rel="noreferrer">
        <div
          className={Styles.everyNotify}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            style={{
              backgroundColor: "#d9cffb",
              borderRadius: "100%",
              padding: "5px",
              marginRight: "15px",
            }}
            width="30"
            height="30"
            src="https://img.icons8.com/3d-fluency/94/person-male--v2.png"
            alt="person-male--v2"
          />
          <div className="" style={{ marginTop: "" }}>
            <p>
              <span>Sanchej haro manual </span>started a new trip from mexico.
            </p>
            <span style={{ color: "#d2d2d2" }}>1 hr ago</span>
          </div>
        </div>
      </Link>
    ),
  };
});




const Dashboard = () => {
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.lang);
  const {data: profile} = useProfileQuery();
  console.log(profile)
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [t, i18n] = useTranslation("global");

  const handleSelectLanguage = (value) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("lang", value);
  };

  

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);


  const handleLogOut=()=>{
    navigate('/login');
    localStorage.removeItem('token');
  }

  const src = profile?.image?.startsWith("https") ? profile?.image : `${ImgBaseURL}/${profile?.image}`

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>

      
      <Sider
        width="313px"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          position: "fixed",
          height: "100vh",
          zIndex: 2,
          backgroundColor: "white",
        }}
      >
        <div className="demo-logo-vertical" />
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <Link to="/">
            <img
              src={Logo}
              width={collapsed ? "50px" : "220px "}
            />
          </Link>
        </div>

        <Menu
          style={{ padding: collapsed ? "0px" : "20px", border: "none" }}
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            key="1"
            icon={<RxDashboard style={{ fontSize: "20px" }} />}
          >
            <Link to="/" style={{ fontSize: "16px" }}>
              {t("dashboard")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="2"
            icon={<GiReceiveMoney style={{ fontSize: "20px" }} />}
          >
            <Link to="/earnings" style={{ fontSize: "16px" }}>
              {t("Earnings")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="5"
            icon={<MdPeopleOutline style={{ fontSize: "22px" }} />}
          >
            <Link to="/user-info" style={{ fontSize: "16px" }}>
              {t("userInfo")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="7"
            icon={<BiCrown  size={22}  />}
          >
            <Link to="/subscription" style={{ fontSize: "16px" }}>
              {t("subscription")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="8"
            icon={<TfiLayoutSliderAlt size={22}  />}
          >
            <Link to="/add-slider" style={{ fontSize: "16px" }}>
              {t("addSlider")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="9"
            icon={<MdOutlineCategory style={{ fontSize: "22px" }} />}
          >
            <Link to="/category" style={{ fontSize: "16px" }}>
              {t("category.title")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="10"
            icon={<MdOutlineEvent size={22}  />}
          >
            <Link to="/events" style={{ fontSize: "16px" }}>
              {t("events")}
            </Link>
          </Menu.Item>


          <Menu.Item
            key="11"
            icon={<SettingOutlined style={{ fontSize: "22px" }} />}
          >
            <Link to="/setting" style={{ fontSize: "16px" }}>
              {t("setting.title")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="12"
            icon={<IoIosLogOut style={{ fontSize: "22px" }} />}
            onClick={()=> {
              navigate('/login');
              localStorage.removeItem('token');}
            }
          >
            <p>Logout</p>
          </Menu.Item>
        </Menu>
      </Sider>


      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100vw",
            height: "80px",
            zIndex: 1,
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "60px",
          }}
        >
          <div className="" style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                marginLeft: collapsed ? "105px" : "320px",
                fontSize: "16px",
                width: 45,
                height: 45,
                marginRight: "10px",
              }}
            />
            <h2>{t("header.title")}</h2>
          </div>

          <div
            style={{ display: "flex", gap: 20, alignItems: "center", lineHeight: 0 }}
          >
              <Select
                value={selectedLanguage}
                style={{ width: 150 }}
                onChange={handleSelectLanguage}
              >
                <Option value="en">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://cdn.britannica.com/29/22529-004-ED1907BE/Union-Flag-Cross-St-Andrew-of-George.jpg"
                      alt="English"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    English
                  </div>
                </Option>
                <Option value="es">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    German
                  </div>
                </Option>
              </Select>

            <Link to="/notification" style={{ fontSize: "16px" }}>
              <Badge count={5} >
                <FaRegBell color="#6C57EC" size={30}/>
              </Badge>
            </Link>

            <Link to="/profile" style={{ fontSize: "16px" }}>
              <img
                  style={{ borderRadius: "100%" }}
                  width="40"
                  height="40"
                  src={src}
                  alt="person-male--v2"
                />
            </Link>

          </div>
        </Header>
        <Content
          style={{
            marginTop: 110,
            marginBottom: 35,
            marginLeft: collapsed ? 130 : 345,
            marginRight: 30,
            minHeight: 280,
            overflow: "auto"
          }}
        >
          <div style={{background: "white", height: "100%", padding: 16, borderRadius: 8}}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;

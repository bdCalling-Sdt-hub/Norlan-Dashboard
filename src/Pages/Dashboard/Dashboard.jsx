/* eslint-disable no-unused-vars */
import { CarOutlined, MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Select, theme } from "antd";
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
import { AiOutlineUser } from "react-icons/ai";
import { HiLogout } from "react-icons/hi";
import { useLocation} from 'react-router-dom';
import { BiCrown } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineEvent } from "react-icons/md";
import baseURL from "../../../baseURL"
import ImgBaseURL from "../../../ImgBaseURL";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
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

  const menu = (
    <Menu>
      <Menu.Item disabled>
        <h2
          style={{
            color: "black",
            fontWeight: "500",
            borderBottom: "1px solid #e6e7f4",
            paddingBottom: "20px",
          }}
        >
          Notifications
        </h2>
        {/* <span style={{ fontWeight: 'bold', color: '#000' }}>Notifications</span> */}
      </Menu.Item>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <Button
          type="primary"
          block
          style={{
            height: "50px",
            backgroundColor: "#6C57EC ",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <Link to="/notification">See All</Link>
        </Button>
      </div>
    </Menu>
  );
  const handleLogOut=()=>{
    navigate('/login');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  const profileItems = [
    {
      key: 1,
      label: (
        <Link to="/setting/personal-information" rel="noreferrer" >
          <div
            className={Styles.everyNotify}
            style={{ display: "flex", alignItems: "center", gap: "15px"}}
          >
            <AiOutlineUser size={25} color="black" />
            <div className="" style={{ marginTop: "0" }}>
              <p>Profile</p>
            </div>
          </div>
        </Link>
      ),
    },
    {
      key: 2,
      label: (
        <Link to="/notification" style={{}} rel="noreferrer">
          <div
            className={Styles.everyNotify}
            style={{ display: "flex", alignItems: "center" ,gap: "15px" }}
          >
            <FaRegBell size={25} color="black" />
            <div className="" style={{ marginTop: "" }}>
              <p>Notification</p>
            </div>
          </div>
        </Link>
      ),
    },
    {
      key: 3,
      label: (
        <div
          style={{ border: "none", backgroundColor: "transparent" }}
          rel="noreferrer"
        >
          <div
            onClick={handleLogOut}
            className={Styles.everyNotify}
            style={{ display: "flex", alignItems: "center", gap: "15px", color: "black" }}
          >
            <HiLogout size={25} style={{color:"black"}}  />
            <div  className="" style={{ marginTop: "" }}>
              <p>Logout</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(()=>{
    async function getAPI(){
      await baseURL.get("/auth/get-profile",{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      }).then((response)=>{
        if(response.data.statusCode === 200){
          setImage(response.data.user.image)
          localStorage.setItem("user-info", JSON.stringify(response.data.user));
        }
      })
    }
    getAPI();
  }, []);

  const src = image?.startsWith("https") ? image : `${ImgBaseURL}/${image}`

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
            marginTop: "50px",
            marginBottom: "20px",
          }}
        >
          <Link to="/">
            <img
              src={Logo}
              // height={collapsed ? "40px" : "150px"}
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

          <SubMenu
            style={{ fontSize: "16px" }}
            key="2"
            icon={<GiReceiveMoney style={{ fontSize: "22px" }} />}
            title={t("earning.title")}
          >
            <Menu.Item key="31">
              <Link to="/earning/today-income">{t("earning.subTitle1")}</Link>
            </Menu.Item>
            <Menu.Item key="32">
              <Link to="/earning/weekly-income">{t("earning.subTitle2")}</Link>
            </Menu.Item>
            <Menu.Item key="33">
              <Link to="/earning/monthly-income">{t("earning.subTitle3")}</Link>
            </Menu.Item>
          </SubMenu>

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
            className={Styles.notificatonProfileSection}
            style={{ display: "flex", alignItems: "center", lineHeight: 0 }}
          >
            <div className="" style={{ marginRight: "40px" }}>
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
            </div>
            <div className={Styles.notificaton}>
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >

                <Badge count={5} >
                  <FaRegBell color="#6C57EC" size={30}/>
                </Badge>
              </Dropdown>
            </div>
            <div className={Styles.profile}>
              <Dropdown
                menu={{
                  items: profileItems,
                }}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                
                <img
                  style={{ cursor: "pointer" }}
                  width="40"
                  height="40"
                  src={src}
                  alt="person-male--v2"
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            marginTop: "120px",
            marginBottom: "50px",
            marginLeft: collapsed ? "130px" : "360px",
            marginRight: "60px",
            // background: "#e6e7f4",
            padding: 30,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;

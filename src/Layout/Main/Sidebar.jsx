import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { CiDiscount1 } from 'react-icons/ci';
import Logo from "../../assets/logo.png";
import { MdOutlineCategory } from 'react-icons/md';
import { AiOutlineDashboard } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiUserGroup } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi2";
import { TbDatabaseDollar } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";


const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname; 
    const [selectedKey, setSelectedKey] = useState("");
    const [openKeys, setOpenKeys] = useState([]);
    const navigate = useNavigate();


    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate("/auth/login")
    }

    const menuItems = [
        {
            key: "/",
            icon: <AiOutlineDashboard size={24} />,
            label: <Link to="/" >Dashboard</Link>
        },
        {
            key: "/earnings",
            icon: <TbDatabaseDollar size={24} />,
            label: <Link to="/earnings">Earnings</Link>
        },
        {
            key: "/artists",
            icon: <HiUsers size={24} />,
            label: <Link to="/artists">Artists</Link>
        },
        {
            key: "/users",
            icon: <HiUserGroup size={24} />,
            label: <Link to="/users">User</Link>
        },
        /* {
            key: "/subscription",
            icon: <MdOutlineAdminPanelSettings size={24} />,
            label: <Link to="/subscription">Subscription</Link>
        }, */
        /* {
            key: "/admin",
            icon: <MdOutlineAdminPanelSettings size={24} />,
            label: <Link to="/admin">Make Admin</Link>
        }, */
        {
            key: "/category",
            icon: <MdOutlineCategory size={24} />,
            label: <Link to="/category" >Category</Link>
        },
        {
            key: "/events",
            icon: <MdOutlineCategory size={24} />,
            label: <Link to="/events" >Events</Link>
        },
        {
            key: "subMenuSetting",
            icon: <IoSettingsOutline size={24} />,
            label: "Settings",
            children: [
                { 
                    key: "/banner", 
                    label: <Link to="/banner" className="text-white hover:text-white">Banner</Link> 
                },
                { 
                    key: "/about-us", 
                    label: <Link to="/about-us" className="text-white hover:text-white">About Us</Link>
                },
                { 
                    key: "/terms-and-conditions", 
                    label: <Link to="/terms-and-conditions" className="text-white hover:text-white">Terms And Condition</Link>
                },
                { 
                    key: "/privacy-policy", 
                    label: <Link to="/privacy-policy" className="text-white hover:text-white">Privacy Policy</Link>
                },
                { 
                    key: "/change-password", 
                    label: <Link to="/change-password" className="text-white hover:text-white">Change Password</Link> 
                }
            ]
        },
        {
            key: "/logout",
            icon: <IoIosLogOut size={24} />,
            label: <p onClick={handleLogout}>Logout</p>
        },
    ];

    useEffect(() => {
        const selectedItem = menuItems.find(item => 
            item.key === path || item.children?.some(sub => sub.key === path)
        );

        if (selectedItem) {
            setSelectedKey(path);

            if (selectedItem.children) {
                setOpenKeys([selectedItem.key]);
            } else {
                const parentItem = menuItems.find(item => 
                    item.children?.some(sub => sub.key === path)
                );
                if (parentItem) {
                    setOpenKeys([parentItem.key]);
                }
            }
        }
    }, [path]);

    const handleOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    return (
        <div className='mt-5'>
            <Link to={"/"}>
                <img
                    src={Logo}
                    alt='profile'
                    width={200}
                    height={50}
                    style={{ margin: "0 auto 20px auto" }}
                />
            </Link>
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                style={{ borderRightColor: "transparent", background: "transparent" }}
                items={menuItems}
            />
        </div>
    )
}

export default Sidebar;

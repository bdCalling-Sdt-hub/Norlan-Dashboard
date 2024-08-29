import React, { useEffect, useState } from 'react';
import card1 from "../../../Images/SUBS1.jpg";
import card2 from "../../../Images/SUBS2.png";
import card3 from "../../../Images/SUBS3.png";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate} from "react-router-dom"
import baseURL from '../../../../baseURL';

const Subscription = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const handleChangeEditPage=(value)=>{
        console.log(value)
        localStorage.setItem("package", JSON.stringify(value))
        navigate("/edit-subscription")
    }

    useEffect(()=>{
        async function getApi(){
            await baseURL.get("/subscription", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            }).then((response)=>{
                if(response.status === 200){
                    setData(response.data.data)
                }
            })
        }
        getApi();
    }, []);


    return (
        <div style={{height: "100%", background: "white"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                {
                    data?.map((item, index)=>{
                        let backgroundImageStyle = {};
                        if (index === 0) {
                            backgroundImageStyle = { backgroundImage: `url(${card1})` };
                        } else if (index === 1) {
                            backgroundImageStyle = { backgroundImage: `url(${card2})` };
                        } else if (index === 2) {
                            backgroundImageStyle = { backgroundImage: `url(${card3})` };
                        }
                        return  <div 
                            key={index}
                            style={{
                                height: "405px",
                                width: "405px",
                                borderRadius: "10px",
                                marginTop: "50px",
                                position: "relative",
                                ...backgroundImageStyle,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                            }}
                        >
                            <div
                                    style={{
                                        width: "100%",
                                        height: "52px",
                                        color: "white",
                                        border: "none",
                                        paddingTop: "30px",
                                        textAlign: "center"
                                    }}
                                >
                                    <h3 style={{textAlign: "center"}}>{item?.package_name}</h3>
                            </div>
            
                            <div style={{width: "100%"}}>
                                    <div style={{display: "flex", color: "white", padding: "20px", alignItems: "center", justifyContent: "space-between"}}>
                                        <div >
                                            <div>Package Price</div>
                                            <div>Package Validity</div>
                                        </div>
                                        <div >
                                            <div>$ {item?.package_price}</div>
                                            <div>{item?.package_duration} {item?.package_duration > 1 ? "Months" : "Month"}</div>
                                        </div>
                                    </div>
                                    <div  style={{background: "white", height: "1px", margin: "auto", width: "98%", marginBottom: "20px"}}></div>

                                    {/* <hr  style={{background: "white"}} /> */}
                                    <div style={{
                                        paddingLeft: "20px",
                                        color: "white"
                                    }}>
                                        {
                                            item?.package_features?.map((feature, index)=>{
                                                return <div key={index} style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px"}}>
                                                    <FaCircleCheck size={24} color="white"/>
                                                    <h3>{feature}</h3>
                                                </div>
                                            })
                                        }
                                    </div>
            
                                    <div style={{
                                        padding: "20px",
                                        width: "100%",
                                        position: "absolute",
                                        left: 0,
                                        bottom: 0
                                    }}>
                                            <button
                                                onClick={()=>(localStorage.setItem("subscription", JSON.stringify(item)), navigate("/edit-subscription"))}
                                                style={{
                                                    width: "100%",
                                                    height: "52px",
                                                    background: "white",
                                                    color: "black",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                    padding: "10px",
                                                    textAlign: "center"
                                                }}
                                            >
                                                Edit Package
                                            </button>
                                    </div>
            
                                    
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Subscription
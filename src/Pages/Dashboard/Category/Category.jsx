import { Button, Modal, Upload, ColorPicker } from 'antd'
import React, { useState } from 'react'
import { CiCamera } from "react-icons/ci";
import { SketchPicker } from 'react-color'
const Category = () => {
    const [open, setOpen] = useState(false);
    const [primary, setPrimary] = useState('');
    const [secondary, setSecondary] = useState("");
    const [imageUrl, setImageUrl] = useState()
    const [img, setImg] = useState();
    const data = [
        {
            name: "Aesthetics",
            image: "",
            subCategory:[
                {
                    name: "Makeup",
                    image: "",
                },
                {
                    name: "Facial hair removal",
                    image: "",
                },
                {
                    name: "body hair removal",
                    image: "",
                },
                {
                    name: "Manicures",
                    image: "",
                },
                {
                    name: "Pedicures",
                    image: "",
                },
                {
                    name: "Hairdressing",
                    image: "",
                },
            ]
        },
        {
            name: "Cuisine and Pastry",
            image: "",
            subCategory:[
                {
                    name: "Cake Design",
                    image: "",
                },
                {
                    name: "Services Category",
                    image: "",
                },
                {
                    name: "Cooking Classes ",
                    image: "",
                },
            ]
        },
        {
            name: "Decorations & Themes",
            image: "",
            subCategory:[
                {
                    name: "Event Decorating",
                    image: "",
                },
                {
                    name: "Disguise",
                    image: "",
                },
                {
                    name: "Amateur Painter",
                    image: "",
                },
                {
                    name: "Designer",
                    image: "",
                },
            ]
        },
        {
            name: "Fashion",
            image: "",
            subCategory:[
                {
                    name: "Outfits Rental",
                    image: "",
                },
                {
                    name: "Stylist",
                    image: "",
                },
            ]
        },
        {
            name: "Entertainment",
            image: "",
            subCategory:[
                {
                    name: "Musicians",
                    image: "",
                },
                {
                    name: "Photographers",
                    image: "",
                },
                {
                    name: "Entertainment Animation",
                    image: "",
                },
            ]
        }
    ]

    
    
    return (
        <div>
            <div style={{display: "flex", alignItems: "flex-end", justifyContent : "flex-end"}}>
                <Button
                    onClick={()=>setOpen(true)}
                    style={{
                        background: "#ffb7d5",
                        color: "white",
                        border: "none"
                    }}
                >
                    Add Catagory
                </Button>
            </div>
            <h1>Category</h1>
            

            <div>
                {/* {
                    data?.map()
                } */}
            </div>

            <Modal
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={500}
                footer={false}
            >
                <div>
                    <h1 style={{marginBottom: "12px"}}>Add Category</h1>
                    <form >
                        <div>
                            <label style={{marginBottom : "12px"}}>Category name</label>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "10px"                            
                            }}>
                                <input 
                                    style={{
                                        width: "100%",
                                        height: "52px",
                                        border: "1px solid #ffb7d5",
                                        borderRadius: "8px",
                                        padding : "16px",
                                        color: "black",
                                        outline: "none",
                                        backgroundColor: "#E9EAEC",

                                    }}
                                    type="text" 
                                    placeholder="Enter Category name"
                                    name="category_name"
                                    // onChange={(e)=>setName(e.target.value)}
                                />
                            </div>


                            <label style={{marginBottom : "12px"}}>Primary Color</label>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "10px"                            
                            }}>
                                <ColorPicker defaultValue="#1677ff" size="large" showText />
                            </div>

                            <label style={{marginBottom : "12px"}}>Seceondary Color</label>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "10px"                            
                            }}>
                                <ColorPicker defaultValue="#1677ff" size="large" showText />
                            </div>
                        </div>

                        <div>
                            <div style={{marginBottom : "12px"}}>
                                <label >Category Picture</label>
                            </div>
                            <Upload
                                name="avatar"                 
                                listType="picture-card"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                // onChange={onChange}
                                style={{
                                    width: "100%"
                                }}
                                
                            >
                                {
                                    imageUrl
                                    ? 
                                    (
                                        <img
                                            src={img}
                                            alt="avatar"
                                            style={{
                                                width: "100%",
                                                height: "190px",
                                                borderRadius: "8px"
                                            }}
                                        />
                                    ) 
                                    :
                                    <div>
                                        <CiCamera size={64} color="#ffb7d5" />
                                        <div
                                            style={{
                                            color: "#ffb7d5"
                                            }}
                                        >
                                            Choose Picture
                                        </div>
                                    </div>
                                }
                            </Upload>
                        </div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                width : "100%",
                                height: "45px",
                                fontWeight: "400px",
                                fontSize: "18px",
                                background: "#ffb7d5",
                                color: "white",
                                marginTop : "44px"
                            }}
                        >
                            Add Category
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Category
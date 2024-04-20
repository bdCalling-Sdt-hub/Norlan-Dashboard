import { Button, Modal, ColorPicker } from 'antd'
import React, { useState } from 'react'
import { CiCamera } from "react-icons/ci";
import baseURL from '../../../baseURL';
import Swal from 'sweetalert2';

const AddCategoryModal = ({ open, setOpen, setRefresh }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState();
    const [imgURL, setImgURL] = useState();
    const [primaryColor, setPrimaryColor] = useState("")
    const [secondaryColor, setSecondaryColor] = useState("")

    const handleChange = (e) => {
        const file= e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setImgURL(imgUrl);
        setImage(file)
    };

    const handleSubmit=async()=>{
        const formData = new FormData();
        formData.append("name", name)
        formData.append("image", image)
        formData.append("primary_color", primaryColor?.toHexString())
        formData.append("secondary_color", secondaryColor?.toHexString())

        await baseURL.post("/category/create-category", formData, {
            headers: {
                "Content-Type" : "multipart/form-data",
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        }).then((response)=>{
            if(response.status === 200){
                Swal.fire({
                  position: "center",
                  icon: "success",
                  width: 550,
                  title: response.data.message,
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                    setOpen(false)
                    setRefresh("done")
                    setName("")
                    setImgURL()
                    setPrimaryColor("")
                    setSecondaryColor("")
                });
            }
        })
    }
    return (
        <>
            <Modal
                    centered
                    title="Add Category"
                    open={open}
                    onCancel={() => setOpen(false)}
                    width={500}
                    footer={false}
                >
                    <div>
                        <div >
                            <div>
                                <label style={{marginBottom : "12px"}}>Category name</label>
                                <div style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"                            
                                }}>
                                    <input 
                                        style={{
                                            width: "100%",
                                            height: "44px",
                                            border: "1px solid #6C57EC",
                                            borderRadius: "8px",
                                            padding : "16px",
                                            color: "black",
                                            outline: "none",
                                            backgroundColor: "#E9EAEC",

                                        }}
                                        type="text" 
                                        placeholder="Enter Category name"
                                        name="category_name"
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>


                                <label style={{marginBottom : "12px"}}>Primary Color</label>
                                <div style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"                            
                                }}>
                                    <ColorPicker onChange={setPrimaryColor} 
                                        defaultValue="#1677ff" 
                                        size="large" 
                                        showText 
                                    />
                                </div>

                                <label style={{marginBottom : "12px"}}>Seceondary Color</label>
                                <div style={{
                                    marginTop: "10px",
                                    marginBottom: "10px"                            
                                }}>
                                    <ColorPicker onChange={(e)=>setSecondaryColor(e)} defaultValue="#1677ff" size="large" showText />
                                </div>
                            </div>

                            <div>
                                <div style={{marginBottom : "12px"}}>
                                    <label >Category Picture</label>
                                </div>
                                
                                <div >
                                    <input style={{display: "none"}} onChange={handleChange}  type="file" name="" id="img" />
                                    <label 
                                        htmlFor="img" 
                                        style={{
                                            width: "100%",
                                            height: "190px",
                                            borderRadius: "8px",
                                            border: "1px solid #6C57EC",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "black",
                                            cursor: "pointer",
                                            backgroundImage: `url(${ imgURL ? imgURL:  "https://img.freepik.com/free-photo/paper-textured-background_53876-30486.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709596800&semt=ais"})`, // Replace 'your-image-url.jpg' with your actual image URL
                                            backgroundSize: "cover", // Adjust according to your image size preference
                                            backgroundPosition: "center"
                                        }}>
                                            <CiCamera size={40} /> 
                                            <h3>Upload Photo</h3>
                                    </label>
                                </div>
                            </div>
                            <Button
                                onClick={handleSubmit}
                                block
                                style={{
                                    width : "100%",
                                    height: "45px",
                                    fontWeight: "400px",
                                    fontSize: "18px",
                                    background: "#6C57EC",
                                    color: "white",
                                    marginTop : "44px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
            </Modal>
        </>
    )
}

export default AddCategoryModal
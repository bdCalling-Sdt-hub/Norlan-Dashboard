import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import ColorPicker from 'react-best-gradient-color-picker';
import { CiCamera } from 'react-icons/ci'
import baseURL from '../../../baseURL';
import Swal from 'sweetalert2';

const CreateEventModal = ({open, setOpen, setRefresh}) => {
    const [name, setName] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [image, setImage] = useState();
    const [imgURL, setImgURL] = useState();
    const [gradient, setGradient] = useState('linear-gradient(90deg, rgba(20,14,107,1) 0%, rgba(9,9,121,1) 35%, RGBA(14, 57, 107, 1) 68%, rgba(0,212,255,1) 100%)');

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
        formData.append("colors", gradient)

        await baseURL.post("/event/create-event", formData, {
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
                    setImgURL()
                    setName("")
                });
            }
        })
    }
    
    return (
        <>
            <Modal
                    centered
                    title="Add Event"
                    open={open}
                    onCancel={() => ( setImgURL(), setName(""), setOpen(false))}
                    width={500}
                    footer={false}
                >
                    <div>
                        <div >
                            <div>
                                <label style={{marginBottom : "12px"}}>Event Name</label>
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
                                        placeholder="Enter Event name"
                                        name="event_name"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{marginBottom : "12px"}}>Event Background Color</label>
                                <div 
                                    onClick={()=>setOpenModal(true)}
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                        background: `${gradient}`,
                                        border: "1px solid grey",
                                        width: "30px",                        
                                        height: "30px",                        
                                    }}
                                >
                                    
                                </div>
                            </div>

                            <div>
                                <div style={{marginBottom : "12px"}}>
                                    <label >Event Picture</label>
                                </div>
                                
                                <div >
                                    <input style={{display: "none"}} 
                                        onChange={handleChange}  
                                        type="file" name="" id="img" 
                                    />
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
                                            backgroundImage: `url(${imgURL ? imgURL : "https://img.freepik.com/free-photo/paper-textured-background_53876-30486.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709596800&semt=ais"})`, // Replace 'your-image-url.jpg' with your actual image URL
                                            backgroundSize: "cover",
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

            {/* Choose Background Linear Gradient Color */}
            <Modal
                centered
                title="Choose Background Color"
                open={openModal}
                onCancel={() => setOpenModal(false)}
                width={350}
                footer={false}
            >
                <div style={{marginTop: "20px"}}>
                    <ColorPicker style={{width: "100%"}} value={gradient} onChange={setGradient} />
                </div>
            </Modal>
        </>
    )
}

export default CreateEventModal
import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { CiCamera } from 'react-icons/ci';
import event1 from "../../Images/wedding.png";
import { AiOutlineEdit } from "react-icons/ai";
import ColorPicker from 'react-best-gradient-color-picker'


const Events = () => {
    const [color, setColor] = useState('linear-gradient(90deg, rgba(20,14,107,1) 0%, rgba(9,9,121,1) 35%, RGBA(14, 57, 107, 1) 68%, rgba(0,212,255,1) 100%)');
    const [open, setOpen] = useState(false);
    const [openColorModal, setOpenColorModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editCategoryImageUrl, setEditEventImageUrl] = useState();
    const [editName, setEditName] = useState("");
    const [value, setValue] = useState({});
    const [name, setName] = useState(value?.name);
    const [addEventImageUrl, setAddEventImageUrl] = useState(value?.image);
    const [event, setEvent] = useState([
        {
            name: "Wedding",
            image: event1,
            color: color,
        }
    ]);

    const handleAddEventChange = (e) => {
        const file= e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setAddEventImageUrl(imgUrl);
        setImg(file)
    };

    const handleEditEventChange = (e) => {
        const file= e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setEditEventImageUrl(imgUrl);
        setImg(file)
    };

    const handleSubmit=()=>{
        const data = {
            name: name,
            image: addEventImageUrl,
            color: color
        }
        setEvent((prev)=> [...prev, data]);
        setOpen(false)
        setName("")
        setAddEventImageUrl()
    }

    const handleEditSubmit=()=>{
        setEdit(false);
        setEditName("");
        setEditEventImageUrl();
    }
    return (
        <div>
            <div style={{display: "flex", alignItems: "flex-end", justifyContent : "flex-end"}}>
                <Button
                    onClick={()=>setOpen(true)}
                    style={{
                        background: "#6C57EC",
                        color: "white",
                        border: "none",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"

                    }}
                >
                    Add Event
                </Button>
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
                textAlign: "center",
                marginTop: "20px"
            }}>
                {
                    event?.map((category, index)=>
                        <div key={index} >
                            <div
                                style={{
                                    borderRadius: "8px",
                                    padding: "10px",
                                    width: "230px",
                                    background: `${category?.color}`,
                                    cursor: "pointer",
                                    position: "relative"
                                }}
                            >
                                <img style={{marginLeft: "auto", marginRight: "auto", display: "block",}} width={150} height={150} src={category?.image} alt="" />
                                <h3 
                                    style={{
                                        padding: 0, 
                                        textAlign: "center",
                                        color: "white" 
                                    }}
                                >
                                    {category?.name}
                                </h3>

                                <div  style={{position: "absolute", top: "5px", right: "10px"}}>
                                    <AiOutlineEdit 
                                        onClick={()=>( setValue(category), setEdit(true) )} 
                                        style={{cursor: "pointer"}} 
                                        color="white"
                                        size={24} 
                                    />
                                </div>
                            </div>
                        </div>

                    )
                }
            </div>

            {/* Add Event Modal */}
            <Modal
                centered
                title="Add Event"
                open={open}
                onCancel={() => setOpen(false)}
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
                                        height: "52px",
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
                                onClick={()=>setOpenColorModal(true)}
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    background: `${color}`,
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
                                <input style={{display: "none"}} onChange={handleAddEventChange}  type="file" name="" id="img" />
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
                                        backgroundImage: `url(${addEventImageUrl ? addEventImageUrl : "https://img.freepik.com/free-photo/paper-textured-background_53876-30486.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709596800&semt=ais"})`, // Replace 'your-image-url.jpg' with your actual image URL
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
            
            {/* Edit Event Modal */}
            <Modal
                centered
                title="Edit Event"
                open={edit}
                onCancel={() => (setName(""), setEditEventImageUrl(), setEdit(false))}
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
                                        height: "52px",
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
                                    value={value?.name}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                        </div>
                        

                        <div>
                            <label style={{marginBottom : "12px"}}>Event Background Color</label>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "10px"                            
                            }}>
                                <ColorPicker defaultValue="#1677ff" showText />
                            </div>
                        </div>

                        <div>
                            <div style={{marginBottom : "12px"}}>
                                <label >Event Picture</label>
                            </div>
                            
                            <div >
                                <input style={{display: "none"}} onChange={handleEditEventChange}  type="file" name="" id="img" />
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
                                        backgroundImage: `url(${addEventImageUrl ? addEventImageUrl : "https://img.freepik.com/free-photo/paper-textured-background_53876-30486.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709596800&semt=ais"})`, // Replace 'your-image-url.jpg' with your actual image URL
                                        backgroundSize: "cover", // Adjust according to your image size preference
                                        backgroundPosition: "center"
                                    }}>
                                        <CiCamera size={40} /> 
                                        <h3>Upload Photo</h3>
                                </label>
                            </div>
                        </div>
                        <Button
                            onClick={handleEditSubmit}
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
                open={openColorModal}
                onCancel={() => setOpenColorModal(false)}
                width={350}
                footer={false}
            >
                <div style={{marginTop: "20px"}}>
                    <ColorPicker style={{width: "100%"}} value={color} onChange={setColor} />
                </div>
            </Modal>
        </div>
    )
}

export default Events;
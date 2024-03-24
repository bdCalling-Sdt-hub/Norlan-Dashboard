import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { CiCamera } from 'react-icons/ci';
import event1 from "../../assets/wedding.png";
import event2 from "../../assets/birthday.png";
import event3 from "../../assets/baby s.png";
import event4 from "../../assets/annual.png";
import event5 from "../../assets/corporate.png";
import { AiOutlineEdit } from "react-icons/ai";


const data = [
    {
        name: "Wedding",
        image: event1,
    },

    {
        name: "Birthday",
        image: event2
    },

    {
        name: "Baby Shower",
        image: event3
    },

    {
        name: "Annual Function",
        image: event4
    },

    {
        name: "Corporeal Event",
        image: event5
    }
]
const Events = () => {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [addEventImageUrl, setAddEventImageUrl] = useState();
    const [editCategoryImageUrl, setEditEventImageUrl] = useState();
    const [name, setName] = useState("");
    const [editName, setEditName] = useState("");
    const [event, setEvent] = useState([])

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
            image: addEventImageUrl
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
                        background: "#ffb7d5",
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
                                    border: "1px solid  #ffb7d5",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    width: "230px",
                                    backgroundColor: "white",
                                    cursor: "pointer",
                                    position: "relative"
                                }}
                            >
                                <img style={{marginLeft: "auto", marginRight: "auto", display: "block",}} width={100} height={100} src={category?.image} alt="" />
                                <h3 style={{padding: 0, marginTop: "5px", textAlign: "center"}}>{category?.name}</h3>

                                <div  style={{position: "absolute", top: "5px", right: "10px"}}>
                                    <AiOutlineEdit onClick={()=>setEdit(true)} style={{cursor: "pointer"}} color='#ffb7d5' size={24} />
                                </div>
                            </div>
                        </div>

                    )
                }
            </div>


            <Modal
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={500}
                footer={false}
            >
                <div>
                    <h1 style={{marginBottom: "12px"}}>Add Event</h1>
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
                                        border: "1px solid #ffb7d5",
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
                                        border: "1px solid #ffb7d5",
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
                                background: "#ffb7d5",
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

            <Modal
                centered
                open={edit}
                onCancel={() => (setName(""), setEditEventImageUrl(), setEdit(false))}
                width={500}
                footer={false}
            >
                <div>
                    <h1 style={{marginBottom: "12px"}}>Edit Event</h1>
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
                                        border: "1px solid #ffb7d5",
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
                                        border: "1px solid #ffb7d5",
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
                                background: "#ffb7d5",
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
        </div>
    )
}

export default Events;
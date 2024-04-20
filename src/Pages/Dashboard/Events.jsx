import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { CiCamera } from 'react-icons/ci';
import event1 from "../../Images/wedding.png";
import { AiOutlineEdit } from "react-icons/ai";
import ColorPicker from 'react-best-gradient-color-picker'
import baseURL from '../../../baseURL';
import ImgBaseURL from '../../../ImgBaseURL';
import CreateEventModal from '../../Components/Modal/CreateEventModal';
import Swal from 'sweetalert2';


const Events = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState({});
    const [name, setName] = useState();
    const [gradient, setGradient] = useState();
    const [refresh, setRefresh] = useState('')
    const [image, setImage] = useState();
    const [imgURL, setImgURL] = useState();
    
    useEffect(()=>{
        setName(value.name)
    }, [value])

    if(refresh){
        setTimeout(()=>{
        setRefresh("")
        },[1500])
    }
    
    const handleChange = (e) => {
        const file= e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setImgURL(imgUrl);
        setImage(file)
    };

    const handleSubmit=async()=>{
        const formData = new FormData();
        formData.append("name", name ? name : value.name)
        formData.append("image", image !== undefined  ? image : value.image )
        formData.append("colors", gradient ? gradient : value.colors)

        await baseURL.patch(`/event/update-event/${value?._id}`, formData, {
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
                    setEdit(false)
                    setRefresh("done")
                    setName("")
                    setValue({})
                });
            }
        })
    }

    useEffect(()=>{
        async function getApi(){
          await baseURL.get("/event/get-event", {
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
    }, [refresh !== ""]);

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
                    data?.map((event, index)=>
                        <div key={index} >
                            <div
                                style={{
                                    borderRadius: "8px",
                                    padding: "10px",
                                    width: "230px",
                                    background: `${event?.colors}`,
                                    cursor: "pointer",
                                    position: "relative"
                                }}
                            >
                                <img style={{marginLeft: "auto", marginRight: "auto", display: "block",}} width={150} height={150} src={`${ImgBaseURL}${event?.image}`} alt="" />
                                <h3 
                                    style={{
                                        padding: 0, 
                                        textAlign: "center",
                                        color: "white" 
                                    }}
                                >
                                    {event?.name}
                                </h3>

                                <div  style={{position: "absolute", top: "5px", right: "10px"}}>
                                    <AiOutlineEdit 
                                        onClick={()=>( setValue(event), localStorage.setItem("event", JSON.stringify(event)), setEdit(true) )} 
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
            <CreateEventModal open={open} setOpen={setOpen} setRefresh={setRefresh} />
            
            {/* Edit Event Modal */}
            <Modal
                centered
                title="Edit Event"
                open={edit}
                onCancel={() => (setValue({}), setEdit(false))}
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
                                    onClick={()=>setOpenModal(true)}
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                        background: `${gradient ? gradient : value?.colors}`,
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
                                        backgroundImage: `url(${imgURL ? imgURL : `${ImgBaseURL}${value?.image}`})`,
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
        </div>
    )
}

export default Events;
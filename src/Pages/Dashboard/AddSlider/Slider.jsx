import React, { useEffect, useState } from 'react'
import { Spin } from 'antd';
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import baseURL from '../../../../baseURL';
import ImgBaseURL from '../../../../ImgBaseURL';
import Swal from 'sweetalert2';

const AddSlider = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState('');
    const [loader, setLoader] = useState(false)

    if(refresh){
        setTimeout(()=>{
            setRefresh("")
        },[1500])
    }


    const handleChange = async(e) => {
        setLoader(true);
        const file = e.target.files[0];

        setTimeout(async()=>{
            setLoader(false)
            await baseURL.post(`/banner/create-banner`, { image : file },  {
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
                        setRefresh("Done")
                    });
                }
            })
        }, 1000);
    }

    const handleRemove = async(id)=>{
        console.log(id);

        await baseURL.delete(`/banner/delete-banner/${id}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        }).then((response)=>{
            if(response.status === 200){
                setRefresh("Done")
            }
        })
    }

    useEffect(()=>{
        async function getApi(){
            await baseURL.get("/banner/get-banner", {
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

        <>
            {
                loader
                ?
                <div style={{width: "100%", height: "60vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Spin
                        size='large' 
                    />
                </div>
                :
                <div>
                    <div  style={{ marginBottom: "50px", display: "flex", alignItems: "center", gap: "50px"}}>
                        {
                            data?.map((url, index)=>
                            <div key={index} style={{width: "100%", height:"300px", position: "relative"}}>
                                <img style={{width: "100%", height:"300px", borderRadius: "12px"}} src={ `${ImgBaseURL}${url?.banner}` } alt="" />
                                <div onClick={()=>handleRemove(url._id)} style={{
                                    width: "35px",
                                    height: "35px",
                                    backgroundColor: "#6C57EC",
                                    borderRadius: "100%",
                                    padding: "5px",
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                }}>
                                    <FaTrash color='white' />
                                </div>
                            </div>
                            
                            )
                        }
                        
                        
                        {/* <div style={{width: "100%", height:"300px"}}>
                            <img style={{width: "100%", height:"300px", borderRadius: "12px"}} src={imgURL[1] ? imgURL[1] : Slider2} alt="" />
                        </div>
                        <div style={{width: "100%", height:"300px"}}>
                            <img style={{width: "100%", height:"300px", borderRadius: "12px"}} src={imgURL[2] ? imgURL[2] : Slider3} alt="" />
                        </div> */}
                    </div>

                    {
                        data?.length > 2
                        ?
                        null
                        :
                        <div>
                            <label 
                                style={{
                                    width: "150px", 
                                    height: "50px", 
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px", 
                                    cursor: "pointer", 
                                    color : "#6C57EC", 
                                    fontSize: "20px", 
                                    fontWeight: 600,
                                    border: "1px solid #6C57EC", 
                                    borderRadius: "8px", 
                                    padding: "10px"
                                }} 
                                htmlFor="input"
                            >
                                <FaPlus size={24}/>
                                Upload
                            </label>
                            <input type="file" name="input" id="input" onChange={handleChange} style={{display: "none"}} />
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default AddSlider
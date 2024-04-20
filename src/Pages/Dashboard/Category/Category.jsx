import { Button, Modal, ColorPicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { CiCamera } from "react-icons/ci";
import AddCategoryModal from '../../../Components/Modal/AddCategoryModal';
import baseURL from '../../../../baseURL';
import ImgBaseURL from '../../../../ImgBaseURL';
import Swal from 'sweetalert2';
import { AiOutlineEdit } from "react-icons/ai";

const Category = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [editModal, setEditModal] = useState(false);
    
    const [refresh, setRefresh] = useState('');
    const [name, setName] = useState();
    const [image, setImage] = useState();
    const [imgURL, setImgURL] = useState();
    const [primaryColor, setPrimaryColor] = useState("");
    const [secondaryColor, setSecondaryColor] = useState("");
    const [value, setValue] = useState({});
    console.log(primaryColor, secondaryColor)


    if(refresh){
        setTimeout(()=>{
        setRefresh("")
        },[1500])
    }
    
    useEffect(()=>{
        setName(value?.name)
        setImgURL(`${ImgBaseURL}${value?.image}`)
        setPrimaryColor(value?.primary_color)
        setSecondaryColor(value?.secondary_color)
    }, [value]);

    const handleChange = (e) => {
        const file= e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setImgURL(imgUrl);
        setImage(file)
    };

    const handleSubmit=async()=>{
        const formData = new FormData();
        formData.append("name", name ? name : value.name);
        formData.append("image", image !== undefined  ? image : value.image );
        formData.append("primary_color", primaryColor?.startsWith("#") ? value?.primary_color : primaryColor?.toHexString())
        formData.append("secondary_color", secondaryColor?.startsWith("#") ? value?.secondary_color : secondaryColor?.toHexString() );

        await baseURL.patch(`/category/update-category/${value?._id}`, formData, {
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
                    setEditModal(false)
                    setRefresh("done")
                    setName("")
                    setValue({})
                });
            }
        })
    }

    


    useEffect(()=>{
        async function getApi(){
          await baseURL.get("/category/get-category", {
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
                    Add Category
                </Button>
            </div>
            <h1>Category</h1>
            

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
                textAlign: "center",
                marginTop: "20px"
            }}>
                {
                    data?.map((category, index)=>
                        <div key={index} style={{position: "relative"}}>
                            <div 
                                style={{
                                    borderRadius: "8px",
                                    padding: "10px",
                                    width: "230px",
                                    background: `${category?.primary_color}`,
                                    cursor: "pointer"
                                }}
                            >
                                <AiOutlineEdit
                                    onClick={()=>(setValue(category), setEditModal(true))} 
                                    style={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        color: "black",
                                        cursor: "pointer"
                                    }}
                                    size={24}
                                />
                                <div
                                    style={{
                                        borderRadius: "100%",
                                        margin: "0 auto",
                                        padding: "10px",
                                        width: "150px",
                                        width: "150px",
                                        background: `${category?.secondary_color}`,
                                        cursor: "pointer"
                                    }}
                                >
                                    <img style={{marginLeft: "auto", marginRight: "auto", display: "block",}} width={100} height={100} src={`${ImgBaseURL}${category?.image}`} alt="" />
                                </div>
                                <h3 style={{padding: 0, color: "white", marginTop: 6, textAlign: "center"}}>{category?.name}</h3>
                            </div>
                        </div>

                    )
                }
            </div>



            <AddCategoryModal open={open} setOpen={setOpen} setRefresh={setRefresh} />
            
             {/* edit category modal */}
            <Modal
                centered
                title="Edit Category"
                open={editModal}
                onCancel={()=>setEditModal(false)}
                width={500}
                footer={false}
            >
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
                                border: "1px solid #6C57EC",
                                borderRadius: "8px",
                                padding : "16px",
                                color: "black",
                                outline: "none",
                                backgroundColor: "#E9EAEC"
                            }}
                            value={name}
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
                        <ColorPicker onChange={setPrimaryColor} value={primaryColor} size="large" showText />
                    </div>

                    <label style={{marginBottom : "12px"}}>Seceondary Color</label>
                    <div style={{
                        marginTop: "10px",
                        marginBottom: "10px"                            
                    }}>
                        <ColorPicker onChange={setSecondaryColor} value={secondaryColor} size="large" showText />
                    </div>

                    <div>
                        <div style={{marginBottom : "12px"}}>
                            <label >Category Picture</label>
                        </div>
                        <div>
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
                                    backgroundImage: `url(${imgURL})`,
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
                        type="primary"
                        htmlType="submit"
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
                        UPDATE
                    </Button>

                </div>
            </Modal>
                            


            {/* category  delete */}
            {/* <Modal
                centered
                open={deleteCategory}
                onCancel={() => setDeleteCategory('')}
                width={500}
                footer={false}
            >
                <div>
                    <div
                        style={{
                            backgroundColor: "red",
                            width: "100px",
                            height: "100px",
                            borderRadius: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent:"center",
                            margin: "auto",
                            marginBottom: "30px"
                        }}
                    >
                        <MdDelete size={70} color='white'/>
                    </div>
                    <h1 style={{marginBottom: "12px", fontSize: "18px", textAlign: "center"}}>Are You Sure to Delete this Category ?</h1>
                    <div style={{display: "flex", alignItems: "center", gap: "30px"}}>
                        <Button
                            onClick={() => setDeleteCategory('')}
                            block
                            style={{
                                width : "100%",
                                height: "45px",
                                fontWeight: "400px",
                                fontSize: "18px",
                                background: "green",
                                color: "white",
                                marginTop : "44px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            YES
                        </Button>
                        <Button
                            onClick={() => setDeleteCategory('')}
                            
                            block
                            style={{
                                width : "100%",
                                height: "45px",
                                fontWeight: "400px",
                                fontSize: "18px",
                                background: "red",
                                color: "white",
                                marginTop : "44px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            NO
                        </Button>
                    </div>
                </div>
            </Modal> */}
        </div>
    )
}

export default Category
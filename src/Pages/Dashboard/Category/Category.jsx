import { Button, Modal, Upload, ColorPicker,Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { CiCamera } from "react-icons/ci";
import { SketchPicker } from 'react-color';
import cat1 from "../../../Images/cata1.png";
import cat2 from "../../../Images/cata2.png";
import cat3 from "../../../Images/cata3.png";
import cat4 from "../../../Images/cata4.png";
import cat5 from "../../../Images/cata5.png";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import EditCategoryModal from '../../../Components/Modal/EditCategoryModal';
import AddCategoryModal from '../../../Components/Modal/AddCategoryModal';
import EditSubCategory from '../../../Components/Modal/EditSubCategory';
import baseURL from '../../../../baseURL';
import ImgBaseURL from '../../../../ImgBaseURL';

const Category = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [secondary, setSecondary] = useState("");
    const [img, setImg] = useState();
    const [categoryOpen, setOpenCategory] = useState();
    const [editCategory, setEditCategory] = useState();
    const [deleteCategory, setDeleteCategory] = useState(false);
    const [value, setValue] = useState();
    const [deleteValue, setDeleteValue] = useState("");
    const [imageUrl, setImageUrl] = useState();
    
    const category = JSON?.parse(localStorage.getItem('category'));
    const [addCategoryImageUrl, setAddCategoryImageUrl] = useState();
    const [editCategoryImageUrl, setEditCategoryImageUrl] = useState();
    const [editSubCategoryImageUrl, setEditSubCategoryImageUrl] = useState(value?.image);
    const [refresh, setRefresh] = useState('')
    if(refresh){
        setTimeout(()=>{
        setRefresh("")
        },[1500])
    }
    
    
    const handleValue=()=>{
        localStorage.removeItem('category')
        setEditCategory('')
        setEditCategoryImageUrl('')
    }


    const columns = [
        {
            title: 'Category',
            dataIndex: 'name',
            key: "name"
          
        },
        {
            title: 'Sub Category',
            dataIndex: 'name',
            key: "name",
            render: ( _, record ) => (
                <p>{record?.subCategory[0].name}</p>
            )
        },
        {
            title: 'Primary Color',
            dataIndex: 'primary_color',
            key: "primary"
        },
        {
            title: 'Secondary Color',
            dataIndex: 'secondary_color',
            key: "secondary"
        },
        {
            title: 'ACTIONS',
            dataIndex: 'actions',
            key:"actions",
            render: ( _, record ) => (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"                    
                }}>
                    <FaRegEdit style={{cursor: "pointer"}} onClick={()=>(localStorage.setItem('category', JSON.stringify(record)), setEditCategory(record))} size={22} />
                    <MdDelete style={{cursor: "pointer"}} onClick={()=>setDeleteCategory(record)} size={22} />
                </div>
            )
        }
    ];

    

    const filterData = data.find((item)=> item.name === categoryOpen);
    
    const filterColumns = [
        {
            title: 'Sub Category',
            dataIndex: 'name',
            key: "name"
          
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: "image",
            render: ( _, record ) => (
                <img width={50} height={50} src={record?.image} alt="" />
            )
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: "color"
        },
        {
            title: 'ACTIONS',
            dataIndex: 'actions',
            key:"actions",
            render: ( _, record ) => (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"                    
                }}>
                    <FaRegEdit style={{cursor: "pointer"}} onClick={(e)=>setValue(record)} size={22} />
                    <MdDelete style={{cursor: "pointer"}} onClick={(e)=>setDeleteValue(record)} size={22} />
                </div>
            )
        }
    ];

    const handleAddCategoryChange = (e) => {
        const file= e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setAddCategoryImageUrl(imgUrl);
        setImg(file)
    };
    const handleEditCategoryChange = (e) => {
        const file= e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setEditCategoryImageUrl(imgUrl);
        setImg(file)
    };

    const handleEditSubCategoryChange = (e) => {
        console.log(e)
        const file= e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setEditSubCategoryImageUrl(imgUrl);
        setImg(file)
    };


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
                        <div key={index} >
                            <div 
                                onClick={()=>setOpenCategory(category.name)} 
                                style={{
                                    borderRadius: "8px",
                                    padding: "10px",
                                    width: "230px",
                                    background: `${category?.primary_color}`,
                                    cursor: "pointer"
                                }}
                            >
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
                open={editCategory}
                onCancel={handleValue}
                width={500}
                footer={false}
            >
                <div>
                    <h1 style={{marginBottom: "12px"}}>Edit Category</h1>
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
                                        border: "1px solid #6C57EC",
                                        borderRadius: "8px",
                                        padding : "16px",
                                        color: "black",
                                        outline: "none",
                                        backgroundColor: "#E9EAEC",

                                    }}
                                    value={editCategory?.name}
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
                            <div>
                                <input style={{display: "none"}} onChange={handleEditCategoryChange}  type="file" name="" id="img" />
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
                                        color: "#6C57EC",
                                        cursor: "pointer",
                                        backgroundImage: `url(${editCategoryImageUrl ? editCategoryImageUrl : category?.image})`, // Replace 'your-image-url.jpg' with your actual image URL
                                        backgroundSize: "cover", // Adjust according to your image size preference
                                        backgroundPosition: "center"
                                    }}>
                                        <CiCamera size={40} /> 
                                        <h3>Upload Photo</h3>
                                </label>
                            </div>
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
                                background: "#6C57EC",
                                color: "white",
                                marginTop : "44px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            UPDATE
                        </Button>
                    </form>
                </div>
            </Modal>

            {/* edit sub category  */}
            <Modal
                centered
                open={value}
                onCancel={() => setValue('')}
                width={500}
                footer={false}
            >
            <div>
                <h1 style={{marginBottom: "12px"}}>Edit Sub Category</h1>
                <div>
                    <div>
                        <label style={{marginBottom : "12px"}}>Sub Category name</label>
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
                                value={value?.name}
                                type="text" 
                                placeholder="Enter Category name"
                                name="category_name"
                            />
                        </div>

                        <label style={{marginBottom : "12px"}}>Color</label>
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
                            <div>
                                <input style={{display: "none"}} onChange={handleEditSubCategoryChange}  type="file" name="" id="img" />
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
                                        color: "#6C57EC",
                                        cursor: "pointer",
                                        backgroundImage: `url(${editSubCategoryImageUrl})`, // Replace 'your-image-url.jpg' with your actual image URL
                                        backgroundSize: "cover", // Adjust according to your image size preference
                                        backgroundPosition: "center"
                                    }}>
                                        <CiCamera size={40} /> 
                                        <h3>Upload Photo</h3>
                                </label>
                            </div>
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
                                background: "#6C57EC",
                                color: "white",
                                marginTop : "44px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            UPDATE
                        </Button>
                </div>
                </div>
            </Modal>
                            


            {/* category  delete */}
            <Modal
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
            </Modal>


            {/* subcategory  delete */}
            <Modal
                centered
                open={deleteValue}
                onCancel={() => setDeleteValue('')}
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
                    <h1 style={{marginBottom: "12px", fontSize: "18px", textAlign: "center"}}>Are You Sure to Delete this Sub Category ?</h1>
                    <div style={{display: "flex", alignItems: "center", gap: "30px"}}>
                        <Button
                            onClick={() => setDeleteValue('')}
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
                            onClick={() => setDeleteValue('')}
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
            </Modal>

        </div>
    )
}

export default Category
import React, { useState } from 'react'
import { Select, Modal, Button, Form, ColorPicker, Upload } from 'antd';
import { CiCamera } from "react-icons/ci";

const SubCategory = () => {
    const OPTIONS = ['Entertainment ', 'Fashion ', 'Aesthetics', 'Cuisine and Pastry', 'Decorations & Themes'];
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    const [imageUrl, setImageUrl] = useState()
    return (
        <div>
            SubCategory
            <div>

            <Select
                mode="singel"
                placeholder="Insert a category"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{
                    width: '20%',
                    marginTop: "30px"
                }}
                options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
            />
            </div>

            
                <Modal
                    centered
                    open={selectedItems?.length}
                    onCancel={() => setSelectedItems([])}
                    width={500}
                    footer={false}
                >
                    <div>
                        <h1 style={{marginBottom: "12px"}}>Add Sub Category</h1>
                        <Form >
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
                                        type="text" 
                                        placeholder="Enter Category name"
                                        name="category_name"
                                        value={selectedItems}
                                        readOnly
                                        // onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>


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
                                        type="text" 
                                        placeholder="Enter Category name"
                                        name="category_name"
                                        // onChange={(e)=>setName(e.target.value)}
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
                                            <CiCamera size={64} color="#6C57EC" />
                                            <div
                                                style={{
                                                color: "#6C57EC"
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
                                    background: "#6C57EC",
                                    color: "white",
                                    marginTop : "44px"
                                }}
                            >
                                Add Sub Category
                            </Button>
                        </Form>
                    </div>
                </Modal>
        </div>
    )
}

export default SubCategory
import { Button, Col, DatePicker, Form, Input, Row,  } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import baseURL from "../../../../baseURL";
import ImgBaseURL from "../../../../ImgBaseURL";
import Swal from "sweetalert2";
const dateFormat = "YYYY-MM-DD";

const PersonalInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const [profileEdit, setProfileEdit] = useState(false);
  const [image, setImage] = useState(userInfo?.image?.startsWith("https") ? userInfo?.image : `${ImgBaseURL}${userInfo?.image}`);
  const [imgURL, setImgURL] = useState(image);

  const handleChange = () => {
    setProfileEdit(true);
  };

  const onChange = (e) => {
    const file= e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setImgURL(imgUrl);
    setImage(file)
  };
  
  const src = userInfo?.image?.startsWith("https") ? userInfo?.image : `${ImgBaseURL}${userInfo?.image}`

  const initialFromValues= {
    fullName : userInfo.fullName,
    email: userInfo?.email,
    location: userInfo.location ? userInfo.location:  "No Location Found",
    mobileNumber: userInfo.mobileNumber ? userInfo.mobileNumber: "No Mobile Found"
  }

  const handleSubmit=async(values)=>{
    console.log(values)
    const formData = new FormData();
    formData.append("fullName",  values.fullName)
    formData.append("email",  values.email)
    formData.append("mobileNumber",   values.mobileNumber)
    formData.append("location",   values.location)
    formData.append("image",   image)

    await baseURL.post("/auth/update-profile", formData, {
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
            window.location.reload();
          });
      }
    }).then((error)=>{
      console.log(error)
    })
  }
  return (
    <>
      {!profileEdit ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #d9d9d9",
              paddingBottom: "30px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <img
                width={142}
                height={142}
                style={{ borderRadius: "8px" }}
                src={src}
              />
              <div>
                <h2>{userInfo?.fullName}</h2>
                <p>{userInfo?.email}</p>
              </div>
            </div>
            <div>
              <Button
                onClick={handleChange}
                style={{
                  background: "#6C57EC",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  border: "none"
                }}
              >
                <LiaEditSolid fontSize={16} />
                Edit
              </Button>
            </div>
          </div>

          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Name</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userInfo?.fullName}
                readOnly
              />
            </Col>
          </Row>
          <Row gutter={15} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <label htmlFor="">Email</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userInfo?.email}
                readOnly
              />
            </Col>
            <Col span={12}>
              <label htmlFor="">Phone Number</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userInfo?.mobileNumber ? userInfo?.mobileNumber : "No Phone Number Found"}
                readOnly
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Location</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userInfo?.location ? userInfo?.location : "No Location Found" }
                readOnly
              />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              alignItems : "center",
              marginBottom: "20px",
              height: "174px",
              
            }}
          >
            <div>
              <div style={{ display: "flex", gap: "20px" }}>
                <img 
                  className="mx-auto rounded-full" 
                  src={imgURL}
                  width={142} 
                  height={142} 
                  alt="" 
                  style={{borderRadius: "8px"}}
                />
                <div style={{ marginTop: "50px" }}>
                  <h2>{userInfo?.fullName}</h2>
                  <label htmlFor="img" style={{marginTop : 0, cursor: "pointer", display: "block", color : "#6C57EC", fontSize: "18px", fontWeight: "600"}}>Change Photo</label>
                  <input style={{display: "none"}} onChange={onChange}  type="file" name="" id="img" />
                </div>
              </div>
            </div>
          </div>

          <Form
            onFinish={handleSubmit}
            initialValues={initialFromValues}
          >
              <div>
                <label htmlFor="">Name</label>
                <Form.Item name="fullName">
                  <Input style={{ height: "45px" }}/>
                </Form.Item>
              </div>
              
              <div>
                <label htmlFor="">Email</label>
                <Form.Item name="email">
                  <Input style={{ height: "45px" }}/>
                </Form.Item>
              </div>
              <div style={{display: "flex", alignItems: "center", gap: 16}}>

              
                <div style={{width: "100%"}}>
                  <label htmlFor="">Mobile Number</label>
                  <Form.Item name="mobileNumber">
                    <Input style={{ height: "45px" }}/>
                  </Form.Item>
                </div>
                <div style={{width: "100%"}}>
                  <label htmlFor="">Location</label>
                  <Form.Item name="location">
                    <Input style={{ height: "45px" }}/>
                  </Form.Item>
                </div>
              </div>

              <Form.Item>
                <Button
                  htmlType="submit"
                  style={{
                    height: "45px",
                    background: "#6C57EC",
                    color: "#fff",
                    marginTop: "20px",
                    border: "none"
                  }}
                  block
                  >
                  Save
                </Button>
              </Form.Item>


          </Form>
          
        </>
      )}
    </>
  );
};

export default PersonalInfo;

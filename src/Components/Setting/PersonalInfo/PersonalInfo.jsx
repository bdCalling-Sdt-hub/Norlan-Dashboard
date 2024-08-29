import { Button, Col, Form, Input, Row,  } from "antd";
import React, { useEffect, useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { useProfileQuery, useUpdateProfileMutation } from "../../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";
import { imageUrl } from "../../../redux/api/baseApi";

const PersonalInfo = () => {
  const [profileEdit, setProfileEdit] = useState(false);
  const [image, setImage] = useState();
  const [imgURL, setImgURL] = useState();
  const [form] = Form.useForm();
  const {data: profile, refetch} = useProfileQuery();
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();

  useEffect(()=>{
    if(profile){
      form.setFieldsValue(profile)
    }
  }, [profile, form]);


  const onChange = (e) => {
    const file= e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setImgURL(imgUrl);
    setImage(file)
  };
  
  const src = profile?.image?.startsWith("https") ? profile?.image : `${imageUrl}${profile?.image}`


  const handleSubmit=async(values)=>{
    const formData = new FormData();

    if(image){
      formData.append("image", image);
    }

    Object.keys(values).forEach((key)=>{
      formData.append(key, values[key]);
    })

    try {
      await updateProfile(formData).unwrap().then(({statusCode, status, message})=>{
        if (status) {
          toast.success(message);
          refetch()
        }

      })
    } catch ({message}) {
      toast.error(message);
    }
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
                <h2>{profile?.firstName + " " +  profile?.lastName}</h2>
                <p>{profile?.email}</p>
              </div>
            </div>
            <div>
              <Button
                onClick={()=>setProfileEdit(true)}
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


          <Form form={form} layout="vertical">

          <Row gutter={15}>
            <Col span={12}>
              <Form.Item name={"firstName"} label={<p>First Name</p>}>
              <Input
                style={{ height: "45px" }}
                readOnly
                />
                </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"lastName"} label={<p>Last Name</p>}>
              <Input
                style={{ height: "45px" }}
                readOnly
                />
                </Form.Item>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={12}>
            <Form.Item name={"email"} label={<p>Email</p>}>
              <Input
                style={{ height: "45px" }}
                readOnly
              />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name={"mobileNumber"} label={<p>Name</p>}>
              <Input
                style={{ height: "45px" }}
                readOnly
              />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name={"location"} label={<p>Location</p>}>
                <Input
                  style={{ height: "45px" }}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>
          </Form>
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
                  src={imgURL || src}
                  width={142} 
                  height={142} 
                  alt="" 
                  style={{borderRadius: "8px"}}
                />
                <div style={{ marginTop: "50px" }}>
                  <h2>{profile?.firstName} {" "} {profile?.lastName}</h2>
                  <label htmlFor="img" style={{marginTop : 0, cursor: "pointer", display: "block", color : "#6C57EC", fontSize: "18px", fontWeight: "600"}}>Change Photo</label>
                  <input style={{display: "none"}} onChange={onChange}  type="file" name="" id="img" />
                </div>
              </div>
            </div>
          </div>

          <Form
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
          >
              <div>
                <Row gutter={15}>
                  <Col span={12}>
                    <Form.Item name={"firstName"} label={<p>First Name</p>}>
                    <Input
                      style={{ height: "45px" }}
                      />
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name={"lastName"} label={<p>Last Name</p>}>
                    <Input
                      style={{ height: "45px" }}
                      />
                      </Form.Item>
                  </Col>
                </Row>
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
                  {isLoading ? "Loading..." : "Update"}
                </Button>
              </Form.Item>


          </Form>
          
        </>
      )}
    </>
  );
};

export default PersonalInfo;

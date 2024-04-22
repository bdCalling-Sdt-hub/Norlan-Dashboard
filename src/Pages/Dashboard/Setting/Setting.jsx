import { Button, Form, Input, Modal, Switch, Typography } from "antd";
import React, { useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../../baseURL";
import Swal from "sweetalert2";
import OTPInput from "react-otp-input";
const { Paragraph, Title, Text } = Typography;

const Setting = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openChangePassModel, setOpenChangePassModel] = useState(false);
  const [verify, setVerify] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [newPassError, setNewPassError] = useState("");
  const [conPassError, setConPassError] = useState("");
  const [curPassError, setCurPassError] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(); 

  const style = {
    formContainer: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
    },
    btn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginBottom: "10px",
    },
    notification: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginTop: "10px",
      backgroundColor: "#ffffff",
      border: "1px solid #d9d9d9",
      boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
      borderRadius: "6px",
      padding: "4px 15px",
    },
    input: {
      height: "45px",
    },
    otpInput: {
      width: "50px",
      height: "70px",
    },
  };

  const menuItems = [
    {
      key: "1",
      title: "Personal Information",
      link: "personal-information",
    },
    {
      key: "2",
      title: "Change Password",
      link: "change-password",
    },
    
    
    {
      key: "8",
      title: "Privacy Policy",
      link: "privacy-policy",
    },
    {
      key: "9",
      title: "Terms and Condition",
      link: "terms-condition",
    },
    {
      key: "10",
      title: "About Us",
      link: "about-us",
    },
  ];

  const [err, setErr] = useState("");

  const handleNavigate = (value) => {
    if (value == "renti-percentage") {
      setOpenModal(true);
    } else if (value === "change-password") {
      setOpenChangePassModel(true);
    } else {
      navigate(`/setting/${value}`);
    }
  };

  const handleChangePassword = async(values) => {
    if(values?.currentPass === values.newPass){ return setNewPassError("New password cannot be the same as old password")}else{  setNewPassError("")}
    if(values?.confirmPass !== values.newPass){ return setConPassError("New Password and Confirm Password Doesn't Matched")}else{ setConPassError("")}
    

    await baseURL.post(`/auth/change-password`, values, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      }
    })
    .then((response) => {
      setCurPassError("")
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          width: 550,
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        }).then((
          setOpenChangePassModel(false)
        ));
      }
    }).catch((error)=>{
      if(error){setCurPassError(error.response.data.message)}
    })

  };

  const handleForgotPassword=async()=>{
    await baseURL.post(`/auth/forgot-password`, {email: email})
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem("email", JSON.stringify(email))
        Swal.fire({
          position: "center",
          icon: "success",
          width: 550,
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setVerify(true), 
          setForgotPassword(false)
        });
      }
    }).catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500
      })
    });
    
  }

  const handleOtpVerify =async()=>{
    await baseURL.post(`/auth/verify-email`, {email: JSON.parse(localStorage.getItem("email")), emailVerifyCode : otp})
    .then((response) => {
      if (response.status === 200) {
        
        Swal.fire({
          position: "center",
          icon: "success",
          width: 550,
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setUpdatePassword(true)
          setVerify(false)
        });
      }
    }).catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  const handleRendEmail=async()=>{
    await baseURL.post(`/auth/forgot-password`, {email: JSON.parse(localStorage.getItem("email"))})
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          width: 550,
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate("/otp");
        });
      }
    }).catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  const handleResetPassword=async(values)=>{
    const email = JSON.parse(localStorage.getItem("email"));

    if (password !== confirmPassword) {
      setErr("Please enter the same password!");
      return;
    }

    await baseURL.post(`/auth/reset-password`, {email: email, ...values})
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          width: 550,
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setUpdatePassword(false);
        });
      }
    }).catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500
      })
    });
  }


  return (
    <div style={{ padding: "0 60px" }}>
      <h2 style={{ marginBottom: "20px", fontWeight: "normal" }}>Settings</h2>
      <div style={style.formContainer}>
        {menuItems.map((item) => (
          <Button
            onClick={() => handleNavigate(item.link)}
            key={item.key}
            block
            style={style.btn}
          >
            <span>{item.title}</span>
            <LiaAngleRightSolid fontSize={20} />
          </Button>
        ))}

        {/* change password*/}
        <Modal
          title={<p style={{ marginBottom: "30px", fontSize: "20px", color :"#6C57EC" }}>Change password</p>}
          centered
          open={openChangePassModel}
          onCancel={() => setOpenChangePassModel(false)}
          width={500}
          footer={[]}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleChangePassword}
          >
            <div style={{marginBottom: "16px"}}>
              <label style={{display: "block", marginBottom: "5px" }} className={style.label}>
                Current Password
              </label>
              <Form.Item
                style={{marginBottom: 0}}
                name="currentPass"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter Password"
                  type="password"
                  style={style.input}
                />
              </Form.Item>
              { curPassError && <label style={{display: "block", color: "red"}} htmlFor="error">{curPassError}</label>}
            </div>

            <div style={{marginBottom: "16px"}}>
              <label style={{display: "block", marginBottom: "5px" }} htmlFor="">New Password</label>
              <Form.Item
                name="newPass"
                rules={[
                  {
                    required: true,
                    message: "Please input your new Password!",
                  },
                ]}
                style={{marginBottom: 0}}
              >
                <Input.Password
                  type="password"
                  placeholder="Enter password"
                  style={style.input}
                />
              </Form.Item>
              { newPassError && <label style={{display: "block", color: "red"}} htmlFor="error">{newPassError}</label>}
            </div>

            <div style={{marginBottom: "16px"}}>
              <label style={{display: "block", marginBottom: "5px" }} htmlFor="email" className={style.label}>
                Re-Type Password
              </label>
              <Form.Item
                style={{marginBottom: 0}}
                name="confirmPass"
                rules={[
                  {
                    required: true,
                    message: "Please input your Re-type Password!",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Enter password"
                  style={style.input}
                />
              </Form.Item>
              { conPassError && <label style={{display: "block", color: "red"}} htmlFor="error">{conPassError}</label>}
            </div>


            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <p
                
                style={{ color: "#6C57EC", cursor: "pointer" }}
                onClick={() => (setForgotPassword(true), setOpenChangePassModel(false))}
              >
                Forgot password
              </p>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                style={{
                  height: "45px",
                  fontWeight: "400px",
                  fontSize: "18px",
                  background: "#6C57EC",
                  marginTop: "60px",
                }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* forgot Password */}
        <Modal
          title={
            <Title
              level={2}
              style={{
                color: "#6C57EC",
                fontWeight: "normal",
                marginBottom: "30px",
                textShadow: "#bfbfbf 2px 2px 4px",
              }}
            >
              Forgot Password
            </Title>
          }
          centered
          open={forgotPassword}
          onCancel={() => {
            setForgotPassword(false);
          }}
          width={500}
          footer={[]}
        >
          <div>
            <Paragraph style={{ marginBottom: "30px" }}>
              We'll send a verification code to your email. Check your inbox and
              enter the code here.
            </Paragraph>
              <Input
                  placeholder="Enter Your Email"
                  type="text"
                  style={style.input}
                  onChange={(e)=>setEmail(e.target.value)}
                />

            <Button
              block
              onClick={handleForgotPassword}
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#6C57EC",
                color: "#fff",
                alignSelf: "bottom",
                marginTop: "30px",
                borderColor: "transparent"
              }}
            >
              Continue
            </Button>
          </div>
        </Modal>

        {/* Verify Password */}
        <Modal
          title={
            <Title
              level={2}
              style={{
                color: "#6C57EC",
                fontWeight: "normal",
                marginBottom: "30px",
                textShadow: "#bfbfbf 2px 2px 4px",
              }}
            >
              Verify OTP
            </Title>
          }
          centered
          open={verify}
          onCancel={() => {
            setVerify(false);
          }}
          width={500}
          footer={[]}
        >
          <div>
            <Paragraph style={{ marginBottom: "30px" }}>
              We'll send a verification code to your email. Check your inbox and
              enter the code here.
            </Paragraph>

            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={{
                height: "64px",
                width: "7px",
                borderRadius: "8px",
                marginRight: "16px",
                fontSize: "20px",
                border: "1px solid #000B90",
                color: "#2B2A2A",
                outline: "none",
                margin: "0 auto 10px auto",
                marginBottom: 10
              }}
              renderInput={(props) => <input {...props} />}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Don't received code?</Text>

              <p
                onClick={handleRendEmail}
                className="login-form-forgot"
                style={{ color: "#6C57EC", cursor: "pointer" }}
              >
                Resend
              </p>
            </div>

            <Button
              block
              onClick={ handleOtpVerify}
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#6C57EC",
                color: "#fff",
                alignSelf: "bottom",
                marginTop: "30px",
                borderColor: "transparent"
              }}
            >
              Continue
            </Button>
          </div>
        </Modal>

        {/* Update Password */}
        <Modal
          title={
            <Title
              level={2}
              style={{
                color: "#6C57EC",
                fontWeight: "normal",
                marginBottom: "30px",
                textShadow: "#bfbfbf 2px 2px 4px",
              }}
            >
              Update Password
            </Title>
          }
          centered
          open={updatePassword}
          onCancel={() => {
            setUpdatePassword(false);
          }}
          width={500}
          footer={[]}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleResetPassword}
          >
            <div>
              <label style={{display: "block", marginBottom: "10px"}} htmlFor="">New Password</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter new password!",
                  },
                ]}
              >
                <Input.Password type="text" placeholder="Password" style={style.input} />
              </Form.Item>
            </div>

            <div>
              <label style={{display: "block", marginBottom: "10px"}} htmlFor="">Re-type Password</label>
              <Form.Item
                style={{marginBottom: 0}}
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter confirm Password!",
                  },
                ]}
              >
                <Input.Password
                  type="text"
                  placeholder="Confirm password"
                  style={style.input}
                />
              </Form.Item>
            </div>

            {/* showing error */}
            <label  style={{ color: "red", display: "block" }}>{err}</label>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                style={{
                  height: "45px",
                  fontWeight: "400px",
                  fontSize: "18px",
                  background: "#6C57EC",
                  marginTop: "30px",
                  borderColor: "transparent"
                }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Setting;

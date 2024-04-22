import { Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import logo from "../../Images/Logo.png";
import style from "./Otp.module.css";
import baseURL from "../../../baseURL";
import Swal from "sweetalert2";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text, Link } = Typography;

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();


  const onFinish = async() => {
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
          navigate("/reset-password");
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
  };


  const handleResendEmail = async() => {
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
  };
  return (
    <div style={{width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div className={style.formContainer}>
        <Title
          level={2}
          style={{
            color: "#000B90",
            fontWeight: "normal",
            marginBottom: "10px",
            textShadow: "#bfbfbf 2px 2px 4px",
          }}
        >
          Verify OTP
        </Title>
        <Paragraph style={{ marginBottom: "30px" }}>
          We'll send a verification code to your email. Check your inbox and
          enter the code here.
        </Paragraph>

        <Form>
          <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={{
                height: "64px",
                width: "60px",
                borderRadius: "8px",
                marginRight: "16px",
                fontSize: "20px",
                border: "1px solid #000B90",
                color: "#2B2A2A",
                outline: "none",
                marginBottom: 10
              }}
              renderInput={(props) => <input {...props} />}
            />

          <div className={style.rememberAndPass}>
            <Text>Don't received code?</Text>

            <p
              onClick={handleResendEmail}
              className="login-form-forgot"
              style={{ color: "#000B90", cursor: "pointer" }}
            >
              Resend
            </p>
          </div>

          <Form.Item>
            <Button
              onClick={onFinish}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{
                height: "45px",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#000B90",
                alignSelf: "bottom",
                marginTop: "130px",
              }}
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Otp;

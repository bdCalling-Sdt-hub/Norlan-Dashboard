import { Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import logo from "../../Images/Logo.png";
import style from "./Otp.module.css";
import baseURL from "../../../baseURL";
import Swal from "sweetalert2";
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import { useForgotPasswordMutation, useOtpVerifyMutation } from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";

const { Title, Paragraph, Text } = Typography;

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const {email} = useParams()
  const [otpVerify, {isLoading}] = useOtpVerifyMutation();
  const [forgotPassword] = useForgotPasswordMutation();


  const onFinish = async(values) => {
    try {
      const response = await otpVerify({email: email, otp: values.otp }).unwrap();
      const { status, message } = response;
      
      if (status) {
        toast.success(message);
        navigate(`/reset-password?email=${email}`);
      }

    } catch (error) {
      toast.error(error?.data?.message);
    }
  };


  const handleResendEmail = async() => {
    try {
      const response = await forgotPassword({...values}).unwrap();
      const { status, message } = response;
      
      if (status) {
        toast.success(message);
        navigate(`/otp-verify?email=${values?.email}`);
      }

    } catch (error) {
      toast.error(error?.data?.message);
    }
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

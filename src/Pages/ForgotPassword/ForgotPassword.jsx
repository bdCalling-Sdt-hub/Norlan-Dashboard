import { Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import style from "./Email.module.css";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";

const { Title, Paragraph } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  const onFinish = async(values) => {

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
            textAlign: "center"
          }}
        >
          Email Verification
        </Title>
        <Paragraph style={{ marginBottom: "30px", textAlign: "center", width: "80%", margin: "0 auto" }}>
          We'll send a verification code to your email. Check your inbox and
          enter the code here.
        </Paragraph>

        <Form layout="vertical" onFinish={onFinish}>
          
            <Form.Item
              label={<p className={style.label}>Email</p>}
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email address"
                className={style.input}
              />
            </Form.Item>

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
                background: "#000B90",
                alignSelf: "bottom",
                marginTop: "10px",
              }}
            >
              {isLoading ? "Sending..." : "Send OTP" }
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;

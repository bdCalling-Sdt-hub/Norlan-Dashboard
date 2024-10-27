import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const navigate = useNavigate();


  const onFinish = async(values) => {

        navigate(`/auth/verify-otp?email=${values?.email}`);

  };



  return (
    <div>

        <div className="text-center mb-12">
          <h1 className="text-[25px] font-semibold mb-6">Forgot Password</h1>
          <p className="w-[80%] mx-auto">We'll send a verification code to your email. Check your inbox and
          enter the code here.</p>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          
            <Form.Item
              label={<p>Email</p>}
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
                style={{
                  height: 40,
                  border: "1px solid #d9d9d9",
                  outline: "none",
                  boxShadow: "none"
                }}
              />
            </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              style={{
                width: "100%",
                height: 40,
                border: "1px solid #d9d9d9",
                outline: "none",
                boxShadow: "none",
                background: "#6C57EC",
                color: "white"
              }}
            >
             Send OTP
            </Button>
          </Form.Item>
        </Form>
    </div>
  );
};

export default ForgotPassword;

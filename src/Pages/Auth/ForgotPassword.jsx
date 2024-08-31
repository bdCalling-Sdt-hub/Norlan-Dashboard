import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  const onFinish = async(values) => {

    try {
      const response = await forgotPassword({...values}).unwrap();
      const { status, message } = response;
      
      if (status) {
        toast.success(message);
        navigate(`/auth/verify-otp?email=${values?.email}`);
      }

    } catch (error) {
      toast.error(error?.data?.message);
    }
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
              {isLoading ? "Sending..." : "Send OTP" }
            </Button>
          </Form.Item>
        </Form>
    </div>
  );
};

export default ForgotPassword;

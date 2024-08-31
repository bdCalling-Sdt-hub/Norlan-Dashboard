import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useResetPasswordMutation } from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [resetPassword, {isLoading}] = useResetPasswordMutation();
  const email = new URLSearchParams(location.search).get("email")
  const navigate = useNavigate();


  const onFinish = async(values) => {
    try {
      const response = await resetPassword({...values, email: email}).unwrap();
      const { status, message } = response;
      
      if (status) {
        toast.success(message);
        navigate(`/auth/login`);
      }

    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div>

        <div className="text-center mb-12">
          <h1 className="text-[25px] font-semibold mb-6">Rest Password</h1>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
        >

          <Form.Item
              name="password"
              label={<p>Password</p>}
              rules={[
                {
                  required: true,
                  message: "Please Enter New Password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter New password"
                style={{
                  height: 40,
                  border: "1px solid #d9d9d9",
                  outline: "none",
                  boxShadow: "none"
                }}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<p>Password</p>}
              rules={[
                {
                  required: true,
                  message: "Please Enter Confirm Password!",
                },
              ]}
            >
              <Input.Password
                type="confirmPassword"
                placeholder="Enter Confirm Password password"
                style={{
                  height: 40,
                  border: "1px solid #d9d9d9",
                  outline: "none",
                  boxShadow: "none"
                }}
              />
            </Form.Item>

            <Form.Item style={{marginBottom: 0}}>
            <Button
              htmlType="submit"
              style={{
                width: '100%',
                height: 45,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",
                background: "#6C57EC",
                marginTop: 20
              }}
            >
              {isLoading? "loading..." : "Update"}
            </Button>
          </Form.Item>


         
        </Form>


    </div>
  );
};

export default ResetPassword;

import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const email = new URLSearchParams(location.search).get("email")
  const navigate = useNavigate();

  const onFinish = async(values) => {
        navigate(`/auth/login`);
  };

  return (
    <div>

        <div className="text-center mb-12">
          <h1 className="text-[25px] font-semibold mb-6">Reset Password</h1>
        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
        >

          <Form.Item
              name="password"
              label={<p>New Password</p>}
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
              label={<p>Confirm Password</p>}
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
             Update
            </Button>
          </Form.Item>


         
        </Form>


    </div>
  );
};

export default ResetPassword;

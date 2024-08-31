import { MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useLoginMutation } from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/common/FormItem";
import Cookies from "js-cookie";

const Login = () => {
  const [login, {isLoading}] = useLoginMutation();
  const navigate = useNavigate()


  const onFinish = async(values) => {
    try {
      await login({...values}).unwrap().then(({status, message, token})=>{
        if (status) {
          toast.success(message);
          navigate("/")
          Cookies.set('token', token, { expires: 7 })
          localStorage.setItem("token", JSON.stringify(token))
        }

      })
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
        <div className="text-center mb-12">
          <h1 className="text-[25px] font-semibold mb-6">Login</h1>
          <p>Please enter your email and password to continue</p>
        </div>
        <Form
          onFinish={onFinish}
          layout="vertical"
        >

          <FormItem name={"email"} label={"Email"} />

            <Form.Item
              name="password"
              label={<p>Password</p>}
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter your password"
                style={{
                  height: 40,
                  border: "1px solid #d9d9d9",
                  outline: "none",
                  boxShadow: "none"
                }}
              />
            </Form.Item>

            <div className="flex items-center justify-between">
              <Form.Item style={{marginBottom: 0}} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a
                className="login-form-forgot"
                href="/auth/forgot-password"
              >
                Forgot password
              </a>
          </div>

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
              {isLoading? "loading..." : "Sign in"}
            </Button>
          </Form.Item>

          
        </Form>
    </div>
  );
};

export default Login;

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import style from "./Signin.module.css";
import baseURL from "../../../baseURL";
import Swal from "sweetalert2";

const Signin = () => {
  const onFinish = async(values) => {
    console.log("Received values of form: ", values);
    await baseURL.post(`/auth/login`, values)
    .then((response) => {
      if (response.data.statusCode === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        Swal.fire({
          position: "center",
          icon: "success",
          width: 550,
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
            navigate("/");
            window.location.reload();
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

  const navigate = useNavigate();

  const handleForget = () => {
    navigate("/forget-password");
  };

  return (
    <div style={{width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div className={style.formContainer}>
        <h2
          style={{
            color: "#000B90",
            fontWeight: "normal",
            marginBottom: "30px",
            textShadow: "#bfbfbf 2px 2px 4px",
            textAlign: "center"
          }}
        >
          Log In
        </h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div>
            <label htmlFor="email" className={style.label}>
              Email
            </label>
            <Form.Item
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
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Enter your email address"
                type="email"
                className={style.input}
              />
            </Form.Item>
          </div>

          <div>
            <label htmlFor="email" className={style.label}>
              Password
            </label>
            <Form.Item
              name="password"
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
                className={style.input}
              />
            </Form.Item>
          </div>
          <div className={style.rememberAndPass}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a
              className="login-form-forgot"
              style={{ color: "#000B90" }}
              href=""
              onClick={handleForget}
            >
              Forgot password
            </a>
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
                background: "#000B90",
                marginTop: "40px",
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;

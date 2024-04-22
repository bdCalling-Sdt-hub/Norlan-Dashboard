import { Button, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import logo from "../../Images/Logo.png";
import style from "./Email.module.css";
import baseURL from "../../../baseURL";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text, Link } = Typography;

const Email = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const onFinish = async() => {
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
          Email Verification
        </Title>
        <Paragraph style={{ marginBottom: "30px" }}>
          We'll send a verification code to your email. Check your inbox and
          enter the code here.
        </Paragraph>

        <Form>
          <div>
            <label htmlFor="email" className={style.label}>
              Email
            </label>
            <Form.Item
              style={{marginBottom: 0}}
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
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Form.Item>
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
                marginTop: "30px",
              }}
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Email;

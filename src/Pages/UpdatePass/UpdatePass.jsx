import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import style from "./UpdatePass.module.css";
import baseURL from "../../../baseURL";
import Swal from "sweetalert2";

const UpdatePass = () => {
  const [err, setErr] = useState("");
  const onFinish = async(values) => {
    const { password, confirmPassword } = values;
    const email = JSON.parse(localStorage.getItem("email"));

    if (password !== confirmPassword) {
      setErr("Please enter the same password!");
      return;
    }

    await baseURL.post(`/auth/reset-password`, {email: email, ...values})
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
          navigate("/");
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
        <h1
          style={{
            color: "#000B90",
            fontWeight: "normal",
            marginBottom: "30px",
            textShadow: "#bfbfbf 2px 2px 4px",
          }}
        >
          Update Password
        </h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div>
            <label htmlFor="" className={style.label}>
              New Password
            </label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter new password!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Password"
                className={style.input}
              />
            </Form.Item>
          </div>

          <div>
            <label htmlFor="" className={style.label}>
              Re-type Password
            </label>
            <Form.Item
              style={{marginBottom: 0}}
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter confirm Password!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Confirm password"
                className={style.input}
              />
            </Form.Item>
          </div>

          {/* showing error */}
          <label style={{ color: "red" }}>{err}</label>

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
                marginTop: "100px",
              }}
            >
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePass;

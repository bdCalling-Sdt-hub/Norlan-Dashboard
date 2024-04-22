import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React, { useState } from "react";
import UserInfoTable from "./UserInfoTable";

function UserInfo() {
  const [search, setSearch] = useState("")
  const [keyword, setKeyword] = useState("")
  return (
    <div style={{ padding: "0 60px" }}>
      <Row>
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            fontWeight: "normal",
          }}
        >
          All Artist's info
        </h2>
        <Col lg={{ span: 24 }}>
          <div className="" style={{ display: "flex", gap: "15px" }}>
            <Input
              size="large"
              placeholder="Search by name/email/phone"
              onChange={(e)=>setKeyword(e.target.value)}
              prefix={<SearchOutlined style={{ color: "#cccccc" }} />}
            />
            <Button
              onClick={()=>setSearch(keyword)}
              style={{
                height: "50px",
                width: "300px",
                backgroundColor: "#6C57EC",
                color: "#fff",
                fontSize: "20px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              }}
            >
              Search
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <h2
          style={{ fontSize: "25px", margin: "20px 0 10px 0", fontWeight: "normal" }}
        >
          Artist's information
        </h2>
      </Row>

      <Row>
        <Col lg={{ span: 24 }}>
          <UserInfoTable search={search} />
        </Col>
      </Row>
    </div>
  );
}

export default UserInfo;

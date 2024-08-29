import { Input } from "antd";
import React, { useState } from "react";
import UserInfoTable from "./UserInfoTable";

function UserInfo() {
  const [search, setSearch] = useState("")
  const [keyword, setKeyword] = useState("")
  return (
    <div style={{ background: "white", height: "100%" }}>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 24, justifyContent: "space-between"}}>
        <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>Artist's information</h2>
        <Input
            style={{width: 300, height: 40}}
              placeholder="Search by name/email/phone"
              onChange={(e)=>setKeyword(e.target.value)}
        />
      </div>

      <UserInfoTable search={search} />
    </div>
  );
}

export default UserInfo;

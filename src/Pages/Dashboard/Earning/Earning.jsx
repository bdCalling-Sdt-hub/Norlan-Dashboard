import { Col, Row } from "antd";
import React from "react";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import EarnHistoryTable from "./EarnHistoryTable";
import style from "./Earning.module.css";
import { useLocation } from "react-router-dom";
const Earning = () => {
  const location = useLocation();
  const {pathname} = location;
  return(

  <div style={{ height: "100%", background: "white" }}>
    
    <h2 style={{ fontSize: "22px", marginBottom: 20, fontWeight: "normal" }}>Earnings</h2>

    <div style={{display: "flex", alignItems: "center" , gap: 20}}>
      <div className={style.card}
          style={{
            background: pathname === "/earning/today-income" ? "#eeb5ec" : "#6C57EC"
          }}
        >
          <div>
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2 className={style.cardTitle}>Today’s Income</h2>
            <h2>$ 250.00</h2>
          </div>
        </div>

        <div className={style.card} 
          style={{
            background: pathname === "/earning/weekly-income" ? "#eeb5ec" : "#6C57EC"
          }}
        >
          <div>
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2 className={style.cardTitle}>Weakly Income</h2>
            <h2>$ 250.00</h2>
          </div>
        </div>

        <div className={style.card}
          style={{
            background: pathname === "/earning/monthly-income" ? "#eeb5ec" : "#6C57EC"
          }}
        >
          <div>
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2 className={style.cardTitle}>Monthly Income</h2>
            <h2>$ 250.00</h2>
          </div>
        </div>

    </div>

      <h2 style={{ fontSize: "22px", margin: "16px 0", fontWeight: "normal" }}>
        Transactions History
      </h2>

      <EarnHistoryTable />
  </div>
  )
};

export default Earning;

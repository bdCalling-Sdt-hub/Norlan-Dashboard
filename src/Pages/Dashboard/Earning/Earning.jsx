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
  <div style={{ padding: "0" }}>
    <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>Earnings</h2>
    <Row
      gutter={{
        xs: 8,
        sm: 18,
        md: 24,
        lg: 45,
      }}
      style={{ marginTop: "20px" }}
    >
      <Col className="gutter-row" span={8}>
        <div className={style.card}
          style={{
            background: pathname === "/earning/today-income" ? "#eeb5ec" : "#ffb7d5"
          }}
        >
          <div>
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2 className={style.cardTitle}>Today’s Income</h2>
            <h2>$ 250.00</h2>
          </div>
        </div>
      </Col>

      <Col className="gutter-row" span={8}>
        <div className={style.card} 
          style={{
            background: pathname === "/earning/weekly-income" ? "#eeb5ec" : "#ffb7d5"
          }}
        >
          <div>
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2 className={style.cardTitle}>Weakly Income</h2>
            <h2>$ 250.00</h2>
          </div>
        </div>
      </Col>

      <Col className="gutter-row" span={8}
        
      >
        <div className={style.card}
          style={{
            background: pathname === "/earning/monthly-income" ? "#eeb5ec" : "#ffb7d5"
          }}
        >
          <div>
            <LiaHandHoldingUsdSolid style={{ fontSize: "50px" }} />
            <h2 className={style.cardTitle}>Monthly Income</h2>
            <h2>$ 250.00</h2>
          </div>
        </div>
      </Col>
    </Row>
    <h2 style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}>
      Transactions History
    </h2>

    <EarnHistoryTable />
  </div>
  )
};

export default Earning;

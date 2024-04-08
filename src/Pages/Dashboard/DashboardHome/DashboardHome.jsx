import { Col, Row } from "antd";
import React from "react";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import "./DashboardHome.css";
import InvoiceTable from "./InvoiceTable";
import MostRentCarChart from "./MostRentCarChart";
import DailyRentChart from "./dailyRentChart";


function DashboardHome() {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  return (
    <div>
    <h1 style={{fontSize:"30px",marginBottom:"20px"}}>Dashboard overview</h1>

    
    <Row gutter={16} style={{marginBottom:"20px"}}>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
         <div  className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Today's income</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:".2rem",marginBottom:"15px"}}>$ 250.00</h3>
         </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
         <div className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Weekly income</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",marginBottom:"15px"}}>$ 250.00</h3>
        </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
         <div  className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>Monthly income</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",marginBottom:"15px"}}>$ 250.00</h3>
         </div>
      </Col>
      <Col className="gutter-row" style={{marginBottom:"10px"}} xs={{span:24}} sm={{span:24}} md={{span:12}} lg={{span:6}}>
         <div  className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h1 style={{fontSize:"1.5rem",fontWeight:"300",marginTop:"15px",marginBottom:"15px"}}>All time income</h1>
            <h3 style={{fontSize:"1.5rem",letterSpacing:"1px",marginBottom:"15px"}}>$ 250.00</h3>
        </div>
      </Col>
    </Row>
    

      <Row style={{ marginTop: "20px" }} gutter={24}>
        <Col lg={{ span: 12 }}>
          <DailyRentChart />
        </Col>
        <Col lg={{ span: 12 }}>
          <div
            className=""
            style={{
              border: "3px solid #ffe9f2",
              padding: "30px",
              borderRadius: "15px",
              backgroundColor: "#fff",
            }}
          >
            <h1 style={{ color: "black", textShadow: "#bfbfbf 2px 2px 4px" }}>Artist Percentage by Categories</h1>
            <MostRentCarChart />
          </div>
        </Col>
      </Row>

      <Row>
        <h2
          style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}
        >
          Recent Earnings
        </h2>
      </Row>
      <InvoiceTable />
    </div>
  );
}

export default DashboardHome;

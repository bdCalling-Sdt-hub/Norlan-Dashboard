import { Col, Row } from "antd";
import React from "react";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import "./DashboardHome.css";
import InvoiceTable from "./InvoiceTable";
import { Link } from "react-router-dom";


function DashboardHome() {

  
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  return (
    <div style={{background: "white"}}>
    <h1 style={{fontSize:"30px",marginBottom:"20px"}}>Dashboard overview</h1>

    <div style={{display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", gap: 15}}>

      <div className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h2>Total User</h2>
            <h3>$ 250.00</h3>
        </div>

        <div  className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h2>Total Artist</h2>
            <h3>$ 250.00</h3>
         </div>

         <div  className='income-card'>
            <LiaHandHoldingUsdSolid style={{fontSize:"50px"}}/>
            <h2 >Total Income</h2>
            <h3 >$ 250.00</h3>
        </div>

    </div>

      
        <h2
          style={{ fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "20px 0px", fontWeight: "normal" }}
        >
          Recent Earnings <Link to={"/earnings"} style={{fontSize: 15}}>View all</Link>
        </h2>
      <InvoiceTable />
    </div>
  );
}

export default DashboardHome;

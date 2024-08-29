import { Col, Divider, Pagination, Row } from 'antd'
import React from 'react'
import "./Notification.css"

function Notification() {
  return (
    
    <div style={{height: "100%", background: "white"}}>
      <Row>
          <h2 style={{fontSize: "22px",marginBottom:"30px"}}>
          All Notifications
          </h2>

        {
          [...Array(5).keys()].map((_,index)=>{
            return(
                <Col lg={{span:24}}>
                <div style={{display:"flex",alignItems:"center", gap: 20, borderBottom: "1px solid #d9d9d9", marginBottom: 15, paddingBottom: 8}}>
                    <div className='user-image' >
                          <img 
                            style={{
                              height:"50px",
                              width:"50px",
                              borderRadius:"100%",
                              border:"2px solid gray"
                            }} 
                            src='https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg'/>
                    </div>

                    <div>
                      <p><span>Sanchez haro manuel</span> start a new trip at 5pm. Trip No.56. Trip started from Mexico city.....</p>
                      <p style={{color:"gray",marginTop:"4px"}}>1hr ago</p>
                    </div>
                </div>
                
                </Col>
              
                
            )
          })  
        }
      </Row>

      <Row>
          <Col lg={{span:12}} style={{marginBottom:'20px'}}>
              <h1 style={{fontSize:"17px",color:"#000b90"}}>Showing 1-10 OF 250</h1>
          </Col>
          <Col lg={{span:8,offset:4}}>
            <Pagination defaultCurrent={1} total={5000} showQuickJumper={false} showSizeChanger={false}/>
          </Col>
      </Row>

    </div>
  )
}

export default Notification
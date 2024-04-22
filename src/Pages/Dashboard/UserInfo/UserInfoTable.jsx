import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;
import { CloseOutlined } from '@ant-design/icons';
import { FiEye } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import baseURL from "../../../../baseURL";
import moment from "moment";
import ImgBaseURL from "../../../../ImgBaseURL"

const UserInfoTable = ({search}) =>{
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([])
    console.log(data);


    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [userInfoData, setUserInfoData] = useState(null);
  
    const showDrawer = (record) => {
      setIsDrawerVisible(true);
      console.log(record)
      setUserInfoData(record);
    };
  
    const closeDrawer = () => {
      setIsDrawerVisible(false);
      setInvoiceData(null);
    };


    const columns = [
      {
        title: "ARTIST NAME",
        dataIndex: "name",
        key: "name",
        render: (_,record) => (<p>{record?.fullName}</p>)
      },
      {
        title: "EMAIL",
        dataIndex: "email",
        key: "email",
        responsive: ["md"],
      },
      {
        title: "CONTACT",
        dataIndex: "contact",
        key: "contact",
        responsive: ["lg"],
        render: (_,record) => (<p>{record?.mobileNumber}</p>)
      },
      {
        title: "DATE",
        dataIndex: "joiningdate",
        key: "joiningdate",
        render: (_,record) => (<p>{moment(record?.createdAt).format('L')}</p>)
      },
      {
        title: "GIGS PRICE",
        dataIndex: "trips",
        key: "trips",
        responsive: ["md"],
        render: (_,record) => (<p>{moment}</p>)
      },
      
      {
        title: "ACTIONS",
        dataIndex: "actions",
        key: "actions",
        responsive: ["lg"],
        render: (_,record) => (
          <Button onClick={() => showDrawer(record)} type="text" style={{paddingBottom:"35px"}}>
            <FiEye style={{ fontSize: "30px", color: "#999999" }} />
          </Button>
        ),
      },
    ];

    useEffect(()=>{
      async function getAPI(){
        await baseURL.get(`/auth/get-all-artist?page=${page}&limit=10&keyword=${search}`,{
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
          }
        }).then((response)=>{
          if(response.data.statusCode === 200){
            setPagination(response.data.pagination)
            setData(response.data.data)
          }
        })
      }
      getAPI();
    }, [search]);

    const handlePage=(page)=>{
      setPage(page);
    }

    return(
      <>
        <Table columns={columns} dataSource={data} pagination={{
            pageSize: pagination?.limit,
            showSizeChanger:false,
            total: pagination?.total,
            current: page,
            onChange: handlePage,
          }}/>


          <Drawer
          title={
            <div>
              <Typography>
                <Title level={5} strong>
                  Artist Information
                </Title>
                <Text>See all information about the user</Text>
              </Typography>
            </div>
          }
          placement="right"
          onClose={closeDrawer}
          open={isDrawerVisible}
          width={500}
          closable={false}
          extra={
            <Space>
              <Button style={{borderRadius:"100%",backgroundColor:"white",color:"red",height:"50px",width:"50px",textAlign:"center"}} onClick={closeDrawer}><CloseOutlined /></Button>
             
            </Space>
          }

        >
            <div style={{ display: "flex", gap: "15px" }}>
              <div style={{display: "block", margin: "auto"}}>
                <img width={120} style={{borderRadius: "12px"}} src={`${ImgBaseURL}${userInfoData?.image}`} alt="" />
              </div>
            </div>

            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "15px"}}>
            <div>
                <p style={{paddingBottom: "5px"}}>Artish Name:</p>
                <p style={{paddingBottom: "5px"}}>Email</p>
                <p style={{paddingBottom: "5px"}}>Contact</p>
                <p style={{paddingBottom: "5px"}}>Date</p>
                <p style={{paddingBottom: "5px"}}>GIGS Price</p>
            </div>
            <div>
              <p style={{paddingBottom: "5px", textAlign: "right"}}>{userInfoData?.fullName}</p>
              <p style={{paddingBottom: "5px", textAlign: "right"}}>{userInfoData?.email}</p>
              <p style={{paddingBottom: "5px", textAlign: "right"}}>{userInfoData?.mobileNumber}</p>
              <p style={{paddingBottom: "5px", textAlign: "right"}}>{moment(userInfoData?.createdAt).format('L')}</p>
              <p style={{paddingBottom: "5px", textAlign: "right"}}>{userInfoData?.trips}</p>
            </div>

          </div>
          {userInfoData && <DrawerPage userInfoData={userInfoData} />}
        </Drawer>

        </>
    )

};
export default UserInfoTable;

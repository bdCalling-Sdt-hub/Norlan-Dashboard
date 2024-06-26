import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { LiaSaveSolid } from "react-icons/lia";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;
import {
 
  CloseOutlined,
  
} from '@ant-design/icons';
import { FiEye } from "react-icons/fi";

const data = [
  {
    key: "1",
    invoiceNo: "10",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "2",
    invoiceNo: "11",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "3",
    invoiceNo: "12",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "4",
    invoiceNo: "13",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "5",
    invoiceNo: "14",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "6",
    invoiceNo: "15",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "7",
    invoiceNo: "16",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "8",
    invoiceNo: "17",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "9",
    invoiceNo: "15",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    status: "complete",
    printView: "Button",
  },
  {
    key: "10",
    invoiceNo: "16",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    printView: "Button",
  },
  {
    key: "11",
    invoiceNo: "17",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    printView: "Button",
  },
  {
    key: "12",
    invoiceNo: "15",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    printView: "Button",
  },
  {
    key: "13",
    invoiceNo: "16",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    printView: "Button",
  },
  {
    key: "14",
    invoiceNo: "17",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    printView: "Button",
  },
  {
    key: "15",
    invoiceNo: "15",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    printView: "Button",
  },
  {
    key: "16",
    invoiceNo: "16",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    printView: "Button",
  },
  {
    key: "17",
    invoiceNo: "17",
    time: "18 Jul, 2023  4:30pm",
    username: "Tushar",
    method: "Credit Card",
    amount: "$850.00",
    printView: "Button",
  }
];

const InvoiceTable = () =>{
    const [rentData, setRentData] = useState([]); // Data fetched from the server
    const [totalItems, setTotalItems] = useState(0); // Total number of items
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const pageSize = 12;


    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);
    console.log(invoiceData)
  
    const showDrawer = (record) => {
      setIsDrawerVisible(true);
      setInvoiceData(record);
    };
  
    const closeDrawer = () => {
      setIsDrawerVisible(false);
      setInvoiceData(null);
    };


    const columns = [
      {
        title: "Serial No",
        dataIndex: "invoiceNo",
        key: "invoiceNo",
      },
      {
        title: "TIME",
        dataIndex: "time",
        key: "time",
        responsive: ["md"],
      },
      {
        title: "Artist Name",
        dataIndex: "username",
        key: "username",
        responsive: ["lg"],
      },
      {
        title: "METHOD",
        dataIndex: "method",
        key: "method",
      },
      {
        title: "AMOUNT",
        dataIndex: "amount",
        key: "amount",
        responsive: ["md"],
      },
      
      {
        title: "ACTION",
        dataIndex: "printView",
        key: "printView",
        responsive: ["lg"],
        render: (_,record) => (
          <Button onClick={() => showDrawer(record)} type="text" style={{paddingBottom:"35px"}}>
            <FiEye style={{ fontSize: "30px", color: "#999999" }} />
          </Button>
        ),
      },
    ];



    useEffect(() => {
        // Fetch data from the server when the current page changes
        fetchData();
      }, [currentPage]);
    
      const fetchData = async () => {
        // Replace this with your actual API request to fetch data based on pagination
        try {
          const response = await fetch(`/api/data?page=${currentPage}&pageSize=${pageSize}`);
          const result = await response.json();
    
          setData(result.data);
          setTotalItems(result.totalItems);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    const handlePageChange=(page)=>{
        setCurrentPage(page);
        console.log(currentPage)
    }

    return(
      <>
        <Table columns={columns} dataSource={data} pagination={{
            pageSize,
            showSizeChanger:false,
            total: 20,
            current: currentPage,
            onChange: handlePageChange,
          }}/>
          <Drawer
          
          title={
            <div>
              <Typography>
                <Title level={5} strong>
                  Invoice# {invoiceData?.invoiceNo}
                </Title>
                <Text>See all information about the Earning</Text>
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
          {invoiceData && <DrawerPage invoiceData={invoiceData} />}
        </Drawer>

        </>
    )

};
export default InvoiceTable;

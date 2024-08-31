import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { TbDatabaseDollar } from "react-icons/tb";
import { Modal, Table } from "antd";
import { FiEye } from "react-icons/fi";
import { useEarningsQuery } from "../../redux/apiSlices/earningSlice";
import Cookies from "js-cookie";
import { imageUrl } from "../../redux/api/baseApi";
import moment from "moment";


const Home = ()=>{
    const {data: earnings} = useEarningsQuery({})
    const [invoiceData, setInvoiceData] = useState(null);

    const columns = [
        {
            title: "Serial No",
            dataIndex: "invoiceNo",
            key: "invoiceNo",
            render: (_, _record, index)=> <p>{index + 1}</p>
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
            render: (_, record)=> <div className="flex items-center gap-2">
                <img 
                    src={
                        record?.user?.image?.startsWith("https") ?   record?.user?.image :
                        `${imageUrl}${record?.user?.image}`
                    } 
                    style={{width: 40, height: 40, borderRadius: 8}} 
                />
                <p>{record?.user?.firstName} {" "} {record?.user?.lastName}</p>
            </div>
        },
        {
            title: "Artist Name",
            dataIndex: "username",
            key: "username",
            render: (_, record)=> <div className="flex items-center gap-2">
                <img 
                    src={
                        record?.artist?.image?.startsWith("https") ?   record?.artist?.image :
                        `${imageUrl}${record?.artist?.image}`
                    } 
                    style={{width: 40, height: 40, borderRadius: 8}} 
                />
                <p>{record?.artist?.firstName} {" "} {record?.artist?.lastName}</p>
            </div>
        },
        {
            title: "Status",
            dataIndex: "orderStatus",
            key: "orderStatus",
        },
        {
            title: "AMOUNT",
            dataIndex: "price",
            key: "price",
            render: (_, record)=> <p>$ { record?.price}</p>
        },
        {
            title: "Transaction Id",
            dataIndex: "transactionId",
            key: "transactionId",
        },
        {
            title: "Deal Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_, record)=> <p>{moment(record?.createdAt).format("L")}</p>
        },
        
        {
            title: "ACTION",
            dataIndex: "printView",
            key: "printView",
            render: (_,record) => <FiEye onClick={() => setInvoiceData(record)} className="cursor-pointer" size={24} color="#999999" />
        }
    ]
    

    return (
        <div>

            <div className="grid grid-cols-4 gap-6">
                <div className='bg-[#6C57EC] rounded-lg py-7'>
                    <FaUserGroup color="white" className="mx-auto" size={40} />
                    <h2 className="text-center text-[24px] text-white py-2">Total User</h2>
                    <h3 className="text-center text-white text-[18px]">$ {earnings?.data?.overview?.totalUsers}</h3>
                </div>

                <div className='bg-[#6C57EC] rounded-lg py-7'>
                    <HiUserGroup color="white" className="mx-auto" size={40} />
                    <h2 className="text-center text-[24px] text-white py-2">Total Artist</h2>
                    <h3 className="text-center text-white text-[18px]">$ {earnings?.data?.overview?.totalArtists}</h3>
                </div>
                
                <div className='bg-[#6C57EC] rounded-lg py-7'>
                    <TbDatabaseDollar color="white" className="mx-auto" size={40} />
                    <h2 className="text-center text-[24px] text-white py-2">Total Income</h2>
                    <h3 className="text-center text-white text-[18px]">$ {earnings?.data?.overview?.totalIncomes}</h3>
                </div>

                <div className='bg-[#6C57EC] rounded-lg py-7'>
                    <TbDatabaseDollar color="white" className="mx-auto" size={40} />
                    <h2 className="text-center text-[24px] text-white py-2">Total Transactions</h2>
                    <h3 className="text-center text-white text-[18px]">$ {earnings?.data?.overview?.totalTransactions}</h3>
                </div>
            </div>

            <div className="flex items-center justify-between my-5">
                <h1 className="text-[24px]">Recent Earnings </h1>
                <Link to={"/earnings"} className="block hover:text-text-[#6C57EC] text-[16px] underline">View all</Link>
            </div>
            <Table columns={columns} dataSource={earnings?.data?.data?.slice(0,7)} pagination={false}/>

            <Modal
                open={invoiceData}
                onCancel={()=>setInvoiceData(null)}
                onClose={()=>setInvoiceData(null)}
                footer={false}
                title="Deal Details"
            >
                <div className='mt-6'>
                    
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "15px"}}>
                        <div className="grid grid-cols-1 gap-[5px]">
                            <p>User Name:</p>
                            <p>Artist Name:</p>
                            <p>Amount</p>
                            <p>Status</p>
                            <p>Service Name</p>
                            <p>Total Service</p>
                            <p>Event Date</p>
                            <p>Deal Date</p>
                            <p>Transaction ID</p>
                        </div>

                        <div className="grid grid-cols-1 gap-[5px]">
                            <p className="text-right">{invoiceData?.user?.firstName} {" "} {invoiceData?.user?.lastName} </p>
                            <p className="text-right">{invoiceData?.artist?.firstName} {" "} {invoiceData?.artist?.lastName} </p>
                            <p className="text-right">{invoiceData?.price}</p>
                            <p className="text-right">{invoiceData?.orderStatus}</p>
                            <p className="text-right">{invoiceData?.service_name}</p>
                            <p className="text-right">{invoiceData?.total_service}</p>
                            <p className="text-right">{invoiceData?.event_date}</p>
                            <p className="text-right">{moment(invoiceData?.createdAt).format("L")}</p>
                            <p className="text-right">{invoiceData?.transactionId}</p>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Home;
import React, { useState, PureComponent, useContext, useEffect } from "react";
import DashboardBoxes from "../../Components/DashboardBoxes";
import { FaPlus } from "react-icons/fa6";
import { Button, Pagination } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "../../Components/Badge";
import { FaAngleUp } from "react-icons/fa6";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { MyContext } from '../../App';
import SearchBox from "../../Components/SearchBox";
import { fetchDataFromApi } from "../../utils/api";
import Products from "../Products";


const Dashboard = () => {
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const [productCat, setProductCat] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const [chartData, setChartData] = useState([]);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());

  const [productData, setProductData] = useState([]);
  const [productTotalData, setProductTotalData] = useState([]);

  const [ordersData, setOrdersData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pageOrder, setPageOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");

  const [totalOrdersData, setTotalOrdersData] = useState([]);

  const [users, setUsers] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [ordersCount, setOrdersCount] = useState(null);

  const context = useContext(MyContext);


    useEffect(() => {
      context?.setProgress(30);
        getProducts(page, rowsPerPage);
    }, [])


  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };


  useEffect(() => {


    fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=5`).then((res) => {
      if (res?.error === false) {
        setOrdersData(res?.data)
      }
    })
    fetchDataFromApi(`/api/order/order-list`).then((res) => {
      if (res?.error === false) {
        setTotalOrdersData(res)
      }
    })
    fetchDataFromApi(`/api/order/count`).then((res) => {
      if (res?.error === false) {
        setOrdersCount(res?.count)
      }
    })
  }, [pageOrder])


  useEffect(() => {

    // Filter orders based on search query
    if (orderSearchQuery !== "") {
      const filteredOrders = totalOrdersData?.data?.filter((order) =>
        order._id?.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        order?.userId?.name.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        order?.userId?.email.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        order?.createdAt.includes(orderSearchQuery)
      );
      setOrdersData(filteredOrders)
    } else {
      fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=5`).then((res) => {
        if (res?.error === false) {
          setOrders(res)
          setOrdersData(res?.data)
        }
      })
    }
  }, [orderSearchQuery])



  useEffect(() => {
    getTotalSalesByYear();

    fetchDataFromApi("/api/user/getAllUsers").then((res) => {
      if (res?.error === false) {
        setUsers(res?.users)
      }
    })

    fetchDataFromApi("/api/user/getAllReviews").then((res) => {
      if (res?.error === false) {
        setAllReviews(res?.reviews)
      }
    })

  }, [])



  const getProducts = async (page, limit) => {
         fetchDataFromApi(`/api/product/getAllProducts?page=${page + 1}&limit=${limit}`).then((res) => {
             setProductData(res)
             setProductTotalData(res)
             context?.setProgress(100);
         })
     }


  const loadDashboardChartData = () => {
    Promise.all([
      fetchDataFromApi(`/api/order/sales`),
      fetchDataFromApi(`/api/order/users`)
    ]).then(([salesRes, usersRes]) => {
      if (salesRes?.totalSales) {
        setTotalSalesAmount(salesRes.totalSales);
      }

      const salesList = salesRes?.monthlySales || [];
      const usersList = usersRes?.TotalUsers || [];
      const months = ['JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

      const combined = months.map((m, idx) => {
        const salesObj = salesList.find(item => item?.name === m) || salesList[idx];
        const usersObj = usersList.find(item => item?.name === m) || usersList[idx];

        return {
          name: m,
          TotalSales: parseInt(salesObj?.TotalSales || 0) || 0,
          TotalUsers: parseInt(usersObj?.TotalUsers || 0) || 0
        };
      });

      setChartData(combined);
    });
  };

  const getTotalUsersByYear = () => {
    loadDashboardChartData();
  }

  const getTotalSalesByYear = () => {
    loadDashboardChartData();
  }



  return (
    <>
      <div className="w-full py-4 lg:py-1 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="text-[26px] lg:text-[35px] font-bold leading-8 lg:leading-10 mb-3">
            Welcome,
            <br />
            <span className="text-primary">{context?.userData?.name}</span>
          </h1>
          <p>
            Here’s What happening on your store today. See the statistics at
            once.
          </p>
          <br />
          <Button className="btn-blue btn !capitalize" onClick={() => context.setIsOpenFullScreenPanel({
            open: true,
            model: "Add Product"
          })}>
            <FaPlus /> Add Product
          </Button>
        </div>

        <img src="/shop-illustration.webp" className="w-[250px] hidden lg:block" />
      </div>

      <DashboardBoxes 
        orders={ordersCount || 0} 
        products={productData?.products?.length || 0} 
        users={users?.length || 0} 
        reviews={allReviews?.length || 0} 
        category={context?.catData?.length || 0} 
        totalSales={totalSalesAmount || 0}
      />

      <Products/>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 px-5 py-5 flex-col sm:flex-row">
          <h2 className="text-[18px] font-[600] text-left mb-2 lg:mb-0">Recent Orders</h2>
          <div className="ml-auto w-full">
            <SearchBox
              searchQuery={orderSearchQuery}
              setSearchQuery={setOrderSearchQuery}

              setPageOrder={setPageOrder}
            />
          </div>
        </div>

        <div className="relative overflow-x-auto mt-0">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  &nbsp;
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Paymant Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>

              {
                ordersData?.length !== 0 && ordersData?.map((order, index) => {
                  return (
                    <>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-[500]">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                            onClick={() => isShowOrderdProduct(index)}
                          >
                            {
                              isOpenOrderdProduct === index ? <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" /> : <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                            }

                          </Button>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary">
                            {order?._id}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary whitespace-nowrap text-[13px]">{order?.paymentId ? order?.paymentId : 'CASH ON DELIVERY'}</span>
                        </td>

                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          {order?.userId?.name}
                        </td>

                        <td className="px-6 py-4 font-[500]">{order?.delivery_address?.mobile}</td>

                        <td className="px-6 py-4 font-[500]">
                          <span className='inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md'>{order?.delivery_address?.addressType}</span>
                          <span className="block w-[400px]">
                            {order?.delivery_address?.
                              address_line1 + " " +
                              order?.delivery_address?.city + " " +
                              order?.delivery_address?.landmark + " " +
                              order?.delivery_address?.state + " " +
                              order?.delivery_address?.country + ' ' + order?.delivery_address?.mobile
                            }
                          </span>
                        </td>

                        <td className="px-6 py-4 font-[500]">{order?.delivery_address?.pincode}</td>

                        <td className="px-6 py-4 font-[500]">{order?.totalAmt}</td>

                        <td className="px-6 py-4 font-[500]">
                          {order?.userId?.email}
                        </td>

                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary">
                            {order?.userId?._id}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-[500]">
                          <Badge status={order?.order_status} />
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          {order?.createdAt?.split("T")[0]}
                        </td>
                      </tr>

                      {isOpenOrderdProduct === index && (
                        <tr>
                          <td className="pl-20" colSpan="6">
                            <div className="relative overflow-x-auto">
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Product Id
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Product Title
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Image
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Quantity
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Price
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 whitespace-nowrap"
                                    >
                                      Sub Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    order?.products?.map((item, index) => {
                                      return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                          <td className="px-6 py-4 font-[500]">
                                            <span className="text-gray-600">
                                              {item?._id}
                                            </span>
                                          </td>
                                          <td className="px-6 py-4 font-[500]">
                                            <div className="w-[200px]">
                                              {item?.productTitle}
                                            </div>
                                          </td>

                                          <td className="px-6 py-4 font-[500]">
                                            <img
                                              src={item?.image}
                                              className="w-[40px] h-[40px] object-cover rounded-md"
                                            />
                                          </td>

                                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                            {item?.quantity}
                                          </td>

                                          <td className="px-6 py-4 font-[500]">฿{item?.price?.toLocaleString()}</td>

                                          <td className="px-6 py-4 font-[500]">฿{(item?.price * item?.quantity)?.toLocaleString()}</td>
                                        </tr>
                                      )
                                    })
                                  }


                                  <tr>
                                    <td
                                      className="bg-[#f1f1f1]"
                                      colSpan="12"
                                    ></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })

              }

            </tbody>
          </table>
        </div>


        {
          orders?.totalPages > 1 &&
          <div className="flex items-center justify-center mt-10 pb-5">
            <Pagination
              showFirstButton showLastButton
              count={orders?.totalPages}
              page={pageOrder}
              onChange={(e, value) => setPageOrder(value)}
            />
          </div>
        }

      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-4">
        {/* Left Chart Card: Total Sales */}
        <div className="card shadow-md sm:rounded-lg bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[18px] font-[600] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-600 inline-block"></span>
                Total Sales
              </h2>
              <p className="text-[13px] text-gray-500">รายงานสรุปยอดขายรายเดือน (บาท)</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-[13px] font-bold rounded-full">
              ยอดขายรวม: ฿{(totalSalesAmount || 0).toLocaleString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            {chartData?.length !== 0 && (
              <BarChart
                width={context?.windowWidth > 1200 ? (context?.windowWidth - 450) / 2 : 500}
                height={350}
                data={chartData}
                margin={{ top: 25, right: 10, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#071739", color: "#ffffff", borderRadius: "8px", border: "none" }}
                  itemStyle={{ color: "#ffffff" }}
                  labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Bar dataKey="TotalSales" fill="#16a34a" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="TotalSales" position="top" style={{ fill: "#1f2937", fontWeight: "bold", fontSize: 13 }} formatter={(val) => val > 0 ? `฿${val}` : ''} />
                </Bar>
              </BarChart>
            )}
          </div>
        </div>

        {/* Right Chart Card: Total Users */}
        <div className="card shadow-md sm:rounded-lg bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[18px] font-[600] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                Total Users
              </h2>
              <p className="text-[13px] text-gray-500">รายงานสรุปผู้ใช้งานใหม่รายเดือน (คน)</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[13px] font-bold rounded-full">
              ผู้ใช้ทั้งหมด: {users?.length || 0} คน
            </span>
          </div>

          <div className="overflow-x-auto">
            {chartData?.length !== 0 && (
              <BarChart
                width={context?.windowWidth > 1200 ? (context?.windowWidth - 450) / 2 : 500}
                height={350}
                data={chartData}
                margin={{ top: 25, right: 10, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#071739", color: "#ffffff", borderRadius: "8px", border: "none" }}
                  itemStyle={{ color: "#ffffff" }}
                  labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Bar dataKey="TotalUsers" fill="#0858f7" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="TotalUsers" position="top" style={{ fill: "#1f2937", fontWeight: "bold", fontSize: 13 }} formatter={(val) => val > 0 ? `${val} คน` : ''} />
                </Bar>
              </BarChart>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

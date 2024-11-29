import React, { FC, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { KTIcon } from "../../../_metronic/helpers";
import { PageTitle } from "../../../_metronic/layout/core";
import { postRequest } from "../../modules/auth/core/_requests";
import { stringToDate } from "../../../common/Date";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { DataGrid } from "@mui/x-data-grid";
import "../../../../src/_metronic/assets/sass/components/AgentList.scss";

interface Order {
  _id: string;
  orderDate: string;
  orderNo: string;
  customerId: {
    firstName: string;
    lastName: string;
  };
  companyId: {
    companyName: string;
  };
  itemList: any[]; // Adjust the type according to your item structure
  orderMode: string;
  isHomePickup: boolean;
  isHomeDelivery: boolean;
  paymentStatus: string;
  orderStatus: string;
}

interface OrderRow {
  id: string;
  orderDate: Date; // Adjust to the correct type
  orderNo: string;
  customerInfo: string;
  companyName: string;
  noOfItems: number;
  orderMode: string;
  isHomePickup: string;
  isHomeDelivery: string;
  paymentStatus: string;
  orderStatus: string;
}

const AgentOrders: FC = () => {
  const [rowData, setRowData] = useState<OrderRow[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const { agentId } = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    setLoading(true);
    const orderData = await postRequest(
      `/agent/orders/${agentId}?pageIndex=${page}&pageSize=${pageSize}`,
      ``
    );

    if (orderData?.data?.status === "ok") {
      const orderRows = orderData.data.data.map((order: Order) => ({
        id: order._id,
        orderDate: stringToDate(order.orderDate),
        orderNo: order.orderNo,
        customerInfo: `${order.customerId.firstName} ${order.customerId.lastName}`,
        companyName: order.companyId.companyName,
        noOfItems: order.itemList.length,
        orderMode: order.orderMode,
        isHomePickup: order.isHomePickup ? "YES" : "NO",
        isHomeDelivery: order.isHomeDelivery ? "YES" : "NO",
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
      }));
      setRowData(orderRows);
      setTotal(orderData.data.totalCount);
    } else {
      setRowData([]);
      setTotal(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  const columns = [
    { field: "orderDate", headerName: "Order Date", width: 150 },
    { field: "orderNo", headerName: "Order No", width: 250 },
    { field: "customerInfo", headerName: "Customer Info", width: 200 },
    { field: "companyName", headerName: "Agent Company", width: 200 },
    { field: "noOfItems", headerName: "No Of Items", width: 150 },
    { field: "orderMode", headerName: "Booked Via", width: 150 },
    { field: "isHomePickup", headerName: "PickUp Request", width: 150 },
    { field: "isHomeDelivery", headerName: "Delivery Request", width: 150 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params: any) => (
        <Link to={`/customer/orderPaymentStatus/${params.row.id}`}>
          <span className="badge badge-primary fs-8 fw-bold">
            {params.row.paymentStatus}
          </span>
        </Link>
      ),
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 150,

      renderCell: (params: any) => (
        <Link to={`/customer/orderStatus/${params.row.id}`}>
          <span className="badge badge-primary fs-8 fw-bold">
            {params.value}
          </span>
        </Link>
      ),
    },
    {
      field: "OrderDetails",
      headerName: "Order Details",
      width: 150,
      renderCell: (params: any) => (
          <Link to={`/customer/order/${params.row.id}`}>
          View
        </Link>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "statusUpdate") {
                navigate(`/customer/orderStatusUpdate/${params.row.id}`);
              } else if (selectedValue === "paymentUpdate") {
                navigate(
                  `/updatePayment/${params.row.id}/${params.row.companyId?._id}`
                );
              }
              e.target.value = "";
            }}
            defaultValue=""
          >
            <option value="" disabled>
              ...
            </option>
            <option value="statusUpdate">Status Update</option>
            <option value="paymentUpdate">Payment Update</option>
          </select>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageTitle>ORDERS</PageTitle>
      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">Orders</span>
            </h3>
          </div>
          <div className="card-body">
            {loading ? (
              <div
                className="text-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <Lottie
                  animationData={loaderAnimation}
                  loop={true}
                  style={{
                    width: 150,
                    height: 150,
                    filter: "hue-rotate(200deg)",
                  }}
                />
              </div>
            ) : (
              <div>
                <DataGrid
                  rows={rowData}
                  columns={columns}
                  pagination
                  hideFooter={true}
                  rowCount={total}
                  autoHeight={true}
                  getRowId={(row) => row.id}
                  sx={{
                    "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus":
                      {
                        outline: "none",
                        border: "none", // Removes any border
                        backgroundColor: "transparent", // Ensure no background color change on focus
                      },
                    "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible":
                      {
                        outline: "none",
                        border: "none", // Removes any border
                        backgroundColor: "transparent", // Ensure no background color change on focus
                      },

                    "& .MuiDataGrid-cell:active": {
                      outline: "none", // Remove outline on active state
                      border: "none", // Remove border on active state
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentOrders;

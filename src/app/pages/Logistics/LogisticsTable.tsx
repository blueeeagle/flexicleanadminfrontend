import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FaTruck, FaCheck, FaCircle } from "react-icons/fa";
import { Button, Col, Container, Row } from "react-bootstrap";

// Define the interfaces for the data structure
interface CustomerInfo {
  name: string;
  email: string;
  mobile: string;
}

interface AgentCompany {
  name: string;
  email: string;
  mobile: string;
}

interface RowData {
  id: number; 
  orderDate: string;
  orderNo: string;
  customerInfo: CustomerInfo;
  agentCompany: AgentCompany;
  numberOfItems: number;
  bookedVia: string;
  pickUpRequest: boolean;
  deliveryRequest: boolean;
  paymentStatus: string;
  orderStatus: string;
  orderDetails: string;
}

// Sample data
const rows: RowData[] = [
  {
    id: 1,
    orderDate: "2023-12-31",
    orderNo: "ORD001",
    customerInfo: {
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: "1234567890",
    },
    agentCompany: {
      name: "Acme Corp",
      email: "acme@example.com",
      mobile: "9876543210",
    },
    numberOfItems: 3,
    bookedVia: "POS",
    pickUpRequest: true,
    deliveryRequest: true,
    paymentStatus: "Success",
    orderStatus: "Booked",
    orderDetails: "Additional notes about the order",
  },
  {
    id: 2,
    orderDate: "2024-01-05",
    orderNo: "ORD002",
    customerInfo: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      mobile: "2345678901",
    },
    agentCompany: {
      name: "Global Inc",
      email: "global@example.com",
      mobile: "8765432109",
    },
    numberOfItems: 2,
    bookedVia: "Online",
    pickUpRequest: false,
    deliveryRequest: true,
    paymentStatus: "Pending",
    orderStatus: "Confirmed",
    orderDetails: "Please deliver by end of the day",
  },
  {
    id: 3,
    orderDate: "2024-02-10",
    orderNo: "ORD003",
    customerInfo: {
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      mobile: "3456789012",
    },
    agentCompany: {
      name: "Logistics Ltd",
      email: "logistics@example.com",
      mobile: "7654321098",
    },
    numberOfItems: 5,
    bookedVia: "Phone",
    pickUpRequest: true,
    deliveryRequest: false,
    paymentStatus: "Success",
    orderStatus: "Shipped",
    orderDetails: "Handle with care",
  },
  {
    id: 4,
    orderDate: "2024-03-15",
    orderNo: "ORD004",
    customerInfo: {
      name: "Bob Williams",
      email: "bobwilliams@example.com",
      mobile: "4567890123",
    },
    agentCompany: {
      name: "Express Delivery",
      email: "express@example.com",
      mobile: "6543210987",
    },
    numberOfItems: 4,
    bookedVia: "Website",
    pickUpRequest: true,
    deliveryRequest: true,
    paymentStatus: "Refunded",
    orderStatus: "Returned",
    orderDetails: "Product was damaged",
  },
  {
    id: 5,
    orderDate: "2024-04-20",
    orderNo: "ORD005",
    customerInfo: {
      name: "Charlie Brown",
      email: "charliebrown@example.com",
      mobile: "5678901234",
    },
    agentCompany: {
      name: "FastTrack Shipping",
      email: "fasttrack@example.com",
      mobile: "5432109876",
    },
    numberOfItems: 1,
    bookedVia: "In-store",
    pickUpRequest: false,
    deliveryRequest: true,
    paymentStatus: "Pending",
    orderStatus: "Delivered",
    orderDetails: "Customer requested evening delivery",
  },
];


const columns: GridColDef[] = [
  { field: "orderDate", headerName: "Order Date", width: 150 },
  { field: "orderNo", headerName: "Order No", width: 150 },
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 200,
    renderCell: (params) => params.row.customerInfo.name,
  },
  {
    field: "customerEmail",
    headerName: "Customer Email",
    width: 250,
    renderCell: (params) => params.row.customerInfo.email,
  },
  {
    field: "customerMobile",
    headerName: "Customer Mobile",
    width: 150,
    renderCell: (params) => params.row.customerInfo.mobile,
  },
  {
    field: "agentName",
    headerName: "Agent Company",
    width: 200,
    renderCell: (params) => params.row.agentCompany.name,
  },
  {
    field: "agentEmail",
    headerName: "Agent Email",
    width: 250,
    renderCell: (params) => params.row.agentCompany.email,
  },
  {
    field: "agentMobile",
    headerName: "Agent Mobile",
    width: 150,
    renderCell: (params) => params.row.agentCompany.mobile,
  },
  { field: "numberOfItems", headerName: "Number of Items", width: 150 },
  { field: "bookedVia", headerName: "Booked Via", width: 150 },
  {
    field: "pickUpRequest",
    headerName: "Pick Up Request",
    width: 150,
    renderCell: (params) => (
      <>
        {params.value ? (
          <>
            <Button
              variant="link"
              className="van-icon d-flex align-items-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
                alt="Pick Up"
                style={{
                  width: "40px",
                  filter:
                    "invert(27%) sepia(64%) saturate(5000%) hue-rotate(185deg) brightness(95%) contrast(90%)",
                }}
              />
            </Button>{" "}
            Yes
          </>
        ) : (
          "No"
        )}
      </>
    ),
  },
  {
    field: "deliveryRequest",
    headerName: "Delivery Request",
    width: 150,
    renderCell: (params) => (
      <>
        {params.value ? (
          <>
            <Button
              variant="link"
              className="van-icon d-flex align-items-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
                alt="Delivery"
                style={{
                  width: "40px",
                  filter:
                    "invert(39%) sepia(92%) saturate(7500%) hue-rotate(63deg) brightness(95%) contrast(101%)",
                }}
              />
            </Button>{" "}
            Yes
          </>
        ) : (
          "No"
        )}
      </>
    ),
  },
  {
    field: "paymentStatus",
    headerName: "Payment Status",
    width: 200,
    renderCell: (params) => {
      let icon;
      let text;

      switch (params.value) {
        case "Success":
          icon = <FaCheck style={{ color: "green",width:"20px", marginRight: 8,}} />;
          text = "Success";
          break;
        case "Pending":
          icon = <FaCheck style={{ color: "yellow",width:"20px", marginRight: 8,}} />;
          text = "Pending";
          break;
        case "Refunded":
          icon = <FaCheck style={{ color: "red",width:"20px", marginRight: 8}} />;
          text = "Refunded";
          break;
        default:
          icon = <FaCircle style={{ color: "gray", marginRight: 8 }} />;
          text = params.value;
      }

      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          {icon}
          <span>{text}</span>
        </div>
      );
    },
  },
  { field: "orderStatus", headerName: "Order Status", width: 150 },
  {
    field: "orderDetails",
    headerName: "Order Details",
    width: 150,
    renderCell: () => <button className="custom-button">View</button>,
  },
];

const LogisticsTable: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
        <div className="transactions-container">
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
          checkboxSelection
        />
      </div>
    </div>
        </Col>
      </Row>
    </Container>
  
  );
};

export default LogisticsTable;

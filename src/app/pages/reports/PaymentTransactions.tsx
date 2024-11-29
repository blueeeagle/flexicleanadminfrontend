import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Row, Col, Nav, Tab, Container } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { FaCheckCircle } from "react-icons/fa";
import "../../../../src/_metronic/assets/sass/components/Payment.scss";
import PaymentTable from "./Payment/PaymentTable";
import Chart from "./Payment/Chart";
import DateRangePicker from "./Payment/DateRangePicker";
import ReportList from "./Payment/ReportList";

type MonthlyData = {
  [key: string]: number;
};

const initialLogisticsData: MonthlyData = {
  January: 30,
  February: 45,
  March: 28,
  April: 60,
  May: 40,
  June: 55,
  July: 70,
  August: 65,
  September: 50,
  October: 75,
  November: 60,
  December: 80,
};

const paymentAmounts: MonthlyData = {
  January: 20,
  February: 35,
  March: 22,
  April: 50,
  May: 30,
  June: 45,
  July: 60,
  August: 55,
  September: 40,
  October: 65,
  November: 50,
  December: 70,
};

const additionalDataset: MonthlyData = {
  January: 25,
  February: 30,
  March: 35,
  April: 40,
  May: 45,
  June: 50,
  July: 55,
  August: 60,
  September: 65,
  October: 70,
  November: 75,
  December: 80,
};

const PaymentTransactions: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleLegendClick = (e: any) => {
    const { dataKey } = e;
    setSelectedLine((prev) => (prev === dataKey ? null : dataKey));
  };

  const getTotal = (data: MonthlyData) =>
    Object.values(data).reduce((sum, value) => sum + value, 0);

  const monthToIndex = (month: string) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.indexOf(month);
  };

  const filteredData = useMemo(() => {
    const filterData = (data: MonthlyData) => {
      const filtered: MonthlyData = {};
      Object.keys(data).forEach((key) => {
        const monthIndex = monthToIndex(key);
        if (
          (!startDate && !endDate) ||
          (startDate &&
            endDate &&
            monthIndex >= startDate.getMonth() &&
            monthIndex <= endDate.getMonth())
        ) {
          filtered[key] = data[key];
        } else {
          filtered[key] = 0;
        }
      });
      return filtered;
    };

    return {
      Subscription: filterData(paymentAmounts),
      Logistics: filterData(initialLogisticsData),
      Additional: filterData(additionalDataset),
    };
  }, [startDate, endDate]);

  const chartData = Object.keys(filteredData.Subscription).map((month) => ({
    month,
    Subscription: filteredData.Subscription[month],
    Logistics: filteredData.Logistics[month],
    Additional: filteredData.Additional[month],
  }));

  const paymentRows = [
    {
      id: 1,
      transactionDate: "2023-08-01",
      transactionId: "TXN12345",
      customerName: "John Doe",
      amount: 250.5,
      paymentMethod: "Credit Card",
      paymentStatus: "Success",
      transactionDetails: "Some details here",
    },
    {
      id: 2,
      transactionDate: "2023-08-02",
      transactionId: "TXN12346",
      customerName: "Jane Smith",
      amount: 120.75,
      paymentMethod: "PayPal",
      paymentStatus: "Success",
      transactionDetails: "Another set of details",
    },
    {
      id: 3,
      transactionDate: "2023-08-03",
      transactionId: "TXN12347",
      customerName: "Alice Johnson",
      amount: 75.0,
      paymentMethod: "Bank Transfer",
      paymentStatus: "Failed",
      transactionDetails: "Transaction failed due to insufficient funds",
    },
    {
      id: 4,
      transactionDate: "2023-08-04",
      transactionId: "TXN12348",
      customerName: "Bob Brown",
      amount: 310.2,
      paymentMethod: "Credit Card",
      paymentStatus: "Success",
      transactionDetails: "Payment for subscription renewal",
    },
    {
      id: 5,
      transactionDate: "2023-08-05",
      transactionId: "TXN12349",
      customerName: "Carol White",
      amount: 500.0,
      paymentMethod: "Debit Card",
      paymentStatus: "Pending",
      transactionDetails: "Pending approval from bank",
    },
  ];

  const paymentColumns: GridColDef[] = [
    { field: "transactionDate", headerName: "Date", width: 150 },
    { field: "transactionId", headerName: "Transaction ID", width: 150 },
    { field: "customerName", headerName: "Subscribed By", width: 200 },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    { field: "paymentMethod", headerName: "Payment Method", width: 200 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaCheckCircle
            style={{ color: params.value === "Success" ? 'green' : 'red', marginRight: '8px' }}
          />
          {params.value}
        </div>
      ),
    },
    {
      field: "transactionDetails",
      headerName: "Transaction Details",
      width: 250,
    },
  ];

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="mb-4">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            handleDateChange={handleDateChange}
          />
        </Col>
      </Row>
      <Row className="p-3">
        <Col md={7} className="chart-container border shadow-sm rounded px-5">
          <Chart
            chartData={chartData}
            selectedLine={selectedLine}
            handleLegendClick={handleLegendClick}
          />
        </Col>
        <Col md={5}>
          <ReportList
            filteredData={filteredData}
            getTotal={getTotal}
            setSelectedLine={setSelectedLine}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Tab.Container id="left-tabs-example" defaultActiveKey="subscription">
            <Nav variant="tabs" className="border-0">
              <Nav.Item>
                <Nav.Link eventKey="subscription" className="border-0">
                  Subscription
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="credits" className="border-0">
                  Credits
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="subscription">
                <PaymentTable
                  paymentRows={paymentRows}
                  paymentColumns={paymentColumns}
                  paginationModel={paginationModel}
                  setPaginationModel={setPaginationModel}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="credits">
                <PaymentTable
                  paymentRows={paymentRows}
                  paymentColumns={paymentColumns}
                  paginationModel={paginationModel}
                  setPaginationModel={setPaginationModel}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentTransactions;

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../../../src/_metronic/assets/sass/components/Logistics.scss";
import FilterSection from "./FilterSection";
import LogisticsItem from "./LogisticsItem";
import ItemList from "./ItemList";
import PaginationSection from "./PaginationSection";
import FilterSectionRight from "./FilterSectionRight";
import LogisticsTable from "./LogisticsTable";
import IconLogistics from "./IconLogistics";
import DatePickerSection from "./DatePickerSectionProps";
import { PageTitle } from "../../../_metronic/layout/core";

const ITEMS_PER_PAGE = 3;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Logistics: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Post[]>([]);
  const [editMode, setEditMode] = useState<{
    id: number | null;
    title: string;
    body: string;
  }>({
    id: null,
    title: "",
    body: "",
  });

  const items = [
    {
      driverName: "John Doe",
      customerName: "Jane Smith",
      number: 12,
      color: "red",
    },
    {
      driverName: "Alice Brown",
      customerName: "Bob Johnson",
      number: 15,
      color: "yellow",
    },
    {
      driverName: "Charlie Green",
      customerName: "Dana White",
      number: 10,
      color: "lightgreen",
    },
  ];

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Container fluid>
      <Row className="logistics-row">
        <Col md={8} className="logistics-content">
          <PageTitle>ACTIVITY LOG</PageTitle>

          <DatePickerSection
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            isAssigned={isAssigned}
            setIsAssigned={setIsAssigned}
          />
          <FilterSection />

          <LogisticsItem
            orderNo="Order No"
            dateReceived="mm/dd/yyyy"
            customerName="Customer Name / Email"
            color="red"
            status="Pickup"
          />
          <LogisticsItem
            orderNo="Order No"
            dateReceived="mm/dd/yyyy"
            customerName="Customer Name / Email"
            color="yellow"
            status="Delivery"
          />
          <LogisticsItem
            orderNo="Order No"
            dateReceived="mm/dd/yyyy"
            customerName="Customer Name / Email"
            color="lightgreen"
            status="Delivered"
          />
        </Col>

        <Col md={4} className="logistics-right-column mt-5">
          <FilterSectionRight />
          <ItemList paginatedItems={paginatedItems} />
          <PaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
          <div className="button-container">
            <button className="p-3 custom-button">Assign</button>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col className="p-0">
          <LogisticsTable />
        </Col>
      </Row>

      <Row className="d-flex flex-row align-items-center mt-5">
        <Col className="p-0">
          <IconLogistics />
        </Col>
      </Row>
    </Container>
  );
};

export default Logistics;

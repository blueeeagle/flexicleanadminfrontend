import React from "react";
import { Form, Button } from "react-bootstrap";

const FilterSection: React.FC = () => (
  <div className="filter-section mt-3 mb-4">
    <div className="d-flex flex-wrap align-items-center gap-3">
      <Form.Select aria-label="Group By Location" className="custom-dropdown">
        <option>GROUP BY LOCATION</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Form.Select>
      <Form.Select aria-label="Online/Pos" className="custom-dropdown">
        <option>ONLINE / POS</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Form.Select>
      <Form.Select aria-label="PickUp/Delivery" className="custom-dropdown">
        <option>PICKUP/DELIVERY</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Form.Select>
      <Form.Select aria-label="Urgent/Ordinary" className="custom-dropdown">
        <option>URGENT / ORDINARY</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </Form.Select>
      <Button variant="link" className="filter-icon">
        <img
          src="https://cdn.icon-icons.com/icons2/3522/PNG/512/filtering_sort_filter_icon_221171.png"
          alt="Filter"
          className="filter-image"
        />
      </Button>
    </div>
  </div>
);

export default FilterSection;

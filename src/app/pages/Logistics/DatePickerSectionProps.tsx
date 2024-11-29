import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerSectionProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  isAssigned: boolean;
  setIsAssigned: (assigned: boolean) => void;
}

const DatePickerSection: React.FC<DatePickerSectionProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  isAssigned,
  setIsAssigned,
}) => {
  const handleDateChange = (dates: [Date | undefined, Date | undefined]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="date-picker-container">
        <Form.Group>
          <DatePicker
            selected={startDate || undefined}
            onChange={handleDateChange as any}  // Use `as any` if TypeScript type issues persist
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="Select Date Range"
            className="form-control"
          />
        </Form.Group>
      </div>
      <div className="d-flex align-items-center gap-3">
        <Form.Group controlId="formBasicCheckbox1">
          <Form.Check
            type="radio"
            style={{ color: "#49505" }}
            label="Not Assigned"
            checked={!isAssigned}
            onChange={() => setIsAssigned(false)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox2">
          <Form.Check
            type="radio"
            label="Assigned"
            style={{ color: "#1e4894" }}
            checked={isAssigned}
            onChange={() => setIsAssigned(true)}
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default DatePickerSection;

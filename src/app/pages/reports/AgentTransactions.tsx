import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { KTIcon } from "../../../_metronic/helpers";
import { Link } from "react-router-dom";
import { message } from "antd";
import { Button, Offcanvas, Form, Row, Col } from "react-bootstrap";
const AgentTransactions: FC = () => {
  const [acNo, setAcNo] = useState<string>("");
  const [acName, setAcName] = useState<string>("");
  const [bank, setBank] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [lastAcNo, setLastAcNo] = useState<string>("");
  const [hasBankDetails, setHasBankDetails] = useState<boolean>(false);
  const [bankDetailId, setBankDetailId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [status, setStatus] = useState<string[]>([]);
  const [extraStatus, setExtraStatus] = useState<string[]>([]);
  const [dropdownValue, setDropdownValue] = useState<string>("");
  const companyId = "66a1b8749414c8b93e62de7a";

  const toggleOffcanvas = (open: boolean) => () => {
    setIsOffcanvasOpen(open);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    statusType: string
  ) => {
    const value = event.target.value;
    if (statusType === "status") {
      setStatus((prev) =>
        prev.includes(value)
          ? prev.filter((s) => s !== value)
          : [...prev, value]
      );
    } else if (statusType === "extraStatus") {
      setExtraStatus((prev) =>
        prev.includes(value)
          ? prev.filter((s) => s !== value)
          : [...prev, value]
      );
    }
  };
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (bankDetailId) {
          const response = await fetch(
            `http://adminapi.flexiclean.me/api/v1/wallet/bank/${bankDetailId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const result = await response.json();
          if (response.ok && result.status === "ok") {
            const bankDetails = result.data.bankDetails;
            if (bankDetails && bankDetails.length > 0) {
              const bankDetail = bankDetails[0];
              setAcNo(bankDetail.acNo);
              setAcName(bankDetail.acName);
              setBank(bankDetail.bank);
              setBranch(bankDetail.branch);
              setCode(bankDetail.code);
              setHasBankDetails(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };

    fetchBankDetails();
  }, [bankDetailId]);

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!acNo) newErrors.acNo = "Account Number is required";
    if (!acName) newErrors.acName = "Account Holder Name is required";
    if (!bank) newErrors.bank = "Bank Name is required";
    if (!branch) newErrors.branch = "Branch Name is required";
    if (!code) newErrors.code = "Code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) {
      message.error("Please fill out all required fields.");
      return;
    }

    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const payload = {
      acNo,
      acName,
      bank,
      branch,
      code,
      companyId,
    };

    try {
      const url = bankDetailId
        ? `http://adminapi.flexiclean.me/api/v1/wallet/bank/657a6234759f5193012ebccd`
        : "http://adminapi.flexiclean.me/api/v1/activities/wallet/bank";

      const method = bankDetailId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok && result.status === "ok") {
        message.success(result.message || "Record successfully updated");
        setHasBankDetails(true);

        const bankDetails = result.data.bankDetails;
        if (bankDetails && bankDetails.length > 0) {
          const lastBankDetail = bankDetails[bankDetails.length - 1];
          setLastAcNo(lastBankDetail.acNo);
        } else {
          console.log("No bank details available.");
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  const getFirstFiveDigits = (acNo: string) => {
    return acNo.length > 5 ? acNo.slice(0, 5) : acNo;
  };
  return (
    <>
      <PageTitle>AGENT TRANSACTIONS</PageTitle>
      <div>
        <div className="d-flex justify-content-between ">
          <div>
            <h3 className="card-title align-items-start flex-column mb-4">
              <span className="card-label fw-bold fs-3 mb-1">Wallet</span>
            </h3>
          </div>
          <div>
            <button
              className="custom-btn-verify-pending"
              style={{ background: "#1e4894" }}
              onClick={toggleOffcanvas(true)}
            >
              Filter
            </button>
          </div>
        </div>

        <Offcanvas
          show={isOffcanvasOpen}
          onHide={toggleOffcanvas(false)}
          placement="end"
          className="custom-offcanvas"
          style={{ width: "500px" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form>
              <Form.Group as={Row} className="mb-4">
                <Col>
                  <Form.Check
                    type="radio"
                    label={
                      <span className="custom-radio-label">
                        Transaction History
                      </span>
                    }
                    value="Transaction History"
                    checked={selectedOption === "Transaction History"}
                    onChange={() => setSelectedOption("Transaction History")}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    label={
                      <span className="custom-radio-label">Payout History</span>
                    }
                    value="Payout History"
                    checked={selectedOption === "Payout History"}
                    onChange={() => setSelectedOption("Payout History")}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="custom-label">Consultant</Form.Label>
                <Form.Control
                  as="select"
                  value={dropdownValue}
                  onChange={(event) =>
                    setDropdownValue(event.target.value as string)
                  }
                  className="custom-select"
                >
                  <option value="value1">All(By Name/EMail/Mobile)</option>
                  <option value="value2">Value 2</option>
                  <option value="value3">Value 3</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="custom-label">From</Form.Label>
                <Form.Control type="text" placeholder="from" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="custom-label">To</Form.Label>
                <Form.Control type="text" placeholder="to" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="custom-label">Booking Id</Form.Label>
                <Form.Control type="text" placeholder="Search By Id" />
              </Form.Group>

              <Form.Group as={Row} className="mb-4">
                <Form.Label className="custom-label">TXN Status</Form.Label>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label={<span className="custom-label">Paid</span>}
                    value="Paid"
                    checked={status.includes("Paid")}
                    onChange={(e) => handleStatusChange(e, "status")}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label={<span className="custom-label">Pending</span>}
                    value="Pending"
                    checked={status.includes("Pending")}
                    onChange={(e) => handleStatusChange(e, "status")}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label={<span className="custom-label">Rejected</span>}
                    value="Rejected"
                    checked={status.includes("Rejected")}
                    onChange={(e) => handleStatusChange(e, "status")}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="custom-label">TXN Id</Form.Label>
                <Form.Control type="text" placeholder="Search By Id" />
              </Form.Group>

              <Form.Group as={Row} className="mb-4">
                <Form.Label className="custom-label">Status</Form.Label>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label={<span className="custom-label">Approved</span>}
                    value="Approved"
                    checked={extraStatus.includes("Approved")}
                    onChange={(e) => handleStatusChange(e, "extraStatus")}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label={<span className="custom-label">Pending</span>}
                    value="Pending"
                    checked={extraStatus.includes("Pending")}
                    onChange={(e) => handleStatusChange(e, "extraStatus")}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label={<span className="custom-label">Declined</span>}
                    value="Declined"
                    checked={extraStatus.includes("Declined")}
                    onChange={(e) => handleStatusChange(e, "extraStatus")}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-5 d-flex justify-content-end">
                <button
                  className="custom-btn-verify-pending mt-5"
                  style={{ background: "#1e4894" }}
                >
                  Save
                </button>
              </Form.Group>
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <div className="custom-card mb-8 mt-8">
        <div className="custom-card-body">
          <div className="custom-flex-container">
            <div className="custom-col-md-8">
              <div className="custom-flex-grow">
                <h2 className="custom-h2">1089</h2>
                <h4 className="custom-h4">BHD</h4>
              </div>
            </div>

            <div className="custom-col-md-2">
              <div className="custom-flex-grow">
                <h2 className="custom-h2">Bank Details</h2>
                <h4 className="custom-h4">
                  {hasBankDetails
                    ? `${getFirstFiveDigits(lastAcNo)}****`
                    : "No bank details found"}
                </h4>
              </div>
            </div>

            <div className="custom-col-md-2 custom-btn-container">
              <div>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_1"
                  className="custom-btn-verify-pending"
                  style={{ background: "#1e4894" }}
                >
                  <i
                    className={`bi ${hasBankDetails ? "bi-pencil" : "bi-plus"}`}
                  ></i>
                  {hasBankDetails ? "Update" : "Add"}
                </button>
              </div>
              <div>
                {hasBankDetails && (
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_2"
                    className="custom-btn-verify-pending"
                  >
                    <i className="bi bi-clock"></i> Pending
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="card-title align-items-start flex-column mb-4">
        <span className="card-label fw-bold fs-3 mb-1">TRANSACTIONS</span>
      </h3>

      <div className="card  mb-4">
        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted">
                  <th className="min-w-100px">Date</th>
                  <th className="min-w-200px">Order ID</th>
                  <th className="min-w-100px">Customer Name</th>
                  <th className="min-w-100px">Mobile Number</th>
                  <th className="min-w-150px">Type</th>
                  <th className="min-w-150px">Method</th>
                  <th className="min-w-100px">Amount</th>
                  <th className="min-w-100px">Charges</th>
                  <th className="min-w-100px">Total</th>
                  <th className="min-w-100px">Discount</th>
                  <th className="min-w-100px">Final</th>
                  <th className="min-w-100px">Platform Commission</th>
                  <th className="min-w-100px">Wallet In</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>dd/mm/yy</td>
                  <td>ORD001</td>
                  <td>Demo</td>
                  <td>+971908777192</td>
                  <td>POS</td>
                  <td>Swipe</td>
                  <td>500</td>
                  <td>50</td>
                  <td>550</td>
                  <td>10</td>
                  <td>540</td>
                  <td>0</td>
                  <td>540</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h3 className="card-title align-items-start flex-column mb-4">
        <span className="card-label fw-bold fs-3 mb-1">PAYOUT HISTORY</span>
      </h3>

      <div className="card  mb-4">
        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted">
                  <th className="min-w-100px">Requested Date</th>
                  <th className="min-w-200px">Request ID</th>
                  <th className="min-w-100px">Amount</th>
                  <th className="min-w-100px">Status</th>
                  <th className="min-w-100px">Comments</th>
                  <th className="min-w-100px">Account No</th>
                  <th className="min-w-100px">Updated On</th>
                  <th className="min-w-100px">Reference Txn No</th>
                  <th className="min-w-100px">Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>dd/mm/yy</td>
                  <td>001</td>
                  <td>500 BHD</td>
                  <td>Pending</td>
                  <td>Amount Transfered</td>
                  <td>234***</td>
                  <td>dd/mm/yy</td>
                  <td></td>
                  <td>
                    <Link
                      to="/agent?agentId=1234"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentTransactions;

import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { postRequest } from "../../../modules/auth/core/_requests";
import { Modal, Button, Form } from "react-bootstrap";
import { Switch } from "@mui/material";

interface Transaction {
  _id: string;
  date: string;
  requestId: string;
  acNo: string;
  amount: number;
  status: string;
  updated_at: string;
  transactionId?: string;
  comments?: string;
}

const AgentPayOut: FC = () => {
  const [rowData, setRowData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [statusCounts, setStatusCounts] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
  });
  const [isEditable, setIsEditable] = useState(false);
  const { customerId } = useParams<{ customerId: string }>();
  const token = localStorage.getItem("token");
  const getData = async (statusFilter: string | null = null) => {
    setLoading(true);
    try {
      const transactionData = await postRequest(`/activities/payouts`, "");
      if (transactionData?.data?.status === "ok") {
        const data = transactionData?.data?.data || [];
        setRowData(
          statusFilter
            ? data.filter((tx: Transaction) => tx.status === statusFilter)
            : data
        );

        const approvedCount = data.filter(
          (tx: Transaction) => tx.status === "approved"
        ).length;
        const rejectedCount = data.filter(
          (tx: Transaction) => tx.status === "rejected"
        ).length;
        const pendingCount = data.filter(
          (tx: Transaction) => tx.status === "pending"
        ).length;

        setStatusCounts({
          approved: approvedCount,
          rejected: rejectedCount,
          pending: pendingCount,
        });
      } else {
        console.error("Error fetching data: ", transactionData?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(filterStatus);
  }, [customerId, filterStatus]);

  const handleView = (row: Transaction) => {
    setSelectedTransaction(row);
    setIsEditable(row.status !== "pending"); // Only make it editable if status is not "pending"
    setShowModal(true);
  };

  const handleUpdatePayout = async () => {
    if (selectedTransaction) {
      // Prepare transaction data
      const transactionData = {
        status: selectedTransaction.status,
        transactionId: selectedTransaction.transactionId || "",
        amount: selectedTransaction.amount,
        date: selectedTransaction.date,
        remarks: selectedTransaction.comments || "",
      };

      try {
        // Make the PATCH request with the transaction ID in the URL
        const response = await fetch(
          `http://adminapi.flexiclean.me/api/v1/activities/payout/${selectedTransaction._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
            body: JSON.stringify(transactionData),
          }
        );

        // Parse the response
        const updateData = await response.json();

        // Check the status of the response
        if (updateData?.status === "ok") {
          setShowModal(false); // Close modal if update is successful
          getData(filterStatus); // Refresh data based on current filter
        } else {
          console.error(
            "Failed to update payout:",
            updateData?.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error updating payout:", error);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Requested ID Date",
      width: 200,
      renderCell: (params) =>
        new Date(params.row.date).toLocaleDateString("en-GB"),
    },
    { field: "requestId", headerName: "Consultant Info", width: 250 },
    {
      field: "Particulrs",
      headerName: "Particulrs",
      width: 150,
      renderCell: () => `Amount Withdraw`,
    },
    {
      field: "amount",
      headerName: "Amount In BHD",
      width: 180,
      renderCell: (params) => `${Number(params.value).toFixed(3)} BHD`,
    },
    {
      field: "remarks",
      headerName: "Comments",
      width: 180,
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Switch
          checked={params.row.is_active}
          // onChange={() => {
        
          //   handleChangeStatus(params.row._id, !params.row.is_active); // Pass id, newStatus, and imgUrl
          // }}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
    {
      field: "status",
      headerName: "PayOut Status",
      width: 150,
      renderCell: (params) => (
        <div className="sticky-cell">
          <span
            className={`badge fs-8 fw-bold ${
              params.value === "approved"
                ? "badge-primary"
                : params.value === "pending"
                ? "badge-warning"
                : "badge-danger"
            }`}
          >
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </span>
        </div>
      ),
    },
    {
      field: "View",
      headerName: "View",
      width: 150,
      renderCell: (params) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleView(params.row)}
        >
          View
        </button>
      ),
    },
  ];

  const handleDateChange = (date: string) => {
    if (selectedTransaction) {
      setSelectedTransaction({ ...selectedTransaction, date });
    }
  };

  const handleStatusChange = (status: string) => {
    if (selectedTransaction) {
      setSelectedTransaction({ ...selectedTransaction, status });
    }
  };

  return (
    <>
      <PageTitle>Agent & PAY OUT</PageTitle>

      <div className="filter-buttons mb-5">
        <Button
          variant="danger"
          onClick={() => setFilterStatus("rejected")}
          className="me-2"
        >
          Rejected{" "}
          {statusCounts.rejected > 0 ? `(${statusCounts.rejected})` : ""}
        </Button>
        <Button
          variant="success"
          onClick={() => setFilterStatus("approved")}
          className="me-2"
        >
          Approved{" "}
          {statusCounts.approved > 0 ? `(${statusCounts.approved})` : ""}
        </Button>
        <Button variant="warning" onClick={() => setFilterStatus("pending")}>
          Pending {statusCounts.pending > 0 ? `(${statusCounts.pending})` : ""}
        </Button>
      </div>

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
            loop
            style={{ width: 150, height: 150, filter: "hue-rotate(200deg)" }}
          />
        </div>
      ) : (
        <div className="card">
          <DataGrid
            rows={rowData}
            columns={columns}
            getRowId={(row) => row.requestId}
            hideFooter
            autoHeight
          />
        </div>
      )}

      {selectedTransaction && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Payout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formRequestId">
                <Form.Label>Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedTransaction.date.slice(0, 10)}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedTransaction.amount}
                  onChange={(e) =>
                    setSelectedTransaction({
                      ...selectedTransaction,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedTransaction.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={selectedTransaction.status !== "pending"}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formTransactionId">
                <Form.Label>Transaction No (TXN NO)</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedTransaction.transactionId || ""}
                  onChange={(e) =>
                    setSelectedTransaction({
                      ...selectedTransaction,
                      transactionId: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formComments">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedTransaction.comments || ""}
                  onChange={(e) =>
                    setSelectedTransaction({
                      ...selectedTransaction,
                      comments: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdatePayout}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default AgentPayOut;

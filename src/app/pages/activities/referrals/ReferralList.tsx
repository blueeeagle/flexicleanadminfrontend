import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Link, useNavigate } from "react-router-dom";
import {
  postRequest,
  deleteRequest,
} from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";
import AlertBox from "../../../../common/AlertBox";
import changeStatus from "../../../../common/ChangeStatus";
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Switch, IconButton } from "@mui/material";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import logo from "../../../../../src/_metronic/assets/sass/components/logoimage/logo.png";

interface ChangeStatusProps {
  id: string;         // The required ID
  Url: string;
  status: boolean;
  is_active: boolean;
}

const ReferralList: FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const deleteReferral = async (ID: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      setIsLoading(true); // Start loading
      await deleteRequest(`/activities/refferal/` + ID).then(
        async (response) => {
          if (response?.data?.status === "ok") {
            setIsSuccess(true);
            setSuccessMsg(`Referral has been deleted successfully`);
            await getData();
          } else {
            setIsFailed(true);
            setErrorMsg(`Something went wrong`);
          }
          setIsLoading(false); // Stop loading
        }
      );
    }
  };
  const getData = async () => {
    setIsLoading(true); // Start loading
    const referralListData = await postRequest(
      `/activities/refferals?pageIndex=0&pageSize=10`,
      ``
    );

    if (referralListData?.data?.status === "ok") {
      const formattedData = referralListData.data.data.map((item: any) => {
        const dataEntry = {
          id: item._id,
          refferalTitle: item.refferalTitle,
          amount: item.amount,
          startDate: item.startDate,
          endDate: item.endDate,
          userLimit: item.userLimit,
          updated_at: item.updated_at,
          is_active: item.is_active,
          countryName: item.countryId.name,
          currencyCode: item.currencyId.currencyCode,
          decimalPoints: item.currencyId.decimalPoints,
          description: item.description,
          imgUrl: item.imgUrl,
        };
        console.log(dataEntry.description);
        // Log each entry with currency code and decimal points
        console.log(
          `Referral ID: ${dataEntry.id}, Title: ${dataEntry.refferalTitle}, Currency Code: ${dataEntry.currencyCode}, Decimal Points: ${dataEntry.decimalPoints}`
        );

        return dataEntry;
      });

      setRowData(formattedData);
    }
    setIsLoading(false);
  };

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  useEffect(() => {
    async function loadData() {
      await getData();
    }
    loadData();
  }, []);
  const handleChangeStatus = async (id: string, status: boolean) => {
    setIsLoading(true);
  
    // Create the payload with the necessary structure: "is_active" as a string
    const payload = `{"is_active": ${status}}`;  // Payload as a stringified JSON object
  
    const url = `http://adminapi.flexiclean.me/api/v1/activities/refferal/${id}`;
  
    try {
      console.log('Request Payload:', payload); // Log the payload for debugging
  
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',  // Ensure content is JSON
          'Authorization': `Bearer ${token}`,  // Include the authorization token
        },
        body: payload,  // Send the payload as a string directly
      });
  
      const result = await response.json();
      console.log('API Response:', result);  // Log the response for debugging
  
      if (response.ok) {
        Swal.fire("Success", result.message || "Status updated successfully", "success");
        await getData();  // Refresh data after successful update
      } else {
        Swal.fire("Error", result.message || "Failed to update status", "error");
      }
    } catch (error) {
      console.error('Error while updating status:', error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  
    setIsLoading(false);
  };
  
  
  
  
  
  
  
  
  
  const columns: GridColDef[] = [
    {
      field: "imgUrl",
      headerName: "Logo",
      width: 100,
      renderCell: (params) => {
        const imgUrl = `http://adminapi.flexiclean.me/${params.row.imgUrl}`;
        console.log(`Image URL: ${imgUrl}`);

        return (
          <img
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={imgUrl}
            alt="Logo"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent looping
              e.currentTarget.src = logo; // Use your default logo image
            }}
          />
        );
      },
    },
    {
      field: "refferalTitle",
      headerName: "Referral Title",
      minWidth: 200,
      renderCell: (params: any) => (
        <Link to={`/activities/referral/${params.row.id}`} state={params.row}>
          {params.value}
        </Link>
      ),
    },
    {
      field: "amount",
      headerName: "Free Credits (BHD)",
      minWidth: 150,
      renderCell: (params: any) => {
        // Log the params to see the structure
        console.log(params);

        const value = params.value || 0;

        // Assuming you have access to currencyCode and decimalPoints in params
        const currencyCode = params.row.currencyCode; // Default to BHD if not available
        const decimalPoints = params.row.decimalPoints; // Default to 2 if not available

        // Format the value based on the decimal points
        const formattedValue = value.toFixed(decimalPoints);

        return `${formattedValue} ${currencyCode}`;
      },
    },
    {
      field: "startDate",
      headerName: "Registered From & To",
      minWidth: 200,
      renderCell: (params: any) => (
        <>
          {stringToDate(params.row.startDate)} -{" "}
          {stringToDate(params.row.endDate)}
        </>
      ),
    },
    { field: "userLimit", headerName: "User Limits", minWidth: 150 },
    {
      field: "updated_at",
      headerName: "Created On",
      minWidth: 150,
      renderCell: (params: any) => stringToDate(params.row.updated_at),
    },
    {
      field: "is_active",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params: any) => (
        <Switch
          checked={params.value} // Switch is controlled by the value (true/false)
          onChange={() => handleChangeStatus(params.row.id, !params.value)} // Pass imgUrl and is_active in params
        />
      ),
    },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const selectedOption = e.target.value;
              if (selectedOption === "edit") {
                localStorage.setItem(`currency`, params.row.currency);
                localStorage.setItem(`startDate`, params.row.startDate);
                localStorage.setItem(`endDate`, params.row.endDate);
                localStorage.setItem(`description`, params.row.description); // Assuming the description is the referral title
                localStorage.setItem(`countryName`, params.row.countryName); // Store the country name
                localStorage.setItem(`imgUrl`, params.row.imgUrl); // Store the _id
    
                navigate(`/activities/referral/${params.row.id}`, {
                  state: params.row,
                });
              } else if (selectedOption === "delete") {
                deleteReferral(params.row.id);
              }
            }}
          >
            <option value="">...</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </div>
      ),
    }    
    ,
  ];

  return (
    <>
      <PageTitle>REFERRALS</PageTitle>
      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5 d-flex justify-content-between mb-5">
            <div>
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Referral List
                </span>
              </h3>
            </div>
            <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              title="Click to add a referral"
            >
              <Link
                to={`/activities/referral/create`}
                className="btn btn-sm btn-light-primary"
              >
                New Referral
              </Link>
            </div>
          </div>

          <div className="card-body py-3">
            {isLoading ? (
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
                  autoHeight={true}
                  hideFooter={true}
                  sx={{
                    "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus":
                      {
                        outline: "none",
                        border: "none",
                        backgroundColor: "transparent",
                      },
                    "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible":
                      {
                        outline: "none",
                        border: "none",
                        backgroundColor: "transparent",
                      },

                    "& .MuiDataGrid-cell:active": {
                      outline: "none",
                      border: "none",
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {isSuccess && (
        <AlertBox redirectUrl={null} close={closeAlert} type={`success`}>
          {successMsg}
        </AlertBox>
      )}
      {isFailed && (
        <AlertBox redirectUrl={null} close={closeAlert} type={`error`}>
          {errorMsg}
        </AlertBox>
      )}
    </>
  );
};

export default ReferralList;

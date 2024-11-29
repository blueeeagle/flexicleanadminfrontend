import { FC, useEffect, useState } from "react";
import { getRequest, postRequest } from "../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import { stringToDate } from "../../../common/Date";
import clsx from "clsx";

const CustomerTransactions: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [customerData, setCustomerData] = useState(Object);
  const { customerId } = useParams();
  const [countryList, setCountryList] = useState([]);
  const getData = async (countryId = "") => {
    try {
      const transactionData = getRequest(
        `/payment/walletBal/${customerId}/${countryId}`,
        ""
      );
      const countryData = postRequest(`/master/countries`, ``);

      const lookupObj = [transactionData, countryData];

      const results = await Promise.allSettled(lookupObj);

      const data1: Array<any> = results.map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          console.error(`Error in request: ${result.reason}`);
          return null; // or handle this in another way if needed
        }
      });

      const dataobj = {
        transactionData:
          data1[0]?.data?.status === "ok"
            ? data1[0]?.data?.data.length !== 0
              ? data1[0]?.data?.data[0].walletHistory
              : []
            : [],
        countryData:
          data1[1]?.data?.status === "ok" ? data1[1]?.data?.data : [],
        customerData:
          data1[2]?.data?.status === "ok"
            ? data1[2]?.data?.data.length !== 0
              ? data1[2]?.data?.data[2]
              : []
            : [],
      };

      setRowData(dataobj?.transactionData);
      setCustomerData(dataobj?.customerData);
      setCountryList(dataobj?.countryData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, [customerId]); // Fetch data when page changes

  const handleCounty = (value: any) => {
    getData(value);
  };
  return (
    <>
      <div className="col-lg-8">
        <div className="row">
          <div className="col-lg-6 fv-row">
            <select
              onChange={(e) => handleCounty(e.target.value)}
              className={clsx(
                "form-control form-control-lg form-control-solid mb-3 mb-lg-0"
              )}
            >
              <option value="">Select a Country...</option>
              {countryList.map((e: any) => {
                return (
                  <option value={e._id}>
                    {e.iso3} - {e.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <br />
      <div className="card mb-8">
        <div className="card-body bg-light-warning">
          <div className="d-flex align-items-center">
            <div className="col-md-10">
              <div className="flex-grow-1">
                <span className="text-muted fw-bold d-block">
                  {customerData.balance}
                </span>
                <span className="text-muted fw-semibold d-block">BHD</span>
              </div>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-sm fw-bold btn-primary"
                style={{ marginRight: "10px" }}
              >
                PAY IN
              </button>
              <button className="btn btn-sm fw-bold btn-primary">
                PAY OUT
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="card-title align-items-start flex-column mb-4">
        <span className="card-label fw-bold fs-3 mb-1">TRANSACTIONS</span>
      </h3>
      {rowData?.length > 0 ? (
        rowData.map((result: any) => (
          <div className="card mb-8">
            <span className="d-flex fw-bold d-block p-2">
              {result?.type == "order" ? "Order Payment" : "Payment Details"}
            </span>
            <div className="card-body bg-light">
              <div className="d-flex align-items-center">
                <div className="col-md-5">
                  <div className="flex-grow-1">
                    <span className="text-muted fw-bold d-block">
                      {result?.paymentId?.transactionId}
                    </span>
                    <span className="text-muted fw-semibold d-block">
                      {result?.type == "order"
                        ? stringToDate(result?.orderId?.orderDate)
                        : stringToDate(result?.created_at)}
                    </span>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="flex-grow-1">
                    <span className="text-muted fw-bold d-block">
                      {result?.type == "order"
                        ? result?.orderId?.companyId?.companyName
                        : result?.paymentId?.paymentMode}
                    </span>
                    {/* <span className='text-muted fw-bold d-block'>{result?.type == 'order' ? stringToDate(result?.orderId?.orderDate) : ''}</span> */}
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="flex-grow-1">
                    <span className="badge badge-warning fs-8 fw-bold">
                      {result?.paymentId?.amount} BHD
                    </span>

                    <span className="text-muted fw-semibold d-block">
                      Pay Out
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <span> No data found</span>
      )}
    </>
  );
};

export default CustomerTransactions;

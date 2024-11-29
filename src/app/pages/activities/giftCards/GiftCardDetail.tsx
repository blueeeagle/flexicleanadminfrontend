import { FC, useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useFormik } from "formik";
import { format } from "date-fns";
import clsx from "clsx";
import AlertBox from "../../../../common/AlertBox";
import {
  postRequest,
  patchRequest,
  getRequest,
} from "../../../modules/auth/core/_requests";
import { useLocation, useParams } from "react-router-dom";
import {
  dateFormateYYYYMMDD,
  formatToyyyymmdd,
  stringToDate,
} from "../../../../common/Date";

const GiftCardDetail: FC = () => {
  const giftCardSchema = Yup.object().shape({
    customerId: Yup.string().required("Country is required"),
    currencyId: Yup.string().required("Currency Id is required"),
    giftCardTitle: Yup.string()
      .min(3, "Minimum 3 Character")
      .max(50, "Maximum 50 Character")
      .required("Package Name is required"),
    description: Yup.string()
      .min(3, "Minimum 3 Character")
      .max(50, "Maximum 50 Character")
      .required("Currency Code is required"),
    amount: Yup.number().required("Currency Value is required"),
    startDate: Yup.date().required("Currency Value is required"),
    endDate: Yup.date().required("Currency Value is required"),
  });

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const { giftId } = useParams();
  const fileRef = useRef(null);

  const initialValues = {
    customerId: "",
    currencyId: "",
    giftCardTitle: "",
    description: "",
    amount: "",
    startDate: "",
    endDate: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const location = useLocation();
  const editData: any = location.state;

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };
  const formatDateToYYYYMMDD = (dateString:any) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    if (location.pathname === "/activities/giftCard/create") {
      setFormData({
        customerId: "",
        currencyId: "",
        giftCardTitle: "",
        description: "",
        startDate: "", // Set current date as "YYYY-MM-DD"
        amount: "",
        endDate: "",   // Set current date as "YYYY-MM-DD"
      });
    } else {
      const giftCardData = JSON.parse(localStorage.getItem("selectedGiftCard") ?? "{}");
      if (giftCardData && Object.keys(giftCardData).length > 0) {
        setFormData({
          customerId: giftCardData.customerId || "",
          currencyId: giftCardData.currencyId || "",
          giftCardTitle: giftCardData.giftCardTitle || "",
          description: giftCardData.description || "",
          amount: giftCardData.amount || "",
          startDate: giftCardData.startDate ? formatDateToYYYYMMDD(giftCardData.startDate) : "", 
          endDate: giftCardData.endDate ? formatDateToYYYYMMDD(giftCardData.endDate) : "",      
        });
      }
    }
  }, [location.pathname]);
  
  

  const calculateDate = (
    month: string,
    year: string,
    periodType: string,
    isStart: boolean
  ) => {
    const currentDate = new Date(Number(year), Number(month) - 1); // month is 0-indexed
  
    let calculatedDate: Date;
  
    if (periodType === "Month") {
      // First or last day of the month
      if (isStart) {
        calculatedDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
      } else {
        calculatedDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      }
    } else {
      calculatedDate = currentDate;
    }
  
    // Return in "yyyy-MM-dd" format
    return format(calculatedDate, "yyyy-MM-dd");
  };

  useEffect(() => {
    async function getData() {
      if (giftId !== "create") {
        if (editData) {
          const initialValues = {
            customerId: editData.customerId?._id,
            currencyId: editData.currencyId?._id,
            giftCardTitle: editData.giftCardTitle,
            description: editData?.description,
            amount: editData?.amount,
            startDate: dateFormateYYYYMMDD(editData?.startDate),
            endDate: dateFormateYYYYMMDD(editData?.endDate),
          };
          setFormData(initialValues);
        }
      }

      try {
        const customerData = await getRequest(`/customer/list?pageIndex=0&pageSize=10`, ``);
        const currencyData = await postRequest(`/master/currencies`, ``);

        const data = await Promise.all([customerData, currencyData]);

        setCustomerList(data[0]?.data?.status === "ok" ? data[0]?.data?.data : []);
        setCurrencyList(data[1]?.data?.status === "ok" ? data[1]?.data?.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, [giftId, editData]);

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: giftCardSchema,
    onSubmit: async (values) => {
      setLoading(true);
  
      // Determine periodType based on startDate and endDate
      const periodType = "Date"; // Use "Date" to send startDate and endDate instead of month and year
  
      const reqBody = {
        customerId: [values.customerId],
        currencyId: values.currencyId,
        giftCardTitle: values.giftCardTitle,
        description: values.description,
        periodType: periodType,
        startDate: values.startDate,
        endDate: values.endDate,
        amount: values.amount,
      };
  
      try {
        let response;
        if (giftId && giftId !== "create") {
          response = await patchRequest(`/activities/giftCard/${giftId}`, reqBody);
        } else {
          response = await postRequest(`/activities/giftCard`, reqBody);
        }
  
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Gift Card has been ${giftId === "create" ? "added" : "updated"} successfully`);
        } else {
          setIsFailed(true);
          setErrorMsg("Something Went Wrong");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("Something Went Wrong");
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <>
      <PageTitle>ADD GIFT CARD</PageTitle>

      <div className="card">
        <div className="card-body">
          <form
            className="form w-100"
            onSubmit={formik.handleSubmit}
            noValidate
            id="kt_login_signin_form"
          >
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Gift Card Title
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      {...formik.getFieldProps("giftCardTitle")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.giftCardTitle &&
                            formik.errors.giftCardTitle,
                        },
                        {
                          "is-valid":
                            formik.touched.giftCardTitle &&
                            !formik.errors.giftCardTitle,
                        }
                      )}
                      placeholder="Enter Title"
                    />
                    {formik.touched.giftCardTitle &&
                      formik.errors.giftCardTitle && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">
                            {formik.errors.giftCardTitle}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Description
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      {...formik.getFieldProps("description")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.description &&
                            formik.errors.description,
                        },
                        {
                          "is-valid":
                            formik.touched.description &&
                            !formik.errors.description,
                        }
                      )}
                      placeholder="Enter Description"
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.description}</span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Free Credits
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      {...formik.getFieldProps("amount")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.amount && formik.errors.amount,
                        },
                        {
                          "is-valid":
                            formik.touched.amount && !formik.errors.amount,
                        }
                      )}
                      placeholder="Enter Value"
                    />
                    {formik.touched.amount && formik.errors.amount && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.amount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Registered From & To
              </label>

              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="date"
                      {...formik.getFieldProps("startDate")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.startDate && formik.errors.startDate,
                        },
                        {
                          "is-valid":
                            formik.touched.startDate &&
                            !formik.errors.startDate,
                        }
                      )}
                      placeholder="Choose"
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.startDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="date"
                      {...formik.getFieldProps("endDate")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.endDate && formik.errors.endDate,
                        },
                        {
                          "is-valid":
                            formik.touched.endDate && !formik.errors.endDate,
                        }
                      )}
                      placeholder="Choose"
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.endDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Customer
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <select
                      {...formik.getFieldProps("customerId")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.customerId &&
                            formik.errors.customerId,
                        },
                        {
                          "is-valid":
                            formik.touched.customerId &&
                            !formik.errors.customerId,
                        }
                      )}
                    >
                      <option value="">Select a Customer...</option>
                      {customerList.map((e: any) => {
                        return (
                          <option value={e._id}>
                            {e.firstName} - {e.lastName}
                          </option>
                        );
                      })}
                    </select>

                    {formik.touched.customerId && formik.errors.customerId && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.customerId}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Currency
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <select
                      {...formik.getFieldProps("currencyId")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.currencyId &&
                            formik.errors.currencyId,
                        },
                        {
                          "is-valid":
                            formik.touched.currencyId &&
                            !formik.errors.currencyId,
                        }
                      )}
                    >
                      <option value="">Select a Currency...</option>
                      {currencyList.map((e: any) => {
                        return (
                          <option value={e._id}>
                            {e.currencySymbol} - {e.currency}
                          </option>
                        );
                      })}
                    </select>

                    {formik.touched.currencyId && formik.errors.currencyId && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.currencyId}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-stack pt-15">
              <div className="mr-2">
                <button
                  type="button"
                  className="btn btn-lg btn-light-primary me-3"
                >
                  Cancel
                </button>
              </div>

              <div>
                <button type="submit" className="btn btn-lg btn-primary me-3">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isSuccess && (
        <AlertBox
          redirectUrl={`/activities/giftCards`}
          close={closeAlert}
          type={`success`}
        >
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

export default GiftCardDetail;

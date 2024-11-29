import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { useAuth } from "../../modules/auth";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { getRequest, patchRequest } from "../../modules/auth/core/_requests";
import AlertBox from "../../../common/AlertBox";

const cancellationSchema = Yup.object().shape({
  beforePickupType: Yup.string().required("value is required"),
  beforePickupValue: Yup.number().required("value is required"),
  afterPickUpType: Yup.string().required("value is required"),
  afterPickUpValue: Yup.number().required("value is required"),
});

const Cancellations: FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [companyId, setCompanyId] = useState();
  const { auth: loginData } = useAuth();
  const initialValues = {
    beforePickupType: "",
    beforePickupValue: 0,
    afterPickUpType: "",
    afterPickUpValue: 0,
  };
  const [formData, setFormData] = useState(initialValues);
  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };
  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: cancellationSchema,
    onSubmit: async (values) => {
      console.log("clivked");
      setLoading(true);

      let reqObj = {
        cancellation: {
          beforePickup: {
            type: values?.beforePickupType,
            value: values?.beforePickupValue,
          },
          afterPickup: {
            type: values?.afterPickUpType,
            value: values?.afterPickUpValue,
          },
        },
      };

      try {
        if (companyId) {
          await patchRequest(
            `/settings/cancellation/${companyId}`,
            reqObj
          ).then((response) => {
            if (response?.data?.status === "ok") {
              setIsSuccess(true);
              setSuccessMsg(`cancellation rate has been updated successfully`);
              setLoading(false);
            } else {
              setIsFailed(true);
              setLoading(false);
              setErrorMsg(`Something Went Wrong`);
            }
          });
        }
      } catch (error) {
        setIsFailed(true);
        setLoading(false);
        setErrorMsg(`Something Went Wrong`);
      }
    },
  });

  const getCompanyData = async () => {
    const companyData = await getRequest(`/admin/company`, "");
    console.log("cmp data>>", companyData.data.data[0]._id);
    setCompanyId(companyData.data.data[0]._id);
  };

  const setFormToInitial = () => {
    formik.resetForm();
  };

  useEffect(() => {
    async function loadData() {
      await getCompanyData();
    }
    loadData();
  }, []);
  return (
    <>
      <PageTitle>CANCELLATIONS</PageTitle>

      <div className="row g-5 g-xl-8">
        <div className="card">
          <div className="card-body py-3">
            <form onSubmit={formik.handleSubmit} noValidate className="form">
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Cancellation Charges <br /> (Before Pickup)
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6 fv-row">
                      <select
                        {...formik.getFieldProps("beforePickupType")}
                        className={clsx(
                          "form-select form-select-solid form-select-lg fw-bold",
                          {
                            "is-invalid":
                              formik.touched.beforePickupType &&
                              formik.errors.beforePickupType,
                          },
                          {
                            "is-valid":
                              formik.touched.beforePickupType &&
                              !formik.errors.beforePickupType,
                          }
                        )}
                      >
                        <option value="Flat">Flat</option>
                        <option value="Percent">Percent</option>
                      </select>
                      {formik.touched.beforePickupType &&
                        formik.errors.beforePickupType && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.beforePickupType}
                            </span>
                          </div>
                        )}
                    </div>

                    <div className="col-lg-6 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("beforePickupValue")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.beforePickupValue &&
                              formik.errors.beforePickupValue,
                          },
                          {
                            "is-valid":
                              formik.touched.beforePickupValue &&
                              !formik.errors.beforePickupValue,
                          }
                        )}
                        placeholder="Enter Value"
                      />
                      {formik.touched.beforePickupValue &&
                        formik.errors.beforePickupValue && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.beforePickupValue}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Cancellation Charges <br /> (Before in progress)
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-6 fv-row">
                      <select
                        {...formik.getFieldProps("afterPickUpType")}
                        className={clsx(
                          "form-select form-select-solid form-select-lg fw-bold",
                          {
                            "is-invalid":
                              formik.touched.afterPickUpType &&
                              formik.errors.afterPickUpType,
                          },
                          {
                            "is-valid":
                              formik.touched.afterPickUpType &&
                              !formik.errors.afterPickUpType,
                          }
                        )}
                      >
                        <option value="Flat">Flat</option>
                        <option value="Percent">Percent</option>
                      </select>
                      {formik.touched.afterPickUpType &&
                        formik.errors.afterPickUpType && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.afterPickUpType}
                            </span>
                          </div>
                        )}
                    </div>

                    <div className="col-lg-6 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("afterPickUpValue")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.afterPickUpValue &&
                              formik.errors.afterPickUpValue,
                          },
                          {
                            "is-valid":
                              formik.touched.afterPickUpValue &&
                              !formik.errors.afterPickUpValue,
                          }
                        )}
                        placeholder="Enter Value"
                      />
                      {formik.touched.afterPickUpValue &&
                        formik.errors.afterPickUpValue && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.afterPickUpValue}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end py-6 px-9 gap-5">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={setFormToInitial}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {!loading && "Submit"}
                  {loading && (
                    <span
                      className="indicator-progress"
                      style={{ display: "block" }}
                    >
                      Please wait...{" "}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </button>
              </div>
            </form>
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

export default Cancellations;

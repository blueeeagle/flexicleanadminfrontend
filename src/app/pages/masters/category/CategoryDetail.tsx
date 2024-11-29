import { FC, useState, useEffect } from "react";
import * as Yup from "yup";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useFormik } from "formik";
import clsx from "clsx";
import AlertBox from "../../../../common/AlertBox";
import {
  postRequest,
  patchRequest,
} from "../../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import Lottie from 'lottie-react';
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const categorySchema = Yup.object().shape({
  categoryName: Yup.string()
    .min(3, "Minimum 3 Character")
    .max(50, "Maximum 50 Character")
    .required("Category Name is required"),
  homeScreenOrderNo: Yup.number().required("Home Screen Order No is required"),
  serviceId: Yup.string().required("Service is required"),
  orderNo: Yup.number().required("Order Number is required"),
  icon: Yup.mixed().required("Icon is required"),
});

const CategoryDetail: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const { categoryId } = useParams();

  const initialValues = {
    categoryName: "",
    homeScreenOrderNo: "",
    isDisplayOnHome: false,
    icon: "",
    serviceId: "",
    orderNo: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [serviceList, setServiceList] = useState([]);

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      setLoading(true);

      let dataObj = {
        categoryName: values?.categoryName,
        orderNo: values?.orderNo,
        isDisplayOnHome: values?.isDisplayOnHome,
        serviceId: values?.serviceId,
        homeOrderNo: values?.homeScreenOrderNo,
      };
      const formData = new FormData();
      formData.append("icon", values?.icon);
      formData.append("data", JSON.stringify(dataObj));

      try {
        if (categoryId !== "create") {
          await patchRequest(`/master/category/${categoryId}`, formData).then(
            (response) => {
              if (response?.data?.status === "ok") {
                setIsSuccess(true);
                setSuccessMsg(`Category has been updated successfully`);
                setLoading(false);
              } else {
                setIsFailed(true);
                setLoading(false);
                setErrorMsg(`Something Went Wrong`);
              }
            }
          );
        } else {
          await postRequest(`/master/category`, formData).then((response) => {
            if (response?.data?.status === "ok") {
              setIsSuccess(true);
              setSuccessMsg(`Category has been added successfully`);
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

  const getData = async () => {
    setLoading(true);
    const categoryData =
      categoryId !== "create"
        ? await postRequest(`/master/categories`, { _id: categoryId })
        : 0;
    const serviceData = await postRequest(`/master/services`, ``);

    const lookupObj = [categoryData, serviceData];
    let data1: Array<any> = [];
    return Promise.allSettled(lookupObj)
      .then((result) => {
        result.forEach((res: any) => {
          data1.push(res.value);
        });
        return data1;
      })
      .then((d) => {
        const dataobj = {
          categoryDataData:
            d[0] && d[0]?.data?.status === "ok" ? d[0]?.data?.data[0] : [],
          serviceData:
            d[1] && d[1]?.data?.status === "ok" ? d[1]?.data?.data : [],
        };
        setServiceList(dataobj?.serviceData);

        if (dataobj?.categoryDataData) {
          const initialValues = {
            categoryName: dataobj?.categoryDataData?.categoryName,
            isDisplayOnHome: dataobj?.categoryDataData?.isDisplayOnHome,
            serviceId: dataobj?.categoryDataData?.serviceId?._id,
            homeScreenOrderNo: dataobj?.categoryDataData?.homeOrderNo,
            icon: dataobj?.categoryDataData?.icon,
            orderNo: dataobj?.categoryDataData?.orderNo,
          };
          setFormData(initialValues);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    async function loadData() {
      await getData();
    }
    loadData();
  }, []);

  return (
    <>
      <PageTitle>ADD/UPDATE CATEGORY</PageTitle>
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
                  loop={true}
                  style={{
                    width: 150,
                    height: 150,
                    filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
                  }}
                />
              </div>
            ) : (
      <div className="row g-5 g-xl-8">
        <div className={`card `}>
          <div className="card-body py-3">
            <form onSubmit={formik.handleSubmit} noValidate className="form">
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Service
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-9 fv-row">
                      <select
                        {...formik.getFieldProps("serviceId")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.serviceId &&
                              formik.errors.serviceId,
                          },
                          {
                            "is-valid":
                              formik.touched.serviceId &&
                              !formik.errors.serviceId,
                          }
                        )}
                      >
                        <option value="">Select a Service...</option>
                        {serviceList.map((e: any) => {
                          return <option value={e._id}>{e.serviceName}</option>;
                        })}
                      </select>
                      {formik.touched.serviceId && formik.errors.serviceId && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.serviceId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Category Name
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        {...formik.getFieldProps("categoryName")}
                        type="text"
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.categoryName &&
                              formik.errors.categoryName,
                          },
                          {
                            "is-valid":
                              formik.touched.categoryName &&
                              !formik.errors.categoryName,
                          }
                        )}
                        placeholder="Enter Category"
                      />
                      {formik.touched.categoryName &&
                        formik.errors.categoryName && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.categoryName}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Icon Image
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="file"
                        accept="image/*"
                        {...formik.getFieldProps("icon")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.icon && formik.errors.icon,
                          },
                          {
                            "is-valid":
                              formik.touched.icon && !formik.errors.icon,
                          }
                        )}
                        placeholder="Icon / Image"
                      />
                      {formik.touched.icon && formik.errors.icon && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.icon}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Order No
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("orderNo")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.orderNo && formik.errors.orderNo,
                          },
                          {
                            "is-valid":
                              formik.touched.orderNo && !formik.errors.orderNo,
                          }
                        )}
                        placeholder="Enter Order No"
                      />
                      {formik.touched.orderNo && formik.errors.orderNo && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.orderNo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Home Screen Order No
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("homeScreenOrderNo")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.homeScreenOrderNo &&
                              formik.errors.homeScreenOrderNo,
                          },
                          {
                            "is-valid":
                              formik.touched.homeScreenOrderNo &&
                              !formik.errors.homeScreenOrderNo,
                          }
                        )}
                        placeholder="Enter Order No"
                      />
                      {formik.touched.homeScreenOrderNo &&
                        formik.errors.homeScreenOrderNo && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.homeScreenOrderNo}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
                  Display In Home
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <div className="form-check form-check-sm form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          {...formik.getFieldProps("isDisplayOnHome")}
                          //checked= {formik.getFieldProps('isDisplayOnHome')}
                          checked={formik?.values?.isDisplayOnHome}
                          data-kt-check={formik.getFieldProps(
                            "isDisplayOnHome"
                          )}
                          data-kt-check-target=".widget-9-check"
                        />
                        {formik.touched.isDisplayOnHome &&
                          formik.errors.isDisplayOnHome && (
                            <div
                              style={{ color: "red" }}
                              className="fv-plugins-message-container"
                            >
                              <span role="alert">
                                {formik.errors.isDisplayOnHome}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {!loading && "Save Changes"}
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
            )}
      {isSuccess && (
        <AlertBox redirectUrl={`/category`} close={closeAlert} type={`success`}>
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

export default CategoryDetail;

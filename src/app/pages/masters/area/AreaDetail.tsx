import { FC, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { PageTitle } from '../../../../_metronic/layout/core';
import { useFormik } from 'formik';
import clsx from 'clsx';
import AlertBox from '../../../../common/AlertBox';
import { postRequest, patchRequest } from '../../../modules/auth/core/_requests';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const areaSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Minimum 3 Character')
        .max(50, 'Maximum 50 Character')
        .required('Area Name is required'),
    stateId: Yup.string()
        .required('State is required'),
    cityId: Yup.string()
        .required('City is required'),
    zipcode: Yup.number()
        .required('Zipcode is required'),
    countryId: Yup.string()
        .required('Country is required'),
})


const AreaDetail: FC = () => {
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState(``);
    const [errorMsg, setErrorMsg] = useState(``);
    const [isFailed, setIsFailed] = useState(false);
    const { areaId } = useParams();

    const initialValues = {
        name: '',
        stateId: '',
        countryId: '',
        cityId: '',
        zipcode: ''
    }

    const [formData, setFormData] = useState(initialValues);
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const closeAlert = () => {
        if (isSuccess) setIsSuccess(false);
        if (isFailed) setIsFailed(false);
    }

    const formik = useFormik({
        initialValues: formData,
        enableReinitialize: true,
        validationSchema: areaSchema,
        onSubmit: async (values) => {
            setLoading(true);

            let reqBody = {
                name: values?.name,
                stateId: values?.stateId,
                countryId: values?.countryId,
                cityId: values?.cityId,
                zipcode: values?.zipcode,
            }

            try {

                if (areaId !== 'create') {
                    await patchRequest(`/master/area/${areaId}`, reqBody)
                        .then((response) => {
                            if (response?.data?.status === 'ok') {
                                setIsSuccess(true);
                                setSuccessMsg(`Area has been updated successfully`);
                                setLoading(false);
                            } else {
                                setIsFailed(true);
                                setLoading(false);
                                setErrorMsg(`Something Went Wrong`);
                            }
                        });
                } else {
                    await postRequest(`/master/area`, reqBody)
                        .then((response) => {
                            if (response?.data?.status === 'ok') {
                                setIsSuccess(true);
                                setSuccessMsg(`Area has been added successfully`);
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
    })

    const getData = async () => {
        setLoading(true);
        const countryData = await postRequest(`/master/countries`, ``);
        // const stateData = await postRequest(`/master/states`, ``);
        const areaData = areaId !== 'create' ? await postRequest(`/master/areas`, { "_id": areaId }) : 0;
        // const cityData = await postRequest(`/master/cities`, ``);

        const lookupObj = [countryData, areaData];
        let data1: Array<any> = [];
        return Promise.allSettled(lookupObj)
            .then((result) => {

                result.forEach((res: any) => {
                    data1.push(res.value);
                })
                return data1;
            })
            .then((d) => {

                const dataobj = {
                    countryData: d[0]?.data?.status === 'ok' ? d[0]?.data?.data : 0, 
                    areaData: d[1] && d[1]?.data?.status === 'ok' ? d[1]?.data?.data[0] : [],
                   
                }
                setCountryList(dataobj?.countryData); 
                
                if (dataobj?.areaData) {
                    const initialValues = {
                        name: dataobj?.areaData?.name,
                        countryId: dataobj?.areaData?.countryId?._id,
                        stateId: dataobj?.areaData?.stateId?._id,
                        cityId: dataobj?.areaData?.cityId?._id,
                        zipcode: dataobj?.areaData?.zipcode,
                    }
                    setFormData(initialValues);
                }

                setLoading(false);
            })

    }

    const handleStateGet = (value: any) => { 
        getState(value);
    }
    const getState = async (value: any) => {
        const stateData = await postRequest(`/master/states`, { 'countryId': value });
        const lookupObj = [stateData];
        let data1: Array<any> = [];
        return Promise.allSettled(lookupObj)
            .then((result) => {

                result.forEach((res: any) => {
                    data1.push(res.value);
                })
                return data1;
            })
            .then((d) => {

                const dataobj = {
                    stateData: d[0]?.data?.status === 'ok' ? d[0]?.data?.data : [],
                }
                setStateList(dataobj?.stateData);
            });
    }

    const handleCityGet = (value: any) => { 
        getCity(value);
    }
    const getCity = async (value: any) => {
        const cityData = await postRequest(`/master/cities`, { 'stateId': value });
        const lookupObj = [cityData];
        let data1: Array<any> = [];
        return Promise.allSettled(lookupObj)
            .then((result) => {

                result.forEach((res: any) => {
                    data1.push(res.value);
                })
                return data1;
            })
            .then((d) => {

                const dataobj = {
                    cityData: d[0] && d[0]?.data?.status === 'ok' ? d[0]?.data?.data : [],
                }
                setCityList(dataobj?.cityData)

            });
    }


    useEffect(() => {

        async function loadData() {
            await getData();
        }
        loadData();
    }, [])




    return (
        <>
            <PageTitle>ADD/UPDATE AREA</PageTitle>
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
            <div className='row g-5 g-xl-8'>
                <div className={`card `}>

                    <div className='card-body py-3'>
                        <form onSubmit={formik.handleSubmit} noValidate className='form'>
                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Country</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <select

                                                name="countryId"
                                                value={formik.values.countryId}
                                                onChange={(event) => {
                                                    const selectedCountryId = event.target.value;
                                                    handleStateGet(selectedCountryId);   // Custom handler
                                                    formik.handleChange(event);          // Formik's handler
                                                }}
                                                onBlur={formik.handleBlur}
                                                className={clsx(
                                                    'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                    { 'is-invalid': formik.touched.countryId && formik.errors.countryId },
                                                    {
                                                        'is-valid': formik.touched.countryId && !formik.errors.countryId,
                                                    }
                                                )}
                                            >
                                                <option value=''>Select a Country...</option>
                                                {
                                                    countryList.map((e: any) => {
                                                        return <option value={e._id}>{e.iso3} - {e.name}</option>
                                                    })}
                                            </select>

                                            {formik.touched.countryId && formik.errors.countryId && (
                                                <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.countryId
                                                    }</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>State / Province</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <select
                                            
                                            name="stateId"
                                            value={formik.values.stateId}
                                            onChange={(event) => {
                                                const selectedStateId = event.target.value;
                                                handleCityGet(selectedStateId);   // Custom handler
                                                formik.handleChange(event);          // Formik's handler
                                            }}
                                            onBlur={formik.handleBlur} 
                                                className={clsx(
                                                    'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                    { 'is-invalid': formik.touched.stateId && formik.errors.stateId },
                                                    {
                                                        'is-valid': formik.touched.stateId && !formik.errors.stateId,
                                                    }
                                                )}
                                            >
                                                <option value=''>Select a State...</option>
                                                {
                                                    stateList.map((e: any) => {
                                                        return <option value={e._id}>{e.name}</option>
                                                    })}
                                            </select>

                                            {formik.touched.stateId && formik.errors.stateId && (
                                                <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.stateId
                                                    }</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>City</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <select
                                                {...formik.getFieldProps('cityId')}
                                                className={clsx(
                                                    'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                    { 'is-invalid': formik.touched.cityId && formik.errors.cityId },
                                                    {
                                                        'is-valid': formik.touched.cityId && !formik.errors.cityId,
                                                    }
                                                )}
                                            >
                                                <option value=''>Select a City...</option>
                                                {
                                                    cityList.map((e: any) => {
                                                        return <option value={e._id}>{e.name}</option>
                                                    })}
                                            </select>
                                            {formik.touched.cityId && formik.errors.cityId && (
                                                <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.cityId
                                                    }</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Area</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <input
                                                {...formik.getFieldProps('name')}
                                                type='text'
                                                className={clsx(
                                                    'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                    { 'is-invalid': formik.touched.name && formik.errors.name },
                                                    {
                                                        'is-valid': formik.touched.name && !formik.errors.name,
                                                    }
                                                )}
                                                placeholder='Enter Area'
                                            />
                                            {formik.touched.name && formik.errors.name && (
                                                <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Zipcode</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <input
                                                {...formik.getFieldProps('zipcode')}
                                                type='text'
                                                className={clsx(
                                                    'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                    { 'is-invalid': formik.touched.zipcode && formik.errors.zipcode },
                                                    {
                                                        'is-valid': formik.touched.zipcode && !formik.errors.zipcode,
                                                    }
                                                )}
                                                placeholder='Enter Zipcode'
                                            />
                                            {formik.touched.zipcode && formik.errors.zipcode && (
                                                <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.zipcode}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='card-footer d-flex justify-content-end py-6 px-9'>
                                <button type='submit' className='btn btn-primary' disabled={loading}>
                                    {!loading && 'Save Changes'}
                                    {loading && (
                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                            Please wait...{' '}
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            )}
            {isSuccess && <AlertBox redirectUrl={`/area`} close={closeAlert} type={`success`}>{successMsg}</AlertBox>}
            {isFailed && <AlertBox redirectUrl={null} close={closeAlert} type={`error`}>{errorMsg}</AlertBox>}

        </>
    )
}

export default AreaDetail;
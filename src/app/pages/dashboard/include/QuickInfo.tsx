import { KTIcon } from "../../../../_metronic/helpers";

const QuickInfo = () =>  {
  return (
    <>
    <div className='col-xl-6'>
        <div className='d-flex flex-wrap flex-stack mb-6'>
            <h3 className='fw-bolder my-2'>Quick Info</h3>
            <div className='d-flex my-2'>
                <select
                    name='status'
                    data-control='select2'
                    data-hide-search='true'
                    className='form-select form-select-white form-select-sm w-125px'
                    defaultValue='All Agents'
                >
                    <option value='All Agents'>All Agents</option>
                </select>
            </div>
        </div>

        <div className='row g-6 g-xl-9'>
                <div className='col-xl-4'>
                    {/* begin::Col */}
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            {/* begin::Symbol */}
                            <div className='symbol symbol-50px me-3'>
                                <div className='symbol-label bg-light-info'>
                                    <KTIcon iconName='handcart' className='fs-1 text-info' />
                                </div>
                            </div>
                            {/* end::Symbol */}

                            {/* begin::Title */}
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>25</div>
                                <div className='fs-7 text-muted fw-semibold'>Total</div>
                            </div>
                            {/* end::Title */}
                        </div>
                    </div>
                </div>

                <div className='col-xl-4'>
                    {/* begin::Col */}
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            {/* begin::Symbol */}
                            <div className='symbol symbol-50px me-3'>
                                <div className='symbol-label bg-light-info'>
                                    <KTIcon iconName='basket-ok' className='fs-1 text-success' />
                                </div>
                            </div>
                            {/* end::Symbol */}

                            {/* begin::Title */}
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>25</div>
                                <div className='fs-7 text-muted fw-semibold'>Completed</div>
                            </div>
                            {/* end::Title */}
                        </div>
                    </div>
                </div>

                <div className='col-xl-4'>
                    {/* begin::Col */}
                    <div className='col'>
                        <div className='d-flex align-items-center me-2'>
                            {/* begin::Symbol */}
                            <div className='symbol symbol-50px me-3'>
                                <div className='symbol-label bg-light-info'>
                                    <KTIcon iconName='handcart' className='fs-1 text-danger' />
                                </div>
                            </div>
                            {/* end::Symbol */}

                            {/* begin::Title */}
                            <div>
                                <div className='fs-4 text-gray-900 fw-bold'>25</div>
                                <div className='fs-7 text-muted fw-semibold'>Cancelled</div>
                            </div>
                            {/* end::Title */}
                        </div>
                    </div>
                </div>
        </div>

        <div className='row g-6 g-xl-9'> 
            <div className='col-xl-6'>
                <div className='d-flex align-items-center bg-light-warning rounded p-5 mb-7'>
                    <div className='flex-grow-1 me-2'>
                        <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                        PAY IN APPROVALS
                        </a>
                    </div>
                    <span className='fw-bold text-warning py-1'>5</span>
                </div>
            </div>  

            <div className='col-xl-6'>
                <div className='d-flex align-items-center bg-light-success rounded p-5 mb-7'>
                    <div className='flex-grow-1 me-2'>
                        <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                        PAY OUT APPROVALS
                        </a>
                    </div>
                    <span className='fw-bold text-warning py-1'>5</span>
                </div>
            </div>   

            <div className='col-xl-6'>
                <div className='d-flex align-items-center bg-light-danger rounded p-5 mb-7'>
                    <div className='flex-grow-1 me-2'>
                        <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                        MY PICKUP REQUEST
                        </a>
                    </div>
                    <span className='fw-bold text-warning py-1'>5</span>
                </div>
            </div>  

            <div className='col-xl-6'>
                <div className='d-flex align-items-center bg-light-info rounded p-5 mb-7'>
                    <div className='flex-grow-1 me-2'>
                        <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                        MY DELIVERY REQUEST
                        </a>
                    </div>
                    <span className='fw-bold text-warning py-1'>5</span>
                </div>
            </div> 

            <div className='col-xl-6'>
                <div className='d-flex align-items-center bg-light-info rounded p-5 mb-7'>
                    <div className='flex-grow-1 me-2'>
                        <a href='#' className='fw-bold text-gray-800 text-hover-primary fs-6'>
                        Bank Verification
                        </a>
                    </div>
                    <span className='fw-bold text-warning py-1'>5</span>
                </div>
            </div>   
        </div>
    
    </div>



    <div className='col-xl-6'>
        <div className='d-flex flex-wrap'>
            <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                <div className='d-flex align-items-center'>
                    <div className='fs-2 fw-bolder'>CASH PAYMENTS</div>
                </div>
            </div>

            <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                <div className='d-flex align-items-center'>
                    <div className='fs-2 fw-bolder'>DECLINE REQUESTS</div>
                </div>
            </div>

            <div className='d-flex my-2'>
                <select
                    name='status'
                    data-control='select2'
                    data-hide-search='true'
                    className='form-select form-select-white form-select-sm w-125px'
                    defaultValue='All Drivers'
                >
                    <option value='All Agents'>All Drivers</option>
                </select>
            </div>

        </div>    

        
            <div className='card-body pt-2'>
                <div className='d-flex align-items-center mb-8'>
                    <div className='flex-grow-1'>
                        <span className='text-muted fw-semibold d-block'>Order No</span>
                        <span className='text-muted fw-semibold d-block'>Date</span>
                        <span className='text-muted fw-semibold d-block'>By Customer Name</span>
                    </div>
        
                    <span className='badge badge-light-success fs-8 fw-bold'>Payment Pending</span>
                </div>
            </div>          
    </div>
    </>
  )
}

export default QuickInfo;
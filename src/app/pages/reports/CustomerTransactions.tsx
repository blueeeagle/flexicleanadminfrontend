import {FC} from 'react';
import { PageTitle } from '../../../_metronic/layout/core';

const CustomerTransactions : FC = () => {
    return (
        <>
            <PageTitle>CUSTOMER TRANSACTIONS</PageTitle>

            <div className='card mb-8'>

<div className='card-body bg-light-warning'>
    <div className='d-flex align-items-center'>
        <div className='col-md-8'>
            <div className='flex-grow-1'>
                <span className='text-muted fw-bold d-block'>1089</span>
                <span className='text-muted fw-semibold d-block'>BHD</span>
            </div>
        </div>


        <div className='col-md-2'>
            <button data-bs-toggle="modal" data-bs-target="#kt_modal_1" className='btn btn-sm fw-bold btn-primary'>Pay In</button>
            <button data-bs-toggle="modal" style={{marginLeft : '10px'}} data-bs-target="#kt_modal_1" className='btn btn-sm fw-bold btn-primary'>Pay Out</button>
        </div>

    </div>
</div>
</div>

<h3 className='card-title align-items-start flex-column mb-4'>
                <span className='card-label fw-bold fs-3 mb-1'>TRANSACTIONS</span>
            </h3>


<div className='card'>
            <div className='card-body bg-light'>
                <div className='d-flex align-items-center mb-8'>
                    <div className='col-md-5'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Order No / Date</span>
                                <span className='text-muted fw-semibold d-block'>Order Booked</span>
                            </div>
                    </div>

                    <div className='col-md-5'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Booking ID /Date</span>
                                <span className='text-muted fw-semibold d-block'>Agent Name</span>
                            </div>
                    </div>


                    <div className='col-md-2'>
                      <span   className='badge badge-warning fs-8 fw-bold'>2BHD</span>
                      <p>Pay In</p>
     
                    </div>
        
                </div>
            </div>   
        </div> 



        </>
    )
}

export default CustomerTransactions;
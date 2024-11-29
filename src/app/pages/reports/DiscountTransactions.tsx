import {FC} from 'react';
import { PageTitle } from '../../../_metronic/layout/core';

const DiscountTransactions : FC = () => {
    return (
        <>
            <PageTitle>DISCOUNT TRANSACTIONS</PageTitle>


<div style={{borderBottom: '1px solid blue', borderTop: '1px solid blue' }}>
            <div style={{padding: '10px'}}>
                <div className='d-flex align-items-center'>
                    <div className='col-md-2'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>DD/MM/YY</span>
                                <span className='text-muted fw-semibold d-block'>Time</span>
                            </div>
                    </div>

                    <div className='col-md-2'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Booking ID</span>
                            </div>
                    </div>

                    <div className='col-md-2'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Customer Name / Email Id</span>
                                <span className='text-muted fw-bold d-block'>Mobile No</span>
                            </div>
                    </div>

                    <div className='col-md-2'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Customer Name / Email Id</span>
                            </div>
                    </div>


                    <div className='col-md-1'>
                      <p>5 BHD</p>
                      <p>Order Value</p>
                    </div>

                    <div className='col-md-1'>
                      <p>5 BHD</p>
                      <p>Discount</p>
                    </div>

                    <div className='col-md-1'>
                      <p>5 BHD</p>
                      <p>Final Value</p>
                    </div>
        
                </div>
            </div>   
        </div> 



        </>
    )
}

export default DiscountTransactions;
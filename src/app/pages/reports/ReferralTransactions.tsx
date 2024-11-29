import {FC} from 'react';
import { PageTitle } from '../../../_metronic/layout/core';

const ReferralTransactions : FC = () => {
    return (
        <>
            <PageTitle>REFERRAL TRANSACTIONS</PageTitle>


<div style={{borderBottom: '1px solid blue', borderTop: '1px solid blue' }}>
            <div style={{padding: '10px'}}>
                <div className='d-flex align-items-center'>
                    <div className='col-md-3'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>DD/MM/YY</span>
                                <span className='text-muted fw-semibold d-block'>Time</span>
                            </div>
                    </div>

                    <div className='col-md-3'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Referral Name</span>
                            </div>
                    </div>

                    <div className='col-md-3'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Customer Name / Email Id</span>
                            </div>
                    </div>


                    <div className='col-md-3'>
                      <p>5 BHD</p>
                      <p>Credits</p>
     
                    </div>
        
                </div>
            </div>   
        </div> 



        </>
    )
}

export default ReferralTransactions;
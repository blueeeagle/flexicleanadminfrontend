import { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";

const CustomerGiftCards : FC = () => {
    return (
        <>
          <PageTitle>GIFT CARDS</PageTitle>

            <div className='card mb-8'>

                <div className='card-body bg-light-warning'>
                    <div className='d-flex align-items-center'>
                        <div className='col-md-12'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>15BHD</span>
                                <span className='text-muted fw-semibold d-block'>CREDIT RECEIVED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            <h3 className='card-title align-items-start flex-column mb-4'>
                <span className='card-label fw-bold fs-3 mb-1'>TRANSACTIONS</span>
            </h3>

            <div className='card mb-8'>
                <div className='card-body bg-light'>
                    <div className='d-flex align-items-center'>
                        <div className='col-md-6'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Title</span>
                                <span className='text-muted fw-semibold d-block'>Hey you got new Gift</span>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Data Received</span>
                            </div>
                        </div>


                        <div className='col-md-2'>
                            <div className='flex-grow-1'>
                                <span  className='badge badge-warning fs-8 fw-bold'>2 BHD</span>

                                <span className='text-muted fw-semibold d-block'>Add to Wallet</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>   

            <div className='card mb-8'>
                <div className='card-body bg-light'>
                    <div className='d-flex align-items-center'>
                        <div className='col-md-6'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Title</span>
                                <span className='text-muted fw-semibold d-block'>Hey you got new Gift</span>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Data Received</span>
                            </div>
                        </div>


                        <div className='col-md-2'>
                            <div className='flex-grow-1'>
                                <span  className='badge badge-warning fs-8 fw-bold'>2 BHD</span>

                                <span className='text-muted fw-semibold d-block'>Add to Wallet</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>  


        </>
    )
}

export default CustomerGiftCards;
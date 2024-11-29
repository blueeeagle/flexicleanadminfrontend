import { FC } from 'react';
import { KTIcon } from '../../../../_metronic/helpers';

const RegisterList:  FC = () => {
    return (
        <>
              <div className={`card mb-5 mb-xl-12`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>RECENTLY REGISTER</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>RECENT 10 LIST</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-5'>
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className='p-0 w-50px'></th>
                <th className='p-0 min-w-150px'></th>
                <th className='p-0 min-w-150px'></th>
                <th className='p-0 min-w-125px'></th>
                <th className='p-0 min-w-40px'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-12'>
                   Customer Name
                  </a>
                  <span className='text-muted fw-semibold d-block fs-12'>Mobile No / Email Id</span>
                </td>
                <td className='text-end'>
                  <span className='badge badge-light-danger fw-semibold me-1'>Registered On</span>
                </td>
                <td>
                  <a href='#' className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'>
                   <KTIcon iconName='arrow-right' className='fs-2' />
                  </a>
                </td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* end::Body */}
    </div>

        </>
    )
}

export default RegisterList;
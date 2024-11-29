import {FC} from 'react';
import {useIntl} from 'react-intl';
import {PageTitle} from '../../../_metronic/layout/core';
import RegisterList from './include/RegisterList';
import QuickInfo from './include/QuickInfo';

import {
    StatisticsWidget5,
    StatisticsWidget1
} from '../../../_metronic/partials/widgets';

const DashboardModule : FC = () => (
    <>
        <div className='row g-5 g-xl-8'>
            <div className='row g-5 col-xl-6'>
                <div className='col-xl-6'>
                    <StatisticsWidget5
                        className='card-xl-stretch mb-xl-8'
                        svgIcon='basket'
                        color='danger'
                        iconColor='white'
                        title='Customers'
                        titleColor='white'
                        description='100'
                        descriptionColor='white'
                    />
                </div>

                <div className='col-xl-6'>
                    <StatisticsWidget5
                        className='card-xl-stretch mb-5 mb-xl-8'
                        svgIcon='chart-simple-3'
                        color='success'
                        iconColor='white'
                        title='Agents'
                        titleColor='white'
                        description='100'
                        descriptionColor='white'
                    />
                </div>

                <div className='col-xl-12'>
                    <RegisterList />
                </div>
            </div> 

            <div className='row g-5 col-xl-6'>
                <div className='col-xl-4'>
                    <StatisticsWidget1
                        className='mb-xl-8'
                        image='abstract-4.svg'
                        title='Gross Collection'
                        time='5000 HD'
                        description=''
                    />
                </div>
                <div className='col-xl-4'>
                    <StatisticsWidget1
                        className='mb-xl-8'
                        image='abstract-2.svg'
                        title='Payment Paid'
                        time='2500 BHD'
                        description=''
                    />
                </div>
                <div className='col-xl-4'>
                    <StatisticsWidget1
                        className='mb-xl-8'
                        image='abstract-1.svg'
                        title='Net Revenue'
                        time='2500 BHD'
                        description=''
                    />
                </div>
            </div>    
        </div>

        <div className='row g-5 g-xl-8'>
            <QuickInfo />
        </div>

    </>
)   

const Dashboard: FC = () => {
    const intl = useIntl()
    return (
      <>
        <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
        <DashboardModule />
      </>
    )
  }

export  { Dashboard };
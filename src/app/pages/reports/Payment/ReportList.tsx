import React from 'react';

interface ReportListProps {
  filteredData: any;
  getTotal: (data: any) => number;
  setSelectedLine: (line: string) => void;
}

const ReportList: React.FC<ReportListProps> = ({
  filteredData,
  getTotal,
  setSelectedLine,
}) => {
  return (
    <ul className="report-list">
      <li className="border-custom-reports" onClick={() => setSelectedLine('Subscription')}>
        <i className={`fa-icon fa-subscription fa fa-money-bill-wave`} />
        <div>
          <h1>SUBSCRIBE</h1>
          <span>{getTotal(filteredData.Subscription)}</span>
        </div>
      </li>
      <li className="border-custom-reports mt-5" onClick={() => setSelectedLine('Logistics')}>
        <i className={`fa-icon fa-logistics fa fa-truck`} />
        <div>
          <h1>LOGISTICS</h1>
          <span>{getTotal(filteredData.Logistics)}</span>
        </div>
      </li>
      <li className="border-custom-reports mt-5" onClick={() => setSelectedLine('Additional')}>
        <i className={`fa-icon fa-additional fa fa-box`} />
        <div>
          <h1>M-CREDITS</h1>
          <span>{getTotal(filteredData.Additional)}</span>
        </div>
      </li>
    </ul>
  );
};

export default ReportList;

import React from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

interface PaymentTableProps {
  paymentRows: any[];
  paymentColumns: GridColDef[];
  paginationModel: GridPaginationModel;
  setPaginationModel: (model: GridPaginationModel) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({
  paymentRows,
  paymentColumns,
  paginationModel,
  setPaginationModel,
}) => {
  return (
    <DataGrid
      rows={paymentRows}
      columns={paymentColumns}
      hideFooter={true}
      checkboxSelection
      paginationModel={paginationModel}
      onPaginationModelChange={(model) => setPaginationModel(model)}
    />
  );
};

export default PaymentTable;

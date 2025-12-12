import { useState } from 'react';
import { Pagination, Table } from 'rsuite';

export interface ColumnDefinition<T> {
  key: keyof T; // The key in the data object this column represents
  header: string; // The column header text
  width?: number; // Optional: Column width
  render?: (value: T[keyof T], row: T) => React.ReactNode; // Optional: Custom cell render
}

interface TableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
}

const ReportTable = <T extends object>({ data, columns }: TableProps<T>) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const tableData = data.slice((page - 1) * limit, page * limit);

  return (
    <>
      <div className="mt-5 mb-2">
        <Table data={tableData} bordered cellBordered autoHeight>
          {columns.map((col, index) => (
            <Table.Column key={index} width={col.width || 200} align="center">
              <Table.HeaderCell>{col.header}</Table.HeaderCell>
              <Table.Cell dataKey={col.key as string}>
                {(rowData: T) => {
                  const cellValue = rowData[col.key];
                  return col.render
                    ? col.render(cellValue, rowData)
                    : String(cellValue); // Ensure it is a ReactNode
                }}
              </Table.Cell>
            </Table.Column>
          ))}
        </Table>
      </div>
      <div>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={data.length}
          limitOptions={[5, 10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </>
  );
};

export default ReportTable;

import { AddOutline } from '@rsuite/icons';
import { Link } from 'react-router-dom';
import { Button, Pagination, Table } from 'rsuite';
import { IGeofence } from '../../types/geofence';
import mockGeofence from '../../mockData/Geofence';
import { useState } from 'react';

export default function Geofence() {
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const { Column, HeaderCell, Cell } = Table;

  const handleEdit = (geofence: IGeofence) => {
    console.log(geofence);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete organization with ID: ${id}`);
  };

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = mockGeofence.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Geofence
          </span>
        </div>
        <Link to="/geofence/create">
          <Button
            size="lg"
            className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
            startIcon={<AddOutline />}
          >
            Add Geofence
          </Button>
        </Link>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          <Table<IGeofence, string> autoHeight data={data}>
            <Column align="center" fixed>
              <HeaderCell>#</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={220}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={220}>
              <HeaderCell>Geofence Type</HeaderCell>
              <Cell dataKey="typeName" />
            </Column>

            <Column width={220}>
              <HeaderCell>Created At</HeaderCell>
              <Cell dataKey="createdAt" />
            </Column>

            <Column width={200}>
              <HeaderCell align="center">Action</HeaderCell>
              <Cell align="center">
                {(rowData: IGeofence) => (
                  <>
                    <span
                      className="text-cyan-950 cursor-pointer mr-2"
                      onClick={() => handleEdit(rowData)}
                    >
                      Edit
                    </span>
                    <span
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(rowData.id.toString())}
                    >
                      Delete
                    </span>
                  </>
                )}
              </Cell>
            </Column>
          </Table>
        </div>
        <div className="p-4">
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
            total={mockGeofence.length}
            limitOptions={[5, 10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </div>
    </>
  );
}

import { Button } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import { Table, Pagination } from 'rsuite';
import mockCluster from '../../mockData/Cluster';
import { useState } from 'react';
import IModal from '../../components/modal/Modal';
import { ICluster } from '../../types/cluster';
import { useNavigate } from 'react-router-dom';

export default function Site() {
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [addClusterModal, setAddClusterModal] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<ICluster | null>(null);
  const { Column, HeaderCell, Cell } = Table;

  const navigate = useNavigate();

  const handleEdit = (tenant: ICluster) => {
    setSelectedCluster(tenant);
    setAddClusterModal(true);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete organization with ID: ${id}`);
  };

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = mockCluster.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <>
      
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Clusters
          </span>
        </div>
        <Button
          size="lg"
          className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
          startIcon={<AddOutlineIcon />}
          onClick={() => navigate('/clusters/create')}
        >
          New Cluster
        </Button>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          <Table height={420} data={data}>
            <Column align="center" fixed>
              <HeaderCell>#</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={160}>
              <HeaderCell>Tenant</HeaderCell>
              <Cell dataKey="tenantName" />
            </Column>

            <Column width={160}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={130}>
              <HeaderCell>Location</HeaderCell>
              <Cell dataKey="locations" />
            </Column>

            <Column>
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="status" />
            </Column>

            <Column width={150}>
              <HeaderCell align="center">Action</HeaderCell>
              <Cell align="end">
                {(rowData: ICluster) => (
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
              total={mockCluster.length}
              limitOptions={[5, 10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
          </div>
        </div>
      </div>
    </>
  );
}

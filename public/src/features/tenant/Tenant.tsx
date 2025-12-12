import { Button } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import { Table, Pagination } from 'rsuite';
import mockTenant from '../../mockData/Tenant';
import { useState } from 'react';
import IModal from '../../components/modal/Modal';
import AddNewTenantForm from './AddNewTenantForm';
import { ITenant } from '../../types/tenant';

export default function Tenant() {
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [addTenantModal, setAddTenantModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<ITenant | null>(null);
  const { Column, HeaderCell, Cell } = Table;

  const handleEdit = (tenant: ITenant) => {
    setSelectedTenant(tenant);
    setAddTenantModal(true);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete organization with ID: ${id}`);
  };

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = mockTenant.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <>
      <IModal
        backdrop={false}
        toggleModal={addTenantModal}
        onClose={() => {
          setAddTenantModal(false);
          setSelectedTenant(null);
        }}
      >
        <AddNewTenantForm
          onClose={() => {
            setAddTenantModal(false);
          }}
          action={selectedTenant ? 'EDIT' : 'ADD_NEW'}
          tenant={selectedTenant}
        />
      </IModal>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Tenant
          </span>
        </div>
        <Button
          size="lg"
          className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
          startIcon={<AddOutlineIcon />}
          onClick={() => setAddTenantModal(true)}
        >
          New Tenant
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
              <HeaderCell>Organization</HeaderCell>
              <Cell dataKey="organizationName" />
            </Column>

            <Column width={160}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={200}>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column width={130}>
              <HeaderCell>Contact Number</HeaderCell>
              <Cell dataKey="contactNumber" />
            </Column>

            <Column width={200}>
              <HeaderCell>Address</HeaderCell>
              <Cell dataKey="address" />
            </Column>

            <Column>
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="status" />
            </Column>

            <Column width={150}>
              <HeaderCell align="end">Action</HeaderCell>
              <Cell align="end">
                {(rowData: ITenant) => (
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
              total={mockTenant.length}
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

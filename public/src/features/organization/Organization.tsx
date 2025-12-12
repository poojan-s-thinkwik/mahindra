import { Button } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import { Table, Pagination } from 'rsuite';
import mockOrganization from '../../mockData/Organization';
import { useState } from 'react';
import IModal from '../../components/modal/Modal';
import AddNewOrganizationForm from './AddNewOrganizationForm';
import { IOrganization } from '../../types/organization';

export default function Organization() {
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [addOrganizationModal, setAddOrganizationModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<IOrganization | null>(null);
  const { Column, HeaderCell, Cell } = Table;

  const handleEdit = (organization: IOrganization) => {
    setSelectedOrganization(organization);
    setAddOrganizationModal(true);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete organization with ID: ${id}`);
  };

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = mockOrganization.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <>
      <IModal
        backdrop={false}
        toggleModal={addOrganizationModal}
        onClose={() => {
          setAddOrganizationModal(false);
          setSelectedOrganization(null);
        }}
      >
        <AddNewOrganizationForm
          onClose={() => {
            setAddOrganizationModal(false);
            setSelectedOrganization(null);
          }}
          action={selectedOrganization ? 'EDIT' : 'ADD_NEW'}
          organization={selectedOrganization}
        />
      </IModal>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Organizations
          </span>
        </div>
        <Button
          size="lg"
          className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
          startIcon={<AddOutlineIcon />}
          onClick={() => setAddOrganizationModal(true)}
        >
          New Organization
        </Button>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          <Table<IOrganization, string> height={420} data={data}>
            <Column align="center" fixed>
              <HeaderCell>#</HeaderCell>
              <Cell dataKey="id" />
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
                {(rowData: IOrganization) => (
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
              total={mockOrganization.length}
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

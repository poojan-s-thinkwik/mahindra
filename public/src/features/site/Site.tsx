import { Button } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import { Table, Pagination } from 'rsuite';
import mockSite from '../../mockData/Site';
import { useState } from 'react';
import IModal from '../../components/modal/Modal';
import AddNewSiteForm from './AddNewSiteForm';
import { ISite } from '../../types/site';

export default function Site() {
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [addSiteModal, setAddSiteModal] = useState(false);
  const [selectedSite, setSelectedSite] = useState<ISite | null>(null);
  const { Column, HeaderCell, Cell } = Table;

  const handleEdit = (site: ISite) => {
    setSelectedSite(site);
    setAddSiteModal(true);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete site with ID: ${id}`);
  };

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = mockSite.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <>
      <IModal
        backdrop={false}
        toggleModal={addSiteModal}
        onClose={() => {
          setAddSiteModal(false);
          setSelectedSite(null);
        }}
      >
        <AddNewSiteForm
          onClose={() => {
            setAddSiteModal(false);
          }}
          action={selectedSite ? 'EDIT' : 'ADD_NEW'}
          site={selectedSite}
        />
      </IModal>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">Sites</span>
        </div>
        <Button
          size="lg"
          className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
          startIcon={<AddOutlineIcon />}
          onClick={() => setAddSiteModal(true)}
        >
          New Site
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
                {(rowData: ISite) => (
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
              total={mockSite.length}
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

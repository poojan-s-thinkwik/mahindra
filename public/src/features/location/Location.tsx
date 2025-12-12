import { AddOutline } from '@rsuite/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Pagination, Table, IconButton } from 'rsuite';
import mockLocation from '../../mockData/Location';
import { ILocation } from '../../types/location';
import { toast } from 'react-toastify';
import apiRequest from '../../utils/api-request';
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import ConfirmModal from '../../components/common/ConfirmModal';
import ComponentLoader from '../../components/loader/ComponentLoader';
import NoDataFound from '../../components/common/NoDataFound';

export default function Location() {
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const { Column, HeaderCell, Cell } = Table;
  const navigate = useNavigate();

  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [deletingWarehouseId, setDeletingWarehouseId] = useState(null);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const handleEdit = (location: ILocation) => {
    navigate('/location/create', {
      state: { location },
    });
  };

  const handleDelete = (id: number) => {
    console.log(`Delete location with ID: ${id}`);
  };

  const getWarehouses = async () => {
    try {
      setLoading(true);
      const resp: any = await apiRequest({ url: '/master/warehouse' });
      const data = (resp || []).map((d: any, i: any) => ({...d, index: i + 1}))
      setWarehouses(data);
      setLoading(false); 
    } catch(err: any) {
      toast.error(err.message);
    }
  }


  useEffect(() => {
    getWarehouses();
  }, []);

  const handleConfirmationDelete = async (option: any) => {
    try {
      if (option) {
        const resp: any = await apiRequest({ url: '/master/warehouse/' + deletingWarehouseId, method: 'DELETE' });
        toast.success(resp.message);
        await getWarehouses();
      } else {
        setDeletingWarehouseId(null);
      }
    } catch(err: any) {
      toast.error(err.message);
    }
    setConfirmModalShow(false);
  }

  const handleDeleteWarehouse = (id: any) => {
    setDeletingWarehouseId(id);
    setConfirmModalShow(true);
  }

  return (
    <>
      <ConfirmModal show={confirmModalShow} message="Do you to delete the warehouse?" onClose={handleConfirmationDelete} />

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            WAREHOUSE
          </span>
        </div>
        <Link to="/location/create">
          <Button
            size="lg"
            className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
            startIcon={<AddOutline />}
          >
            Add Warehouse
          </Button>
        </Link>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          {loading && <ComponentLoader />}
          {!loading && !warehouses.length && <NoDataFound />}
          {!loading && warehouses.length &&
          <Table autoHeight data={warehouses}>
            <Column align="center" fixed>
              <HeaderCell>#</HeaderCell>
              <Cell dataKey="index" />
            </Column>

            <Column width={100}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={150}>
              <HeaderCell>State</HeaderCell>
              <Cell dataKey="state.name" />
            </Column>

            <Column width={150}>
              <HeaderCell>Latitude</HeaderCell>
              <Cell dataKey="latitude" />
            </Column>

            <Column width={100}>
              <HeaderCell>Longitude</HeaderCell>
              <Cell dataKey="longitude" />
            </Column>

            <Column width={150}>
              <HeaderCell align="end">Action</HeaderCell>
              <Cell align="end">
                {(rowData: ILocation) => (
                  <>
                    <IconButton icon={<EditIcon />} style={{marginTop: '-1vh', marginRight: '1vh'}} onClick={() => navigate('/warehouse/edit/' + rowData.id)} />
                    <IconButton icon={<TrashIcon />} style={{marginTop: '-1vh'}} onClick={() => handleDeleteWarehouse(rowData.id)} />
                  </>
                )}
              </Cell>
            </Column>
          </Table>}
          {/* <div>
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
              total={mockLocation.length}
              limitOptions={[5, 10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}

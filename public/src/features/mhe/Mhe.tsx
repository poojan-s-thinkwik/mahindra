import AddOutlineIcon from '@rsuite/icons/AddOutline';
import { Link } from 'react-router-dom';
import { Button, Pagination, Table, IconButton } from 'rsuite';
import mockMhe from '../../mockData/Mhe';
import { useEffect, useState } from 'react';
import apiRequest from '../../utils/api-request';
import ComponentLoader from '../../components/loader/ComponentLoader';
import NoDataFound from '../../components/common/NoDataFound';
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from '@rsuite/icons/Edit';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/common/ConfirmModal';
import { toast } from 'react-toastify';

export default function Mhe() {
  const navigate = useNavigate();

  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const { Column, HeaderCell, Cell } = Table;
  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

  const [mhes, setMhes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [deletingMheId, setDeletingMheId] = useState<any>();

  // const data = mockMhe.filter((v, i) => {
  //   const start = limit * (page - 1);
  //   const end = start + limit;
  //   return i >= start && i < end;
  // });

  const handleMheDelete = (id: any) => {
    setDeletingMheId(id);
    setConfirmModalShow(true);
  }

  const getMhes = async () => {
    try {
      setLoading(true);
      const resp = await apiRequest({ url: '/master/mhe' });
      const data = (resp || []).map((d: any, i: any) => ({...d, index: i + 1}))
      setMhes(data);
      setLoading(false);
    } catch(err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getMhes();
  }, [])

  const handleConfirmationDelete = async (option: any) => {
    try {
      if (option) {
        const resp: any = await apiRequest({ url: '/master/mhe/' + deletingMheId, method: 'DELETE' });
        toast.success(resp.message);
        await getMhes();
      } else {
        setDeletingMheId(null);
      }
    } catch(err: any) {
      toast.error(err.message);
    }
    setConfirmModalShow(false);
  }

  return (
    <>

      <ConfirmModal show={confirmModalShow} message="Do you to delete the MHE?" onClose={handleConfirmationDelete} />

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">MHE</span>
        </div>
        <Link to="/mhe/create">
          <Button
            size="lg"
            className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
            startIcon={<AddOutlineIcon />}
          >
            Add MHE
          </Button>
        </Link>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          {loading && <ComponentLoader />}

          {!loading && !mhes.length && <NoDataFound />}

          {!loading && mhes.length && 
          <Table autoHeight data={mhes}>
            <Column align="center" fixed>
              <HeaderCell>#</HeaderCell>
              <Cell dataKey="index" />
            </Column>

            <Column width={160}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={200}>
              <HeaderCell>Warehouse</HeaderCell>
              <Cell dataKey="warehouse.name" />
            </Column>

            <Column width={200}>
              <HeaderCell>Device</HeaderCell>
              <Cell dataKey="device.name" />
            </Column>

            <Column width={200}>
              <HeaderCell>IMEI</HeaderCell>
              <Cell dataKey="device.imei" />
            </Column>

            <Column width={200}>
              <HeaderCell>Action</HeaderCell>
              <Cell>
              {(rowData: any) => <>
                <IconButton icon={<EditIcon />} style={{marginTop: '-1vh', marginRight: '1vh'}} onClick={() => navigate('/mhe/edit/' + rowData.id)} />
                <IconButton icon={<TrashIcon />} style={{marginTop: '-1vh'}} onClick={() => handleMheDelete(rowData.id)} />
                </>
              }
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
              total={mockMhe.length}
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

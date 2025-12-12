import { AddOutline } from '@rsuite/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Pagination, Table, IconButton } from 'rsuite';
import mockShift from '../../mockData/Shift';
import { IShift } from '../../types/shift';
import { useEffect } from'react';
import { toast } from'react-toastify';
import apiRequest from '../../utils/api-request';
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import ConfirmModal from '../../components/common/ConfirmModal';
import ComponentLoader from '../../components/loader/ComponentLoader';
import NoDataFound from '../../components/common/NoDataFound';

export default function Shift() {
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const { Column, HeaderCell, Cell } = Table;
  const navigate = useNavigate();

  const [shifts, setShifts] = useState<any>([]);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [deletingShiftId, setDeletingShiftId] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };



  const handleEdit = (shift: IShift) => {
    navigate('/shift/create', {
      state: { shift },
    });
  };

  const handleDelete = (id: string) => {
    console.log(`Delete shift with ID: ${id}`);
  };

  const getShifts = async () => {
    try {
      setLoading(true);
      const resp: any = await apiRequest({ url: '/master/shift' });
      const data = (resp || []).map((d: any, i: any) => ({...d, index: i + 1}));
      setShifts(data);
      setLoading(false);
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getShifts();
  }, []);

  const handleShiftDelete = (id: any) => {
    setDeletingShiftId(id);
    setConfirmModalShow(true);
  }

  const handleConfirmationDelete = async (option: any) => {
    try {
      if (option) {
        const resp: any = await apiRequest({ url: '/master/shift/' + deletingShiftId, method: 'DELETE' });
        toast.success(resp.message);
        await getShifts();
      } else {
        setDeletingShiftId(null);
      }
    } catch(err: any) {
      toast.error(err.message);
    }
    setConfirmModalShow(false);
  }

  return (
    <>
      <ConfirmModal show={confirmModalShow} message="Do you to delete the shift?" onClose={handleConfirmationDelete} />


      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">SHIFT</span>
        </div>
        <Link to="/shift/create">
          <Button
            size="lg"
            className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
            startIcon={<AddOutline />}
          >
            Add Shift
          </Button>
        </Link>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          {loading && <ComponentLoader />}
          {!loading && !shifts.length && <NoDataFound />}
          {!loading && shifts.length &&
          <Table autoHeight data={shifts}>
            <Column align="center" fixed>
              <HeaderCell>#</HeaderCell>
              <Cell dataKey="index" />
            </Column>


            <Column width={150}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={150}>
              <HeaderCell>Warehouse</HeaderCell>
              <Cell dataKey="warehouse.name" />
            </Column>

            

            <Column width={130}>
              <HeaderCell>Start Time</HeaderCell>
              <Cell>
                {(rowData: any) => (`${rowData.startTime} - ${rowData.endTime}`)}
              </Cell>
            </Column>

            <Column width={130}>
              <HeaderCell>Tea Break</HeaderCell>
              <Cell>
                {(rowData: any) => (`${rowData.teaBreakStartTime} - ${rowData.teaBreakEndTime}`)}
              </Cell>
            </Column>

            <Column width={130}>
              <HeaderCell>Lunch Break</HeaderCell>
              <Cell>
                {(rowData: any) => (`${rowData.lunchBreakStartTime} - ${rowData.lunchBreakEndTime}`)}
              </Cell>
            </Column>

            <Column width={130}>
              <HeaderCell>Setup Time</HeaderCell>
              <Cell>
                {(rowData: any) => (`${rowData.setupStartTime} - ${rowData.setupEndTime}`)}
              </Cell>
            </Column>

            <Column width={130}>
              <HeaderCell>Bio Break</HeaderCell>
              <Cell>
                {(rowData: any) => (`${rowData.bioBreakStartTime} - ${rowData.bioBreakEndTime}`)}
              </Cell>
            </Column>

            {/* <Column width={100}>
              <HeaderCell>Tea Break</HeaderCell>
              <Cell dataKey="teaBreak" />
            </Column>

            <Column width={100}>
              <HeaderCell>Lunch Break</HeaderCell>
              <Cell dataKey="lunchBreak" />
            </Column>

            <Column width={100}>
              <HeaderCell>Set Up Time</HeaderCell>
              <Cell dataKey="setUpTime" />
            </Column>

            <Column>
              <HeaderCell>Bio Break</HeaderCell>
              <Cell dataKey="bioBreak" />
            </Column> */}

            <Column width={150}>
              <HeaderCell align="end">Action</HeaderCell>
              <Cell align="end">
                {(rowData: IShift) => (
                  <>
                    <IconButton icon={<EditIcon />} style={{marginTop: '-1vh', marginRight: '1vh'}} onClick={() => navigate('/shift/edit/' + rowData.id)} />
                    <IconButton icon={<TrashIcon />} style={{marginTop: '-1vh'}} onClick={() => handleShiftDelete(rowData.id)} />
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
              total={mockShift.length}
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

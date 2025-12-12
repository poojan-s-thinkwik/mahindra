import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Table, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline'
import apiRequest from '../utils/api-request'
import { toast } from 'react-toastify'
import ComponentLoader from '../components/loader/ComponentLoader'
import NoDataFound from '../components/common/NoDataFound'
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import ConfirmModal from '../components/common/ConfirmModal'

const { Column, HeaderCell, Cell } = Table;

const Device = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [devices, setDevices] = useState([]);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    const [deletingDeviceId, setDeletingDeviceId] = useState(null);

    const getDevices = async () => {
        try {
            setLoading(true);
            const resp = await apiRequest({ url: '/master/device' });
            const data = (resp || []).map((d: any, i: any) => ({...d, index: i + 1}))
            setDevices(data);
            setLoading(false);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getDevices();
    }, []);

    const handleDeviceDelete = (id: any) => {
        setDeletingDeviceId(id);
        setConfirmModalShow(true);
    }

    const handleConfirmationDelete = async (option: any) => {
        try {
          if (option) {
            const resp: any = await apiRequest({ url: '/master/mhe/' + deletingDeviceId, method: 'DELETE' });
            toast.success(resp.message);
            await getDevices();
          } else {
            setDeletingDeviceId(null);
          }
        } catch(err: any) {
          toast.error(err.message);
        }
        setConfirmModalShow(false);
      }

  return (
    <>
      <ConfirmModal show={confirmModalShow} message="Do you to delete the device?" onClose={handleConfirmationDelete} />

      
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-3xl text-custom-blue font-semibold">
                    Devices
                </span>
            </div>
                <Button
                size="lg"
                className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
                startIcon={<AddOutlineIcon />}
                onClick={() => navigate('/device/create')}
                >
                  New Device
            </Button>
        </div>

        <div className="bg-white w-full h-auto mt-3 rounded-md">
            <div className="p-4">
                {loading && <ComponentLoader />}
                {!loading && !devices.length && <NoDataFound />}
                {!loading && devices.length &&
                <Table autoHeight data={devices}>
                    <Column align="center" fixed>
                        <HeaderCell>#</HeaderCell>
                        <Cell dataKey="index" />
                    </Column>
                    <Column width={150}>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column width={150}>
                        <HeaderCell>Device Type</HeaderCell>
                        <Cell dataKey="deviceType.name" />
                    </Column>
                    <Column width={150}>
                        <HeaderCell>IMEI</HeaderCell>
                        <Cell dataKey="imei" />
                    </Column>
                    <Column width={150}>
                        <HeaderCell>SIM 2</HeaderCell>
                        <Cell dataKey="sim2" />
                    </Column>
                    <Column width={150}>
                        <HeaderCell>SIM 1</HeaderCell>
                        <Cell dataKey="sim1" />
                    </Column>

                    <Column width={200}>
                        <HeaderCell>Action</HeaderCell>
                        <Cell>
                        {(rowData: any) => <>
                            <IconButton icon={<EditIcon />} style={{marginTop: '-1vh', marginRight: '1vh'}} onClick={() => navigate('/device/edit/' + rowData.id)} />
                            <IconButton icon={<TrashIcon />} style={{marginTop: '-1vh'}} onClick={() => handleDeviceDelete(rowData.id)} />
                            </>
                        }
                        </Cell>
                    </Column>
                </Table>}
            </div>
        </div>
    </>
  )
}

export default Device
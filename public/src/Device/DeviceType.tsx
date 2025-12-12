import React, { useState, useEffect } from 'react'
import apiRequest from '../utils/api-request'
import { toast } from 'react-toastify';
import { Link } from'react-router-dom';
import { AddOutline } from '@rsuite/icons';
import { Table, Button } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const DeviceType = () => {

    const [deviceTypes, setDeviceTypes] = useState([]);

    const getDeviceTypes = async () => {
        try {
            const resp = await apiRequest({ url: '/master/device-type'});
            setDeviceTypes(resp);
        } catch(err: any) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        getDeviceTypes();
    }, []);

  return (
    <>
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-3xl text-custom-blue font-semibold">
                    Device Types
                </span>
            </div>
            <Link to="/device-type/create">
            <Button
                size="lg"
                className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
                startIcon={<AddOutline />}
            >
                Add Device Type
            </Button>
            </Link>
        </div>

        <div className="bg-white w-full h-auto mt-3 rounded-md">
            <div className="p-4">
                <Table height={420} data={deviceTypes}>
                    <Column align="center" fixed>
                        <HeaderCell>#</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={300}>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column width={200}>
                        <HeaderCell>IP</HeaderCell>
                        <Cell dataKey="ip" />
                    </Column>
                    <Column width={200}>
                        <HeaderCell>Port</HeaderCell>
                        <Cell dataKey="port" />
                    </Column>
                </Table>
            </div>
        </div>
    </>
  )
}

export default DeviceType
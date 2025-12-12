import { AddOutline } from '@rsuite/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Pagination, Table, IconButton } from 'rsuite';
import { toast } from 'react-toastify';
import apiRequest from '../../utils/api-request';
import ComponentLoader from '../../components/loader/ComponentLoader';
import NoDataFound from '../../components/common/NoDataFound';
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import ConfirmModal from '../../components/common/ConfirmModal';

const { Column, HeaderCell, Cell } = Table;


export default function User() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingUserId, setDeletingUserId] = useState<any>(null);
    const [confirmModalShow, setConfirmModalShow] = useState(false);

    const getUsers = async () => {
        try {
            setLoading(true);
            const resp: any = await apiRequest({ url: '/auth/user' });
            const _data = resp.map((d: any) => ({ ...d, isActive: d.isActive ? 'Active' : 'Inactive' }))
            setUsers(_data); 
            setLoading(false);
        } catch(err: any) {
            toast.error(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleUserDelete = (id: any) => {
      setDeletingUserId(id);
      setConfirmModalShow(true);
    }

    const handleConfirmationDelete = async (option: any) => {
      try {
        if (option) {
          const resp: any = await apiRequest({ url: '/auth/user/' + deletingUserId, method: 'DELETE' });
          toast.success(resp.message);
          await getUsers();
        } else {
          setDeletingUserId(null);
        }
      } catch(err: any) {
        toast.error(err.message);
      }
      setConfirmModalShow(false);
    }

    return <>

      <ConfirmModal show={confirmModalShow} message="Do you to delete the user?" onClose={handleConfirmationDelete} />

    <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            USER
          </span>
        </div>
        <Link to="/user/create">
          <Button
            size="lg"
            className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
            startIcon={<AddOutline />}
          >
            Add User
          </Button>
        </Link>
      </div>

        <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          {loading && <ComponentLoader />}
          {!loading && !users.length && <NoDataFound />}
          {!loading && users.length &&
          <Table autoHeight data={users}>
            <Column align="center" fixed>
              <HeaderCell>#</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={200}>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={200}>
              <HeaderCell>Role</HeaderCell>
              <Cell dataKey="role.name" />
            </Column>

            <Column width={300}>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column width={100}>
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="isActive" />
            </Column>

            <Column width={150}>
              <HeaderCell align="end">Action</HeaderCell>
              <Cell>
              {(rowData: any) => <>
                <IconButton icon={<EditIcon />} style={{marginTop: '-1vh', marginRight: '1vh'}} onClick={() => navigate('/user/edit/' + rowData.id)} />
                <IconButton icon={<TrashIcon />} style={{marginTop: '-1vh'}} onClick={() => handleUserDelete(rowData.id)} />
                </>
              }
              </Cell>
            </Column>
          </Table>}
          
        </div>
      </div>
    </>
}
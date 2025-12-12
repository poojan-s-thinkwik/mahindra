import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiRequest from "../utils/api-request";

const initialState: any = {
    currentUser: null,
    warehouses: [],
    selectedWarehouse: null
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const getCurrentUser = async () => {
        try {
            const resp = await apiRequest({ url: '/auth/current-user' });
            setCurrentUser(resp);
        } catch(err: any) {
            toast.error(err.message);
        }
    }

    const selectWarehouse = (d: any) => {
        let warehouseId = d?.id || null;
        setSelectedWarehouse(d);
        window.localStorage.setItem('warehouseId', warehouseId);
    }

    const getWarehouses = async () => {
        try {
            const resp = await apiRequest({ url: `/master/warehouse` });
            setWarehouses(resp || []);
            if (resp && resp.length) {
                selectWarehouse(resp[0]);
            }
        } catch(err: any) {
            toast.error(err.message);
        }
    }

    const globalContextInit = async () => {
        getCurrentUser();
        getWarehouses();
    }

    

    return (
        <GlobalContext.Provider value={{ 
            currentUser, 
            warehouses, 
            selectedWarehouse, 
            selectWarehouse,
            globalContextInit
        }}>
            {children}
        </GlobalContext.Provider>
    );

}
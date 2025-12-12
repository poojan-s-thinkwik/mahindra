import React, { useState, useEffect } from 'react'
import apiRequest from '../../utils/api-request';
import { useParams, useNavigate } from 'react-router-dom';
import ComponentLoader from '../../components/loader/ComponentLoader';
import { toast } from 'react-toastify';
import { Input, SelectPicker, Checkbox, Radio, RadioGroup, Button } from 'rsuite';
import * as yup from 'yup';
import { Formik } from 'formik';


const validationSchema = yup.object().shape({
  warehouseId: yup.number()
  .typeError("Warehouse ID must be a number")
  .required('Warehouse is required'),
  deviceId: yup.number()
  .typeError("Warehouse ID must be a number")
  .required('Device is required'),
  name: yup.string().min(2, "Name must be at least 2 characters")
  .max(50, "Name cannot exceed 50 characters").required('Name is required'),
})

const EditMhe = () => {

    const navigate = useNavigate();
    const { id } = useParams();


    const [warehouses, setWarehouses] = useState([]);
    const [devices, setDevices] = useState([]);
    const [mhe, setMhe] = useState(null);
    const [initialValues, setInitialValues] = useState(null);

    const [loading, setLoading] = useState(false);

    const initData = async () => {
        setLoading(true);
        const [_warehouses, _devices, _mhe] = await Promise.all([
            apiRequest({ url: '/master/warehouse' }),
            apiRequest({ url: '/master/device' }),
            apiRequest({ url: '/master/mhe/' + id })
        ]);
        setWarehouses(_warehouses.map((d: any) => ({label: d.name, value: d.id})));
        setDevices(_devices.map((d: any) => ({label: d.name, value: d.id})));
        setMhe(_mhe);
        if (_mhe) {
            setInitialValues({
                warehouseId: _mhe.warehouseId,
                deviceId: _mhe.device?.id,
                name: _mhe.name
            } as any)
        }
        setLoading(false);
    }

    useEffect(() => {
        initData();
    }, [])

    const handleSubmit = async (values: any, { resetForm, setSubmitting}: any) => {
        try {
          const resp: any = await apiRequest({ url: '/master/mhe/' + id, method: 'PUT', data: {...values }});
          toast.success(resp.message);
          resetForm();
          setSubmitting(false);
          navigate(-1);
        } catch(err: any) {
          toast.error(err.message);
          setSubmitting(false);
        } 
    }

  return (
    <>
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
            <span className="text-3xl text-custom-blue font-semibold">
                EDIT MHE
            </span>
            </div>
        </div>
        <div className="bg-white w-full h-auto mt-3 rounded-md">
            <div className="p-4">
                {loading && <ComponentLoader />}

                {!loading && initialValues &&
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    }: any) => (
                    <form onSubmit={handleSubmit}>
                        <div className="flex w-full justify-center items-center">
                            <div className="w-[20%] p-2">
                            <label
                                htmlFor="warehouseId"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Warehouse:
                            </label>
                            </div>
                            <div className="w-1/2 p-2">
                            <SelectPicker
                                data={warehouses}
                                className="w-full"
                                placeholder="Select a warehouse"
                                id="warehouseId"
                                name="warehouseId"
                                onChange={(value) => handleChange({ target: { name: "warehouseId", value } })}
                                onBlur={handleBlur}
                                value={values.warehouseId}
                            />
                            {errors.warehouseId && touched.warehouseId && (
                                <span className="text-red-500">
                                {errors.warehouseId}
                                </span>
                            )}
                            </div>
                        </div>

                        <div className="flex w-full justify-center items-center">
                            <div className="w-[20%] p-2">
                            <label
                                htmlFor="deviceId"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Device:
                            </label>
                            </div>
                            <div className="w-1/2 p-2">
                            <SelectPicker
                                data={devices}
                                className="w-full"
                                // className={`w-full ${errors.deviceId && touched.deviceId ? 'border-red-500' : ''}`}
                                placeholder="Select a device"
                                id="deviceId"
                                name="deviceId"
                                onChange={(value) => handleChange({ target: { name: "deviceId", value } })}
                                onBlur={handleBlur}
                                value={values.deviceId}
                            />
                            {errors.deviceId && touched.deviceId && (
                                <span className="text-red-500">
                                {errors.deviceId}
                                </span>
                            )}
                            </div>
                        </div>

                        <div className="flex w-full justify-center items-center">
                            <div className="w-[20%] p-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name:
                            </label>
                            </div>
                            <div className="w-1/2 p-2">
                            <Input 
                            className="w-full"
                            placeholder="Enter name"
                            id="name"
                            name="name"
                            onChange={(value) => handleChange({ target: { name: "name", value } })}
                            onBlur={handleBlur}
                            value={values.name}
                            />
                            {errors.name && touched.name && (
                                <span className="text-red-500">
                                {errors.name}
                                </span>
                            )}
                            </div>
                        </div>

                        <div className="flex justify-end w-full gap-3">
                                <Button type="button" className="mt-3" onClick={() => navigate(-1)}>
                                    Back
                                </Button>
                                <Button type="submit" appearance="primary" className="mt-3" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving' : 'Save'}
                                </Button>
                                </div>
                    </form>)}
                </Formik>}
            </div>
        </div>
    </>
  )
}

export default EditMhe
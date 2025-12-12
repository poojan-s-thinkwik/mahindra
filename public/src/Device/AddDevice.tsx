import React, { useState, useEffect } from 'react'
import apiRequest from '../utils/api-request'
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Input, Button, SelectPicker } from 'rsuite';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    name: '',
    deviceTypeId: '',
    imei: '',
    sim1: '',
    sim2: ''
}

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    deviceTypeId: yup.number().required('Device Type is required.'),
    imei: yup.string()
        .matches(/^\d{15}$/, 'IMEI must be exactly 15 digits and numeric.')
        .required('IMEI is required.'),
    sim1: yup.string()
        .matches(/^\d{10}$/, 'SIM 1 must be exactly 10 digits and numeric.')
        .required('SIM 1 is required.'),
    sim2: yup.string()
        .matches(/^\d{10}$/, 'SIM 2 must be exactly 10 digits and numeric.')
        .notRequired()
})

const AddDevice = () => {

    const navigate = useNavigate();

    const [deviceTypes, setDeviceTypes] = useState([]);

    const getDeviceTypes = async () => {
        try {
            const resp = await apiRequest({ url: '/master/device-type'});
            setDeviceTypes(resp);
        } catch(err: any) {
            toast.error(err.message);
        }
    }


    const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
        try {
            const resp = await apiRequest({ url: '/master/device', method: 'POST', data: {...values}});
            toast.success(resp.message);
            resetForm();
            setSubmitting(false);
        } catch(err: any) {
            toast.error(err.message);
            setSubmitting(false);
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
                    Add Device
                </span>
            </div>
        </div>

        <div className="bg-white w-full h-auto mt-3 rounded-md">
            <div className="p-4">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        errors,
                        values,
                        touched,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="flex w-full justify-center items-center">
                                <div className="w-[20%] p-2">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700"
                                    >
                                        Name
                                    </label>
                                </div>
                                <div className="w-1/2 p-2">
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter device type name"
                                        className={`w-full ${errors.name && touched.name? 'border-red-500' : ''}`}
                                        value={values.name}
                                        onChange={(value: any) => handleChange({ target: { name: 'name', value}})}
                                        onBlur={handleBlur}
                                    />
                                    {errors.name && touched.name && (
                                        <span className="text-red-500">{errors.name}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full justify-center items-center">
                                <div className="w-[20%] p-2">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700"
                                    >
                                        Device Type
                                    </label>
                                </div>
                                <div className="w-1/2 p-2">
                                    <SelectPicker
                                        id="deviceTypeId"
                                        name="deviceTypeId"
                                        data={deviceTypes.map((type: any) => ({ value: type.id, label: type.name })) as any}
                                        className={`w-full ${errors.deviceTypeId && touched.deviceTypeId? 'border-red-500' : ''}`}
                                        value={values.deviceTypeId}
                                        onChange={(value: any) => handleChange({ target: { name: 'deviceTypeId', value}})}
                                        onBlur={handleBlur}
                                    />
                                    {errors.deviceTypeId && touched.deviceTypeId && (
                                        <span className="text-red-500">{errors.deviceTypeId}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full justify-center items-center">
                                <div className="w-[20%] p-2">
                                    <label
                                        htmlFor="imei"
                                        className="block text-gray-700"
                                    >
                                        IMEI
                                    </label>
                                </div>
                                <div className="w-1/2 p-2">
                                    <Input
                                        type="text"
                                        id="imei"
                                        name="imei"
                                        placeholder="Enter device type name"
                                        className={`w-full ${errors.imei && touched.imei? 'border-red-500' : ''}`}
                                        value={values.imei}
                                        onChange={(value: any) => handleChange({ target: { name: 'imei', value}})}
                                        onBlur={handleBlur}
                                    />
                                    {errors.name && touched.name && (
                                        <span className="text-red-500">{errors.imei}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full justify-center items-center">
                                <div className="w-[20%] p-2">
                                    <label
                                        htmlFor="sim1"
                                        className="block text-gray-700"
                                    >
                                        SIM 1
                                    </label>
                                </div>    
                                <div className="w-1/2 p-2">
                                    <Input
                                        type="text"
                                        id="sim1"
                                        name="sim1"
                                        placeholder="Enter device type name"
                                        className={`w-full ${errors.sim1 && touched.sim1? 'border-red-500' : ''}`}
                                        value={values.sim1}
                                        onChange={(value: any) => handleChange({ target: { name:'sim1', value}})}
                                        onBlur={handleBlur}
                                    />
                                    {errors.sim1 && touched.sim1 && (
                                        <span className="text-red-500">{errors.sim1}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full justify-center items-center">
                                <div className="w-[20%] p-2">
                                    <label
                                        htmlFor="sim2"
                                        className="block text-gray-700"
                                    >
                                        SIM 2
                                    </label>
                                </div>
                                <div className="w-1/2 p-2">
                                    <Input
                                        type="text"
                                        id="sim2"
                                        name="sim2"
                                        placeholder="Enter device type name"
                                        className={`w-full ${errors.sim2 && touched.sim2? 'border-red-500' : ''}`}
                                        value={values.sim2}
                                        onChange={(value: any) => handleChange({ target: { name:'sim2', value}})}
                                        onBlur={handleBlur}
                                    />
                                    {errors.sim2 && touched.sim2 && (
                                        <span className="text-red-500">{errors.sim2}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end w-full gap-3">
                                <Button
                                    type="button"
                                    className="mt-3"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </Button>
                                <Button type="submit" appearance="primary" className="mt-3" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving' : 'Save'}
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    </>
  )
}

export default AddDevice
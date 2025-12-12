import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import apiRequest from '../utils/api-request';
import { Input, Button } from 'rsuite'

const initialValues = {
    name: '',
    ip: '',
    port: ''
}

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required!'),
    ip: yup.string().required('IP is required!'),
    port: yup.number().required('Port is required!')
   .integer()
})

const AddDeviceType = () => {

    const navigate = useNavigate();

    const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
        try {
            const resp = await apiRequest({ url: '/master/device-type', method: 'POST', data: {...values}});
            toast.success(resp.message);
            resetForm();
            setSubmitting(false);
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
                    Add Device Type
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
                        values,
                        errors,
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
                                        onChange={(value) => handleChange({ target: { name: 'name', value}})}
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
                                        htmlFor="ip"
                                        className="block text-gray-700"
                                    >
                                        IP
                                    </label>
                                </div>
                                <div className="w-1/2 p-2">
                                    <Input
                                        type="text"
                                        id="ip"
                                        name="ip"
                                        placeholder="Enter IP address"
                                        className={`w-full ${errors.ip && touched.ip? 'border-red-500' : ''}`}
                                        value={values.ip}
                                        onChange={(value) => handleChange({ target: { name: 'ip', value}})}
                                        onBlur={handleBlur}
                                    />
                                    {errors.ip && touched.ip && (
                                        <span className="text-red-500">{errors.ip}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex w-full justify-center items-center">
                                <div className="w-[20%] p-2">
                                    <label
                                        htmlFor="port"
                                        className="block text-gray-700"
                                    >
                                        Port
                                    </label>
                                </div>
                                <div className="w-1/2 p-2">
                                    <Input
                                        type="number"
                                        id="port"
                                        name="port"
                                        placeholder="Enter port number"
                                        className={`w-full ${errors.port && touched.port? 'border-red-500' : ''}`}
                                        value={values.port}
                                        onChange={(value) => handleChange({ target: { name: 'port', value}})}
                                        onBlur={handleBlur}
                                    />
                                    {errors.port && touched.port && (
                                        <span className="text-red-500">{errors.port}</span>
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

export default AddDeviceType
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Input, SelectPicker, Checkbox, Radio, RadioGroup, Button } from 'rsuite';
import apiRequest from '../../../utils/api-request';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';


const initialValues = {
  warehouseId: '',
  deviceId: '',
  name: ''
}

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


export default function GeneralForm() {

  const navigate = useNavigate();

  const [warehouses, setWarehouses] = useState([]);
  const [devices, setDevices] = useState([]);

  const getWarehouses = async () => {
    try {
      const resp = await apiRequest({ url: '/master/warehouse'});
      setWarehouses(resp.map((d: any) => ({ label: d.name, value: d.id })));
    } catch(err: any) {
      toast.error(err.message);
    }
  }

  const getDevices = async () => {
    try {
      const resp = await apiRequest({ url: '/master/device' });
      setDevices(resp.map((d: any) => ({ label: d.name, value: d.id })));
    } catch(err: any) {
      toast.error(err.message);
    }
  }

  const handleSubmit = async (values: any, { resetForm, setSubmitting}: any) => {
    try {
      const resp: any = await apiRequest({ url: '/master/mhe', method: 'POST', data: {...values, isActive: true }});
      toast.success(resp.message);
      resetForm();
      setSubmitting(false);
    } catch(err: any) {
      toast.error(err.message);
      setSubmitting(false);
    } 
  }


  useEffect(() => {
    getWarehouses();
    getDevices();
  }, []);

  return (
    <>
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
                }) => (
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
      </Formik>
    </>
  );
}

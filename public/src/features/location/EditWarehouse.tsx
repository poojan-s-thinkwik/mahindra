import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiRequest from '../../utils/api-request';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Input, SelectPicker } from 'rsuite';
import ComponentLoader from '../../components/loader/ComponentLoader';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),

  stateId: yup
    .number()
    .required("State is required"),

  address: yup
    .string()
    .min(2, "Address must be at least 2 characters")
    .max(1000, "Address cannot exceed 1000 characters")
    .required("Address is required"),

  latitude: yup
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .required("Latitude is required"),

  longitude: yup
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180")
    .required("Longitude is required"),
});


const EditWarehouse = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState(false);
    const [warehouse, setWarehouse] = useState<any>(null);
    const [initialValues, setInitialValues] = useState<any>(null);

    const dataInit = async () => {
        try {
            setLoading(true);
            const [_states, _warehouse] = await Promise.all([
                apiRequest({ url: '/master/state' }),
                apiRequest({ url: '/master/warehouse/' + id })
            ]);
            setStates((_states || []).map((d: any) => ({label: d.name, value: d.id})));
            setWarehouse(_warehouse);
            if (_warehouse) {
                setInitialValues({
                    stateId: _warehouse.stateId,
                    name: _warehouse.name,
                    address: _warehouse.address,
                    latitude: _warehouse.latitude,
                    longitude: _warehouse.longitude
                })
            }
            setLoading(false);
        } catch(err: any) {
            toast.error(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        dataInit();
    }, []);


    const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
        try {
          const resp: any =  await apiRequest({ url: '/master/warehouse/' + id, method: 'PUT', data: {...values }});
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
            EDIT WAREHOUSE
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
                  htmlFor="stateId"
                  className="block text-sm font-medium text-gray-700"
                >
                  State Name:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <SelectPicker
                  data={states as any}
                  className="w-full"
                  placeholder="Select state"
                  id="stateId"
                  name="stateId"
                  onChange={(value) => handleChange({ target: { name: "stateId", value } })}
                  onBlur={handleBlur}
                  value={values.stateId}
                />
                {errors.stateId && touched.stateId && (
                  <span className="text-red-500">
                    {errors.stateId}
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
                  Warehouse Name:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <Input 
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter a Warehouse Name"
                  className="w-full"
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

            <div className="flex w-full justify-center items-center">
              <div className="w-[20%] p-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <Input 
                  as="textarea"
                  rows={3}
                  id="address"
                  name="address"
                  placeholder="Enter a Warehouse Name"
                  className="w-full"
                  onChange={(value) => handleChange({ target: { name: "address", value } })}
                  onBlur={handleBlur}
                  value={values.address}
                />
                {errors.address && touched.address && (
                  <span className="text-red-500">
                    {errors.address}
                  </span>
                )}
              </div>
            </div>

            <div className="flex w-full justify-center items-center">
              <div className="w-[20%] p-2">
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Latitude:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <Input 
                  type="number" 
                  placeholder="Enter Latitude"
                  id="latitude"
                  name="latitude"
                  className="w-full"
                  onChange={(value) => handleChange({ target: { name: "latitude", value } })}
                  onBlur={handleBlur}
                  value={values.latitude}
                />
                {errors.latitude && touched.latitude && (
                  <span className="text-red-500">
                    {errors.latitude}
                  </span>
                )}
              </div>
            </div>

            <div className="flex w-full justify-center items-center">
              <div className="w-[20%] p-2">
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Longitude:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <Input 
                  type="number" 
                  placeholder="Enter Longitude" 
                  id="longitude"
                  name="longitude"
                  className="w-full"
                  onChange={(value) => handleChange({ target: { name: "longitude", value } })}
                  onBlur={handleBlur}
                  value={values.longitude}
                />
                {errors.longitude && touched.longitude && (
                  <span className="text-red-500">
                    {errors.longitude}
                  </span>
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
          </Formik>}
        </div>
      </div>
    </>
  )
}

export default EditWarehouse
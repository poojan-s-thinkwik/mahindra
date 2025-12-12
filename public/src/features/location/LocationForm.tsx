import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, SelectPicker } from 'rsuite';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiRequest from '../../utils/api-request';
import { Formik } from 'formik';
import * as yup from 'yup';

const initialValues = {
  name: '',
  stateId: '',
  address: '',
  latitude: '',
  longitude: ''
}


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


export default function LocationForm() {
  const navigate = useNavigate();
  const locationUrl = useLocation();
  const { location } = locationUrl.state || {};
  // console.log(location);

  const [states, setStates] = useState<any>([]);

  const getStates = async () => {
    try {
      const resp: any = await apiRequest({ url: '/master/state' });
      const _states: any = resp.map((d: any) => ({label: d.name, value: d.id }));
      setStates(_states);
    } catch(err: any) {
      toast.error(err.message);
    }
  }


  const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
    try {
      const resp: any =  await apiRequest({ url: '/master/warehouse', method: 'POST', data: {...values }});
      toast.success(resp.message);
      resetForm();
      setSubmitting(false);
    } catch(err: any) {
      toast.error(err.message);
      setSubmitting(false);      
    }
  }


  useEffect(() => {
    getStates();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            ADD WAREHOUSE
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
              handleSubmit,
            }) => (
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
                  data={states}
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
          </Formik>
        </div>
      </div>
    </>
  );
}

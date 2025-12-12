import { FaClock } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, DateRangePicker, DatePicker, Form, SelectPicker, Input } from 'rsuite';
import * as yup from 'yup';
import { toast } from'react-toastify';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import apiRequest from '../../utils/api-request';
import moment from 'moment';

const initialValues = {
  warehouseId: '',
  name: '',
  startTime: '',
  endTime: '',
  teaBreakStartTime: '',
  teaBreakEndTime: '',
  lunchBreakStartTime: '',
  lunchBreakEndTime: '',
  setupStartTime: '',
  setupEndTime: '',
  bioBreakStartTime: '',
  bioBreakEndTime: '',
}


const validationSchema = yup.object().shape({
  name: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .required("Name is required"),
  warehouseId: yup
      .number()
      .typeError("Warehouse ID must be a number")
      .required("Warehouse ID is required"),
  startTime: yup.string().required('Required field'),
  endTime: yup.string().required('Required field'),
  teaBreakStartTime: yup.string().required('Required field'),
  teaBreakEndTime: yup.string().required('Required field'),
  lunchBreakStartTime: yup.string().required('Required field'),
  lunchBreakEndTime: yup.string().required('Required field'),
  setupStartTime: yup.string().required('Required field'),
  setupEndTime: yup.string().required('Required field'),
  bioBreakStartTime: yup.string().required('Required field'),
  bioBreakEndTime: yup.string().required('Required field'),
});

export default function ShiftForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { shift } = location.state || {};

  const [warehouses, setWarehouses] = useState([]);


  const getWarehouses = async () => {
    try {
      const resp: any = await apiRequest({ url: '/master/warehouse' });
      const data = resp.map((d: any) => ({label: d.name, value: d.id }));
      setWarehouses(data);
    } catch(err: any) {
      toast.error(err.message);
    }
  }


  const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
    try {
      const resp: any = await apiRequest({ url: '/master/shift', method: 'POST', data: {
        name: values.name,
        warehouseId: values.warehouseId,
        startTime: moment(values.startTime).format('HH:mm'),
        endTime: moment(values.endTime).format('HH:mm'),
        teaBreakStartTime: moment(values.teaBreakStartTime).format('HH:mm'),
        teaBreakEndTime: moment(values.teaBreakEndTime).format('HH:mm'),
        lunchBreakStartTime: moment(values.lunchBreakStartTime).format('HH:mm'),
        lunchBreakEndTime: moment(values.lunchBreakEndTime).format('HH:mm'),
        setupStartTime: moment(values.setupStartTime).format('HH:mm'),
        setupEndTime: moment(values.setupEndTime).format('HH:mm'),
        bioBreakStartTime: moment(values.bioBreakStartTime).format('HH:mm'),
        bioBreakEndTime: moment(values.bioBreakEndTime).format('HH:mm'),
      }});
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
  }, []);
  // console.log(shift);
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            ADD SHIFT
          </span>
        </div>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">

          <Formik
            initialValues={ initialValues}
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
                  placeholder="Select a Warehouse"
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
                  onChange={(value: any) => handleChange({ target: { name: "name", value } })}
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
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shift Time:
                </label>
              </div>
              <div className="w-1/2 p-2">
              <div className="flex gap-2">
                <div>
                <DatePicker
                  format="HH:mm"
                  caretAs={FaClock}
                  className="w-full"
                  id="startTime"
                  name="startTime"
                  onChange={(value: any) => handleChange({ target: { name: "startTime", value } })}
                  onBlur={handleBlur}
                  value={values.startTime as any}
                />

                {errors.startTime && touched.startTime && (
                  <span className="text-red-500">
                    {errors.startTime}
                  </span>
                )}
                </div>
                <div>
                <DatePicker
                  format="HH:mm"
                  caretAs={FaClock}
                  className="w-full"
                  id="endTime"
                  name="endTime"
                  onChange={(value) => handleChange({ target: { name: "endTime", value } })}
                  onBlur={handleBlur}
                  value={values.endTime as any}
                />
                
                {errors.endTime && touched.endTime && (
                  <span className="text-red-500">
                    {errors.endTime}
                  </span>
                )}
                </div>
                </div>
              </div>
            </div>
            
            <div className="flex w-full justify-center items-center">
              <div className="w-[20%] p-2">
                <label
                  htmlFor="teaBreakStartTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tea Break Time:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <div className="flex gap-2">
                  <div>
                  <DatePicker
                    format="HH:mm"
                    caretAs={FaClock}
                    className="w-full"
                    // placeholder="Start Time"
                    id="teaBreakStartTime"
                    name="teaBreakStartTime"
                    onChange={(value: any) => handleChange({ target: { name: "teaBreakStartTime", value } })}
                    onBlur={handleBlur}
                    value={values.teaBreakStartTime as any}
                  />
                  {errors.teaBreakStartTime && touched.teaBreakStartTime && (
                  <span className="text-red-500">
                    {errors.teaBreakStartTime}
                  </span>
                  )}
                  </div>

                  <div>
                  <DatePicker
                    format="HH:mm"
                    caretAs={FaClock}
                    className="w-full"
                    // placeholder="End Time"
                    id="teaBreakEndTime"
                    name="teaBreakEndTime"
                    onChange={(value: any) => handleChange({ target: { name: "teaBreakEndTime", value } })}
                    onBlur={handleBlur}
                    value={values.teaBreakEndTime as any}
                  />

                  {errors.teaBreakEndTime && touched.teaBreakEndTime && (
                  <span className="text-red-500">
                    {errors.teaBreakEndTime}
                  </span>
                  )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="w-[20%] p-2">
                <label
                  htmlFor="lunchBreakStartTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lunch Break Time:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <div className="flex gap-2">
                  <div>
                  <DatePicker
                    format="HH:mm"
                    caretAs={FaClock}
                    className="w-full"
                    // placeholder="Start Time"
                    id="lunchBreakStartTime"
                    name="lunchBreakStartTime"
                    onChange={(value: any) => handleChange({ target: { name: "lunchBreakStartTime", value } })}
                    onBlur={handleBlur}
                    value={values.lunchBreakStartTime as any}
                  />

                  {errors.lunchBreakStartTime && touched.lunchBreakStartTime && (
                  <span className="text-red-500">
                    {errors.lunchBreakStartTime}
                  </span>
                  )}
                  </div>

                  <div>
                  <DatePicker
                    format="HH:mm"
                    caretAs={FaClock}
                    className="w-full"
                    // placeholder="End Time"
                    id="lunchBreakEndTime"
                    name="lunchBreakEndTime"
                    onChange={(value: any) => handleChange({ target: { name: "lunchBreakEndTime", value } })}
                    onBlur={handleBlur}
                    value={values.lunchBreakEndTime as any}
                  />

                  {errors.lunchBreakEndTime && touched.lunchBreakEndTime && (
                  <span className="text-red-500">
                    {errors.lunchBreakEndTime}
                  </span>
                  )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="w-[20%] p-2">
                <label
                  htmlFor="setupStartTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Set Up Time:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <div className="flex gap-2">
                  <div>
                  <DatePicker
                    format="HH:mm"
                    caretAs={FaClock}
                    className="w-full"
                    // placeholder="Start Time"
                    id="setupStartTime"
                    name="setupStartTime"
                    onChange={(value: any) => handleChange({ target: { name: "setupStartTime", value } })}
                    onBlur={handleBlur}
                    value={values.setupStartTime as any}
                  />

                  {errors.setupStartTime && touched.setupStartTime && (
                  <span className="text-red-500">
                    {errors.setupStartTime}
                  </span>
                  )}
                  </div>

                  <div>
                  <DatePicker
                    format="HH:mm"
                    caretAs={FaClock}
                    className="w-full"
                    // placeholder="End Time"
                    id="setupEndTime"
                    name="setupEndTime"
                    onChange={(value: any) => handleChange({ target: { name: "setupEndTime", value } })}
                    onBlur={handleBlur}
                    value={values.setupEndTime as any}
                  />


                  {errors.setupEndTime && touched.setupEndTime && (
                  <span className="text-red-500">
                    {errors.setupEndTime}
                  </span>
                  )}
                </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="w-[20%] p-2">
                <label
                  htmlFor="bioBreakStartTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio Break Time:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <div className="flex gap-2">
                  <div>
                  <DatePicker
                    format="HH:mm"
                    caretAs={FaClock}
                    className="w-full"
                    // placeholder="Start Time"
                    id="bioBreakStartTime"
                    name="bioBreakStartTime"
                    onChange={(value: any) => handleChange({ target: { name: "bioBreakStartTime", value } })}
                    onBlur={handleBlur}
                    value={values.bioBreakStartTime as any}
                  />

                  {errors.bioBreakStartTime && touched.bioBreakStartTime && (
                  <span className="text-red-500">
                    {errors.bioBreakStartTime}
                  </span>
                  )}
                  </div>

                  <div>
                  <DatePicker
                    format="HH:mm"
                    caretAs={FaClock}
                    className="w-full"
                    // placeholder="End Time"
                    id="bioBreakEndTime"
                    name="bioBreakEndTime"
                    onChange={(value: any) => handleChange({ target: { name: "bioBreakEndTime", value } })}
                    onBlur={handleBlur}
                    value={values.bioBreakEndTime as any}
                  />
                  
                  {errors.bioBreakEndTime && touched.bioBreakEndTime && (
                  <span className="text-red-500">
                    {errors.bioBreakEndTime}
                  </span>
                  )}
                </div>
                </div>
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
          </form>)}
          </Formik>
        </div>
      </div>
    </>
  );
}

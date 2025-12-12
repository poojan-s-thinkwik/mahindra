import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import apiRequest from '../../utils/api-request';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Form, Input, SelectPicker, Checkbox, Radio, RadioGroup, Button, InputGroup, IconButton } from 'rsuite';
import { Field, Formik } from "formik";
import { Visible, Unvisible } from "@rsuite/icons";
import ComponentLoader from '../../components/loader/ComponentLoader';



const validationSchema = yup.object().shape({
    name: yup.string().trim().min(2).max(50).required('Name is required.'),
    email: yup.string().trim().email().required('Email is required.'),
    roleId: yup.number().required('Role is required'),
    isActive: yup.boolean().required('Status is required'),
});


const EditUser = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState<any>(null);
    const [initialValues, setInitialValues] = useState<any>(null);


    const dataInit = async () => {
        try {
            setLoading(true);
            const [_roles, _user] = await Promise.all([
                apiRequest({ url: '/auth/role' }),
                apiRequest({ url: '/auth/user/' + id })
            ]);

            setRoles((_roles || []).map((d: any) => ({label: d.name, value: d.id })));
            setUser(_user);
            if (_user) {
                setInitialValues({
                    roleId: _user.roleId,
                    name: _user.name,
                    email: _user.email,
                    isActive: _user.isActive,
                });
            }
            setLoading(false);
        } catch(err: any) {
            toast.error(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        dataInit();
    }, [])

    const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
        try {
            const resp = await apiRequest({ url: '/auth/user/' + id, method: 'PUT', data: values });
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
            EDIT USER
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
                  htmlFor="roleId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <SelectPicker
                  data={roles}
                  className="w-full"
                  placeholder="Select role"
                  id="roleId"
                  name="roleId"
                  onChange={(value) => handleChange({ target: { name: "roleId", value } })}
                  onBlur={handleBlur}
                  value={values.roleId}
                />
                {errors.roleId && touched.roleId && (
                  <span className="text-red-500">
                    {errors.roleId}
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
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter user name"
                  className="w-full"
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
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                    Email:
                </label>
              </div>
              <div className="w-1/2 p-2">
                <Input 
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter user email"
                  className="w-full"
                //   className={errors.email && touched.email ?"border-red-500" : ""}
                  onChange={(value) => handleChange({ target: { name: "email", value } })}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <span className="text-red-500">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            
            <div className="flex w-full justify-center items-center">
              <div className="w-[20%] p-2">
                <label
                  htmlFor="isActive"
                  className="block text-sm font-medium text-gray-700"
                >
                    Status:
                </label>
              </div>
              <div className="w-1/2 p-2">

              <Checkbox
                id="isActive"
                name="isActive"
                checked={values.isActive}
                onChange={(value: any) => handleChange({ target: { name: "isActive", value } })}
                />
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

export default EditUser
import { useEffect, useState } from "react";
import apiRequest from "../../utils/api-request";
import { toast } from "react-toastify";
import * as yup from 'yup';
import { Form, Input, SelectPicker, Checkbox, Radio, RadioGroup, Button, InputGroup, IconButton } from 'rsuite';
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import { Visible, Unvisible } from "@rsuite/icons";

const initialValues = {
    name: '',
    email: '',
    password: '',
    roleId: '',
    isActive: true
}

const validationSchema = yup.object().shape({
    name: yup.string().trim().min(2).max(50).required('Name is required.'),
    email: yup.string().trim().email().required('Email is required.'),
    password: yup.string().trim().min(8).required('Password is required.'),
    roleId: yup.number().required('Role is required'),
    isActive: yup.boolean().required('Status is required'),
});

export function AddUser() {

    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [showPassword, setShowPassword] = useState(false);

    const getRoles = async () => {
        try {
            const resp: any = await apiRequest({ url: '/auth/role' });
            const values = resp.map((d: any) => ({ label: d.name, value: d.id}));
            setRoles(values);
        } catch(err: any) {
            toast.error(err.message);
        }
    }

    const handleSubmit = async (values: any, { resetForm, setSubmitting }: any) => {
        try {
            const resp = await apiRequest({ url: '/auth/user', method: 'POST', data: values });
            toast.success(resp.message);
            resetForm();
            setSubmitting(false);
        } catch(err: any) {
            toast.error(err.message);
            setSubmitting(false);
        }
    }

    useEffect(() => {
        getRoles();
    }, []);

    return <>
    <div className="flex justify-between items-center">
        <div className="flex flex-col">
            <span className="text-3xl text-custom-blue font-semibold">
            ADD USER
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
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                    Password:
                </label>
              </div>
              <div className="w-1/2 p-2">
              <InputGroup inside>
                <Field
                  as={Input}
                  type={ showPassword ? "text" : "password" }
                  id="password"
                  name="password"
                  placeholder="Enter user password"
                  className="w-full"
                //   className={errors.email && touched.email ?"border-red-500" : ""}
                  onChange={(value: any) => handleChange({ target: { name: "password", value } })}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <InputGroup.Button onClick={() => setShowPassword(!showPassword)}>
                <IconButton
                    icon={showPassword ? <Visible /> : <Unvisible />}
                    appearance="subtle"
                />
                </InputGroup.Button>
                </InputGroup>
                {errors.password && touched.password && (
                  <span className="text-red-500">
                    {errors.password}
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
          </Formik>
        </div>
    </div>
    </>
}
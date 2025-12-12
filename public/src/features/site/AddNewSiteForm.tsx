import { Button, Modal, Form, SelectPicker } from 'rsuite';
import mockSite from '../../mockData/Organization';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ISite } from '../../types/site';

interface AddNewTenantFormProps {
  action: string;
  onClose: () => void;
  site: ISite | null;
}

const validationSchema = Yup.object().shape({
  tenantId: Yup.number().required('Tenant name is required!'),
  name: Yup.string().required('Name is required!'),
  contactNumber: Yup.string().required('Contact number is required!'),
  address: Yup.string(),
  email: Yup.string()
    .email('Invalid Email address')
    .required('Email is required!'),
});

const AddNewTenantForm: React.FC<AddNewTenantFormProps> = ({
  onClose,
  action,
  site,
}) => {
  const initialValues = site || {
    id: 0,
    name: '',
    tenantId: 0,
    tenantName: '',
    address: '',
    contactNumber: '',
    email: '',
    status: true,
  };
  const data = mockSite.map((item) => ({ label: item.name, value: item.id }));

  const handleFormSubmit = async (
    values: ISite,
    { resetForm }: FormikHelpers<ISite>
  ) => {
    if (action === 'EDIT') {
      console.log('Edit site', values);
    } else {
      console.log('Add new site', values);
    }
    resetForm();
  };
  return (
    <>
      <div>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={() => handleSubmit()}>
              <Modal.Header>
                <Modal.Title>
                  {action === 'ADD_NEW' ? 'Add New Site' : 'Add New Site'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="tenantId" className="w-full">
                  <Form.ControlLabel>Tenant</Form.ControlLabel>
                  <SelectPicker
                    data={data}
                    appearance="default"
                    placeholder="Select Organization"
                    className="w-full"
                    name="tenantId"
                    id="tenantId"
                    value={values.tenantId}
                    onChange={(value) =>
                      handleChange({ target: { name: 'tenantId', value } })
                    }
                  />
                  {errors.tenantId && touched.tenantId && (
                    <Form.HelpText className="text-red-600">
                      {errors.tenantId}
                    </Form.HelpText>
                  )}
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.ControlLabel>Name</Form.ControlLabel>
                  <input
                    placeholder="Name"
                    type="text"
                    id="name"
                    name="name"
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                      errors.name && touched.name ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.name && touched.name && (
                    <Form.HelpText className="text-red-600">
                      {errors.name}
                    </Form.HelpText>
                  )}
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    id="email"
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                      errors.email && touched.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && touched.email && (
                    <Form.HelpText className="text-red-600">
                      {errors.email}
                    </Form.HelpText>
                  )}
                </Form.Group>
                <Form.Group controlId="contactNumber">
                  <Form.ControlLabel>Contact Number</Form.ControlLabel>
                  <input
                    placeholder="Contact Number"
                    name="contactNumber"
                    type="text"
                    id="contactNumber"
                    onBlur={handleBlur}
                    value={values.contactNumber}
                    onChange={handleChange}
                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                      errors.contactNumber && touched.contactNumber
                        ? 'border-red-500'
                        : ''
                    }`}
                  />
                  {errors.contactNumber && touched.contactNumber && (
                    <Form.HelpText className="text-red-600">
                      {errors.contactNumber}
                    </Form.HelpText>
                  )}
                </Form.Group>
                <Form.Group controlId="address">
                  <Form.ControlLabel>Address</Form.ControlLabel>
                  <input
                    placeholder="Address"
                    name="address"
                    type="text"
                    id="address"
                    onBlur={handleBlur}
                    value={values.address}
                    onChange={handleChange}
                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                      errors.address && touched.address ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.address && touched.address && (
                    <Form.HelpText className="text-red-600">
                      {errors.address}
                    </Form.HelpText>
                  )}
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button type="button" appearance="default" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  appearance="primary"
                  className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white"
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddNewTenantForm;

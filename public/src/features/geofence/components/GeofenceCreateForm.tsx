import { Button, Form, Input, SelectPicker } from 'rsuite';
import ColorPicker from './ColorPicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

interface GeofenceCreateFormProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  handleClear: () => void;
  cordinates: [number, number][];
}

interface GeofenceCreateFormValues {
  geofenceType: string;
  geofenceName: string;
  cordinates: [number, number][];
}

const GeofenceCreateForm: React.FC<GeofenceCreateFormProps> = ({
  selectedColor,
  onColorChange,
  handleClear,
  cordinates,
}) => {
  const [isCordinatesEmpty, setIsCordinatesEmpty] = useState(false);

  const initialValues: GeofenceCreateFormValues = {
    geofenceType: '',
    geofenceName: '',
    cordinates: cordinates || [],
  };

  const validationSchema = Yup.object().shape({
    geofenceType: Yup.string().required('Geofence Type is required'),
    geofenceName: Yup.string().required('Geofence Name is required'),
  });

  const handleFormSubmit = async (values: GeofenceCreateFormValues) => {
    if (cordinates.length === 0) {
      setIsCordinatesEmpty(true);
      return;
    }
    setIsCordinatesEmpty(false);
    values.cordinates = cordinates;
    console.log('Form submitted', values);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Form.Group controlId="geofenceType" className="mb-3">
            <Form.ControlLabel>Select Geofence Type </Form.ControlLabel>
            <SelectPicker
              data={[
                { label: 'Circle', value: 'circle' },
                { label: 'Polygon', value: 'polygon' },
              ]}
              placeholder="Select Geofence Type"
              className="w-full"
              name="geofenceType"
              id="geofenceType"
              value={values.geofenceType}
              onChange={(value) => setFieldValue('geofenceType', value)}
              onBlur={handleBlur}
            />
            {errors.geofenceType && touched.geofenceType && (
              <Form.HelpText className="text-red-500">
                {errors.geofenceType}
              </Form.HelpText>
            )}
          </Form.Group>
          <Form.Group controlId="geofenceName" className="mb-3">
            <Form.ControlLabel>Geofence Name </Form.ControlLabel>
            <Input
              placeholder="Geofence Name"
              className="w-full"
              name="geofenceName"
              id="geofenceName"
              value={values.geofenceName}
              onChange={(value) => setFieldValue('geofenceName', value)}
              onBlur={handleBlur}
            />
            {errors.geofenceName && touched.geofenceName && (
              <Form.HelpText className="text-red-500">
                {errors.geofenceName}
              </Form.HelpText>
            )}
          </Form.Group>
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={onColorChange}
            handleClear={handleClear}
          />
          {isCordinatesEmpty && (
            <Form.HelpText className="text-red-500">
              Geofence coordinates cannot be empty
            </Form.HelpText>
          )}
          <div className="flex float-end gap-3">
            <Button
              type="button"
              className="bg-gray-400 text-white focus:bg-gray-400 focus:text-white hover:bg-gray-600 hover:text-white mt-6"
              onClick={handleClear}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white mt-6"
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default GeofenceCreateForm;

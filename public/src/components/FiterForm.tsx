import { Button, DateRangePicker, Form, SelectPicker, Stack } from 'rsuite';
import SettingIcon from '@rsuite/icons/Setting';
import { FaCalendar } from 'react-icons/fa';

export default function FiterForm() {
  return (
    <Form>
      <Stack
        spacing={10}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Form.Group controlId="start_and_end_date">
          <Form.ControlLabel>Start and End date</Form.ControlLabel>
          <DateRangePicker
            format="dd MMM yyyy hh:mm:ss aa"
            showMeridiem
            caretAs={FaCalendar}
          />
        </Form.Group>
        <Form.Group controlId="mhe">
          <Form.ControlLabel>MHE</Form.ControlLabel>
          <SelectPicker
            cleanable={true}
            className="w-[300px]"
            data={[]}
            placeholder="Select MHE"
          />
        </Form.Group>
        <Button
          type="submit"
          size="md"
          className="bg-custom-blue text-white focus:bg-custom-blue focus:text-white hover:bg-blue-800 hover:text-white mt-6"
          startIcon={<SettingIcon />}
        >
          Filter
        </Button>
        <Button appearance="default" size="md" className="mt-6">
          Reset
        </Button>
      </Stack>
    </Form>
  );
}

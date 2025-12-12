import { Button, Form, Tabs } from 'rsuite';
import GeneralForm from './components/GeneralForm';
import ProfileForm from './components/ProfileForm';
import SensorForm from './components/SensorForm';
import DocumentForm from './components/DocumentForm';
import PrivateModeForm from './components/PrivateModeForm';

export default function AddMheForm() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            ADD MHE
          </span>
        </div>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          {/* <Form> */}
            {/* <Tabs defaultActiveKey="1" appearance="subtle">
              <Tabs.Tab eventKey="1" title="General"> */}
                <GeneralForm />
              {/* </Tabs.Tab> */}
              {/* <Tabs.Tab eventKey="2" title="Profile">
                <ProfileForm />
              </Tabs.Tab>
              <Tabs.Tab eventKey="3" title="Sensors">
                <SensorForm />
              </Tabs.Tab>
              <Tabs.Tab eventKey="4" title="Document">
                <DocumentForm />
              </Tabs.Tab>
              <Tabs.Tab eventKey="5" title="Private Mode">
                <PrivateModeForm />
              </Tabs.Tab> */}
            {/* </Tabs> */}
            {/* <div className="flex justify-end w-full gap-3">
              <Button type="button" className="mt-3">
                Back
              </Button>
              <Button type="submit" appearance="primary" className="mt-3">
                Save
              </Button>
            </div> */}
          {/* </Form> */}
        </div>
      </div>
    </>
  );
}

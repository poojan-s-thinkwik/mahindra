import { useState } from 'react';
import {
  Input,
  SelectPicker,
  Checkbox,
  Radio,
  RadioGroup,
  DatePicker,
  CheckboxGroup,
} from 'rsuite';

export default function ProfileForm() {
  const [isGSensor, setIsGSensor] = useState(false);
  const [fuelSensor, setFuelSensor] = useState('SINGLE');
  const [isWeightSensor, setIsWeightSensor] = useState(false);
  const [isCostBasedOnDistance, setIsCostBasedOnDistance] = useState(false);
  const [isCostBasedOnDuration, setIsCostBasedOnDuration] = useState(false);
  const handleFuelSensor = (value: string | number | null) => {
    if (typeof value === 'string') {
      setFuelSensor(value);
    }
  };
  return (
    <>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="plateNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Plate Number:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="objectType"
            className="block text-sm font-medium text-gray-700"
          >
            Object Type:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <SelectPicker
            data={[]}
            className="w-full"
            placeholder="Select an object type"
          />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="objectCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Object Category:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <RadioGroup name="radio-group-inline" inline defaultValue="Immovable">
            <Radio value="Movable">Movable</Radio>
            <Radio value="Immovable">Immovable</Radio>
          </RadioGroup>
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            DVIR Template:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Manufacture Date:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <DatePicker className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Purchase Date:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <DatePicker className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Purchase Amount:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Weight Capacity:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input className="w-full" placeholder="Tonnes" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            GPS Installation Date:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <DatePicker className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            GPS Warranty:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input className="w-full" placeholder="In Years" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Company Average:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input
            className="w-full"
            placeholder="Enter company claimed average"
          />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Permit:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <SelectPicker
            data={[]}
            className="w-full"
            placeholder="Select a permit"
          />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Installation Date:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <DatePicker className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Registration Number:
          </label>
        </div>
        <div className="w-1/2 p-2 flex gap-2">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Fuel Type:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <SelectPicker
            data={[]}
            className="w-full"
            placeholder="Select a fuel type"
          />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Distance based Fuel Consumption:
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <Checkbox />
          <Input
            className="w-full"
            placeholder="Distance based Fuel Consumption"
          />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Duration based Fuel Consumption:
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <Checkbox />
          <Input className="w-full" placeholder="Shift Name" />
          <SelectPicker
            data={[]}
            className="w-full"
            placeholder="Select a shift"
          />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Fuel Idling Consumption:
          </label>
        </div>
        <div className="w-1/2 p-2 flex gap-2">
          <SelectPicker
            searchable={false}
            data={[
              { label: 'Liter', value: 'LITER' },
              { label: 'Gallon', value: 'GALLON' },
            ]}
            className="w-full"
          />
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Consumption Tolerence [+/-] (%):
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            VIN(Chassis) Number:
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Engine Number:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Odometer:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            LBS Detection Radius:
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input className="w-full" placeholder="LBS Detection Radius" />
          <span>(meter) Max Value upto 5000 meter </span>
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Engine Hour (HH:mm):
          </label>
        </div>
        <div className="w-1/2 p-2">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            No of Passenger Seats:
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Cost Based On:
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <CheckboxGroup inline name="checkbox-group">
            <Checkbox
              onChange={() => setIsCostBasedOnDistance(!isCostBasedOnDistance)}
            >
              Distance
            </Checkbox>
            <Checkbox
              onChange={() => setIsCostBasedOnDuration(!isCostBasedOnDuration)}
            >
              Duration
            </Checkbox>
          </CheckboxGroup>
        </div>
      </div>
      {isCostBasedOnDistance && (
        <div className="flex w-full justify-center items-center">
          <div className="w-[20%] p-2">
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700"
            >
              Distance (KM):
            </label>
          </div>
          <div className="w-1/2 p-2 flex">
            <Input className="w-full" />
          </div>
        </div>
      )}
      {isCostBasedOnDuration && (
        <div className="flex w-full justify-center items-center">
          <div className="w-[20%] p-2">
            <label
              htmlFor="branch"
              className="block text-sm font-medium text-gray-700"
            >
              Duration:
            </label>
          </div>
          <div className="w-1/2 p-2 flex gap-2">
            <SelectPicker
              searchable={false}
              data={[
                { label: 'Day', value: 'DAY' },
                { label: 'Hour', value: 'HOUR' },
              ]}
              className="w-full"
            />
            <Input className="w-full" />
          </div>
        </div>
      )}
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            RFID Timeout Duration (seconds):
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Sleep Mode Duration:
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Minimum Working Hours:
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <Input className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Weight Sensor:
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <Checkbox onChange={() => setIsWeightSensor(!isWeightSensor)} />
        </div>
      </div>
      {isWeightSensor && (
        <>
          {' '}
          <div className="flex w-full justify-center items-center">
            <div className="w-[20%] p-2">
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Underweight Tolerance (%):
              </label>
            </div>
            <div className="w-1/2 p-2 flex">
              <Input className="w-full" />
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="w-[20%] p-2">
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Overweight Tolerance (%):
              </label>
            </div>
            <div className="w-1/2 p-2 flex">
              <Input className="w-full" />
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="w-[20%] p-2">
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Loading/Unloading Tolerance (%):
              </label>
            </div>
            <div className="w-1/2 p-2 flex">
              <Input className="w-full" />
            </div>
          </div>
        </>
      )}
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            Fuel Sensor :
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <RadioGroup
            name="radio-group-inline"
            inline
            defaultValue="SINGLE"
            onChange={handleFuelSensor}
          >
            <Radio value="SINGLE">Single</Radio>
            <Radio value="MULTIPLE">Multiple</Radio>
          </RadioGroup>
        </div>
      </div>
      {fuelSensor === 'MULTIPLE' && (
        <div className="flex w-full justify-center items-center">
          <div className="w-[20%] p-2">
            <label
              htmlFor="branch"
              className="block text-sm font-medium text-gray-700"
            >
              No of Tanks:
            </label>
          </div>
          <div className="w-1/2 p-2 flex">
            <Input className="w-full" />
          </div>
        </div>
      )}
      <div className="flex w-full justify-center items-center">
        <div className="w-[20%] p-2">
          <label
            htmlFor="branch"
            className="block text-sm font-medium text-gray-700"
          >
            G-Sensor:
          </label>
        </div>
        <div className="w-1/2 p-2 flex">
          <Checkbox
            onChange={() => {
              setIsGSensor(!isGSensor);
            }}
          />
        </div>
      </div>
      {isGSensor && (
        <>
          <div className="flex w-full justify-center items-center">
            <div className="w-[20%] p-2">
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Axis X (mG):
              </label>
            </div>
            <div className="w-1/2 p-2 flex">
              <Input className="w-full" />
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="w-[20%] p-2">
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Axis Y (mG):
              </label>
            </div>
            <div className="w-1/2 p-2 flex">
              <Input className="w-full" />
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div className="w-[20%] p-2">
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Axis Z (mG):
              </label>
            </div>
            <div className="w-1/2 p-2 flex">
              <Input className="w-full" />
            </div>
          </div>
        </>
      )}
    </>
  );
}

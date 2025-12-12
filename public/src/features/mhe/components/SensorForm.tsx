import { useState } from 'react';
import { AddOutline } from '@rsuite/icons';
import { Button, Checkbox, Input, SelectPicker } from 'rsuite';

export default function SensorForm() {
  const [rows, setRows] = useState([
    {
      id: 1,
      active: false,
      connectionType: '',
      connectedSensor: '',
      readingType: '',
      workHourCalc: false,
    },
  ]);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      active: false,
      connectionType: '',
      connectedSensor: '',
      readingType: '',
      workHourCalc: false,
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <>
      <table className="w-full border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="p-2 border border-slate-300">Active</th>
            <th className="p-2 border border-slate-300">Connection Type</th>
            <th className="p-2 border border-slate-300">Connected Sensor</th>
            <th className="p-2 border border-slate-300">Reading Type</th>
            <th className="p-2 border border-slate-300">
              Work Hour Calculation
            </th>
            <th className="p-2 border border-slate-300">Calibration</th>
            <th className="p-2 border border-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="p-2 border border-slate-300">
                <Checkbox checked={row.active} onChange={() => {}} />
              </td>
              <td className="p-2 border border-slate-300">
                <Input value={row.connectionType} onChange={() => {}} />
              </td>
              <td className="p-2 border border-slate-300">
                <SelectPicker className="w-full" searchable={false} data={[]} />
              </td>
              <td className="p-2 border border-slate-300">
                <SelectPicker className="w-full" searchable={false} data={[]} />
              </td>
              <td className="p-2 border border-slate-300">
                <Checkbox checked={row.workHourCalc} onChange={() => {}} />
              </td>
              <td className="p-2 border border-slate-300">--</td>
              <td className="p-2 border border-slate-300">
                <Button
                  color="red"
                  appearance="primary"
                  onClick={() => removeRow(row.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        className="mt-4"
        startIcon={<AddOutline />}
        appearance="primary"
        onClick={addRow}
      >
        Add New
      </Button>
    </>
  );
}

import { useState } from 'react';
import { AddOutline } from '@rsuite/icons';
import { Button, DatePicker } from 'rsuite';
import { FaClock } from 'react-icons/fa';

export default function PrivateModeForm() {
  const [rows, setRows] = useState([
    { id: 1, validFrom: '', validTo: '', fromTime: '', toTime: '' },
  ]);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      validFrom: '',
      validTo: '',
      fromTime: '',
      toTime: '',
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
            <th className="p-2 border border-slate-300">Valid From</th>
            <th className="p-2 border border-slate-300">Valid To</th>
            <th className="p-2 border border-slate-300">From Time</th>
            <th className="p-2 border border-slate-300">To Time</th>
            <th className="p-2 border border-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="p-2 border border-slate-300">
                <DatePicker onChange={() => {}} />
              </td>
              <td className="p-2 border border-slate-300">
                <DatePicker onChange={() => {}} />
              </td>
              <td className="p-2 border border-slate-300">
                <DatePicker
                  onChange={() => {}}
                  format="HH:mm:ss"
                  caretAs={FaClock}
                />
              </td>
              <td className="p-2 border border-slate-300">
                <DatePicker
                  onChange={() => {}}
                  format="HH:mm:ss"
                  caretAs={FaClock}
                />
              </td>
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

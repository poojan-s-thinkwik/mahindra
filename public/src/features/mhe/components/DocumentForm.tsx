import { useState } from 'react';
import { AddOutline } from '@rsuite/icons';
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  SelectPicker,
  Uploader,
} from 'rsuite';

export default function DocumentForm() {
  const [rows, setRows] = useState([
    {
      id: 1,
      documentType: '',
      documentName: '',
      uploadDocument: '',
      issueDate: '',
      expiryDate: '',
      addReminder: '',
    },
  ]);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      documentType: '',
      documentName: '',
      uploadDocument: '',
      issueDate: '',
      expiryDate: '',
      addReminder: '',
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
            <th className="p-2 border border-slate-300">Document Type</th>
            <th className="p-2 border border-slate-300">Document Name</th>
            <th className="p-2 border border-slate-300">Upload Document</th>
            <th className="p-2 border border-slate-300">Issue Date</th>
            <th className="p-2 border border-slate-300">Expiry Date</th>
            <th className="p-2 border border-slate-300">Add Reminder</th>
            <th className="p-2 border border-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="p-2 border border-slate-300">
                <SelectPicker
                  defaultValue={row.documentType}
                  className="w-full"
                  searchable={false}
                  data={[]}
                />
              </td>
              <td className="p-2 border border-slate-300">
                <Input value={row.documentName} onChange={() => {}} />
              </td>
              <td className="p-2 border border-slate-300">
                <Uploader action="//jsonplaceholder.typicode.com/posts/">
                  <Button>Select files...</Button>
                </Uploader>
              </td>
              <td className="p-2 border border-slate-300">
                <DatePicker onChange={() => {}} />
              </td>
              <td className="p-2 border border-slate-300">
                <DatePicker onChange={() => {}} />
              </td>
              <td className="p-2 border border-slate-300">
                <Checkbox onChange={() => {}} />
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

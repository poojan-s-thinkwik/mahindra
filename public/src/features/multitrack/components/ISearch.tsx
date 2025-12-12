import { Search } from '@rsuite/icons';
import React from 'react';
import { Input } from 'rsuite';

export default function ISearch() {
  return (
    <>
      <div>
        <div className="flex items-center">
          <Search className="text-lg ml-2 font-bold" />
          <Input
            placeholder="Search"
            className="border-0 focus-visible:outline-none"
          />
        </div>
      </div>
    </>
  );
}

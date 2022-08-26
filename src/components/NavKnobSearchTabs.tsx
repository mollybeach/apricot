import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import Switch from './Switch';
import { Box } from '@mui/material';
import { NavTabs } from './index';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface NavKnobsSearchTabsProps {
  id?: string;
  searchData: Array<unknown>;
  searchedRowFn: (row: any) => void;
  navSearchTabs: Array<unknown>;
}
const NavKnobsSearchTabs = (props: NavKnobsSearchTabsProps) => {
  const { searchData, searchedRowFn, navSearchTabs } = props;
  const [searchedRow, setSearchedRow] = React.useState(searchData);
  useEffect(() => {
    searchedRowFn(searchedRow);
  }, [searchedRow]);
  const Schema = yup.object().shape({
    textField: yup.string().min(2).max(500).required('Field is required'),
    textArea: yup
      .string()
      .min(20)
      .max(1000)
      .required('Description is required'),
    checkbox: yup.bool().oneOf([true], 'Checkbox required'),
    switch: yup.bool().oneOf([true], 'Switch required'),
    select: yup.string().ensure().required('Select is required!'),
  });

  const methods = useForm<any>({
    defaultValues: {
      textField: '',
      textArea: '',
      checkbox: false,
      switch: false,
    },
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });

  const { control } = methods;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      {/*<NavTabs options={navSearchTabs} />*/}
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: '10px',
        }}
      >
        <Switch label="Live" name="switch" control={control} />
        <SearchBar
          rows={searchData}
          searchedItem={(e: any) => setSearchedRow(e)}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            minWidth: '227px',
          }}
          placeholder="Search by name, location, or performance"
        />
      </Box>
    </Box>
  );
};

export default NavKnobsSearchTabs;

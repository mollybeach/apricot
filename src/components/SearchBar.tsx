import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, styled, Box } from '@mui/material';
import { SvgSearchIcon } from '../utils/svg';

const MuiTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    padding: '0 !important',
  },
  '& .MuiAutocomplete-input': {
    border: 'none',
  },
}));

type SearchBarProps = {
  rows?: any[];
  searchedItem?: (rows: any[]) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  searchCallback?: (searchText: string) => void;
};

export default function SearchBar(props: SearchBarProps) {
  const { placeholder = 'Search', searchCallback } = props;
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCallback(searchText);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  return (
    <>
      <Autocomplete
        freeSolo
        id="search-field"
        disableClearable
        options={[]}
        style={props.style}
        renderInput={(params) => (
          <MuiTextField
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              startAdornment: (
                <Box style={{ display: 'flex', paddingLeft: 15 }}>
                  <SvgSearchIcon />
                </Box>
              ),
            }}
            onChange={(searchVal) => setSearchText(searchVal.target.value)}
          />
        )}
      />
    </>
  );
}

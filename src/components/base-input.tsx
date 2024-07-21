import React, { forwardRef, Ref } from 'react';
import FormControl from '@mui/material/FormControl';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

export const BaseInput = forwardRef((props: TextFieldProps, ref: Ref<HTMLInputElement>) => {
  return <CustomTextField inputRef={ref} {...props} />;
});

BaseInput.displayName = 'BaseInput';

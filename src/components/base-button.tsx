import React, { forwardRef, Ref } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  // ...
});

export const BaseButton = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  return <CustomButton ref={ref} {...props} />;
});

BaseButton.displayName = 'BaseButton';
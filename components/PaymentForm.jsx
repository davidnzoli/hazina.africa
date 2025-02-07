import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const Card = styled(MuiCard)(({ theme, selected }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  width: '100%',
  '&:hover': {
    background: 'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
    borderColor: theme.palette.primary.light,
    boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
  },
  ...(selected && {
    borderColor: theme.palette.primary.light,
  })
}));

export default function PaymentForm() {
  const [paymentType, setPaymentType] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  return (
    <Stack spacing={3}>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          name="paymentType"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          style={{ display: 'flex', flexDirection: 'row', gap: 16 }}
        >
          <Card selected={paymentType === 'creditCard'}>
            <CardActionArea onClick={() => setPaymentType('creditCard')}>
              <CardContent style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CreditCardRoundedIcon color={paymentType === 'creditCard' ? 'primary' : 'disabled'} />
                <Typography>Card</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card selected={paymentType === 'bankTransfer'}>
            <CardActionArea onClick={() => setPaymentType('bankTransfer')}>
              <CardContent style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AccountBalanceRoundedIcon color={paymentType === 'bankTransfer' ? 'primary' : 'disabled'} />
                <Typography>Bank account</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>

      {paymentType === 'creditCard' && (
        <Box>
          <FormLabel>Card Number</FormLabel>
          <OutlinedInput
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '))}
          />
          <FormLabel>CVV</FormLabel>
          <OutlinedInput
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
          />
          <FormLabel>Expiration Date</FormLabel>
          <OutlinedInput
            placeholder="MM/YY"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d{2})/, '$1/'))}
          />
        </Box>
      )}
      {paymentType === 'bankTransfer' && (
        <Alert severity="warning" icon={<WarningRoundedIcon />}>
          Your order will be processed once we receive the funds.
        </Alert>
      )}
    </Stack>
  );
}

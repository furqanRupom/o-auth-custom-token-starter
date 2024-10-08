import TwoFactorAuth from '@/components/TwoFactor';
import * as React from 'react';

interface ITwoFactorValidationProps {
}

const TwoFactorValidation: React.FunctionComponent<ITwoFactorValidationProps> = (props) => {
  return <>
  <h3 className='text-center text-xl py-12 text-gray-700'>Two factor validation page </h3>
  <TwoFactorAuth />
  </>;
};

export default TwoFactorValidation;


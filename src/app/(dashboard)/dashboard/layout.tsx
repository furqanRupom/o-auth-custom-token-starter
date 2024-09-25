import * as React from 'react';

interface IDashboardLayoutProps {
    children:React.ReactNode
}

const DashboardLayout: React.FunctionComponent<IDashboardLayoutProps> = ({children}) => {
  return <>
  {children}
  </>;
};

export default DashboardLayout;

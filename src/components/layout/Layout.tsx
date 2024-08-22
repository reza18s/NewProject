import React from 'react';
import Header from './Header';

function Layout({ children }: { children: React.ReactNode }) {
  const style = { minHeight: '700px' };

  return (
    <>
      <Header />
      <div style={style}>{children}</div>
    </>
  );
}

export default Layout;

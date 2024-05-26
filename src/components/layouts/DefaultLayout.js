import React, { useState, useEffect } from 'react';
import Aside from '../ui/aside/Aside';
import Main from '../ui/main/Main';
import Header from '../ui/aside/Header';

export default function Defaultlayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [key, setKey] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    setPageLoaded(true);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [key]);

  const asideContent = pageLoaded ? (
    <Aside toggleSidebar={toggleSidebar} isopen={sidebarOpen ? 'open' : 'close'} />
  ) : null;

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [children]);

  return (
    <>
      {asideContent}
      <Header toggleSidebar={toggleSidebar} isopen={sidebarOpen ? 'open' : 'close'} />
      <Main variant={sidebarOpen ? 'wsidebar' : 'wnotsidebar'}>
        {children}
      </Main>
    </>
  );
}

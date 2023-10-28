import React from 'react';
import { Navbar } from './components/navbar';
import Sidebar from './components/sidebar';
import MainContent from './components/MainContent/MainContent';
import TaskDetails from './components/MainContent/TaskDetails';
import { GeneralContextProvider } from './context/GeneralContext';


function App() {

  return (
    <GeneralContextProvider>
      <div className="h-full">
            <div className="h-[80px] md:h-[50px] md:pl-56 fixed inset-y-0 w-full z-50">
              <Navbar />
            </div>
            <div className="fixed inset-y-0 z-50 flex-col hidden h-full w-72 md:flex">
              <Sidebar />
            </div>
            <div className="h-screen pt-[80px] md:pl-72 bg-[#1B1E25]">
              <MainContent />
            </div>
            <div className={``}>
              <TaskDetails />
            </div>
      </div>
    </GeneralContextProvider>
  );
}

export default App;

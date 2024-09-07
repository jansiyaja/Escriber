import React from 'react';

import FreeVector from '../Images/women.png';
import Login from '../Components/Login';


const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
   
      <div className="lg:w-1/2 w-full relative flex items-center justify-center bg-slate-100">
        <img
          className="h-auto w-full lg:h-full object-contain lg:object-cover lg:w-full"
          src={FreeVector}
          alt="vector"
        />
      </div>

   
      <div className="lg:w-1/2 w-full flex items-center bg-slate-100">
        <div className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-lg p-8">
          
         
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create an account</h1>
           
           
          </div>
          <div>
        <Login/>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

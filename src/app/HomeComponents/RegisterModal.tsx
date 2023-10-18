"use client"
import { useState } from 'react';

const RegisterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Implement login functionality here
    console.log('Logging in with', username, password);
    setIsOpen(false); // close the modal after login
  };

  return (
    <>
      <button
        className="mt-4 inline-flex items-center px-4 py-2 border border-teal-700 text-base font-medium rounded-md shadow-sm text-white0"
        onClick={() => setIsOpen(true)}
      >
        Register
      </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-zinc-900  opacity-50"></div>
            </div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-zinc-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-zinc-900  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-white">Register</h3>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1 p-2 w-full border border-teal-500 rounded-md bg-slate-700 text-white"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-4 p-2 w-full border border-teal-500 rounded-md bg-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-zinc-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-500 text-base font-medium text-white hover:bg-teal-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleLogin}
                >
                  Register
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-teal-500 shadow-sm px-4 py-2 bg-slate-700 text-white hover:bg-slate-600 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;

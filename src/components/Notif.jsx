import React, { useState } from 'react';
import classNames from 'classnames';

const Notif = ({ success }) => {
  const [notif, setNotif] = useState(true);

  const handleClose = () => {
    setNotif(false);
   // onClose();
  };

  const notificationClass = classNames(
    'p-4 rounded-lg relative',
    {
      'bg-green-500 text-white': success,
      'bg-red-500 text-white': !success,
    }
  );

  return (
    <>
      {notif && (
        <div className={notificationClass}>
          <button
            className="absolute top-0 right-0 p-2"
            onClick={handleClose}
          >
            <svg
              className="w-4 h-4 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {success ? 'Operasi berhasil!' : 'Operasi gagal!'}
        </div>
      )}
    </>
  );
};

export default Notif;

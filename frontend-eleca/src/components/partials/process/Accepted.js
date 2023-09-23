import React from "react";

export default function Accepted({ values, adminName }) {
  const route = window.location.pathname.split('/')[1]
  return (
    <div key={values.ID} className="flex relative pb-5">
      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500 inline-flex items-center justify-center text-white relative z-10">
        <i className="fa-regular fa-thumbs-up"></i>
      </div>
      <div className="flex-grow pl-4">
        <h2 className="font-medium title-font text-sm text-gray-500 mb-1 tracking-wider">
          Request Accepted
        </h2>
        <p className="font-medium title-font text-sm text-gray-500 mb-1 tracking-wider">
          {values.time}
        </p>
        <p className="leading-relaxed">
          Service request with id
          <span className="text-teal-600 mx-2 font-medium">{values.serviceID}</span>
          {route === 'admin' &&
            <>
              by
              <span className="text-teal-600 mx-2 font-medium">{adminName}</span>
            </>
          }
          has been accepted.
        </p>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="bg-gray-800 my-3 inline-flex p-5 rounded-lg items-center focus:outline-none">
      <div className="tracking-wide flex items-start flex-col leading-none">
        <div className="text-sm font-semibold text-gray-200 mb-3">
          CONTACT US
        </div>
        <div className="title-font text-base text-left ml-3">
          <div className="font-medium text-gray-500">Mobile :</div>

          <div className="ml-4">
            <div className="my-2">
              Ashok Sharma - Services <br />
              <Link className="text-teal-600 hover:text-teal-500 transition-all font-medium" to="tel:+917361092810">
                9570322597
              </Link>
            </div>
            <div className="my-2">
              Abhishek - Technical & Online
              <br />
              <Link className="text-teal-600 hover:text-teal-500 transition-all font-medium" to="tel:+917361092810">
                7361092810
              </Link>
            </div>
          </div>

          <div className="font-medium text-gray-500">Email :</div>
          <div className="ml-4">
            <div className="my-2">
              <Link className="text-teal-600 hover:text-teal-500 transition-all font-medium" to="mailto:ashokelectronics.in@gmail.com">
                ashokelectronics.in@gmail.com
              </Link>
            </div>
          </div>

          <div className="font-medium text-gray-500">Address :</div>
          <div className="ml-4">
            <div className="my-2">
              <div className="mb-2">
                <span className="font-bold">Ashok Electronics</span> <br />
                Near Old High School, Samda Road, <br />
                Front of Play Ground, Sour Bazar, <br />
                Distt: Saharsa, Bihar - 852221
              </div>
              <Link className="text-teal-600 hover:text-teal-500 transition-all font-medium" to="https://maps.app.goo.gl/NAtUZFNx8Srdw2oA6" target="_blank">
                View on Google Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

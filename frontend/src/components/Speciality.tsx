// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';

function Speciality() {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-medium">Find By Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

        <div className="flex sm:justify-center gap-6 w-full overflow-x-auto scrollbar-hide px-4 mt-6">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              className="flex flex-col items-center min-w-[100px] transition-transform duration-300 hover:scale-101"
              onClick={() => scrollTo(0, 0)}
            >
              <img
                className="w-16 sm:w-20 mb-2.5 object-contain transition-transform duration-300 hover:scale-101"
                src={item.image}
                alt={item.speciality}
              />
              <p className="text-sm font-medium text-center transition-colors duration-300 hover:text-purple-700">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      
    </div>
  );
}

export default Speciality;

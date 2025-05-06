import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { servicesFaqs } from "../../assets/data/faqs";
import FAQ from "../FAQ";

export default function ServiceInfo() {
  const { id } = useParams();
  const location = useLocation();
  const { serviceData } = location.state || {};

  const getServiceById = (id) => {
    return serviceData.find((service) => service._id === id);
  };

  const service = getServiceById(id);

  console.log(service);

  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <div className="my-4 flex w-full justify-center">
        <div className="flex w-[90%] max-w-6xl flex-col items-start gap-y-4 rounded-xl border-2 border-amber-950 bg-indigo-100 p-5">
          <div className="s-name">
            <h1 className="text-3xl font-bold">{service.name}</h1>
          </div>
          <div className="s-image flex flex-col md:flex-row w-full gap-4">
            <img
              src={service.image}
              alt={service.name}
              className="h-auto w-full md:w-[45%] rounded-xl border border-gray-400 object-cover"
            />
            <div className="s-description flex w-full md:w-[55%] px-2">
              <p className="font-sans text-lg md:text-xl font-medium">{service.desc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4">
        <FAQ faq={servicesFaqs} />
      </div>
    </div>
  );
}

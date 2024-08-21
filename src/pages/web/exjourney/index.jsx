import React, { useEffect, useState } from "react";
import WebLayout from "../../../layouts/Weblayout";
import Api, { getImageURL } from "../../../services/api"; 

const Journey = () => {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await Api.get("/journey");
        const data = response.data.map((journey) => ({
          ...journey,
          tanggal: new Date(journey.tanggal).toISOString().split("T")[0], 
          gambar: journey.gambar.map((img) => getImageURL(img)), 
        }));
        setJourneys(data);
      } catch (error) {
        console.error("Error fetching journeys:", error);
      }
    };

    fetchJourneys();
  }, []);

  return (
    <WebLayout>
      <div className="bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg p-10">
          <h1 className="text-4xl font-bold text-[#916131] mb-8 text-center">
            Our Journey
          </h1>
          <div className="flex flex-col space-y-12">
            {journeys.map((journey, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mt-6"
              >
                {journey.gambar.map((imgSrc, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={imgSrc}
                    alt={`Journey ${index + 1} Image ${imgIndex + 1}`}
                    className="w-full md:w-1/5 rounded-lg shadow-md border border-[#916131] object-cover"
                  />
                ))}
                <div className="w-full md:w-3/5">
                  <p className="text-lg font-semibold text-[#916131] leading-relaxed">
                    {journey.judul}
                  </p>
                  <p className="text-sm text-[#916131] mb-4">
                    {journey.tanggal}{" "}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    {journey.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

export default Journey;

import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/Adminlayout";
import Chart from "react-apexcharts";
import Api from "../../../services/api"; 

function Dashboard() {
  document.title = "Dashboard - Admin Paku Aji";

  const [Kategoris, setCategories] = useState(0);
  const [Produks, setPlaces] = useState(0);
  const [Sliders, setSliders] = useState(0);
  const [Users, setUsers] = useState(0);
  const [ExJourneys, setExJourneys] = useState(0); 

  const fetchData = async () => {
    try {
      const [
        kategoriResponse,
        produkResponse,
        sliderResponse,
        userResponse,
        journeyResponse,
      ] = await Promise.all([
        Api.get("/kategori"),
        Api.get("/produk"),
        Api.get("/slider"),
        Api.get("/admin"),
        Api.get("/journey"), 
      ]);

      const kategoriData = Array.isArray(kategoriResponse.data)
        ? kategoriResponse.data
        : [];
      const produkData = Array.isArray(produkResponse.data)
        ? produkResponse.data
        : [];
      const sliderData = Array.isArray(sliderResponse.data)
        ? sliderResponse.data
        : [];
      const userData = Array.isArray(userResponse.data)
        ? userResponse.data
        : [];
      const journeyData = Array.isArray(journeyResponse.data)
        ? journeyResponse.data
        : []; 
      setCategories(kategoriData.length);
      setPlaces(produkData.length);
      setSliders(sliderData.length);
      setUsers(userData.length);
      setExJourneys(journeyData.length);
    } catch (error) {
      console.error("Gagal mengambil data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    series: [
      {
        data: [Kategoris, Produks, Sliders, Users, ExJourneys], 
      },
    ],
    chart: {
      type: "bar",
      height: 380,
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    colors: ["#33b2df", "#546E7A", "#d4526e", "#13d8aa", "#ff9f43"], 
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: ["Kategori", "Produk", "Sliders", "Users", "Journey"], 
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      text: "Chart Dashboard",
      align: "center",
      floating: true,
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  };

  return (
    <React.Fragment>
      <AdminLayout>
        <div className="row mt-4">
          <div className="col">
            <div className="card shadow">
              <div className="card-header bg-[#916131]">
                <p className="text-center text-white font-bold">Statistik </p>
              </div>
              <div className=" bg-[#91613183]">
                <Chart
                  options={options}
                  series={options.series}
                  type="bar"
                  height={380}
                />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </React.Fragment>
  );
}

export default Dashboard;

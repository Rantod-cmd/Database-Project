import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import type { Map } from '../../../shared/types/components/types'

const geoUrl =
  "https://raw.githubusercontent.com/cvibhagool/thailand-map/06fb629ef127b9ef95565c456d73fef74970294d/thailand-provinces.topojson";

  const mockData:Map[] = [
    { id:"Bangkok Metropolis",name: "", coordinates: [100.58, 13.55], fontsize:5,population:95 },
    { id:"Chiang Mai",name: "", coordinates: [98.7, 18.6], fontsize:11,population:82 },
    { id:"Phuket",name: "", coordinates: [98.3923, 7.8804], fontsize:11,population:88},
    { id:"Lamphun",name:"",coordinates: [98.92,18.14], fontsize:8,population:35 },
    { id:"Mae Hong Son",name: "", coordinates: [98.225 ,19.15], fontsize:8,population:15 },
    { id:"Tak",name: "", coordinates: [ 98.92 ,16.7], fontsize:14,population:42 },
    { id:"Chiang Rai",name: "", coordinates: [99.98 ,19.68], fontsize:10,population:55 },
    { id:"Phayao",name: "", coordinates: [100.20 ,19], fontsize:10,population:28 },
    { id:"Nan",name: "", coordinates: [100.84 ,18.56], fontsize:12,population:12 },
    { id:"Phrae",name: "", coordinates: [100.165 ,18], fontsize:12,population:33 },
    { id:"Lampang",name: "", coordinates: [99.53 ,18.1], fontsize:12,population:48 },
    { id:"Sukhothai",name: "", coordinates: [99.7 ,17.02], fontsize:8,population:54 },
    { id:"Kamphaeng Phet",name: "", coordinates: [99.55 ,16.1], fontsize:8,population:41 },
    { id:"Phichit",name: "", coordinates: [100.34 ,16.05], fontsize:8,population:26 },
    { id:"Phitsanulok",name: "", coordinates: [100.54 ,16.73], fontsize:8,population:68 },
    { id:"Loei",name: "", coordinates: [101.595 ,17.15], fontsize:16,population:18 },
    { id:"Phetchabun",name: "", coordinates: [101.05 ,16.05], fontsize:8,population:45 },
    { id:"Nong Khai",name: "", coordinates: [103.6 ,17.98], fontsize:8,population:39 },
    { id:"Nakhon Phanom",name: "", coordinates: [104.36 ,17.32], fontsize:6,population:23},
    { id:"Sakon Nakhon",name: "", coordinates: [103.72 ,17.13], fontsize:8,population:52 },
    { id:"Udon Thani",name: "", coordinates: [102.93 ,17.12], fontsize:8,population:75 },
    { id:"Mukdahan",name: "", coordinates: [104.48 ,16.4], fontsize:6,population:21 },
    { id:"Amnat Charoen",name: "", coordinates: [104.73 ,15.7], fontsize:5,population:14 },
    { id:"Ubon Ratchathani",name: "", coordinates: [105.1 ,14.95], fontsize:7,population:78 },
    { id:"Si Sa Ket",name: "", coordinates: [104.38 ,14.63], fontsize:7,population:62 },
    { id:"Surin",name: "", coordinates: [103.65 ,14.66], fontsize:7,population:58 },
    { id:"Buri Ram",name: "", coordinates: [102.93 ,14.59], fontsize:9,population:66 },
    { id:"Nakhon Ratchasima",name: "", coordinates: [101.99 ,14.7], fontsize:10,population:92 },
    { id:"Saraburi",name: "", coordinates: [100.981 ,14.4], fontsize:6,population:49 },
    { id:"Lop Buri",name: "", coordinates: [100.9 ,14.85], fontsize:9,population:53 },
    { id:"Chaiyaphum",name: "", coordinates: [101.836 ,15.8], fontsize:12,population:47 },
    { id:"Narathiwat",name: "", coordinates: [101.836 ,15.8], fontsize:12,population:61 },
    { id:"Uttaradit",name: "", coordinates: [101.836 ,15.8], fontsize:12,population:22 },
  
    // --- ภาคกลาง (Central) ---
    { id: "Ang Thong", name: "", coordinates: [100.45, 14.59], fontsize: 6, population: 31 },
    { id: "Chai Nat", name: "", coordinates: [100.12, 15.18], fontsize: 7, population:22 },
    { id: "Nakhon Nayok", name: "", coordinates: [101.21, 14.20], fontsize: 6, population: 29 },
    { id: "Nakhon Pathom", name: "", coordinates: [100.06, 13.82], fontsize: 7, population: 72 },
    { id: "Nonthaburi", name: "", coordinates: [100.41, 13.86], fontsize: 5, population: 89 },
    { id: "Pathum Thani", name: "", coordinates: [100.68, 14.02], fontsize: 6, population: 84 },
    { id: "Phra Nakhon Si Ayutthaya", name: "", coordinates: [100.56, 14.35], fontsize: 7, population: 67 },
    { id: "Samut Prakan", name: "", coordinates: [100.60, 13.60], fontsize: 6, population: 91 },
    { id: "Samut Sakhon", name: "", coordinates: [100.27, 13.55], fontsize: 5, population: 76 },
    { id: "Samut Songkhram", name: "", coordinates: [100.00, 13.41], fontsize: 4, population: 20 },
    { id: "Suphan Buri", name: "", coordinates: [100.12, 14.47], fontsize: 9, population: 51 },
    { id: "Sing Buri", name: "", coordinates: [100.40, 14.89], fontsize: 6, population: 24 },
    { id: "Uthai Thani", name: "", coordinates: [99.50, 15.38], fontsize: 10, population: 19 },
    { id: "Nakhon Sawan", name: "", coordinates: [100.12, 15.70], fontsize: 11, population: 63 },
  
    // --- ภาคอีสาน (North East) ---
    { id: "Bueng Kan", name: "", coordinates: [103.65, 18.20], fontsize: 8, population: 16 },
    { id: "Kalasin", name: "", coordinates: [103.51, 16.43], fontsize: 8, population: 44 },
    { id: "Khon Kaen", name: "", coordinates: [102.83, 16.44], fontsize: 10, population: 86 },
    { id: "Maha Sarakham", name: "", coordinates: [103.30, 16.18], fontsize: 8, population: 38 },
    { id: "Nong Bua Lam Phu", name: "", coordinates: [102.44, 17.20], fontsize: 7, population: 59 },
    { id: "Roi Et", name: "", coordinates: [103.65, 16.05], fontsize: 8, population: 46 },
    { id: "Yasothon", name: "", coordinates: [104.15, 15.79], fontsize: 7, population: 27 },
    { id: "Nong Khai", name: "", coordinates: [103.00, 17.85], fontsize: 8, population: 36 },
  
    // --- ภาคตะวันออก (East) ---
    { id: "Chachoengsao", name: "", coordinates: [101.30, 13.60], fontsize: 8, population: 57 },
    { id: "Chanthaburi", name: "", coordinates: [102.10, 12.80], fontsize: 9, population: 43 },
    { id: "Chon Buri", name: "", coordinates: [101.15, 13.25], fontsize: 8, population: 100 },
    { id: "Prachin Buri", name: "", coordinates: [101.60, 14.00], fontsize: 8, population: 34 },
    { id: "Rayong", name: "", coordinates: [101.35, 12.85], fontsize: 8, population: 79 },
    { id: "Sa Kaeo", name: "", coordinates: [102.25, 13.75], fontsize: 9, population: 25 },
    { id: "Trat", name: "", coordinates: [102.50, 12.45], fontsize: 8, population: 17 },
  
    // --- ภาคตะวันตก (West) ---
    { id: "Kanchanaburi", name: "", coordinates: [99.20, 14.50], fontsize: 14, population: 52 },
    { id: "Phetchaburi", name: "", coordinates: [99.75, 12.95], fontsize: 9, population: 59 },
    { id: "Prachuap Khiri Khan", name: "", coordinates: [99.80, 12.00], fontsize: 10, population: 48 },
    { id: "Ratchaburi", name: "", coordinates: [99.65, 13.50], fontsize: 9, population: 54 },
  
    // --- ภาคใต้ (South) ---
    { id: "Chumphon", name: "", coordinates: [99.10, 10.50], fontsize: 9, population: 37 },
    { id: "Krabi", name: "", coordinates: [98.90, 8.15], fontsize: 8, population: 45 },
    { id: "Nakhon Si Thammarat", name: "", coordinates: [100.00, 8.50], fontsize: 11, population: 74 },
    { id: "Pattani", name: "", coordinates: [101.35, 6.75], fontsize: 7, population: 56 },
    { id: "Phangnga", name: "", coordinates: [98.50, 8.60], fontsize: 8, population: 24 },
    { id: "Phatthalung", name: "", coordinates: [100.10, 7.60], fontsize: 8, population: 32 },
    { id: "Ranong", name: "", coordinates: [98.70, 9.70], fontsize: 7, population: 11 },
    { id: "Satun", name: "", coordinates: [100.10, 6.80], fontsize: 7, population: 13 },
    { id: "Songkhla", name: "", coordinates: [100.50, 7.00], fontsize: 10, population: 83 },
    { id: "Surat Thani", name: "", coordinates: [99.20, 9.00], fontsize: 11, population: 69 },
    { id: "Trang", name: "", coordinates: [99.60, 7.50], fontsize: 8, population: 44 },
    { id: "Yala", name: "", coordinates: [101.20, 6.30], fontsize: 8, population: 39 },
    { id: "Narathiwat", name: "", coordinates: [101.80, 6.20], fontsize: 8, population: 58 },
  ];

  const getColor = (pop: number) => {
    if (pop === 0) return "#f1f5f9"; 
    if (pop <= 24) return "#F88379"; 
    if (pop <= 50) return "#DC143C"; 
    if (pop <= 80) return "#880808";
    return "#4c0505"; 
  };

export const MapChart = () => {
  const [zoom, setZoom] = useState<number>(1);

  return (
    <div className="w-full h-[calc(100vh-64px)] flex justify-center items-start overflow-hidden relative">
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.5, 8))}
          className="w-10 h-10 bg-white rounded-full shadow-lg text-xl font-bold flex items-center justify-center hover:bg-gray-100"
        >
          +
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.5, 1))}
          className="w-10 h-10 bg-white rounded-full shadow-lg text-xl font-bold flex items-center justify-center hover:bg-gray-100"
        >
          −
        </button>
      </div>

      <div className="w-full h-full max-w-screen bg-white">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 2100,
            center: [100.5, 13.5],
          }}
          className="w-full h-full "
        >
          <ZoomableGroup
            center={[100.5, 13.5]}
            zoom={zoom}
            minZoom={1}
            maxZoom={8}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const provinceData = mockData.find(d => d.id === geo.properties.NAME_1);
                  const geoFill = provinceData ? getColor(provinceData.population) : "#FFFFFF";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: geoFill, 
                          stroke: "#64748b",
                          strokeWidth: 0.3,
                          outline: "none",
                        },
                        hover: {
                          fill: "#FFF",    
                          stroke: geoFill,
                          cursor: "pointer",
                          strokeWidth: 1,
                          outline: "none",
                        },
                        pressed : {
                          fill: "#E2E8F0",
                          outline: "none",
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
            {mockData.map(({ name, coordinates,fontsize }) => (
              <Marker key={name} coordinates={coordinates}>
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fontSize: `${fontsize}px`,
                    fill: "#334155",
                    fontWeight: 600,
                    pointerEvents: "none",
                    opacity: 0.9,
                  }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

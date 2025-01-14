import React, { useState } from 'react';
import { Calculator, Info } from 'lucide-react';

interface RoomType {
  name: string;
  luxRequired: number;
}

const rumahTinggal = [
  { name: 'Teras', lux: 40, Renderasi: 80 },
  { name: 'Ruang Tamu', lux: 150, Renderasi: 80 },
  { name: 'Ruang Keluarga', lux: 100, Renderasi: 80 },
  { name: 'Ruang Makan', lux: 100, Renderasi: 80 },
  { name: 'Ruang Kerja', lux: 350, Renderasi: 80 },
  { name: 'Kamar Tidur', lux: 50, Renderasi: 80 },
  { name: 'Kamar Mandi', lux: 100, Renderasi: 80 },
  { name: 'Laundry', lux: 200, Renderasi: 80 },
  { name: 'Tangga', lux: 100, Renderasi: 80 },
  { name: 'Gudang', lux: 50,Renderasi: 80 },
  { name: 'Dapur', lux: 250,Renderasi: 80 },
  { name: 'Garasi', lux: 50,Renderasi: 80 },
];
const perkantoran = [
  { name: 'Ruang Resepsionis', lux: 300, Renderasi: 80 },
  { name: 'Ruang Direktur', lux: 350, Renderasi: 80 },
  { name: 'Ruang Kerja', lux: 350, Renderasi: 80 },
  { name: 'Ruang Komputer', lux: 150, Renderasi: 80 },
  { name: 'Ruang Rapat', lux: 300, Renderasi: 80 },
  { name: 'Kamar Gambar', lux: 750, Renderasi: 90 },
  { name: 'Gudan Arsip', lux: 150, Renderasi: 80 },
  { name: 'Ruang Arsip Aktif', lux: 350, Renderasi: 80 },
  { name: 'Ruang Tangga Darurat', lux: 100, Renderasi: 80 },
  { name: 'Ruang Parkir', lux: 100,Renderasi: 80 },
];

const roomTypes: RoomType[] = [
  { name: 'Ruang Tamu', luxRequired: 150 },
  { name: 'Kamar', luxRequired: 50 },
  { name: 'Dapur', luxRequired: 250 },
  { name: 'Kamar Mandi', luxRequired: 100 },
  { name: 'Ruang Kerja', luxRequired: 350 },
  { name: 'Ruang Makan', luxRequired: 100 },
  { name: 'Teras', luxRequired: 40 },
  { name: 'Garasi', luxRequired: 50 },
];

interface Light {
  name: string;
  lumens: number;
}

const commonLights: Light[] = [
  { name: 'LED 6W (40W Equivalent)', lumens: 450 },
  { name: 'LED 9W (60W Equivalent)', lumens: 800 },
  { name: 'LED 12W (75W Equivalent)', lumens: 1100 },
  { name: 'LED 15W (100W Equivalent)', lumens: 1600 },
  { name: 'LED 20W (125W Equivalent)', lumens: 2000 },
];

function LightQuantity() {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [roomType, setRoomType] = useState<string>();
  const [selectedLight, setSelectedLight] = useState<string>(commonLights[0].name);
  const [result, setResult] = useState<{ lights: number; averageIlluminance: number } | null>(null);

  const calculateLighting = () => {
    const CU = 0.65; // Coefficient of Utilization
    const LLF = 0.8; // Light Loss Factor

    const area = length * width;
    const selectedRoomType = roomTypes.find(type => type.name === roomType);
    const light = commonLights.find(light => light.name === selectedLight);

    let luxRequired: number;

    if (selectedRoomType) {
      luxRequired = selectedRoomType.luxRequired;
    } else if (!isNaN(Number(roomType))) {
      luxRequired = Number(roomType); // Use manual lux input
    } else {
      return; // Invalid input, exit
    }

    if (!light || area <= 0 || luxRequired <= 0) return;

    const totalLumensNeeded = (area * luxRequired) / (CU * LLF);
    const numberOfLights = Math.ceil(totalLumensNeeded / light.lumens);
    const actualLumens = numberOfLights * light.lumens * CU * LLF;
    const averageIlluminance = actualLumens / area;

    setResult({
      lights: numberOfLights,
      averageIlluminance: Math.round(averageIlluminance), // Rounded for readability
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Description Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Kalkulator Jumlah Lampu</h2>
          </div>
          <p className="text-gray-600">
            Hitung jumlah lampu yang dibutuhkan untuk ruangan Anda berdasarkan ukuran dan tujuannya.
            Kalkulator ini membantu Anda mencapai tingkat pencahayaan yang direkomendasikan untuk berbagai jenis ruangan.
          </p>
          <p className="text-gray-600 mt-4">
            Rumus perhitungan: <br />
            <span className="font-mono bg-gray-100 p-1 rounded">
              (lux × Width × Length) / (0.65 × 0.8 × lumen)
            </span>
            <br />
            <span className="text-sm text-gray-500">
              - <strong>0.65</strong>: Coefficient of Utilization (CU) <br />
              - <strong>0.8</strong>: Light Loss Factor (LLF)
            </span>
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Room Dimensions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Panjang Ruangan (meters)
                </label>
                <input
                  type="number"
                  value={length || ''}
                  placeholder='Panjang Ruangan'
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lebar Ruangan (meters)
                </label>
                <input
                  type="number"
                  value={width || ''}
                  placeholder='Lebar Ruangan'
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            {/* Room Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Ruangan atau Lux
              </label>
              <input
                list="room-types"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                placeholder="Pilih atau input manual (e.g., 200)"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <datalist id="room-types">
                {roomTypes.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name} ({type.luxRequired} lux recommended)
                  </option>
                ))}
              </datalist>
            </div>


            {/* Light Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Lampu
              </label>
              <select
                value={selectedLight}
                onChange={(e) => setSelectedLight(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {commonLights.map((light) => (
                  <option key={light.name} value={light.name}>
                    {light.name} ({light.lumens} lumens)
                  </option>
                ))}
              </select>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateLighting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Hitung
            </button>

            {/* Results */}
            {result && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Jumlah Lampu yang Dibutuhkan</p>
                  <p className="text-lg font-semibold">{result.lights} Lampu</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Rata-rata Pencahayaan</p>
                  <p className="text-lg font-semibold">
                    {Math.round(result.averageIlluminance)} lux
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Tingkat Pencahyaan dan Renderasi Warna</h2>
          </div>
          <h3 className="text-lg font-semibold mb-4">Rumah Tangga</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ruangan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tingkat Pencahayaan (lux)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Renderasi Warna Minimum
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rumahTinggal.map((Cahaya, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Cahaya.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Cahaya.lux}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Cahaya.Renderasi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <h3 className="text-lg font-semibold mb-4">Perkantoran</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ruangan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tingkat Pencahayaan (lux)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Renderasi Warna Minimum
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {perkantoran.map((Cahaya, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Cahaya.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Cahaya.lux}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Cahaya.Renderasi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LightQuantity;
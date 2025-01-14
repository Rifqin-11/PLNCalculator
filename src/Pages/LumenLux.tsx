import React, { useState } from 'react';
import { BookOpen, Calculator, Info } from 'lucide-react';

function LumensLux() {
  const [beamAngle, setBeamAngle] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [lumens, setLumens] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const calculateLux = () => {
    if (beamAngle <= 0 || distance <= 0 || lumens <= 0) return;

    // Convert beam angle to radians
    const angleRadians = (beamAngle / 2) * (Math.PI / 180);
    
    // Calculate radius of the light circle at the given distance
    const radius = distance * Math.tan(angleRadians);
    
    // Calculate area of the light circle
    const area = Math.PI * radius * radius;
    
    // Calculate lux (lumens per square meter)
    const lux = lumens / area;
    
    setResult(lux);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Description Card */}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Kalkulator Lumens-Lux</h2>
          </div>
          <p className="text-gray-600">
          Mengonversi lumen ke lux berdasarkan sudut sinar dan jarak. Kalkulator ini membantu Anda menentukan illuminasi (lux) pada jarak tertentu dari sumber cahaya dengan flux cahaya yang diketahui (lumen) dan sudut sinar.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                            <Calculator className="w-6 h-6 text-blue-500" />
                            <h2 className="text-lg font-semibold">Kalkulator</h2>
                        </div>
            {/* Inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sudut Sinar (Pandangan) (derajat)
              </label>
              <input
                type="number"
                value={beamAngle || ''}
                onChange={(e) => setBeamAngle(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                max="360"
                placeholder="Masukkan sudut sinar dalam derajat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jarak (meter)
              </label>
              <input
                type="number"
                value={distance || ''}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="0.1"
                placeholder="Masukkan jarak dalam meter"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lumen
              </label>
              <input
                type="number"
                value={lumens || ''}
                onChange={(e) => setLumens(Number(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                placeholder="Masukkan jumlah lumen"
              />
            </div>


            {/* Calculate Button */}
            <button
              onClick={calculateLux}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Hitung
            </button>

            {/* Result */}
            {result !== null && (
              <div className="mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Illuminance</p>
                  <p className="text-lg font-semibold">
                    {Math.round(result * 100) / 100} lux
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reference Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h2 className="text-lg font-semibold">Referensi Tingkat Pencahayaan Umum</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Pencahayaan Dalam Ruangan</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Koridor: 100 lux</li>
                <li>Pencahayaan rumah: 150-300 lux</li>
                <li>Pencahayaan kantor: 300-500 lux</li>
                <li>Pekerjaan detail: 500-1000 lux</li>
                <li>Ruang operasi: 10000+ lux</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cahaya Alami</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Cahaya matahari penuh: 10000-25000 lux</li>
                <li>Hari berawan: 1000 lux</li>
                <li>Hari sangat gelap: 100 lux</li>
                <li>Senja: 10 lux</li>
                <li>Bulan purnama: 0.1 lux</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LumensLux;
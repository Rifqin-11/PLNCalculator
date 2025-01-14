import React, { useState } from 'react';
import { Info, Plus, Trash2, Calculator } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  watt: number;
  hours: number;
  quantity: number;
}

interface TariffGroup {
  id: string;
  name: string;
  ratePerKwh: number;
}

const tariffGroups: TariffGroup[] = [
  { id: 'r1', name: 'R1 - 450 VA (Subsidi)', ratePerKwh: 415 },
  { id: 'r1a', name: 'R1 - 900 VA (Subsidi)', ratePerKwh: 605 },
  { id: 'r1b', name: 'R1 - 900 VA', ratePerKwh: 1352 },
  { id: 'r1c', name: 'R1 - 1300-2200 VA', ratePerKwh: 1444.7 },
  { id: 'r2', name: 'R2 - 3500-5500 VA', ratePerKwh: 1699.53 },
  { id: 'r3', name: 'R3 - 6600 VA ke atas', ratePerKwh: 1699.53 },
  { id: 'b1', name: 'B1 - 450 VA', ratePerKwh: 254 },
  { id: 'b1a', name: 'B1 - 900 VA', ratePerKwh: 420 },
  { id: 'b1b', name: 'B1 - 1300 VA', ratePerKwh: 966 },
  { id: 'b1c', name: 'B1 - 2200-5500 VA', ratePerKwh: 1114.74 },
];

const commonDevices = [
  { name: 'Lampu LED', watt: 10 },
  { name: 'TV LED 32"', watt: 50 },
  { name: 'Kulkas 1 Pintu', watt: 100 },
  { name: 'AC 1 PK', watt: 750 },
  { name: 'Mesin Cuci', watt: 350 },
  { name: 'Rice Cooker', watt: 400 },
  { name: 'Setrika', watt: 300 },
  { name: 'Laptop', watt: 65 },
  { name: 'Kipas Angin', watt: 45 },
  { name: 'Microwave', watt: 800 },
];

function PLNCalculator() {
  const [selectedTariff, setSelectedTariff] = useState<string>('r1');
  const [devices, setDevices] = useState<Device[]>([ 
    { id: '1', name: '', watt: 0, hours: 0, quantity: 1 },
  ]);
  const [currentRate, setCurrentRate] = useState<number>(tariffGroups[0].ratePerKwh);
  const [result, setResult] = useState<{
    daily: number;
    monthly: number;
    yearly: number;
    kwh: number;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk menangani perubahan pilihan golongan tarif
  const handleTariffChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedTariff(selectedId);

    // Cari tarif berdasarkan ID yang dipilih
    const tariff = tariffGroups.find((group) => group.id === selectedId);
    if (tariff) {
      setCurrentRate(tariff.ratePerKwh);
    }
  };

  const addDevice = () => {
    setDevices([ 
      ...devices,
      { id: Date.now().toString(), name: '', watt: 0, hours: 0, quantity: 1 },
    ]);
  };

  const removeDevice = (id: string) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  const updateDevice = (id: string, field: keyof Device, value: string | number) => {
    setDevices(
      devices.map(device =>
        device.id === id ? { ...device, [field]: value } : device
      )
    );
  };

  const calculateUsage = () => {
    try {
      setIsCalculating(true);
      setError(null);

      const tariffRates: Record<string, number> = {
        r1: 415,
        r1a: 605,
        r1b: 1352,
        r1c: 1444.7,
        r2: 1699.53,
        r3: 1699.53,
        b1: 254,
        b1a: 420,
        b1b: 966,
        b1c: 1114.74
      };

      const rate = tariffRates[selectedTariff];
      if (!rate) {
        throw new Error("Invalid tariff group");
      }

      const totalWattHours = devices.reduce((acc, device) => {
        const { watt, hours, quantity } = device;
        return acc + watt * hours * quantity;
      }, 0);

      const kwhPerDay = totalWattHours / 1000;
      const dailyCost = kwhPerDay * rate;
      const monthlyCost = dailyCost * 30;
      const yearlyCost = monthlyCost * 12;

      setResult({
        kwh: kwhPerDay,
        daily: dailyCost,
        monthly: monthlyCost,
        yearly: yearlyCost,
      });
    } catch (err) {
      setError('Terjadi kesalahan saat menghitung. Silakan periksa data yang dimasukkan.');
      console.error('Calculation error:', err);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Description Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Kalkulator Listrik PLN</h2>
          </div>
          <p className="text-gray-600">
            Kalkulator ini membantu Anda menghitung perkiraan biaya listrik berdasarkan
            penggunaan perangkat elektronik di rumah Anda. Masukkan detail perangkat
            dan durasi penggunaan untuk mendapatkan estimasi biaya harian, bulanan,
            dan tahunan.
          </p>
          <br />
          <p className="text-gray-600">
            Rumus perhitungan biaya listrik:
          </p>
          <ol className="list-decimal list-inside text-gray-600">
            <li>Konversi Watt ke kWh: (Watt × Jam Pemakaian) ÷ 1000</li>
            <li>Biaya per hari: kWh × Tarif dasar listrik</li>
            <li>Biaya per bulan: Biaya per hari × 30</li>
            <li>Biaya per tahun: Biaya per bulan × 12</li>
          </ol>
        </div>


        {/* Calculator Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            {/* Tariff Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Golongan Tarif</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedTariff}
                onChange={handleTariffChange}
              >
                {tariffGroups.map((tariff) => (
                  <option key={tariff.id} value={tariff.id}>
                    {tariff.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-gray-600">
                Tarif dasar listrik: <span className="font-semibold">Rp {currentRate.toLocaleString('id-ID')} / kWh</span>
              </p>
            </div>

            {/* Devices List */}
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    list={`device-list-${device.id}`}
                    placeholder="Nama Perangkat"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={device.name}
                    onChange={(e) => {
                      const selectedDevice = commonDevices.find(
                        (d) => d.name.toLowerCase() === e.target.value.toLowerCase()
                      );
                      if (selectedDevice) {
                        updateDevice(device.id, 'watt', selectedDevice.watt);
                      }
                      updateDevice(device.id, 'name', e.target.value);
                    }}
                  />
                  <datalist id={`device-list-${device.id}`}>
                    {commonDevices.map((commonDevice) => (
                      <option key={commonDevice.name} value={commonDevice.name} />
                    ))}
                  </datalist>
                  <input
                    type="number"
                    placeholder="Watt"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={device.watt || ''}
                    onChange={(e) => updateDevice(device.id, 'watt', Number(e.target.value))}
                  />
                  <input
                    type="number"
                    placeholder="Jam/Hari"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={device.hours || ''}
                    onChange={(e) => updateDevice(device.id, 'hours', Number(e.target.value))}
                  />
                  <input
                    type="number"
                    placeholder="Jumlah"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={device.quantity}
                    onChange={(e) => updateDevice(device.id, 'quantity', Number(e.target.value))}
                  />
                  <button
                    onClick={() => removeDevice(device.id)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Device Button */}
            <button
              onClick={addDevice}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-5 h-5" />
              Tambah Perangkat
            </button>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Calculate Button */}
            <button
              onClick={calculateUsage}
              disabled={isCalculating}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="w-5 h-5" />
              {isCalculating ? 'Menghitung...' : 'Hitung'}
            </button>

            {/* Results */}
            {result && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Pemakaian (kWh/hari)</p>
                  <p className="text-lg font-semibold">{result.kwh.toFixed(2)} kWh</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Biaya Harian</p>
                  <p className="text-lg font-semibold">
                    Rp {result.daily.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Biaya Bulanan</p>
                  <p className="text-lg font-semibold">
                    Rp {result.monthly.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Biaya Tahunan</p>
                  <p className="text-lg font-semibold">
                    Rp {result.yearly.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Common Devices Reference */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Referensi Daya Perangkat Rumah Tangga</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perangkat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Daya (Watt)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {commonDevices.map((device, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {device.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {device.watt}W
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

export default PLNCalculator;
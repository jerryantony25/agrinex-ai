import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { BottomNav } from './BottomNav';
import { farmService } from '../../services/farmService';

export function AppLayout() {
  const [farmInfo, setFarmInfo] = useState(null);

  useEffect(() => {
    async function loadFarm() {
      try {
        const data = await farmService.getFarm('default-farmer');
        setFarmInfo(data);
      } catch (err) {
        // Fallback default
        setFarmInfo({
          name: "Green Valley Agro Farm",
          location: "Coimbatore, Tamil Nadu",
          primary_crop: "Tomato",
          size_hectares: 2.5
        });
      }
    }
    loadFarm();
  }, []);

  return (
    <div className="min-h-screen flex bg-[#FBFDFB]">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <TopHeader farmInfo={farmInfo} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ farmInfo, setFarmInfo }} />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

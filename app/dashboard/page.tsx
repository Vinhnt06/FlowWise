'use client';

import React, { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import ScreenD1Upload from '@/components/dashboard/ScreenD1Upload';
import ScreenD2Overview from '@/components/dashboard/ScreenD2Overview';
import ScreenD3Forecast from '@/components/dashboard/ScreenD3Forecast';
import ScreenD4Simulator from '@/components/dashboard/ScreenD4Simulator';
import ScreenD5ReportModal from '@/components/dashboard/ScreenD5ReportModal';

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col font-sans selection:bg-primary selection:text-white transition-colors duration-200">
      {/* Sticky Header with Mandatory Simulated Data Banner */}
      <DashboardHeader
        currentTab={currentTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Main Layout: Sidebar + Cockpit Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <DashboardSidebar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />

        {/* Right Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentTab === 'overview' && (
            <ScreenD2Overview
              onNavigateToForecast={() => setCurrentTab('forecast')}
              onNavigateToSimulator={() => setCurrentTab('simulator')}
            />
          )}

          {currentTab === 'forecast' && (
            <ScreenD3Forecast
              onNavigateToSimulator={() => setCurrentTab('simulator')}
            />
          )}

          {currentTab === 'simulator' && (
            <ScreenD4Simulator
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          )}

          {currentTab === 'upload' && (
            <ScreenD1Upload
              onProceed={() => setCurrentTab('forecast')}
            />
          )}
        </main>
      </div>

      {/* CFO Approval Modal (D5) */}
      <ScreenD5ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}

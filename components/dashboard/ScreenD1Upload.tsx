'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  Download,
  AlertCircle,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { MOCK_MARKETPLACE_SETTLEMENTS } from '@/data/shopx-dataset';
import { formatCurrencyAmount } from '@/lib/finance-engine';

export default function ScreenD1Upload({ onProceed }: { onProceed?: () => void }) {
  const [selectedSource, setSelectedSource] = useState<'SHOPEE' | 'TIKTOK' | '1688' | 'BANK'>('SHOPEE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(true);

  const sampleRows = [
    {
      date: '2026-10-06',
      orderSn: 'SP261006001',
      channel: 'Shopee',
      gross: 45_000_000,
      fee: 5_400_000,
      refund: 2_250_000,
      shipping: 1_350_000,
      hold: 4_500_000,
      net: 31_500_000,
      status: 'Đã Đối Soát',
    },
    {
      date: '2026-10-07',
      orderSn: 'SP261007002',
      channel: 'Shopee',
      gross: 62_000_000,
      fee: 7_440_000,
      refund: 3_100_000,
      shipping: 1_860_000,
      hold: 6_200_000,
      net: 43_400_000,
      status: 'Đã Đối Soát',
    },
    {
      date: '2026-10-08',
      orderSn: 'SP261008003',
      channel: 'Shopee',
      gross: 38_000_000,
      fee: 4_560_000,
      refund: 1_900_000,
      shipping: 1_140_000,
      hold: 3_800_000,
      net: 26_600_000,
      status: 'Đã Đối Soát',
    },
    {
      date: '2026-10-09',
      orderSn: 'TTS261008B',
      channel: 'TikTok Shop',
      gross: 48_000_000,
      fee: 6_240_000,
      refund: 2_400_000,
      shipping: 1_440_000,
      hold: 4_800_000,
      net: 33_120_000,
      status: 'Đã Đối Soát',
    },
    {
      date: '2026-10-10',
      orderSn: 'TTS261010C',
      channel: 'TikTok Shop',
      gross: 52_000_000,
      fee: 6_760_000,
      refund: 2_600_000,
      shipping: 1_560_000,
      hold: 5_200_000,
      net: 35_880_000,
      status: 'Đã Đối Soát',
    },
    {
      date: '2026-10-12',
      orderSn: 'SP261012006',
      channel: 'Shopee',
      gross: 90_000_000,
      fee: 10_800_000,
      refund: 4_500_000,
      shipping: 2_700_000,
      hold: 9_000_000,
      net: 63_000_000,
      status: 'Đã Đối Soát',
    },
  ];

  const handleSimulateUpload = (source: 'SHOPEE' | 'TIKTOK' | '1688' | 'BANK') => {
    setSelectedSource(source);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasLoaded(true);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header Statement */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Nạp Dữ Liệu Bán Hàng & Công Nợ</h2>
          <span className="text-xs text-[#8e8ea8]">
            Đối soát tự động các báo cáo doanh thu từ sàn TMĐT và hóa đơn xưởng sản xuất
          </span>
        </div>

        {/* Formula reminder pill */}
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161622] border border-[#232336] text-[11px] font-mono text-[#a1a1ba] flex items-center gap-2">
          <span className="text-[#00d4aa] font-bold">Công thức:</span>
          <span>Net = Gross - Phí Sàn - Hoàn Trả - Vận Chuyển - Tạm Giữ Hold</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Multi-Source Selectors (Matching Image D1) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-[#111118] border border-[#232336] p-5 backdrop-blur-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8e8ea8] block mb-4">
              Chọn Nguồn Hoặc Kéo Thả File
            </span>

            {/* Drop Zone Box */}
            <div className="border-2 border-dashed border-[#00d4aa]/40 rounded-xl p-6 text-center bg-[#0a0a0f] hover:border-[#00d4aa] transition-colors cursor-pointer mb-4">
              <UploadCloud className="w-8 h-8 text-[#00d4aa] mx-auto mb-2" />
              <span className="text-xs font-semibold text-white block mb-1">
                Kéo & thả file hoặc chọn nguồn
              </span>
              <span className="text-[10px] text-[#8e8ea8] block">Hỗ trợ file CSV, Excel từ sàn TMĐT</span>
            </div>

            {/* Quick 1-Click Preset Buttons for Judges/Demo */}
            <div className="space-y-2">
              <button
                onClick={() => handleSimulateUpload('SHOPEE')}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedSource === 'SHOPEE'
                    ? 'bg-[#161622] border-[#00d4aa] text-white shadow-md'
                    : 'bg-[#161622]/60 border-[#232336] text-[#8e8ea8] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-[#ee4d2d] flex items-center justify-center text-white text-[10px] font-bold">
                    S
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">Shopee Settlement CSV</span>
                    <span className="text-[10px] text-[#8e8ea8]">Báo cáo quyết toán ví người bán</span>
                  </div>
                </div>
                {selectedSource === 'SHOPEE' && <CheckCircle2 className="w-4 h-4 text-[#00d4aa]" />}
              </button>

              <button
                onClick={() => handleSimulateUpload('TIKTOK')}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedSource === 'TIKTOK'
                    ? 'bg-[#161622] border-[#00d4aa] text-white shadow-md'
                    : 'bg-[#161622]/60 border-[#232336] text-[#8e8ea8] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-black flex items-center justify-center text-white text-[10px] font-bold border border-white/20">
                    TT
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">TikTok Shop Income CSV</span>
                    <span className="text-[10px] text-[#8e8ea8]">Báo cáo thu nhập & phí affiliate</span>
                  </div>
                </div>
                {selectedSource === 'TIKTOK' && <CheckCircle2 className="w-4 h-4 text-[#00d4aa]" />}
              </button>

              <button
                onClick={() => handleSimulateUpload('1688')}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedSource === '1688'
                    ? 'bg-[#161622] border-[#ff6b35] text-white shadow-md'
                    : 'bg-[#161622]/60 border-[#232336] text-[#8e8ea8] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-[#ff6b35] flex items-center justify-center text-white text-[9px] font-mono font-bold">
                    1688
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">Hóa đơn Nhà cung cấp 1688</span>
                    <span className="text-[10px] text-[#8e8ea8]">Công nợ lô hàng nhập khẩu (CNY)</span>
                  </div>
                </div>
                {selectedSource === '1688' && <CheckCircle2 className="w-4 h-4 text-[#ff6b35]" />}
              </button>

              <button
                onClick={() => handleSimulateUpload('BANK')}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedSource === 'BANK'
                    ? 'bg-[#161622] border-[#4d9fff] text-white shadow-md'
                    : 'bg-[#161622]/60 border-[#232336] text-[#8e8ea8] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-[#1f1f2e] flex items-center justify-center text-[#4d9fff] text-[10px] font-bold">
                    MB
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">Sao kê Ngân hàng (Bank Statement)</span>
                    <span className="text-[10px] text-[#8e8ea8]">Dòng tiền chi phí thực tế</span>
                  </div>
                </div>
                {selectedSource === 'BANK' && <CheckCircle2 className="w-4 h-4 text-[#4d9fff]" />}
              </button>
            </div>

            {/* Download Sample Files Link */}
            <div className="pt-4 mt-4 border-t border-[#232336] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#8e8ea8]">Tải file mẫu để thử:</span>
              <a
                href="/sample-data/shopee_settlement_sample.csv"
                download
                className="text-[#00d4aa] hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                Shopee.csv
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Parsed Data Table Preview (Matching Image D1) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl bg-[#111118] border border-[#232336] p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#232336]">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#00d4aa]" />
                <span className="text-sm font-bold text-white">Dữ Liệu Đã Bóc Tách (Parsed Preview)</span>
              </div>
              <span className="text-xs font-mono text-[#00d4aa] bg-[#00d4aa]/10 border border-[#00d4aa]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" />
                Phân tích hoàn tất 100%
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#232336] text-[#8e8ea8] text-[11px]">
                    <th className="pb-3 font-medium">Ngày</th>
                    <th className="pb-3 font-medium">Kênh</th>
                    <th className="pb-3 font-medium text-right">Doanh Thu Gross</th>
                    <th className="pb-3 font-medium text-right">Phí Sàn</th>
                    <th className="pb-3 font-medium text-right">Tạm Giữ Hold</th>
                    <th className="pb-3 font-medium text-right text-[#00d4aa]">Thực Nhận Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232336]/40">
                  {sampleRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 text-white">{row.date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          row.channel === 'Shopee'
                            ? 'bg-[#ee4d2d]/15 text-[#ee4d2d] border border-[#ee4d2d]/30'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}>
                          {row.channel}
                        </span>
                      </td>
                      <td className="py-3 text-right text-[#a1a1ba]">
                        {formatCurrencyAmount(row.gross, 'VND')}
                      </td>
                      <td className="py-3 text-right text-[#ff4757]">
                        -{formatCurrencyAmount(row.fee, 'VND')}
                      </td>
                      <td className="py-3 text-right text-[#ffaa00]">
                        -{formatCurrencyAmount(row.hold, 'VND')}
                      </td>
                      <td className="py-3 text-right font-bold text-[#00d4aa]">
                        +{formatCurrencyAmount(row.net, 'VND')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Progress Bar & Next Action Button (Matching Image D1) */}
            <div className="pt-6 mt-4 border-t border-[#232336] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2">
                <div className="flex justify-between text-[11px] font-mono text-[#8e8ea8] mb-1">
                  <span>Tiến trình xử lý dữ liệu:</span>
                  <span className="text-[#00d4aa]">100% Hoàn Tất</span>
                </div>
                <div className="w-full bg-[#232336] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#00d4aa] h-full w-full shadow-[0_0_8px_#00d4aa]" />
                </div>
              </div>

              {onProceed && (
                <button
                  onClick={onProceed}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-black bg-[#00d4aa] hover:bg-[#05f3c4] shadow-lg shadow-[#00d4aa]/25 transition-all flex items-center gap-1.5"
                >
                  <span>Chuyển Sang Dự Báo 13 Tuần</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

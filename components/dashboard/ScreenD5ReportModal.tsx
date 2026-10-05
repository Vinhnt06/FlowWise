'use client';

import React, { useState } from 'react';
import {
  X,
  FileCheck,
  CheckCircle2,
  Download,
  AlertTriangle,
  Printer,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SHOP_METADATA } from '@/data/shopx-dataset';

interface ScreenD5ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScreenD5ReportModal({
  isOpen,
  onClose,
}: ScreenD5ReportModalProps) {
  const [isSigned, setIsSigned] = useState(false);

  if (!isOpen) return null;

  const handleSignAndExport = () => {
    setIsSigned(true);

    // Launch celebratory confetti fireworks
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00d4aa', '#facc15', '#4d9fff'],
    });

    // Generate downloadable text audit report
    const reportText = `========================================================
BÁO CÁO ĐIỀU PHỐI THANH KHOẢN TUẦN 2 — CÔNG TY TNHH SHOPX
Mã số thuế: ${SHOP_METADATA.taxId}
Trạng thái: ĐÃ KÝ DUYỆT BỞI GIÁM ĐỐC TÀI CHÍNH (CFO SIGNED)
Thời gian ký: ${new Date().toLocaleString('vi-VN')}
Ghi chú: ${SHOP_METADATA.simulatedDisclaimer}
========================================================

1. TÌNH TRẠNG RỦI RO BAN ĐẦU (BASELINE):
- Số dư dự kiến cuối Tuần 2: 150.000.000 VND
- Ngưỡng đệm an toàn bắt buộc: 160.000.000 VND
- Mức thâm hụt cảnh báo: -10.000.000 VND
- Nguyên nhân: Tiền hàng Shopee/TikTok bị sàn giữ đối soát, thanh toán công nợ xưởng 1688 đến hạn.

2. PHƯƠNG ÁN ĐIỀU PHỐI ĐƯỢC CHẤP THUẬN:
- Đòn bẩy 1: Thu sớm 50.000.000 VND công nợ khách sỉ với chiết khấu thanh toán 2% (-1.000.000 VND).
- Đòn bẩy 2: Đàm phán gia hạn thanh toán 14 ngày cho khoản 40.000.000 VND nhà cung cấp xưởng 1688 (dời sang Tuần 4).

3. TÁC ĐỘNG TÀI CHÍNH SAU ĐIỀU PHỐI:
- Số dư cuối Tuần 2 sau điều phối: 239.000.000 VND
- Thặng dư trên ngưỡng đệm an toàn: +79.000.000 VND
- Tổng chi phí vốn phát sinh: 1.000.000 VND
- Đánh giá rủi ro: LỖ HỔNG THANH KHOẢN ĐÃ ĐƯỢC HÓA GIẢI HOÀN TOÀN.

4. XÁC NHẬN PHÊ DUYỆT SỐ:
- Giám đốc Tài chính: ĐÃ KÝ (VERIFIED BY FLOWWISE DETERMINISTIC ENGINE)
- Token xác thực: FW-CFO-2026-W2-094721
========================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Bao_Cao_Dieu_Phoi_Dong_Tien_Tuan_2_ShopX.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Modal Dialog Card (Direct from Image D5) */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8e8ea8] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-[#00d4aa]/15 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa]">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Báo Cáo Dòng Tiền & Ký Duyệt Phương Án CFO
            </h3>
            <span className="text-[11px] font-mono text-[#8e8ea8]">
              CÔNG TY TNHH THƯƠNG MẠI SHOPX • MST: {SHOP_METADATA.taxId}
            </span>
          </div>
        </div>

        {/* Section 1: Tình Trạng Rủi Ro */}
        <div className="p-4 rounded-xl bg-[#161622] border border-[#ff4757]/30 mb-4 font-mono text-xs">
          <div className="flex items-center justify-between font-bold text-white mb-2">
            <span className="flex items-center gap-1.5 text-[#ff4757]">
              <AlertTriangle className="w-3.5 h-3.5" />
              1. Tình Trạng Rủi Ro
            </span>
            <span className="text-[#ff4757]">-10.000.000 ₫ Thâm Hụt</span>
          </div>
          <p className="text-[#8e8ea8] text-[11px] leading-relaxed">
            Số dư dự kiến cuối Tuần 2 giảm xuống mức 150M VND, vi phạm ngưỡng đệm an toàn 160M VND do độ trễ thanh toán từ ví sàn TMĐT và khoản thanh toán tiền hàng xưởng 1688.
          </p>
        </div>

        {/* Section 2: Phương Án Đề Xuất */}
        <div className="p-4 rounded-xl bg-[#161622] border border-[#232336] mb-4 font-mono text-xs">
          <span className="font-bold text-white block mb-2">2. Phương Án Đề Xuất Điều Phối</span>
          <div className="space-y-1.5 text-[#a1a1ba] text-[11px]">
            <div>• Kích hoạt đàm phán gia hạn thanh toán NCC 1688 thêm 14 ngày (Dời 40M sang Tuần 4).</div>
            <div>• Áp dụng chiết khấu 2% cho đại lý bán sỉ để thu sớm 50M VND ngay trong Tuần 2.</div>
          </div>
        </div>

        {/* Section 3: Tác Động Sau Điều Phối */}
        <div className="p-4 rounded-xl bg-[#00d4aa]/5 border border-[#00d4aa]/30 mb-6 font-mono text-xs">
          <div className="flex items-center justify-between font-bold text-white mb-2">
            <span className="text-[#00d4aa]">3. Tác Động Sau Điều Phối</span>
            <span className="text-[#00d4aa]">+30M VND Vượt Ngưỡng</span>
          </div>
          <div className="text-[#a1a1ba] text-[11px] space-y-1">
            <div>• Số dư đóng kỳ Tuần 2 nâng lên: <span className="text-white font-bold">190.000.000 VND</span></div>
            <div>• Chi phí giải pháp chiết khấu: <span className="text-white">1.000.000 VND</span></div>
            <div>• Trạng thái an toàn: <span className="text-[#00d4aa] font-semibold">ĐÃ HÓA GIẢI HOÀN TOÀN</span></div>
          </div>
        </div>

        {/* Section 4: Ký Duyệt & Chữ Ký Số */}
        <div className="pt-4 border-t border-[#232336] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-5 h-5 ${isSigned ? 'text-[#00d4aa]' : 'text-[#8e8ea8]'}`} />
            <div className="flex flex-col">
              <span className="text-xs font-mono font-semibold text-white">
                {isSigned ? 'Đã Ký Duyệt Kỹ Thuật Số' : 'Đã Sẵn Sàng Ký Duyệt'}
              </span>
              <span className="text-[10px] text-[#8e8ea8]">Bởi Giám Đốc Tài Chính (CFO)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono text-[#8e8ea8] hover:text-white bg-[#161622] hover:bg-[#1f1f2e] border border-[#232336] transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={handleSignAndExport}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-[#00d4aa] hover:bg-[#05f3c4] shadow-lg shadow-[#00d4aa]/25 transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xác Nhận Ký Duyệt & Xuất PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

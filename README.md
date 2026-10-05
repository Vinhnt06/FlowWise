# 🌊 FlowWise — Multi-Currency Cashflow Intelligence & 13-Week Forecasting

[![FlowWise CI](https://github.com/Vinhnt06/FlowWise/actions/workflows/ci.yml/badge.svg)](https://github.com/Vinhnt06/FlowWise/actions)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Production-00D4AA?logo=vercel&logoColor=black)](https://flowwise-eta.vercel.app)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.8-white?logo=nextdotjs&logoColor=black)](https://nextjs.org)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

> **Dự án MVP phục vụ cuộc thi Fintechathon 2026**  
> Trợ lý dự báo thanh khoản 13 tuần và điều phối dòng tiền đa tệ tách biệt cho nhà bán hàng Shopee, TikTok Shop & Nhà nhập khẩu tiểu ngạch tại Việt Nam.

---

## 🌐 Trải Nghiệm Trực Tiếp (Live Demo)

- 🔗 **Website chính thức (Vercel Production):** [https://flowwise-eta.vercel.app](https://flowwise-eta.vercel.app)
- 📊 **Cockpit Dashboard tương tác:** [https://flowwise-eta.vercel.app/dashboard](https://flowwise-eta.vercel.app/dashboard)
- 🐙 **GitHub Repository:** [https://github.com/Vinhnt06/FlowWise](https://github.com/Vinhnt06/FlowWise)

> ⚠️ **Lưu ý dữ liệu:** Toàn bộ số liệu trên ứng dụng được gán nhãn bắt buộc `SIMULATED DATA — FOR DEMO PURPOSES` phục vụ việc chấm thi và thuyết trình.

---

## 💡 Vấn Đề Cốt Lõi: "Doanh Số Trên Sàn ≠ Tiền Trong Tài Khoản"

Các chủ shop bán hàng đa kênh tại Việt Nam thường xuyên đối mặt với nguy cơ vỡ nợ kỹ thuật dù kinh doanh có lãi:
1. **Độ trễ dòng tiền (Cash Gap):** Sàn TMĐT (Shopee, TikTok Shop) giam giữ tiền đối soát 14-21 ngày.
2. **Chiết giảm ngầm:** Phí sàn (12%), tỷ lệ hoàn đơn COD (5%), phí vận chuyển bào mòn lợi nhuận gộp.
3. **Ảo giác ngoại tệ:** Việc quy đổi gộp CNY (nợ xưởng 1688) và USD (quảng cáo quốc tế) sang VND theo tỷ giá kế toán tạo ra ảo giác "vẫn còn nhiều tiền", dẫn đến thiếu hụt tiền mặt đột ngột khi các hóa đơn xưởng đến hạn.

---

## ⚡ Giải Pháp Của FlowWise

### 1. Nguyên Tắc Cô Lập Ngoại Tệ (Strict Currency Isolation)
FlowWise **tuyệt đối không quy đổi chéo tiền tệ** theo tỷ giá giả định:
* **VND (Tiền mặt hoạt động):** `280.000.000 ₫` — Chi trả lương, thuê kho bãi, đóng gói hàng ngày. Ngưỡng đệm an toàn: `160.000.000 ₫`.
* **CNY (Công nợ nhà cung cấp 1688):** `¥120.000` — Dành riêng thanh toán các lô hàng xưởng sản xuất Quảng Châu.
* **USD (Dự trữ thanh toán quốc tế):** `$15.000` — Chi trả cước tàu biển logistics và chi phí thẻ quảng cáo Meta/TikTok Ads.

### 2. Động Cơ Thuần Nhất Dự Báo 13 Tuần (100% Pure Functions)
* Bảo toàn nguyên lý chuỗi thanh khoản:
  $$\text{Closing}_t = \text{Opening}_{t+1}$$
* Công thức đối soát dòng tiền sàn chuẩn xác:
  $$\text{Thực Nhận Net} = \text{Gross} - \text{Phí Sàn} - \text{Hoàn Đơn COD} - \text{Vận Chuyển} - \text{Tạm Giữ Hold}$$
* Cảnh báo thâm hụt tự động trước 14 ngày (Phát hiện điểm sụt giảm tại **Tuần 2**: `150M < 160M Buffer` $\rightarrow$ Thâm hụt `10.000.000 VND`).

### 3. Bộ Giả Lập Kịch Bản Giải Cứu Dòng Tiền (3 Mitigation Levers)
* **Đòn bẩy 1:** Thu sớm công nợ khách sỉ (Chiết khấu 2% để thu ngay 50M VND).
* **Đòn bẩy 2:** Đàm phán gia hạn thanh toán nợ xưởng 1688 thêm 14 ngày (Dời 40M sang Tuần 4).
* **Đòn bẩy 3:** Kích hoạt hạn mức thấu chi / tín dụng ngắn hạn (30M @ 8%/năm).
* Kết quả sau điều phối: Số dư Tuần 2 nâng từ **150M lên 190M+ VND** (Vượt ngưỡng an toàn `+30M VND`).

### 4. Gói Báo Cáo & Ký Duyệt Phê Duyệt CFO (Executive Sign-off)
* Tóm lược 1 trang: Tình trạng rủi ro $\rightarrow$ Phương án đề xuất $\rightarrow$ Tác động tài chính sau điều phối.
* Xác nhận ký số điện tử (Digital Sign-off), hiệu ứng pháo hoa chúc mừng (`canvas-confetti`) và xuất file báo cáo quyết sách tức thì.

---

## 🧪 Kiểm Thử Tự Động & Độ Chính Xác Toán Học

Dự án tích hợp bộ kiểm thử 7 tiêu chuẩn tài chính khắt khe:

```bash
npm run test:finance
```

Kết quả:
```text
====================================================
🧪 FLOWWISE FINANCE ENGINE — 7-POINT VERIFICATION
   Target Entity: CÔNG TY TNHH THƯƠNG MẠI SHOPX
   Mode: SIMULATED DATA — FOR DEMO PURPOSES
====================================================

✅ TEST 1 PASSED: Marketplace Net Payout Formula (Gross 500M -> Net 350M VND)
✅ TEST 2 PASSED: 13-Week Conservation of Balance (closing[t] === opening[t+1])
✅ TEST 3 PASSED: Strict Currency Isolation Enforcement (Blocks cross-currency leaks)
✅ TEST 4 PASSED: Baseline Week 2 Deficit Detection (150M < 160M Buffer -> Deficit: 10M)
✅ TEST 5 PASSED: Lever 1 (Accelerate Receivables) Rescue (Closing: 199M VND)
✅ TEST 6 PASSED: Lever 2 (Defer Payables) Rescue (Closing: 190M VND)
✅ TEST 7 PASSED: Combined Multi-Lever Rescue & Action Plan (Closing: 239M VND)

====================================================
🎉 TEST SCORECARD: 7/7 TESTS PASSED (100%)
====================================================
```

---

## 🛠️ Cài Đặt & Chạy Môi Trường Cục Bộ

### Yêu Cầu Môi Trường
- Node.js >= 20.0.0
- npm >= 10.0.0

### Các Bước Cài Đặt
```bash
# 1. Clone kho lưu trữ
git clone https://github.com/Vinhnt06/FlowWise.git
cd FlowWise

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Chạy kiểm thử động cơ tài chính
npm run test:finance

# 4. Khởi động môi trường phát triển cục bộ
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để trải nghiệm.

---

## 🎨 Tiêu Chuẩn Thiết Kế

Được định nghĩa chi tiết tại file [`DESIGN.md`](./DESIGN.md) theo chuẩn **Swiss Grid × Ethereal Glass**:
- **Canvas:** Obsidian Black `#0A0A0F`
- **Surface:** High-Density Glass `#111118`
- **Electric Emerald (VND & Action):** `#00D4AA`
- **Signal Coral (CNY Factory):** `#FF6B35`
- **Cobalt Electric (USD Reserve):** `#4D9FFF`
- **Crimson Alert (Deductions & Breach):** `#FF4757`
- **Typography:** `Geist Sans` cho bố cục & `Geist Mono` cho toàn bộ số liệu tài chính.

---

© 2026 FlowWise. Xây dựng cho Fintechathon 2026.

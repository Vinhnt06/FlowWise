# FlowWise — Trả lời checklist nghiệp vụ để chốt MVP

**Mục đích:** Tài liệu này trả lời từng câu hỏi trong checklist nghiệp vụ gốc để nhóm Business và Software có thể thống nhất phạm vi MVP. Các mục mang nhãn **Đề xuất** là khuyến nghị của nhóm sản phẩm; các điểm chưa được khách hàng/người làm nghiệp vụ xác nhận được ghi rõ là **Giả định cần kiểm chứng**.

**Định vị đang đề xuất:** FlowWise là trợ lý tài chính cho doanh nghiệp bán hàng trực tuyến/quản lý phân phối quy mô nhỏ, giúp theo dõi tiền về từ nhiều kênh, dự báo thiếu hụt thanh khoản theo từng loại tiền và so sánh phương án xử lý. AI giải thích và điều phối công cụ; mọi con số do bộ máy tính toán xác định.

## Cơ sở nhu cầu và giới hạn của bằng chứng

- Bộ Công Thương cho biết quy mô thương mại điện tử Việt Nam năm 2024 vượt 25 tỷ USD, tăng khoảng 20% so với 2023; cơ quan thuế ghi nhận gần 725.000 tổ chức/cá nhân kinh doanh trên nền tảng với giá trị giao dịch vượt 75 nghìn tỷ đồng. Điều này xác nhận thị trường và hoạt động kinh doanh trên nền tảng có quy mô đáng kể, nhưng **không chứng minh mọi shop đều có lượng đơn lớn hoặc thiếu cố vấn tài chính**. [Cổng Thông tin Chính phủ](https://en.baochinhphu.vn/viet-nams-e-commerce-market-up-20-in-2024-111250107155234946.htm)
- Kế hoạch quốc gia về thương mại điện tử 2026–2030 đặt mục tiêu doanh số bán lẻ TMĐT tăng 20–30% mỗi năm và 60% doanh nghiệp vừa và nhỏ hoạt động trên nền tảng TMĐT. Đây là **mục tiêu chính sách trong tương lai**, không phải số liệu đã đạt được. [Bộ Công Thương](https://moit.gov.vn/tin-tuc/phe-duyet-ke-hoach-tong-the-phat-trien-thuong-mai-dien-tu-quoc-gia-giai-doan-2026-2030.html)
- Nghiên cứu ADBI/CCAF khảo sát 819 MSME đang dùng nền tảng tài chính số tại 7 nền kinh tế châu Á, trong đó có Việt Nam. Nhu cầu vay thường phục vụ ngắn hạn: trả nhà cung cấp, mua nguyên liệu và bù thiếu hụt tiền bất ngờ như khách hàng trả chậm. Tốc độ giải ngân, quy trình đơn giản, khả năng được duyệt và kỳ hạn linh hoạt ảnh hưởng lựa chọn. Mẫu này là người dùng dịch vụ tài chính số, không đại diện thống kê cho toàn bộ SME Việt Nam. [ADBI](https://www.adb.org/adbi/news/digital-finance-is-a-boost-for-msmes-in-asia-new-study-finds)
- Khảo sát AFP năm 2025 với hơn 500 chuyên viên ngân quỹ cho thấy 73% xem quản lý/dự báo tiền mặt là ưu tiên hàng đầu và 62% xem dự báo thanh khoản là nhiệm vụ khó nhất. Đây là bằng chứng về độ khó của công việc ngân quỹ, không phải tỷ lệ nhu cầu mua sản phẩm của shop Việt Nam. [AFP](https://www.afponline.org/training-resources/resources/survey-research-economic-data/Details/treasury-benchmarking)

**Nhận định sản phẩm:** Bán trên sàn, website và social commerce có thể giúp shop mở rộng doanh số mà không cần tăng đội ngũ tài chính tương ứng. Khi đó, tiền thực nhận có thể khác doanh số đơn hàng vì phí sàn, hoàn tiền, COD, vận chuyển, giữ tiền và lịch đối soát. Đây là logic nghiệp vụ cần xác nhận với người bán cụ thể. Chưa có trong tài liệu nguồn một khảo sát đại diện chứng minh rằng “nhiều shop chỉ có vài nhân viên nhưng xử lý khối lượng giao dịch khổng lồ” hoặc “đa số không có cố vấn tài chính”; hãy dùng hai điều này như **giả thuyết khách hàng**, không trình bày như số liệu đã được xác lập.

---

## 1. Người dùng và vấn đề chính

### Chọn một nhóm SME cụ thể và người trực tiếp sử dụng: chủ doanh nghiệp hay kế toán?

**Đề xuất:** Người bán lẻ/nhà phân phối Việt Nam có hoạt động thương mại điện tử, khoảng **5–50 nhân sự tổng cộng**, bán trên một hoặc nhiều kênh (ví dụ sàn TMĐT, website, social commerce) và có thể đồng thời bán sỉ B2B. Nhóm vận hành tài chính thường là chủ shop cùng một kế toán/nhân viên vận hành; quy mô đội tài chính nhỏ là **giả định cần phỏng vấn**, không khẳng định cho mọi shop.

- Người dùng chính: chủ doanh nghiệp/giám đốc vận hành — quyết định dự trữ tiền, nhập hàng, trả nhà cung cấp và có vay hay không.
- Người dùng phụ: kế toán/nhân viên vận hành — tải file giao dịch, đối soát tiền sàn, kiểm tra công nợ.
- Bối cảnh cần ưu tiên: có nhiều đơn hoặc nhiều kênh bán nhưng chỉ có một nhóm nhỏ theo dõi phí, hoàn/huỷ, đối soát và dòng tiền; có thể nhập hàng từ Trung Quốc hoặc giao dịch bằng VND/USD/CNY.

**Cần xác nhận:** Phỏng vấn người bán để chốt ngành hàng (ví dụ thời trang, mỹ phẩm, đồ gia dụng), số kênh bán và lượng giao dịch thực tế. Không lấy mốc 5–50 nhân sự làm tiêu chí thị trường cuối cùng nếu chưa có bằng chứng người dùng.

### Chốt một vấn đề ưu tiên và quyết định sản phẩm cần hỗ trợ, ví dụ: biết tuần nào thiếu tiền và chọn cách xử lý.

**Đề xuất:** “Với tiền đang có trong từng loại tiền tệ, shop có thể trả tiền nhập hàng, lương, vận chuyển và nghĩa vụ đến hạn trong 13 tuần tới không? Nếu có tuần xuống dưới mức dự phòng, nguyên nhân từ khoản thu/chi nào và nên cân nhắc hành động nào?”

Ưu tiên vấn đề **đối soát và dự báo tiền thực nhận theo kênh bán**, sau đó mới đến quyết định vốn lưu động. Doanh số đơn hàng không đồng nghĩa với tiền đã vào tài khoản: cần tách doanh số gộp, phí nền tảng, hoàn tiền/huỷ, COD, phí giao hàng và ngày sàn chuyển khoản.

### Có bằng chứng nhu cầu hoặc người có thể dùng thử không?

**Bằng chứng hiện có:** Thị trường TMĐT Việt Nam tăng trưởng và có quy mô lớn; nghiên cứu khu vực cho thấy MSME dùng vốn ngắn hạn để thanh toán nhà cung cấp, nguyên liệu và bù khoảng trống dòng tiền. Các nguồn này hỗ trợ vấn đề chung nhưng không chứng minh một shop cụ thể cần FlowWise hoặc sẵn sàng dùng thử.

**Đề xuất kiểm chứng:** Phỏng vấn 5–8 chủ shop/kế toán/vận hành shop online; nếu có thể, thêm 2–3 quản lý quan hệ khách hàng SME hoặc nhân viên tín dụng SME. Hỏi về lần gần nhất tiền sàn về chậm, khoản phí/hoàn tiền khó đối soát, quyết định nhập hàng hoặc trả nhà cung cấp bị ảnh hưởng, cách theo dõi USD/VND/CNY, và file nào có thể xuất. Ghi lại ví dụ đã ẩn danh. Chỉ ghi “có pilot” khi có một người cụ thể đồng ý thử.

## 2. Phạm vi MVP

### Chốt tính năng bắt buộc và tính năng để sau.

**Bắt buộc cho MVP dự thi:**

1. Tải CSV giao dịch ngân hàng, file đối soát/thanh toán từ nền tảng bán hàng, khoản phải thu/phải trả, số dư đầu kỳ và khoản chi định kỳ.
2. Báo lỗi dữ liệu, phát hiện trùng lặp, chuẩn hóa ngày và giữ tham chiếu về file/dòng nguồn.
3. Hỗ trợ ba mã tiền tệ **VND, CNY (Nhân dân tệ/Renminbi) và USD**. Mỗi giao dịch và số dư được giữ nguyên bằng đồng tiền gốc; dự báo và ngưỡng tiền mặt được tính riêng theo từng đồng tiền. **Không tự quy đổi và không cộng thành một tổng tiền đa tiền tệ.**
4. Dự báo dòng tiền tuần trong 13 tuần cho từng loại tiền, với giả định hiển thị rõ.
5. Cảnh báo tuần đầu tiên số dư dự báo thấp hơn mức dự phòng, giải thích theo khoản tiền dự kiến vào/ra và theo từng đồng tiền.
6. Mô phỏng ba lựa chọn: thúc đẩy thu tiền/ưu đãi thanh toán sớm; dời khoản phải trả đủ điều kiện; khoản vay/hạn mức giả định bằng đúng loại tiền liên quan.
7. So sánh số dư thấp nhất, mức thiếu hụt, chi phí ước tính và rủi ro; yêu cầu người dùng phê duyệt kế hoạch.
8. Xuất báo cáo và gói bằng chứng gồm phiên bản dữ liệu, giả định, forecast, kịch bản và quyết định; cung cấp bộ dữ liệu demo và hướng dẫn chạy.

**Để giai đoạn sau:** Kết nối API ngân hàng/sàn TMĐT, tự động chuyển tiền, marketplace cho vay thật, quy đổi tỷ giá và dự báo tổng hợp đa tiền tệ, tối ưu tồn kho, nhiều pháp nhân, AI dự báo phức tạp, blockchain. Chỉ đưa vào sau khi nhóm kiểm chứng được luồng CSV và người dùng xác nhận cần.

**Lý do:** Nhu cầu vốn lưu động và minh bạch chi phí vay có bằng chứng khu vực. Tuy nhiên, sản phẩm dự thi có thể chứng minh giá trị bằng đối soát, dự báo và mô phỏng mà không cần truy cập tài khoản hoặc thực hiện giao dịch thật.

### Xác nhận luồng theo brief: nhập dữ liệu → dự báo 13 tuần → cảnh báo → mô phỏng → phê duyệt → xuất báo cáo.

**Đề xuất xác nhận**, bổ sung bước đối soát dữ liệu và tách forecast từng loại tiền:

```text
Tải dữ liệu kênh bán/ngân hàng
→ kiểm tra và đối soát tiền gộp, phí, hoàn tiền, tiền thực nhận
→ dự báo 13 tuần riêng cho VND, CNY, USD
→ giải thích tuần rủi ro theo từng đồng tiền
→ mô phỏng 3 hành động cùng đồng tiền
→ người có quyền duyệt chọn kế hoạch
→ xuất báo cáo và lịch sử quyết định
```

AI gọi công cụ nghiệp vụ và giải thích kết quả. Công thức tiền và kịch bản do finance engine tính theo cách xác định, có thể lặp lại.

### Làm rõ “phân bổ tài nguyên” cụ thể là chọn phương án xử lý thiếu tiền hay phân bổ ngân sách.

**Đề xuất:** Trong MVP, định nghĩa là chọn phương án xử lý nguy cơ thiếu thanh khoản theo **từng đồng tiền**. Không đưa lập ngân sách năm, phân bổ nhân sự hay tối ưu danh mục đầu tư vào phạm vi hiện tại.

## 3. Dữ liệu đầu vào

### Gửi bộ dữ liệu mẫu: số dư ban đầu, thu/chi, công nợ phải thu/phải trả và lịch chi định kỳ.

**Đề xuất:** Tạo bộ dữ liệu tổng hợp giả lập cho một shop/nhà phân phối có nhiều kênh, có khoản nhập hàng CNY, một vài giao dịch USD và hoạt động chính bằng VND. Gồm 6–12 tháng lịch sử và 13 tuần sự kiện tương lai; có tình huống đối soát tiền sàn sau khi trừ phí/hoàn tiền, một khách B2B trả chậm và một tuần thiếu tiền.

| Tệp | Trường tối thiểu đề xuất |
|---|---|
| `transactions.csv` | `transaction_id`, `date`, `description`, `amount`, `currency`, `account`, `source_channel`, `reference_id` |
| `settlements.csv` | `settlement_id`, `channel`, `period_start`, `period_end`, `gross_sales`, `platform_fee`, `refunds`, `shipping_or_COD_fee`, `reserve_or_hold`, `net_payout`, `currency`, `expected_payout_date`, `actual_payout_date` |
| `receivables.csv` | `invoice_id`, `customer_alias`, `issue_date`, `due_date`, `amount`, `open_amount`, `currency`, `status` |
| `payables.csv` | `bill_id`, `supplier_alias`, `due_date`, `amount`, `open_amount`, `currency`, `priority`, `late_fee_if_known` |
| `assumptions.csv` | `as_of_date`, `currency`, `opening_cash`, `minimum_cash_buffer`, `weekly_payroll`, `forecast_horizon` |
| `loans.csv` (nếu có) | `loan_id`, `balance`, `annual_rate`, `payment_amount`, `currency`, `next_due_date`, `fees_if_known` |

Với shop nhiều đơn, forecast tiền nên ưu tiên file **đối soát/payout tổng hợp theo kỳ của nền tảng** cộng với giao dịch ngân hàng, không bắt buộc tải mọi chi tiết từng đơn trong MVP. Có thể giữ file đơn hàng riêng cho bước sau. Giới hạn số dòng/tệp và hiệu năng cần được Software xác định sau khi nhận bộ dữ liệu đại diện.

### Ghi rõ ý nghĩa các cột, đơn vị tiền, ngày chốt dữ liệu và cách xử lý thông tin thiếu.

**Đề xuất:** Dùng ngày `YYYY-MM-DD`, tiền tệ theo mã ISO `VND`, `CNY`, `USD`; ghi rõ múi giờ và `as_of_date`. Số tiền vào dương, tiền ra âm ở tệp giao dịch ngân hàng. Với file đối soát, lưu riêng doanh số gộp, từng loại phí/hoàn và số tiền ròng thực nhận.

Mỗi giao dịch thuộc một đồng tiền duy nhất. Số dư đầu kỳ, khoản thu, khoản chi, ngưỡng cảnh báo và kịch bản phải cùng đồng tiền mới được cộng/trừ. Nếu giao dịch, hóa đơn và tài khoản thanh toán khác đồng tiền, đánh dấu “cần đối soát thủ công”; MVP không quy đổi và không đưa số đó vào phép cộng khác tiền. Thiếu ngày nhận tiền/số dư/loại tiền phải được gắn cờ, không tự đoán. Giữ lại tên tệp và dòng gốc để truy vết.

### Xác nhận dữ liệu thật đã ẩn danh hay giả lập; ai chuẩn bị và khi nào bàn giao?

**Đề xuất:** Dùng dữ liệu giả lập cho phát triển và demo. Business phụ trách bộ dữ liệu chuẩn và đáp án đối chiếu. Nếu dùng dữ liệu thật, phải có đồng ý bằng văn bản, ẩn danh khách hàng/tài khoản, giới hạn quyền truy cập và thống nhất thời hạn xoá. Không gửi dữ liệu tài chính thật lên dịch vụ AI bên ngoài nếu chưa kiểm tra đồng ý, điều khoản nhà cung cấp và yêu cầu bảo mật cuộc thi.

**Giả định lịch nội bộ:** bàn giao dữ liệu demo và từ điển cột trong 1–2 ngày sau khi nhóm phân công owner; cập nhật ngày cụ thể theo tiến độ hiện tại. Ngày trong checklist gốc cần được rà soát lại vì đã qua thời điểm đề xuất ban đầu.

## 4. Quy tắc tính và cảnh báo

### Chốt cách xác định ngày thực thu/chi, xử lý trả chậm, trả một phần và tránh tính trùng.

**Đề xuất:** Giao dịch ngân hàng/payout thực tế là căn cứ cho tiền đã nhận/đã trả. Hóa đơn mở và khoản phải trả được dùng cho tương lai theo số dư còn lại. Khoản thanh toán một phần làm giảm số dư mở tương ứng. Ghép bằng mã giao dịch, invoice/bill ID hoặc settlement ID; nếu không chắc chắn thì yêu cầu người dùng đối soát, không tự xoá trùng.

Doanh số đặt hàng không được tính là tiền mặt cho đến khi có lịch payout dự kiến. Đối với payout sàn, tính tiền ròng theo công thức:

```text
Tiền thực nhận dự kiến = doanh số đủ điều kiện
− phí nền tảng − hoàn/huỷ − phí vận chuyển/COD
− khoản giữ lại/điều chỉnh khác
```

Chỉ cộng/trừ các khoản cùng loại tiền. Nếu khách thanh toán hoặc sàn payout bằng đồng tiền khác với hóa đơn/tài khoản, gắn cờ cần xử lý thủ công. Khoản thu chưa về được dự báo theo ngày đến hạn cộng giả định trễ đã nêu; không gọi xác suất đó là dự đoán AI nếu chưa backtest.

### Chốt khi nào cảnh báo: tiền âm hay xuống dưới mức dự phòng bao nhiêu?

**Đề xuất:** Cảnh báo khi số dư dự kiến cuối tuần thấp hơn ngưỡng dự phòng tùy chỉnh; tiền âm là mức nghiêm trọng hơn. Tính ngưỡng **riêng cho VND, CNY và USD**, không cộng giá trị quy đổi. Giá trị mặc định demo có thể là bốn tuần chi phí thiết yếu của chính đồng tiền đó, nhưng đây là giả định, cần cho chủ shop chỉnh sửa.

Màn hình cảnh báo cần chỉ ra: đồng tiền, tuần đầu vi phạm, số dư dự kiến, ngưỡng, khoảng thiếu và 3 khoản thu/chi gây ảnh hưởng lớn nhất. Nếu dữ liệu trong một đồng tiền không đủ để tính tin cậy, hiển thị “chưa đủ dữ liệu” thay vì số tổng hợp gây hiểu nhầm.

### Gửi một ví dụ đã tính đúng để software đối chiếu kết quả.

**Đề xuất ví dụ giả lập VND:**

```text
Số dư đầu kỳ VND: 300 triệu
Tuần 1: thu 100 triệu, chi 120 triệu → cuối tuần 280 triệu
Tuần 2: thu 50 triệu, chi 180 triệu → cuối tuần 150 triệu
Ngưỡng dự phòng VND: 160 triệu → cảnh báo tuần 2, thiếu 10 triệu so với ngưỡng
```

Tạo ví dụ độc lập tương tự cho CNY và USD để xác nhận không quy đổi. Business/kế toán cần duyệt bảng tính mẫu trước khi dùng làm chuẩn nghiệm thu. Thêm case kiểm thử tiền nhận một phần, payout bị trừ phí, hoàn tiền, thanh toán trùng và hóa đơn khác loại tiền với payout.

## 5. Phương án mô phỏng

### Chọn phương án cần demo: thu sớm có chiết khấu, dời thanh toán, sử dụng hạn mức tín dụng.

**Đề xuất ba phương án demo:**

1. **Thúc đẩy thu sớm:** giảm giá/ưu đãi thanh toán sớm cho hóa đơn B2B đủ điều kiện; hiển thị chi phí chiết khấu và ngày tiền có thể về.
2. **Dời khoản phải trả:** chuyển ngày thanh toán của nhà cung cấp được đánh dấu linh hoạt; hiển thị phí trễ hoặc chiết khấu thanh toán sớm bị mất nếu biết.
3. **Hạn mức tín dụng giả lập:** thêm khoản giải ngân và lịch trả gốc/lãi; hạn mức, lãi, phí và kỳ hạn là thông tin giả định nếu chưa có báo giá thật.

Mỗi hành động chỉ áp dụng trong đúng loại tiền liên quan. Không cộng khoản thu VND với khoản vay CNY/USD. Không tự gửi thông báo khách hàng, sửa lịch ERP hoặc thực sự rút hạn mức.

### Với mỗi phương án, cung cấp điều kiện áp dụng, số tiền, thời điểm, phí/lãi và giới hạn.

**Đề xuất:**

- Thu sớm: invoice đủ điều kiện, số tiền còn phải thu, mức chiết khấu tối đa, ngày dự kiến thu, xác suất chấp nhận (nếu có căn cứ), đồng tiền invoice.
- Dời trả: bill đủ điều kiện, số tiền, ngày dời tối đa, phí phạt/chiết khấu mất, mức độ quan trọng của nhà cung cấp, đồng tiền phải trả.
- Hạn mức: hạn mức giả định, ngày giải ngân, lãi suất năm, phí, kỳ hạn, lịch trả nợ và đồng tiền khoản vay.

Nếu thiếu điều khoản, ghi “chưa biết” và không đưa ra tổng chi phí giả chính xác. Tất cả lãi suất, hạn mức và xác suất trong demo phải gắn nhãn **giả định** nếu chưa lấy từ hợp đồng/báo giá có thật.

### Chốt tiêu chí so sánh: tránh thiếu tiền, giữ mức dự phòng, chi phí thấp hay hạn chế vay.

**Đề xuất:** Thứ nhất, kiểm tra phương án có giữ số dư mỗi loại tiền trên ngưỡng dự phòng ở mọi tuần hay không. Sau đó so sánh: số dư thấp nhất, mức giảm khoảng thiếu, tổng chi phí rõ ràng, nghĩa vụ trả nợ về sau và rủi ro vận hành. Cho người dùng chọn mục tiêu. Không tự tối ưu “chi phí thấp nhất” nếu việc đó tạo ra thiếu hụt ở tuần kế tiếp hoặc ở đồng tiền khác.

## 6. AI và phê duyệt

### Liệt kê 3–5 câu hỏi người dùng sẽ hỏi AI và kết quả mong muốn.

**Đề xuất năm câu hỏi nghiệm thu:**

1. “Tuần nào số dư VND xuống dưới mức dự phòng, thiếu bao nhiêu?” → tuần, số dư, ngưỡng, khoảng thiếu và giả định.
2. “Vì sao payout tuần này thấp hơn doanh số?” → đối chiếu doanh số gộp, phí nền tảng, hoàn tiền/COD và khoản payout ròng, dẫn chiếu file nguồn.
3. “Nếu sàn chuyển payout CNY chậm thêm 7 ngày thì chuyện gì xảy ra?” → cập nhật forecast CNY riêng, so với baseline, không quy đổi sang VND.
4. “So sánh chiết khấu thu sớm invoice USD, dời bill CNY và vay VND 100 triệu.” → yêu cầu hiển thị ba kết quả riêng theo đồng tiền, nêu rõ không thể cộng thành một số tổng nếu không có tỷ giá/luồng chuyển đổi được hỗ trợ.
5. “Lập kế hoạch xử lý thiếu tiền và tạo báo cáo cho ngân hàng.” → tạo checklist đề xuất và báo cáo dòng tiền có nguồn/giả định; không dự đoán chắc chắn ngân hàng sẽ duyệt.

### Chốt AI làm gì, khi nào phải hỏi lại và ai được phê duyệt phương án.

**Đề xuất:** AI phân loại yêu cầu, gọi các công cụ đọc dữ liệu, forecast và mô phỏng, rồi giải thích kết quả. Finance engine chịu trách nhiệm tính số. AI phải hỏi lại khi thiếu/nhập nhằng ngày, đồng tiền, số dư hoặc điều kiện hành động; khi đầu vào khác loại tiền; hoặc khi giả định có ảnh hưởng đáng kể. Chủ doanh nghiệp/finance manager phê duyệt kế hoạch. Người tải dữ liệu được sửa file nhưng không mặc nhiên có quyền duyệt. Lưu lại dữ liệu/phiên bản, giả định, kết quả công cụ, thay đổi của người dùng và thời điểm duyệt/từ chối.

### Xác nhận hành động sau phê duyệt chỉ mô phỏng hay có tích hợp thật; theo brief, AI không tự chuyển tiền và mọi con số phải từ công cụ tính toán.

**Đề xuất:** MVP chỉ mô phỏng và tạo danh sách việc cần làm. Không kết nối ngân hàng, không tạo lệnh chuyển tiền, không tự vay. Nếu phát triển sau cuộc thi, trước tiên khảo sát ngân hàng/đơn vị thanh toán về quyền truy cập đọc dữ liệu, định dạng đối soát và yêu cầu pháp lý. Báo cáo cho ngân hàng là tài liệu do SME chủ động xuất/chia sẻ; không phải điểm tín dụng và không đảm bảo quyết định ngân hàng.

## 7. Giao diện và đầu ra

### Chốt thông tin cần thấy trên dashboard: số dư, tuần thiếu tiền, nguyên nhân và so sánh phương án.

**Đề xuất:**

- Chọn bộ lọc tiền tệ: VND / CNY / USD; không hiển thị tổng quy đổi.
- Thẻ cho từng đồng tiền: số dư hiện tại, ngưỡng dự phòng, tuần rủi ro gần nhất.
- Biểu đồ 13 tuần riêng theo đồng tiền: số dư đầu kỳ, tiền vào, tiền ra, số dư cuối kỳ và đường ngưỡng.
- Panel đối soát kênh bán: doanh số gộp, phí, hoàn/huỷ, khoản giữ lại và payout ròng theo kỳ.
- Danh sách nguyên nhân cảnh báo có liên kết tới file/dòng nguồn.
- Bảng so sánh baseline với 3 hành động, gồm đồng tiền, số dư thấp nhất, chi phí và rủi ro.
- Báo lỗi/chưa đủ dữ liệu rõ ràng; không dùng một chỉ số tổng hợp gây nhầm lẫn tiền tệ.

### Chốt ngôn ngữ, báo cáo cần xuất, quyền xem/sửa/duyệt và dữ liệu cần ẩn.

**Đề xuất:** Giao diện và hồ sơ thi bằng tiếng Anh; tài liệu onboarding/nhãn hỗ trợ tiếng Việt. Xuất PDF quyết định và JSON/CSV bằng chứng. Phân quyền: chủ shop/finance manager được xem và duyệt; kế toán được tải/sửa và đối soát; demo chỉ cần hai vai trò giả lập. Ẩn số tài khoản, tên khách/nhà cung cấp trong ảnh chụp/báo cáo demo; cho phép xoá file nguồn.

### Kết quả cần lưu lại dữ liệu, giả định và quyết định phê duyệt để kiểm tra được.

**Đề xuất:** Lưu ID snapshot dữ liệu, tệp/dòng nguồn, ngày chốt, loại tiền, cảnh báo dữ liệu, phiên bản công thức, giả định, kết quả forecast theo đồng tiền, kịch bản, công cụ AI đã gọi, người sửa/duyệt và thời điểm. Không lưu API key cùng dữ liệu và hạn chế đưa nguyên dòng tài chính nhạy cảm vào prompt/log. Demo có thể dùng cơ sở dữ liệu cục bộ.

## 8. Demo, nghiệm thu và deadline

### Có một câu chuyện demo từ nhập dữ liệu đến kết quả cuối cùng.

**Đề xuất câu chuyện:** Một shop/nhà phân phối bán trên nhiều kênh có đội tài chính rất gọn. Hàng nhập từ Trung Quốc cần thanh toán CNY; hoạt động nội địa dùng VND; một số giao dịch đối tác dùng USD. Sau một đợt đơn hàng cao, doanh số trên nền tảng tăng nhưng payout bị trừ phí/hoàn tiền và về lệch ngày; shop đối mặt với khoản nhập hàng và lương đến hạn. FlowWise đối soát payout, chỉ ra tuần thiếu tiền **riêng theo CNY hoặc VND**, mô phỏng ba hành động cùng đồng tiền, rồi tạo kế hoạch để chủ shop duyệt.

Toàn bộ tệp demo phải ghi rõ là giả lập, cùng một bộ dữ liệu được dùng cho video và demo trực tiếp. Không trình bày giả định “shop có hàng chục nghìn giao dịch” như sự thật nếu dữ liệu chỉ để minh họa.

### Có đáp án kỳ vọng và người business xác nhận số liệu, logic nghiệp vụ.

**Đề xuất:** Chỉ định một chủ shop/kế toán (nếu tiếp cận được) duyệt quy tắc đối soát, kỳ payout, phí, hoàn tiền, ngưỡng tiền và hành động hợp lệ. Một software owner duy trì fixture và tests. Nếu chưa có chuyên gia/người dùng xác nhận, ghi rõ “giả định của nhóm” trong báo cáo và demo.

### Chốt người phụ trách, hạn bàn giao dữ liệu, ngày chạy thử và ngân sách API/hosting.

**Đề xuất phân công:**

- Business/data owner: từ điển dữ liệu, bộ payout sàn, quy tắc nghiệp vụ và số chuẩn.
- Finance engine owner: đối soát, forecast ba loại tiền tách biệt, kịch bản.
- Frontend/demo owner: upload, biểu đồ từng tiền, cảnh báo và trình bày.
- Security/docs owner: phân quyền, ẩn dữ liệu, test và README (có thể kiêm nhiệm).

**Lịch nội bộ gợi ý, cần cập nhật theo ngày làm việc thực tế:** bộ dữ liệu + từ điển cột trong 1–2 ngày; đáp án tính tay sau đó 1 ngày; chạy thử end-to-end ít nhất 3 ngày trước ngày đóng gói; dành ngày cuối để nộp và dự phòng, không thêm tính năng lớn. Ngày deadline chính thức lấy từ thể lệ cuộc thi, không thay bằng lịch nội bộ. Ngân sách API/hosting nên bằng 0 hoặc có mức trần do nhóm tự chốt; demo phải chạy được bằng dữ liệu giả lập nếu API ngoài lỗi.

## Ưu tiên gửi Software trước

1. **Người dùng và vấn đề:** shop TMĐT/nhà phân phối quy mô nhỏ, đội tài chính gọn; đối soát payout và biết tuần nào thiếu tiền theo từng loại tiền.
2. **Tính năng bắt buộc:** CSV ngân hàng + payout, kiểm tra dữ liệu, forecast 13 tuần riêng VND/CNY/USD, cảnh báo, ba kịch bản, duyệt thủ công, xuất bằng chứng.
3. **Bộ dữ liệu:** transactions, settlements/payouts, AR/AP, opening cash, payroll/chi phí định kỳ và đơn vị tiền mỗi bản ghi.
4. **Quy tắc:** payout ròng chứ không dùng gross sales làm cash; partial payment và chống tính trùng; không tự quy đổi; ngưỡng dự phòng do người dùng chỉnh.
5. **Demo và nghiệm thu:** câu chuyện nhiều kênh bán/đội gọn/tiền hàng đa tiền tệ; bộ đáp án tính tay; người xác nhận nghiệp vụ.

**Phân công:** Business chốt người dùng, nhu cầu, dữ liệu, cách hiểu settlement và quyết định nghiệp vụ. Software đề xuất kiến trúc, bảo mật, giới hạn dữ liệu và cách triển khai. Nội dung chưa có xác nhận khách hàng phải được đánh dấu **giả định** trước khi code.

## Nguồn tham khảo chính

1. [Cổng Thông tin Chính phủ — quy mô TMĐT Việt Nam năm 2024 và hoạt động bán hàng trên nền tảng](https://en.baochinhphu.vn/viet-nams-e-commerce-market-up-20-in-2024-111250107155234946.htm)
2. [Bộ Công Thương — Kế hoạch tổng thể phát triển TMĐT quốc gia 2026–2030](https://moit.gov.vn/tin-tuc/phe-duyet-ke-hoach-tong-the-phat-trien-thuong-mai-dien-tu-quoc-gia-giai-doan-2026-2030.html)
3. [ADBI — nghiên cứu người dùng tài chính số MSME tại 7 nền kinh tế châu Á, gồm Việt Nam](https://www.adb.org/adbi/news/digital-finance-is-a-boost-for-msmes-in-asia-new-study-finds)
4. [AFP — 2025 Treasury Benchmarking Survey](https://www.afponline.org/training-resources/resources/survey-research-economic-data/Details/treasury-benchmarking)


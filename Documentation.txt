*** ===> Thông tin cá nhân <=== ***
  + Liên hệ: 0353.853.171
  + FB: https://www.facebook.com/hoangtran.dev
  + My chanel: https://www.youtube.com/channel/UC7jAJMVtvAg8W9mmPXJ-Zgw
  + Skye: tranminhhoangnct@gmail.com
  + Thời gian hỗ trợ: 18-24h
  + Freelancer: Nhận thiết kế hệ thống API, Website, Mobile app theo yêu cầu, 15$/hour

*** Hướng dẫn cài đặt ***
Step-1. Visual Studio Code (IDE Coding)
  + Link download: https://code.visualstudio.com/Download

Step-2. Cài đặt Nodejs và Postgresql database và PgAdmin4 để quản lý database trên UI
- NodeJS version <= 14.x (Đặc biệt lưu ý, nếu cố tình cài nodejs version cao hơn sẽ không chạy được, cách kiểm tra version hiện tại mở command line gõ lệnh: node -v)
  + node-v14.15.5-x64.msi (nếu máy 64bit) 
  + node-v14.15.5-x86.msi (nếu máy 86bit)
  + Link download: https://nodejs.org/dist/v14.15.5
- Postgresql: version >= 13.x (Lưu ý lúc cài đặt sẽ hỏi mật khẩu cho database, lưu ý ghi nhớ để tí sử dụng lại để connect tới database)
  + Link download: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

Step-3: Cài đặt thư viện cho các source code (ecommerce-admin, ecommerce-api, ecommerce-client)
  + Di chuyển vào lần lượt từng source và chạy lệnh: npm install

Step-4: Vào thư mục: ecommerce-api/config/index.js (Thay đổi connection để kết nối với database)
  + Thay đổi: connection: 'postgres://postgres:mat_khau@localhost:5432/ten_database' - mat_khau là cái bạn đã tạo trước đó khi cài đặt postgresql, ten_database là cái tên của database mặt định sẽ là postgres hoặc bạn có thạo một database mới

Step-5: Vào thư mục: ecommerce-api/ và chạy lệnh để init database và dữ liệu mặc định
  + npm run latest (Chạy migration init database)
  + npm run seed (Chạy để thêm dữ liệu mặc định)

Step-6: Khởi chạy source code (ecommerce-admin, ecommerce-api, ecommerce-client)
  + Di chuyển vào lần lượt từng source và chạy lệnh: npm start

*** TÀI KHOẢN PAYPAL KHI TEST CHỨC NĂNG THANH TOÁN VỚI PAYPAL ***
  + Email: ecommerce-buyer-1@gmail.com
  + Password: 123456789

*** TÀI KHOẢN MẶC ĐỊNH HỆ THỐNG ***
  - User
     + Email: user@gmail.com || Mật khẩu: 123456
  - Admin
     + Email: admin@gmail.com || Mật khẩu: 123456

*** DỊCH VỤ THÊM ***
  + Đưa sản phẩm lên môi trường thực tế: 500k (Chưa bao gồm chi phí mua tên miền)
  + File word cho các bạn sinh viên nộp báo cáo: 100k

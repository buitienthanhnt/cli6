import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import perf from '@react-native-firebase/perf';
import '@utils/messaging';
import '@utils/inAppMessage';
import '@utils/crashlytics';

const perfCollect = async () => {
  perf().setPerformanceCollectionEnabled(true);
};
perfCollect();

console.log('start app |-->');
AppRegistry.registerComponent(appName, () => App);
console.log('end of process.');
// =============================== //
// npx uri-scheme open myapp://app/MoreScreen --android (mở app và điều hướng tới 1 màn hình nào đó)

// chạy app trên thiết bị thật:
// b1: Bật gỡ lỗi qua USB:-> bật menu "Tùy chọn nhà phát triển" bằng cách: Cài đặt → Giới thiệu về điện thoại → Thông tin phần mềm rồi nhấn Build number bảy lần vào hàng ở dưới cùng
// b2:  Cắm thiết bị của bạn qua USB(xem kết nối bằng cách chạy cmd: adb devices)
// $ adb devices
// List of devices attached
// emulator-5554 offline   # Google emulator
// 14ed2fcc device         # Physical  (thiết bị vật lý)
// b3: chạy app: npx react-native run-android

// trên ubuntu khi kết nối usb và xem adb devices nếu thấy lỗi sau:
// thanhnt@thanhnt-M4700:~/Desktop/native/cli4$ adb devices
// List of devices attached
// HZQL1849DAL12000086     no permissions (missing udev rules? user is in the plugdev group); see [http://developer.android.com/tools/device.html]

// thì xử lý như sau:
//b1:  chạy:
// $ lsusb
// để xem các devicde kết nối với máy tính, xác định device điện thoại:

// ví dụ 1:
// Bus 001 Device 002: ID 8087:8000 Intel Corp.
// Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
// Bus 003 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
// Bus 002 Device 078: ID 138a:0011 Validity Sensors, Inc. VFS5011 Fingerprint Reader
// Bus 002 Device 003: ID 8087:07dc Intel Corp.
// Bus 002 Device 002: ID 5986:0652 Acer, Inc
// Bus 002 Device 081: ID 22b8:2e81 Motorola PCS   || máy Motorola
// Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

// ví dụ 2:
// Bus 001 Device 003: ID 413c:2513 Dell Computer Corp. internal USB Hub of E-Port Replicator
// Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
// Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
// Bus 002 Device 004: ID 0c45:643f Microdia Dell Integrated HD Webcam
// Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
// Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
// Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
// Bus 003 Device 003: ID 413c:2513 Dell Computer Corp. internal USB Hub of E-Port Replicator
// Bus 003 Device 006: ID 18d1:4ee7 Google Inc. Nexus/Pixel Device (charging + debug)  || máy Nokia
// Bus 003 Device 002: ID 0000:3825   USB OPTICAL MOUSE
// Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

// b2: thêm quyền cho device:
// $ sudo nano /etc/udev/rules.d/51-android.rules
// theem nội dung dòng bên dưới:
// SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", ATTR{idProduct}=="4ee7", MODE="0666", GROUP="plugdev"
// SUBSYSTEM=="usb", ATTR{idVendor}=="[ID_1]", ATTR{idProduct}=="[ID_2]", MODE="0666", GROUP="plugdev"

// Sau đó, hãy kiểm tra lại xem thiết bị của bạn có bị adb phát hiện không:
// $ adb devices
// List of devices attached
// ZF6222Q9D9  device
// Vì vậy, bạn đã làm xong.
// Nếu vẫn không được, hãy rút/cắm lại thiết bị.
// Nếu nó vẫn không hoạt động, hãy khởi động lại hệ điều hành của bạn.

// nếu cần thì chạy thêm:
// sudo usermod -aG plugdev $LOGNAME
// sudo apt-get install android-sdk-platform-tools-common

// hãy rút/cắm lại thiết bị.
// adb devices
// 								// =============================== //

// lỗi android build: Unable to delete file 'android\app\build\intermediates\compile_and_runtime_not_namespaced_r_class_jar\debug\R.jar'
// chạy:
// taskkill /im java.exe /f.tsx

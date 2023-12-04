Tôi đã gặp khó khăn khi xây dựng dự án gốc phản ứng trong iOS với vấn đề này. Và tôi đã xây dựng sau các quy trình sau.

Xóa bộ nhớ đệm của podvới
rm -rf ~/Library/Caches/CocoaPods
rm -rf Pods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
pod deintegrate
pod setup

INFO
If you are having trouble with iOS, try to reinstall the dependencies by running:

cd ios to navigate to the ios folder.
   bundle install 
to install Bundler
   bundle exec pod install 
to install the iOS dependencies managed by CocoaPods.



Và xóa Podsthư mục của dự án. Vị trí của nó là project directory > ios > Pods.

Sau đó, tại project directory > ios vị trí, cài đặt nhóm với: 

pod install
lưu ý trước khi build lại thì vào xcode -> mở project -> tab product -> clean build để  làm sạch project

Và react-native run-ios trong thư mục dự án.
Sau khi gặp sự cố, tôi cố gắng xây dựng dự án trên một máy Mac khác và hoạt động tốt. Và tôi thấy mọi lỗi đều xuất phát follyvà nó nằm ở Pods. Sau đó, tôi so sánh Podsthư mục giữa tôi và môi trường Mac khác. Trong trường hợp của tôi, có những tập tin bị thiếu. Vì vậy, tôi tham khảo nhận xét được viết bởi kelset trong tệp 'folly/folly-config.h' không tìm thấy , cho biết "Điều này xảy ra khi bộ đệm nhóm của bạn bị hỏng.". Vì vậy, tôi kiểm tra cách xóa bộ nhớ cache của pod và nó đã hoạt động.


Clearing a specific pod
pod cache clean --all # will clean all pods
pod cache clean 'FortifySec' --all # will remove all installed 'FortifySec' pods 
Sample output of pod cache clean 'FortifySec', for pods not using semantic versioning, this could result in many copies of same pod in cache:

pod cache clean 'FortifySec'
1: FortifySec v2.2 (External)
2: FortifySec v2.2 (External)
...
...
18: FortifySec v2.2 (External)
19: FortifySec v2.2 (External)

Which pod cache do you want to remove?
Complete cleanup (pod reset)
rm -rf ~/Library/Caches/CocoaPods
rm -rf Pods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
pod deintegrate
pod setup
pod install
Example of pod cache list prior to clean
pod cache list

FortifySec:
- Version: 2.2.1
Type:    External
Spec:    /Users/j.d/Library/Caches/CocoaPods/Pods/Specs/External/FortifySec/ui99sd....podspec.json
Pod:     /Users/j.d/Library/Caches/CocoaPods/Pods/External/FortifySec/yi23sd...-sdjc3
- Version: 2.2.1
Type:    External
Spec:    /Users/j.d/Library/Caches/CocoaPods/Pods/Specs/External/FortifySec/dsfs-df23
Pod:     /Users/j.d/Library/Caches/CocoaPods/Pods/External/FortifySec/dfs0d-2dfs
- Version: 2.2
Type:    External
Spec:    /Users/j.d/Library/Caches/CocoaPods/Pods/Specs/External/FortifySec/u78hyt....podspec.json
Pod:     /Users/j.d/Library/Caches/CocoaPods/Pods/External/FortifySec/e000sd
- Version: 2.2.2
Type:    External
Spec:    /Users/j.d/Library/Caches/CocoaPods/Pods/Specs/External/FortifySec/s2d-df.podspec.json
Pod:     /Users/j.d/Library/Caches/CocoaPods/Pods/External/FortifySec/ds34sd....
- Version: 2.2.1
Type:    External
Spec:    /Users/j.d/Library/Caches/CocoaPods/Pods/Specs/External/FortifySec/sdfsdfdsf....podspec.json
Pod:     /Users/j.d/Library/Caches/CocoaPods/Pods/External/FortifySec/edfs5d7...
AFNetworking:
- Version: 2.5.3
Type:    Release
Spec:    /Users/j.d/Library/Caches/CocoaPods/Pods/Specs/Release/AFNetworking/2.6.podspec.json
Pod:     /Users/j.d/Library/Caches/CocoaPods/Pods/Release/AFNetworking/2.6.3-4e7e2
Notice the multiple pod cache for - Version: 2.2.1. It's a good idea to do so to get rid of unnecessary disk space used by pod cache.
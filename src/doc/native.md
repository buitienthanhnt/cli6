https://viblo.asia/p/react-native-animations-su-dung-animated-api-924lJPvmKPM

https://reactnative.dev/docs/animated

https://reactnative.dev/docs/animations

https://viblo.asia/p/tim-hieu-ve-kien-truc-cua-react-native-GrLZDJRg5k0

https://medium.com/react-native-training/react-native-animations-using-the-animated-api-ebe8e0669fae

https://wanago.io/2022/04/11/abort-controller-race-conditions-react/ 
về việc fecth data từ api nhiều lần 1 api trong thời gian ngắn có thể bị sai lệch khi api gọi sau kết thúc trước api gọi trước 
giải pháp dùng: const abortController = new AbortController(); để theo dõi trạng thái

react-native run-android --variant=release

cd android && ./gradlew installRelease

cd android && ./gradlew clean && ./gradlew :app:bundleRelease

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 2m 16s
info Run CLI with --verbose flag for more details.

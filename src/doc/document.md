import { useQuery } from 'react-query' :
    // https://www.npmjs.com/package/react-query?activeTab=readme
    // https://codestus.com/posts/su-dung-react-query-de-fetch-du-lieu
    // https://tanstack.com/query/latest/docs/react/quick-start
    // https://viblo.asia/p/react-js-suc-manh-cua-react-query-Qbq5QRnwKD8

==========================================================================
react hook:
    https://legacy.reactjs.org/docs/hooks-intro.html

==========================================================================
import axios from 'react-native-axios';
    npm i react-native-axios

==========================================================================
font & icon:
    import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
    import Icon from 'react-native-vector-icons/FontAwesome';

==========================================================================
import Collapsible from 'react-native-collapsible';  
    // npm install --save react-native-collapsible

==========================================================================
import ColorPickerWheel from 'react-native-wheel-color-picker'; 
    // npm install react-native-wheel-color-picker
==========================================================================

==========================================================================

https://viblo.asia/p/10-dieu-nen-tranh-khi-phat-trien-ung-dung-react-phan-2-RQqKLkzz57z
https://viblo.asia/p/6-pattern-hay-su-dung-trong-react-vyDZOqzR5wj
https://viblo.asia/p/render-props-trong-react-m68Z0LDXZkG
https://viblo.asia/p/js-tips-cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-phan-2-3Q75w8D3KWb
https://viblo.asia/p/js-tips-cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-phan-3-RQqKL9GbZ7z
https://viblo.asia/p/js-tips-cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-phan-4-L4x5xOxqlBM
https://viblo.asia/p/hoc-react-native-tu-co-ban-den-nang-cao-phan-4-goi-native-ui-android-trong-react-native-RnB5pyYrKPG

===========================================================================
https://viblo.asia/p/3-library-hay-su-dung-trong-php-3P0lPMWm5ox
https://viblo.asia/p/phpgia-tri-cua-filesuserfiletype-co-dang-tin-cay-1VgZvxV95Aw
https://viblo.asia/p/tu-xay-dung-mot-framework-php-RnB5pzdYZPG
https://viblo.asia/p/giai-thuat-de-quy-trong-php-gGJ59kYGZX2
https://viblo.asia/p/php-design-pattern-abstract-factory-Do754jw3ZM6
https://viblo.asia/p/tim-hieu-chung-ve-symfony-QWkwGnzDG75g
https://viblo.asia/p/tim-hieu-ve-html-table-class-trong-ci-AQrMJVmdM40E
https://viblo.asia/p/magic-method-trong-php-63vKjAPM52R
===============================================================================
https://getcomposer.org/doc/


==============================js network=================================================
https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
===============================================================================

trong react 1 component bị Rerender khi props trong component cha truyền vào bị thay đổi hoặc state nội tại của nó bị thay đổi.


React.memo(): để bọc 1 component(con) và sẽ làm cho các component đó không bị reRender khi nhận vào prop giống nhau từ component cha(bình thường component cha reRender thì component con cũng bị reRender theo). Tuy nhiên nếu truyền vào 1 object, array, function thì chúng cần được bọc trong useCallback(cho biến là function) 


khi 1 componet reRender thì toàn bộ code bên trong cũng sẽ bị thực thi lại.

useCallback: chỉ ghi nhớ định nghĩa(khai báo) 1 function mà không thực thi để tiết kiệm bộ nhớ mỗi khi reRender(nó sẽ tham trị vào chính vùng nhớ đã tạo trước đó). Thường dùng khi function được dùng làm biến truyền vào cho component con.

useMemo: Ghi nhớ giá trị trả về của 1 function sau khi đã thực thi. lần sau dùng sẽ không cần tính lại nữa.

useRef: trả về 1 object với 1 thuộc tính curent theo đó, sau mỗi lần reRender thì giá trị đó không bị thay đổi(chỉ thay đổi giá trị khi nó được gán bằng .curent = new value), thường thì sau mỗi lần reRender các biến khai báo trực tiếp cũng bị reRender lại giá trị nên cần dùng useRef để giữ giá trị cho các obj đó
useRef giống với useState ở chỗ là cả 2 đều giữ được giá trị hiện thời sau mỗi lần reRender còn khác nhau là useRef không gây ra reRender còn useState thì có 
https://www.youtube.com/watch?v=SjoWgz0x15s

const Config = () => {
  const Config = {
    useFirebase: false, // default=false, dev=true
    // domain: 'https://magento23x.jmango360.dev/pub/laravel1/public/',
    domain: null,
    http: 'http://',
    https: 'https://',
    main: 'laravel1/',
    // ip: "192.168.99.103/",                 // 192.168.99.103       (4700-home) || 192.168.99.100 (6800-home)
    // ip: '192.168.41.101/',                    // 192.168.41.101      (m4700-wf300)
    // ip: '192.168.41.107/', // 192.168.41.107      (m6800)
    ip: '192.168.100.156/', // 192.168.100.156        (jm-destop)
    uri: 'laravel1/public/index.php/', // laravel1/public/index.php
    token: 'tha_nan_demo_request_token',
    api_key: 'laravel1.com',
    api_request: {
      getInfo: 'api/info',
      getpapers: 'api/getpapers/',
      getCategoryTop: 'api/getcategorytop/',
      getPaperCategory: 'api/papercategory/',
      getRelatedPaper: 'api/getRelatedPaper',
      getCategoryTree: 'api/getcategorytree',
      getPaperDetail: 'api/getpaperdetail/',
      getPaperComments: 'api/paperComment/',
      paperAddComment: 'api/paperAddComment/',
      paperAddLike: 'api/addLike/',
      commentLike: 'api/paper/like/',
      testData: 'api/testJson/',
      testPost: 'api/testPost/',
      parseUrl: 'api/parseUrl/',
      registerFcm: 'api/notification/addFcm',
      uploadImageMb: 'api/mobile/upimage/',
      search: 'api/search/',
      byWriter: 'api/byWriter/',
      getToken: '/getUserToken',
      userInfo: 'api/userInfo',
      addCart: 'api/paper/addCart',
      getCart: 'api/paper/cart',
      clearCart: 'api/paper/clearCart',
      removeCartItem: 'api/paper/removeItem/',
    },
    googleService: {
      googleMapUrl: 'https://maps.googleapis.com/maps/api/',
      placeDetail: 'place/details/',
      placeSearch: 'place/autocomplete/',
      placeDirections: 'directions/',
      geoMapApiKey: 'AIzaSyD1L7S_YeVTo4o-ICHBKr9ylYv-vsdFtj0',
      reponseJson: 'json',
      responseXml: 'xml',
    },
    buy_params: function (params: any): string {
      // this không dùng được trong: arrow function vì bản thân this lúc đó sẽ la windown.
      // nên để dùng this thì cần dùng: function để khai báo, qua đó nó sẽ kế thừa ngữ cảnh object cha
      var values = '?';
      for (const key in params) {
        values += key + '=' + params[key] + '&';
      }
      return values.slice(0, values.lastIndexOf('&')); // loại bỏ dấu:: "&" ở vị trí cuối cùng.
    },
    custom_url: function (path = ''): string {
      return this.domain
        ? this.domain + path
        : this.http + this.ip + this.uri + path;
    },
    public_url: function (): string {
      return this.http + this.ip + this.main + 'public/';
    },
  };
  return Config;
};

export default Config();

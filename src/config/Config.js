const Config = (path = '', params = null) => {
  const Config = {
    useFirebase: false, // default=false, dev=true
    domain: '',
    http: 'http://',
    https: 'https://',
    main: 'laravel1/',
    // ip: "192.168.1.9/",                   // 192.168.1.153       (4700-home) || 192.168.99.100 (6800-home)
    // ip: "192.168.1.150/",                    // 192.168.1.150       (m4700-mochi)
    // ip: "192.168.1.214/",                    // 192.168.1.214       (m6800)
    ip: '192.168.100.156/',                  // 192.168.100.156        (jm-destop)
    uri: "laravel1/public/index.php/",       // laravel1/public/index.php
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
      registerFcm: 'api/notification/registerFcm/',
      uploadImageMb: 'api/mobile/upimage/',
      search: 'api/search/',
      byWriter: 'api/byWriter/',
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
    buy_params: function (params) {
      // this không dùng được trong: arrow function vì bản thân this lúc đó sẽ la windown.
      // nên để dùng this thì cần dùng: function để khai báo, qua đó nó sẽ kế thừa ngữ cảnh object cha
      var values = '?';
      for (const key in params) {
        values += key + '=' + params[key] + '&';
      }
      return values.slice(0, values.lastIndexOf('&')); // loại bỏ dấu:: "&" ở vị trí cuối cùng.
    },
    custom_url: function () {
      return this.domain ? this.domain : this.http + this.ip + this.uri;
    },
    public_url: function () {
      return this.http + this.ip + this.main + 'public/';
    },
  };

  let url = '';

  if (Config.domain) {
    url = Config.domain;
  } else {
    url = Config.http + Config.ip + Config.uri;
  }
  Config['url'] = url;
  return Config;
};

export default Config();

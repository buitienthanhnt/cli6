const Config = (path = '', params = null) => {
  const Config = {
    domain: '',
    http: 'http://',
    https: 'https://',
    main: 'laravel1/',
    //  main: "newpaper/",
    // ip: "192.168.99.103/",                    // 192.168.1.153             (4700-home)
     ip: "192.168.1.150/",                    // 192.168.1.153             (m4700-mochi)
     uri: "laravel1/public/index.php/",       // laravel1/public/index.php (m4700-mochi)
    // ip: '192.168.100.156/',                   // 192.168.100.210           (jm-destop)
    // ip: "192.168.1.214/",                     // 192.168.100.210           (m6800)
    // uri: 'newpaper/public/index.php/',        // newpaper/public/index.php (jm-destop)
    api_request: {
      getpapers: 'api/getpapers/',
      getPaperDetail: 'api/getpaperdetail/',
      getCategoryTop: 'api/getcategorytop/',
      getPaperCategory: 'api/papercategory/',
      getRelatedPaper: 'api/getRelatedPaper',
      getCategoryTree: 'api/getcategorytree',
      testData: 'api/testJson',
      testPost: 'api/testPost',
      parseUrl: 'api/parseUrl',
      registerFcm: 'api/notification/registerFcm',
      uploadImageMb: 'api/mobile/upimage',
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

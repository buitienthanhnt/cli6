const enum Urls {
  HOME_INFO = 'homeInfo', // base_path
  ALL_PAPERS = 'getPapers',
  CATEGORY_TREE = 'getCategoryTree',
  CATEGORY_TOP = 'getCategoryTop',
  PAPER_BY_CATEGORY = 'paperByCategory/%s',
  RELATED_PAPER = 'getRelatedPaper/%s',
  PAPER_COMMENTS = 'paperComments/%s',
  SEARCH_ALL = 'search',
  PAPER_BY_WRITER = 'byWriter/%s',
  PARSE_URL = 'parseUrl',
  USER_INFO = 'userInfo',
  PAPER_ADD_COMMENT = 'paper/addComment/%s', // paper_path
  PAPER_ADD_LIKE = 'paper/likePaper/%s',
  PAPER_DETAIL = 'paper/detail/%s',
  COMMENT_ADD_LIKE = 'paper/likeComment/%s',
  ADD_CART = 'paper/addCart',
  GET_CART = 'paper/cart',
  CLEAR_CART = 'paper/clearCart',
  REMOVE_CART_ITEM = 'paper/removeItem/%s',
  REGISTER_FCM = 'notification/addFcm', // notification_path
}

export default Urls;

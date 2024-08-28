import Config from '@config/Config';
import rApi from '@netWork/rApi';
interface AddCartParam {
  id: number;
  qty: number;
}
interface CartItem {
  id: number;
  title: string;
  url_alias: string;
  short_conten: string;
  active: number;
  show: number;
  show_time: number;
  image_path: string;
  tag: string[];
  auto_hide: number;
  writer: string;
  show_writer: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  type: string;
  price: number;
  qty: number;
}
const addToCart = async (params: AddCartParam) => {
  // @ts-ignore
  const {data} = await rApi.callRequest({
    url: Config.api_request.addCart,
    method: 'POST',
    data: params,
  });
  return data;
};

const getCart = async () => {
  // @ts-ignore
  const {data} = await rApi.callRequest({
    url: Config.api_request.getCart,
  });
  return data;
};

export {addToCart, getCart};

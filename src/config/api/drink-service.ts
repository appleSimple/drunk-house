import { AxiosResponse } from 'axios';
import { post, get } from './index';
import { DrinkCategory } from '@/types/drink';

const DRINK = '/drink';

export type Condition = {
  category?: DrinkCategory;
  keyword?: string;
};

export type Pageable = {
  page: number | string; // 0부터 시작
  size: number | string;
};

const getTotalDrinkList = async (pageable: Pageable, condition?: Condition) => {
  const obj: Partial<Condition> & Pageable = {
    ...(condition || {}),
    page: String(pageable.page),
    size: String(pageable.size),
  };

  const params = new URLSearchParams(obj);

  return get(`${DRINK}?${params.toString()}`);
};

const getDrinkDetail = async (id: number) => {
  return get(`${DRINK}/${id}`);
};

export { getTotalDrinkList, getDrinkDetail };

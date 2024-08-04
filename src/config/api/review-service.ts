import { AxiosResponse } from 'axios';
import { post, get } from './index';
import { DrinkCategory } from '@/types/drink';

const DRINK = '/review';

export type Condition = {
  category?: DrinkCategory;
  keyword?: string;
  memberId: string;
};

export type Pageable = {
  page: number | string; // 0부터 시작
  size: number | string;
};

const getReviewList = async (userId: number, pageable: Pageable, condition?: Condition) => {
  const obj: Partial<Condition> & Pageable = {
    ...(condition || {}),
    page: String(pageable.page),
    size: String(pageable.size),
    memberId: String(userId),
  };

  const params = new URLSearchParams(obj);

  return get(`${DRINK}?${params.toString()}`);
};

export { getReviewList };

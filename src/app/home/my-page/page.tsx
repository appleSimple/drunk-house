'use client';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import CardList from '@/components/cardList/card-list';
import { Drink } from '@/types/drink';
import DrinkCategoryName from '@/constants/enumToName/drink-category';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import { getReviewList, Condition } from '@/config/api/review-service';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DrinkCategoryEnum } from '@/constants/enum/drink-category';

export default function MyPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [category, setCategory] = useState(DrinkCategoryEnum.ALL);
  const [drinkList, setDrinkList] = useState<Drink[]>([]);

  const nickName = useUserStore((state) => state.nick);
  const userId = useUserStore((state) => state.id);

  useEffect(() => {
    if (userId !== -1) fetchDrinkList();
  }, [category, userId]);

  async function fetchDrinkList() {
    const condition: any = {};

    if (category && category !== 'ALL') condition.category = category;
    // if (keyword) condition.keyword = keyword;

    const pageable = { page, size };

    const response = await getReviewList(userId, pageable, condition);
    console.log('response', response);

    // setDrinkList((prev) => [...prev, ...response.data.drinks]);
  }

  function handleCategory(category: any) {
    setCategory(category);
    setDrinkList([]);
    setPage(0);
  }

  return (
    <div className={styles.myPage}>
      <div className={styles.row}>
        <h2>{nickName}님, 안녕하세요!</h2>
        <Button variant="text" size="small" onClick={() => router.push('/login')}>
          로그아웃
        </Button>
      </div>

      <div className={styles.row}>
        <Typography variant="h5">나의 리뷰</Typography>
        <Button variant="contained" size="small">
          추가하기
        </Button>
      </div>

      <div className={styles.cardList}>
        {Object.keys(DrinkCategoryName).map((el) => (
          <Button
            variant={el === category ? 'contained' : 'outlined'}
            size="small"
            key={el}
            onClick={() => handleCategory(el)}
          >
            {DrinkCategoryName[el]}
          </Button>
        ))}
      </div>
      <CardList list={drinkList} />
    </div>
  );
}
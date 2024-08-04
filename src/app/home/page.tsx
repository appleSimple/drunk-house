'use client';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import CardList from '@/components/cardList/card-list';
import { Condition, getTotalDrinkList } from '@/config/api/drink-service';
import { Drink } from '@/types/drink';
import DrinkCategoryName from '@/constants/enumToName/drink-category';
import { DrinkCategoryEnum } from '@/constants/enum/drink-category';
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function Home() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [category, setCategory] = useState<Partial<Condition>>('ALL');
  const [drinkList, setDrinkList] = useState<Drink[]>([]);

  useEffect(() => {
    fetchDrinkList();
  }, [category]);

  async function fetchDrinkList() {
    const condition: Partial<Condition> = {};

    if (category && category !== 'ALL') condition.category = category;
    // if (keyword) condition.keyword = keyword;

    const pageable = { page, size };

    const response = await getTotalDrinkList(pageable, condition);
    setDrinkList((prev) => [...prev, ...response.data.drinks]);
  }

  function handleCategory(category: string) {
    console.log('category', category);

    setCategory(category);
    setDrinkList([]);
    setPage(0);
  }

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.row}>
          <Button variant="text" size="small">
            <Link href="/home/my-page" className={styles.myPage}>
              마이 페이지
            </Link>
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
    </>
  );
}

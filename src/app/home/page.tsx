'use client';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import CardList from '@/components/card-list';
import { Condition, getTotalDrinkList } from '@/config/api/drink-service';
import { Drink } from '@/types/drink';

export default function Home() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [drinkList, setDrinkList] = useState<Drink[]>([]);

  useEffect(() => {
    fetchDrinkList();
  }, []);
  
  async function fetchDrinkList() {
    const condition: Partial<Condition> = {};
    // if (category) condition.category = category;
    // if (keyword) condition.keyword = keyword;

    condition.category = 'SHOCHU';

    const pageable = { page, size };

    const response = await getTotalDrinkList(pageable, condition);

    setDrinkList((prev) => [...prev, ...response.data.drinks]);
  }

  return (
    <>
      <div className={styles.dashboard}>
        대시보드
        <CardList page={page} size={size} drinkList={drinkList} />
      </div>
    </>
  );
}
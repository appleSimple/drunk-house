'use client';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import CardList from '@/components/card-list';
import { Condition, getTotalDrinkList } from '@/config/api/drink-service';
import { Drink } from '@/types/drink';
import DrinkCategoryName from '@/constants/enumToName/drink-category';
import { DrinkCategoryEnum } from '@/constants/enum/drink-category';

export default function Home() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [category, setCategory] = useState<Partial<Condition>>('');
  const [drinkList, setDrinkList] = useState<Drink[]>([]);

  useEffect(() => {
    fetchDrinkList();
  }, [category]);
  
  async function fetchDrinkList() {
    const condition: Partial<Condition> = {};
    if (category) condition.category = category;
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
        {Object.keys(DrinkCategoryName).map((category) => (
          <button key={category} onClick={() => handleCategory(category)}>{DrinkCategoryName[category]}</button>
        ))}
        <CardList list={drinkList} />
      </div>
    </>
  );
}
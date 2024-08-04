'use client';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import CardList from '@/components/cardList/card-list';
import { Drink } from '@/types/drink';
import DrinkCategoryName from '@/constants/enumToName/drink-category';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import { getReviewList, Condition } from '@/config/api/review-service';

export default function MyPage() {
  const router = useRouter()
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [category, setCategory] = useState<Partial<Condition>>('');
  const [drinkList, setDrinkList] = useState<Drink[]>([]);

  const nickName = useUserStore((state) => state.nick);
  const userId = useUserStore((state) => state.id);

  useEffect(() => {
    if (userId !== -1) fetchDrinkList();
  }, [category, userId]);
  
  async function fetchDrinkList() {
    const condition: Partial<Condition> = {};
    
    if (category && category !== 'ALL') condition.category = category;
    // if (keyword) condition.keyword = keyword;

    const pageable = { page, size };

    const response = await getReviewList(userId, pageable, condition);
    console.log('response', response);
    
    // setDrinkList((prev) => [...prev, ...response.data.drinks]);
  }

  function handleCategory(category: string) {
    setCategory(category);
    setDrinkList([]);
    setPage(0);
  }

  return (
    <>
      <div className={styles.myPage}>
        <div className={styles.info}>
          <h2>{nickName}님, 안녕하세요!</h2>
          <button type='button' onClick={() => router.push('/login')}>로그아웃</button>
        </div>
        <div>내가 저장한 Drinks</div>
        {Object.keys(DrinkCategoryName).map((category) => (
          <button key={category} onClick={() => handleCategory(category)}>{DrinkCategoryName[category]}</button>
        ))}
        <CardList list={drinkList} />
      </div>
    </>
  );
}
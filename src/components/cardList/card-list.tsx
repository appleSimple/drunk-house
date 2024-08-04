'use strict';
import React, { useEffect, useState } from 'react';
import { getTotalDrinkList, Condition } from '@/config/api/drink-service';
import { Drink, DrinkCategory } from '@/types/drink';
import styles from './card-list.module.css';
import Card from '../card';

type Props<T> = {
  list: T[];
}

function CardList<T,>(props: Props<T>) {
  const { list, ...ohterProps } = props;

  return (
    <div className={styles.cardList}>
      {list.map((el) => (
        <Card key={el.id} id={el.id} name={el.name} category={el.category} profile={el.profile} abv={el.abv} />
      ))}
    </div>
  )
}

export default CardList;
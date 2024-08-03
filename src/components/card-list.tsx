'use strict';
import React, { useEffect, useState } from 'react';
import { getTotalDrinkList, Condition } from '@/config/api/drink-service';
import { Drink, DrinkCategory } from '@/types/drink';
import Card from './card';

type Props = {
  drinkList: Drink[];
  category?: DrinkCategory;
  keyword?: string;
  page: number;
  size: number;
}

function CardList(props: Props) {
  const { category, keyword, page, size, drinkList } = props;

  return (
    <>
      {drinkList.map((drink) => (
        <Card key={drink.id} id={drink.id} name={drink.name} category={drink.category} profile={drink.profile} abv={drink.abv}  />
      ))}
    </>
  )
}

export default CardList;
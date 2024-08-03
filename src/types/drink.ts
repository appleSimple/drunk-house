import { DrinkCategoryEnum } from "@/constants/enum/drink-category";

type Drink = {
  id: number;
  name: string; 
  category: DrinkCategory;
  profile: string;
  abv: number;
}

type DrinkCategory = keyof typeof DrinkCategoryEnum[keyof typeof DrinkCategoryEnum];

export type {
  Drink,
  DrinkCategory
}
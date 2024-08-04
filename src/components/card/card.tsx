'use client';
import CardComponent from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Drink } from '@/types/drink';
import DrinkCategoryName from '@/constants/enumToName/drink-category';
import styles from './card.module.css';
import Chip from '@mui/material/Chip';
import { DrinkCategoryEnum } from '@/constants/enum/drink-category';

type Props = Drink;

function Card(props: Props) {
  const { id, name, category, profile, abv } = props;
  
  return (
    <CardComponent sx={{ maxWidth: 460 }} className={styles.card}>
      <Chip label={DrinkCategoryName[category as DrinkCategoryEnum]} size='small' className={styles.chip} />
      <CardMedia sx={{ height: 140 }} image={profile} title="green iguana" />
      <CardContent className={styles.cardContents}>
        <Typography gutterBottom variant="inherit" component="div">
          { name }
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          도수: { abv }
        </Typography>
      </CardContent>
    </CardComponent>
  );
}

export default Card;

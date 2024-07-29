'use client';
import CardComponent from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Drink } from '@/types/drink';

type Props = Drink;

function Card(props: Props) {
  const { name, category, profile, abv } = props;

  return (
    <CardComponent sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={profile} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          { name }
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
          except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">종류: { category as string }</Button>
        <Button size="small">도수: { abv }</Button>
      </CardActions>
    </CardComponent>
  );
}

export default Card;

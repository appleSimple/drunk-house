'use strict';
import React, { useEffect, useState } from 'react';
import { getTotalDrinkList, Condition, getDrinkDetail } from '@/config/api/drink-service';
import { Drink, DrinkCategory } from '@/types/drink';
import styles from './card-list.module.css';
import Card from '../card/card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

type Props = {
  list: Drink[];
};

function CardList(props: Props) {
  const { list } = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ name: '', content: '' });

  const handleClickOpen = async (el: Drink) => {
    const { data } = await getDrinkDetail(el.id);
    const { name, content } = data as Drink & { content: string };

    setSelectedValue({ name, content });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.cardList}>
        {list.map((el) => (
          <div onClick={() => handleClickOpen(el as Drink)} key={el.id}>
            <Card
              id={el.id}
              name={el.name}
              category={el.category}
              profile={el.profile}
              abv={el.abv}
            />
          </div>
        ))}
      </div>
      <DetailModal selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
}

export default CardList;

type DetailModalProps = {
  onClose: () => void;
  open: boolean;
  selectedValue: {
    name: string;
    content: string;
  };
};

function DetailModal(props: DetailModalProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{selectedValue.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>{selectedValue.content}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

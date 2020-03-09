import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';

// MUI components
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

// MUI icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './styles';
import cardsApi from '../../api/cards';
import { ICard } from '../../interfaces/models/card.interface';

function CardsPage() {
  const classes = useStyles();
  const confirm = useConfirm();
  const history = useHistory();
  const [cards, setCards] = useState<ICard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  async function fetchCards() {
    const response = await cardsApi.getAll(searchTerm);

    if (response.status !== 'success') {
      return;
    }

    setCards(response.data.cards);
  }

  function handleSearchTerm(e: any) {
    setSearchTerm(e.target.value);
  }

  function handleCreate() {
    history.push('/cards/create');
  }

  function handleDelete(card: ICard) {
    return () => {
      confirm({
        description: `This will permanently delete this card.`,
      })
        .then(() => cardsApi.delete(card._id))
        .then(() =>
          setCards(prevState => prevState.filter(c => c._id !== card._id)),
        )
        .catch();
    };
  }

  useEffect(() => {
    fetchCards();
  }, [searchTerm]);

  return (
    <>
      <Grid container justify="space-between">
        <FormControl fullWidth className={classes.searchBar}>
          <Input
            onChange={handleSearchTerm}
            value={searchTerm}
            placeholder="Search a card"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Hidden smDown>
          <Button
            onClick={handleCreate}
            variant="text"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add a new card
          </Button>
        </Hidden>
      </Grid>
      <Grid
        className={classes.cardsContainer}
        container
        justify="space-around"
        spacing={3}
      >
        {cards.map(card => (
          <Grid key={card._id} item xs={12} sm={6} md={3}>
            <Card className={classes.root}>
              <CardHeader
                avatar={<Avatar aria-label="mana">{card.mana}</Avatar>}
                title={card.name}
                subheader={card.type}
              />
              <CardActionArea disableRipple disableTouchRipple>
                <CardMedia
                  className={classes.media}
                  image="https://via.placeholder.com/300/09f/fff.png"
                  title={card.name}
                />
                {card.type === 'creature' && (
                  <div className={classes.cardAttributes}>
                    <Chip
                      color="primary"
                      size="small"
                      label={`Atk: ${card.attack}`}
                    />{' '}
                    <Chip
                      color="secondary"
                      size="small"
                      label={`Def: ${card.defense}`}
                    />
                  </div>
                )}
                <CardContent className={classes.cardContent}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                classes={{ root: classes.cardActionsRoot }}
                disableSpacing
              >
                <IconButton aria-label="edit card">
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={handleDelete(card)}
                  aria-label="delete card"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Hidden mdUp>
        <Fab color="secondary" aria-label="add" onClick={handleCreate}>
          <AddIcon />
        </Fab>
      </Hidden>
    </>
  );
}

export default CardsPage;

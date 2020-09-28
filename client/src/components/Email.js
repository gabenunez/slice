import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    cursor: 'pointer'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
}));

export default function Email(props) {
  const classes = useStyles();

  return (
    <Grid item sm={6} xs={12} spacing={3}>
        <Card xs={12} className={classes.root}>
        <CardMedia
        className={classes.cover}
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Domino%27s_pizza_logo.svg/1200px-Domino%27s_pizza_logo.svg.png"
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {props.info.email_subject}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.info.company_name}
          </Typography>
          <Typography className={classes.date} variant="subtitle2" color="textSecondary">
            { dayjs(props.info.timestamp).fromNow() }
          </Typography>
        </CardContent>
      </div>
    </Card>
    </Grid>
  );
}
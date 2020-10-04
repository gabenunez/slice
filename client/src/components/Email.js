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
    cursor: 'pointer',
    padding: '100px 10px',
    clipPath: 'polygon(0 0, 0% 100%, 100% 50%)',
    [theme.breakpoints.down('md')]: {
      clipPath: 'none',
      borderRadius: '50%',
      border: 'inset #e1af7a 10px',
      justifyContent: 'center',
      borderLeft: 'inset #e1af7a 10px'
    },
    alignItems: 'center',
    backgroundColor: '#ffeea9',
    backgroundPosition: '0 0, 50px 50px',
    backgroundSize: '150px 150px',
    borderLeft: 'inset #e1af7a 40px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cardImage: {
    width: 151,
    objectFit: 'scale-down'
  },
  subject: {
    maxWidth: '75%',
    fontSize: 16,
    fontWeight: 800
  }
}));

export default function Email(props) {
  const classes = useStyles();
  return (
    <Grid item lg={6} xs={12} onClick={() => props.setCurrentEmailandOpen(props.info.email_link)}>
      <Card xs={12} className={classes.root}>
        <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={props.info.logo}
        title="Contemplative Reptile"
        className={classes.cardImage}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.subject} component="h3" variant="h3">
            {props.info.email_subject}
          </Typography>
          <Typography className={classes.date} variant="subtitle2" color="textSecondary">
            Received { dayjs(props.info.timestamp).fromNow() }
          </Typography>
        </CardContent>
      </div>
    </Card>
    </Grid>
  );
}
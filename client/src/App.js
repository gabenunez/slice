import React from 'react';
import axios from 'axios';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import Email from './components/Email';
import Header from './components/Header';
import './App.css';

class App extends React.Component {
  state = {
    latestEmails: [],
    error: false
  }

  async componentDidMount() {
    await this.getLatestEmails();
  }

  async getLatestEmails() {
    try {
      const { data : latestEmailData } = await axios.get('/api/emails/latest');
      this.setState({
        latestEmails: latestEmailData
      });

      console.log(this.state.latestEmails);
    } catch (error) {
      this.setState({
        error: true
      })
    }
  }

  render() {
    const { latestEmails } = this.state;
    return (
      <Container>
        <CssBaseline />
        <Header />
        <Grid container spacing={2}>
          { latestEmails.length ? latestEmails.map(emailInfo => <Email info={emailInfo} key={emailInfo.company_name}/>) : 'Loading...'  }
        </Grid>
      </Container>
    );
  }
}

export default App;

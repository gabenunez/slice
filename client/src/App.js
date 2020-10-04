import React from 'react';
import axios from 'axios';
import { CssBaseline, Container, Grid } from '@material-ui/core';
import Email from './components/Email';
import Header from './components/Header';
import EmailModal from './components/EmailModal';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.setCurrentEmailandOpen = this.setCurrentEmailandOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  state = {
    latestEmails: [],
    error: false,
    currentEmailLink: '',
    modalOpen: false
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
    } catch (error) {
      this.setState({
        error: true
      })
    }
  }

  setCurrentEmailandOpen(emailLink) {
    console.log('aight')
    this.setState({
      currentEmailLink: emailLink,
      modalOpen: true
    })
  }

  handleModalClose() {
    this.setState({
      modalOpen: false
    });
  }

  render() {
    const { latestEmails } = this.state;
    return (
      <Container>
        <CssBaseline />
        <Header />
        <Grid container spacing={2}>
          { latestEmails.length ? latestEmails.map(emailInfo => <Email info={emailInfo} key={emailInfo.company_name} setCurrentEmailandOpen={this.setCurrentEmailandOpen} />) : 'Loading...'  }
        </Grid>
        <EmailModal emailLink={this.state.currentEmailLink} modalOpen={this.state.modalOpen} handleModalClose={this.handleModalClose} />
        <h5 style={{textAlign: 'center'}}>Not affiliated with any pizza joints. (I wish). An open source project by <a style={{textDecoration: 'none'}} href="https://gabenunez.com/">Gabe Nunez</a></h5>
      </Container>
    );
  }
}

export default App;

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import CharacterCard from '../CharactersPage/CharacterCard'
import messages from './messages';

const HEADERS = new Headers({
  'Content-type': 'application/x-www-form-urlencoded',
});

const INIT = {
  methode: 'GET',
  headers: HEADERS,
  mode: 'cors',
};

export default class CharacterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      searchId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.handleApiCall(this.state.searchId);
  }

  handleApiCall = id => {
    const API_URL = `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=3cb9f312871cec62f82dc980caeded2c`;
    fetch(API_URL, INIT)
      .then(response => response.json())
      .then(json => {
        this.setState({
          character: json.data.results[0],
        });
      })
      .catch(error => console.log(error)) //error json
      .catch(error => console.log(error)) //error API
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Character Details</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <div>
          {this.state.character ? (
            <CharacterCard character={this.state.character} />
          ) : (
            <div>No character</div>
          )}
        </div>
      </div>
    );
  }
}

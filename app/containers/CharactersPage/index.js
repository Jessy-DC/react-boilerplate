import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CheckBox } from '@material-ui/icons';
import CharactersTable from './CharactersTable';
import CharacterCard from './CharacterCard';
import messages from './messages';

const HEADERS = new Headers({
  'Content-type': 'application/x-www-form-urlencoded',
});

const INIT = {
  methode: 'GET',
  headers: HEADERS,
  mode: 'cors',
};

export default class CharactersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: 'a',
      characters: [],
    };
  }

  componentDidMount() {
    this.handleApiCall(this.state.searchName);
  }

  handleChange = e => {
    this.setState({ searchName: e.target.value });
  };

  handleApiCall = name => {
    const API_URL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=3cb9f312871cec62f82dc980caeded2c`
    fetch(API_URL, INIT)
      .then(response => response.json())
      .then(json => {
        this.setState({ characters: json.data.results });
      })
      .catch(error => console.log(error)) //error json
      .catch(error => console.log(error)) //error API
  };

  handleSearch = () => {
    this.handleApiCall(this.state.searchName);
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Characters Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <div>
          <TextField
            id="standard-search"
            value={this.state.searchName}
            onChange={this.handleChange}
            label="Search field"
            type="search"
          />
          <Button
            onClick={this.handleSearch}
            variant="contained"
            color="inherit"
          >
            Search
          </Button>
          <CheckBox />
        </div>
        {this.state.characters[0] ? (
          <CharacterCard character={this.state.characters[0]} />
        ) : (
          <div> </div>
        )}
        <CharactersTable characters={this.state.characters} />
      </div>
    );
  }
}

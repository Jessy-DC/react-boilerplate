import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CharactersTable from './CharactersTable';
import CharactersGrid from "./CharacterGrid";
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
      checked: false,
    };
  }

  componentDidMount() {
    this.handleApiCall(this.state.searchName);
  }

  handleChange = event => {
    this.setState({ searchName: event.target.value });
  };

  handleCheck = event => {
    const checkedValue = event.target.checked;
    this.setState({ checked: checkedValue });
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
          <Checkbox
            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
            checked={this.state.checked}
            onChange={this.handleCheck}
          />
        </div>
        {this.state.checked ? (
          <CharactersGrid characters={this.state.characters} />
        ) : (
          <CharactersTable characters={this.state.characters} />
        )}

        {/*{this.state.characters[0] ? (*/}
        {/*  <CharacterCard character={this.state.characters[0]} />*/}
        {/*) : (*/}
        {/*  <div> </div>*/}
        {/*)}*/}

      </div>
    );
  }
}

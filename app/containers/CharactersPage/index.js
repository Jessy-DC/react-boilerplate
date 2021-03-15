import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CheckBox } from '@material-ui/icons';
import CharactersTable from './CharactersTable';
import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
export default class CharactersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
    };
  }

  handleChange = e => {
    this.setState({ searchName: e.target.value });
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
          <Button variant="contained" color="inherit">
            Search
          </Button>
          <CheckBox />
        </div>
        <CharactersTable />
      </div>
    );
  }
}

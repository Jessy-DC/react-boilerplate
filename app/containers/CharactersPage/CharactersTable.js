import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    minWidth: 100,
  },
});

export default function CharactersTable(props) {
  const classes = useStyles();
  const { characters } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell className={classes.tableCell}>ID</TableCell>
            <TableCell className={classes.tableCell} align="right">Name</TableCell>
            <TableCell className={classes.tableCell} align="right">Description</TableCell>
            <TableCell className={classes.tableCell} align="right">Date</TableCell>
            <TableCell className={classes.tableCell} align="right">Comics</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters.map(character => (
            <TableRow key={character.id}>
              <TableCell component="th" scope="row">
                {character.id}
              </TableCell>
              <TableCell align="right">{character.name}</TableCell>
              <TableCell align="right">{character.description}</TableCell>
              <TableCell align="right">{character.modified}</TableCell>
              <TableCell align="right">{character.comics.available}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

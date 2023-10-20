import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  table: {
    width: '48%',
    maxWidth: '800px',
    padding: '1%',
  },
  dataTable: {
    margin: '0 auto',
    maxWidth: '800px',
    minWidth: '400px',
  },
  barChart: {
    width: '48%',
    padding: '1%',
  },
  '@media (max-width: 960px)': {
    root: {
      // display: 'unset',
      flexDirection: 'column',
    },
    table: {
      width: '96%',
      padding: '2%',
    },
    barChart: {
      width: '96%',
      padding: '2%',
    },
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Dashboard() {
  const classes = useStyles();

  const loginSuccess = sessionStorage.getItem('loginSuccess');

  if (loginSuccess !== 'true') {
    window.location.href = '/login';
    return (
      <h3>Checking Authority...</h3>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.table}>
        Data Table
        <TableContainer component={Paper}>
          <Table className={classes.dataTable}>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.barChart}>
        Bar Chart
        {/* <ResponsiveContainer width="100%" height="100%"> */}
          <BarChart
            width={800}
            height={300}
            data={rows}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="calories" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="fat" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          </BarChart>
        {/* </ResponsiveContainer> */}
      </div>
      
    </div>
  );
}

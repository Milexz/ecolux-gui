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

import { useUserInfo } from '../Contexts/GlobalContext';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    minWidth: '375px',
  },
  tableArea: {
    width: '60%',
    maxWidth: '800px',
    minWidth: '360px',
    padding: '1%',
    marginBottom: '24px',
  },
  barChartArea: {
    position: 'relative',
    width: '60%',
    maxWidth: '800px',
    minWidth: '360px',
    height: '320px',
    padding: '1%',
    '& > :not(:last-child)': {
      marginBottom: '40px',
    },
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Yoghurt', 159, 6.0, 24, 4.0),
  createData('Sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Dashboard() {
  const [user, ] = useUserInfo();
  const classes = useStyles();

  const loginSuccess = React.useMemo(() => {
    console.log('test-memo')
    return user.email !== '';
  }, [user]);

  if (!loginSuccess) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.tableArea}>
        <TableContainer component={Paper}>
          <Table>
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
      <div className={classes.barChartArea}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            margin={{
              top: 5,
              right: 25,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="calories" fill="#8884d8" maxBarSize={50} activeBar={<Rectangle fill="pink" stroke="purple" />} />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            margin={{
              top: 5,
              right: 25,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="fat" stackId="a" fill="#82ca9d"  maxBarSize={50} />
            <Bar dataKey="carbs" stackId="a" fill="#ffc658"  maxBarSize={50} />
            <Bar dataKey="protein" stackId="a" fill="#9ac2d8"  maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  );
}

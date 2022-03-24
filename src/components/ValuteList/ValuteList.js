import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from "react"
import { fetchData } from "../../utils/api"
import { percentaged } from "../../utils/others"

import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  head: {
    backgroundColor: 'black',
    position: "sticky",
    top: 0
  }
});

function ValuteList() {
  const classes = useStyles();

  const [valutes, setValutes] = useState([])
  const [date, setDate] = useState([])

  let navigate = useNavigate()


  useEffect(() => {
    async function fetch() {
      const result = await fetchData("https://www.cbr-xml-daily.ru/daily_json.js")
      const array = Object.keys(result.data.Valute).map((key) => [key, result.data.Valute[key]])
      setValutes(array)
      setDate(moment(result.data.Date).format('DD.MM.YYYY'))
    }
    fetch()

  }, [])


  return (
    <Container sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3"  align="center" sx={{ marginLeft: '10px' }}>Дата: {date}</Typography>
      <TableContainer 
        sx={{ 
          maxHeight: 585, 
          marginTop: '20px', 
          borderLeft: '1px solid black',
          borderRight: '1px solid black',
          borderBottom: '1px solid black',
          borderRadius: '10px' }}>
      <Table sx={{ width: '100%', }}>
        <TableHead className={classes.head}>
          <TableRow >
            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Код валюты</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Цена</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Разница</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {valutes?.map((valute) => (
            <Tooltip key={valute[0]} followCursor title={valute[1].Name}>
              <TableRow
                hover
                sx={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  navigate('/valuteCard', { 
                    state: { 
                      valuteCode: valute[1].CharCode, 
                      valuteName: valute[1].Name 
                    } 
                  })
                }}
              >
                <TableCell component="th" scope="row">
                  {valute[1].CharCode}
                </TableCell>
                <TableCell align="center">{valute[1].Value} RUB</TableCell>
                <TableCell align="center">{percentaged(valute[1].Value, valute[1].Previous)} %</TableCell>
              </TableRow>
            </Tooltip>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Container>
  )
}

export default ValuteList
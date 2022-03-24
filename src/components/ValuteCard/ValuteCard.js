import { 
  Container,
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TableContainer, 
  Typography 
} from '@mui/material';

import { 
  useEffect, 
  useState 
} from "react"

import { fetchDataForTenDays } from "../../utils/api"
import { useLocation } from "react-router-dom";

import { percentaged } from "../../utils/others"
import moment from 'moment';

function ValuteCard() {
  const location = useLocation()

  const [values, setValues] = useState([])

  useEffect(() => {
    async function fetch(){
      const result = await fetchDataForTenDays(location.state.valuteCode)
      setValues(result)
    }
    fetch()
    
  }, [location.state.valuteCode])

  return (
    <Container 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%', 
      }}
    >
      <Typography variant="h4">
        {location.state.valuteName} ({location.state.valuteCode})
      </Typography>
      <TableContainer 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '20px',
          borderLeft: '1px solid black',
          borderRight: '1px solid black',
          borderBottom: '1px solid black',
          borderRadius: '10px'
        }}
      >
        <Table sx={{width: '200px'}}>

          <TableHead sx={{ background: 'black' }}>
            <TableRow>
              <TableCell 
                align="center" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'white' ,
                }
              }>
                Дата
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {values.dates?.map((date) => (
              <TableRow key={date}>
                <TableCell align="center">
                  {moment(date).format('DD.MM.YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
        <Table >
          <TableHead sx={{ background: 'black' }}>
            <TableRow>
              <TableCell 
                align="center" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'white' 
                }}
              >
                Цена
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'white' 
                  }}
                >
                  Разница
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {values.dataArray?.map((data) => (
              <TableRow key={data.Value}>

                <TableCell align="center" >
                  {data.Value} RUB
                </TableCell>

                <TableCell align="center">
                  {percentaged(data.Value, data.Previous)} %
                </TableCell >
              </TableRow>))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ValuteCard
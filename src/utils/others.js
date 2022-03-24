export function percentaged(current, previous){
  const value = ((current - previous)/previous * 100).toFixed(4)
  if(value < 0 || value === 0){
    return value
  } else {
    return '+' + value
  } 
}

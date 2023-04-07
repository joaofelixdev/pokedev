export default function handleId(id, len) {
  let idToString = String(id)
  let counter = idToString.length

  while (counter < len) {
    idToString = '0' + idToString
    counter++
  }
  
  return idToString
}
import getProperty from './getProperty'

export default function conditionMatched(
  item,
  { where, equalTo = [], notEqualTo = [] }
) {
  let matched = false
  for (let i = 0; i < equalTo.length; i++) {
    if (getProperty(item, `${where}`) === equalTo[i]) matched = true
  }
  for (let i = 0; i < notEqualTo.length; i++) {
    if (getProperty(item, `${where}`) !== notEqualTo[i]) matched = true
  }
  return matched
}

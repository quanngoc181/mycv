export function GetToken() {
  let token = localStorage.getItem('my-cv-token')
  if (!token) return {}
  return { Authorization: `${token}` }
}

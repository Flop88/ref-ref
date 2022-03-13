
import React from "react"
import { Navigate } from "react-router-dom"


export const IS_LOGGED_IN = gql`
  {
    me {
      id
   
    }
  }
`

interface Props {
  children?: React.ReactNode
}


function IsAuthenticated({ children }: Props) {
  // const { loading, error, data } = useQuery(IS_LOGGED_IN)
  const token = localStorage.getItem('token');
  console.log(token)
//   jwt.verify(token, 'shhhhh', function(err, decoded) {
//   if (err) {
//     /*
//       err = {
//         name: 'TokenExpiredError',
//         message: 'jwt expired',
//         expiredAt: 1408621000
//       }
//     */
//   }
// })

  if (loading) return <p>Loading...</p>
  if (error)return <p>{error.message}</p>

  if (!data.me) {
      return <Navigate to={{ pathname: "/main" }} />
  }

  return <>{children}</>
}

export default IsAuthenticated

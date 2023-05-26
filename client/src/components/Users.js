// import React from 'react';
// import { useState } from 'react';
// import { baseURL } from '../axios/index';

// const Users = () => {
//   const [users, setUsers] = useState();

//   useEffect(() => {
//     let isMounted = true;
//     const controller = new AbortController();

//     const getUsers = async () => {
//         try {
//             const response = await baseURL.get("/users",{
//                 signal: controller.signal
//             });
//             console.log(response.data);
//             isMounted && setUsers(response.data);

//         }catch (err) {
//             console.error(err);
//         }
//     }
//     getUsers();
//     return () => {
//         isMounted = false;
//         controller.abort();
//     }

//    },[] )

//   return (
//     <article>
//       <h2>Users List</h2>
//       {users?.length ? (
//         <ul>
//           {users.map((user, i) => (
//             <li key={i}>{user?.usename}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>kullanici yok</p>
//       )}
//     </article>
//   );
// };

// export default Users;

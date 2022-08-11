import React from 'react';

const ClientItem = ({client}) => {
    return(
        <tr>
            <td>
                {client.username}
            </td>
            <td>
                {client.first_name}
            </td>
            <td>
                {client.last_name}
            </td>
            <td>
                {client.age}
            </td>
            <td>
                {client.email}
            </td>
            <td>
                {client.cat}
            </td>
        </tr>
    )
}

const ClientList = ({clients}) => {
    return(
        <table>
            <th>
                User name
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                Age
            </th>
            <th>
                Email
            </th>
            <th>
                Category
            </th>
            {clients.map((client) => < ClientItem client={client} />)}
        </table>
    )
}

export default ClientList
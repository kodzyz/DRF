import {useParams} from 'react-router-dom'

const ProjectItem = ({project}) => {
    return(
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo}
            </td>
            <td>
                {project.user}
            </td>
        </tr>
    )
}

const UserProjectList = ({projects}) => {
    var {usersId} = useParams()
        var filteredProject = projects.filter((project) => project.user.includes(parseInt(usersId)) )

    return(
        <table>
            <th>
                ID
            </th>
            <th>
                Title
            </th>
            <th>
                URL
            </th>
            <th>
                Authors
            </th>
            {filteredProject.map((project) => < ProjectItem project={project} />)}
        </table>
    )
}

export default UserProjectList
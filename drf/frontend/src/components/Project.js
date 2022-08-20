const ProjectItem = ({project}) => {
    return(
        <tr>
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

const ProjectList = ({projects}) => {
    return(
        <table>
            <th>
                Project Title
            </th>
            <th>
                Project URL
            </th>
            <th>
                Project Authors
            </th>
            {projects.map((project) => < ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList
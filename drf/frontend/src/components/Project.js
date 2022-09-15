const ProjectItem = ({project, deleteProject}) => {
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
            <td>
                <button onClick={() => deleteProject(project.id) }>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
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
            {projects.map((project) => < ProjectItem project={project} deleteProject={deleteProject} />)}
        </table>
    )
}

export default ProjectList
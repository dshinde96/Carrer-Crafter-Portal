import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const NoteItem = (props) => {
    const { project } = props;
    return (
        <>
            <div className="Item">
                <div className='head_cnt'>
                    <h3>{project.title}</h3>
                </div>
                <p>Description: <spam>{project.description}</spam></p>
                <p>Start date: <spam>{new Date(project.start_date).getMonth()}/{new Date(project.start_date).getFullYear()}</spam></p>
                <p>End date: <spam>{new Date(project.start_date).getMonth()}/{new Date(project.start_date).getFullYear()}</spam></p>
            </div>
        </>
    )
}
export default NoteItem;
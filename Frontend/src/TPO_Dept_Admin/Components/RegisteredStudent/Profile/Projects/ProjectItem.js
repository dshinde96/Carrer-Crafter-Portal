import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Item.css';
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
                {/* <p>{note.tags}</p> */}
                {/* <div className="btns">
                    <i className="fa fa-trash delete_btn" title="Delete Item"></i>
                    <i className="fa fa-edit edit_btn" title="edit Item"></i>
                </div> */}
            </div>
        </>
    )
}
export default NoteItem;
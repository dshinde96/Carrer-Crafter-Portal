import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import stucontext from '../../../../context/stucontext';
// import './Item.css';
const NoteItem = (props) => {
    const { exp } = props;
    const {delete_experience}=useContext(stucontext);
    const navigate=useNavigate();
    // console.log(edu);
    const handle_delete=()=>{
        // console.log(project._id);
        delete_experience(exp._id);
    }
    // console.log(exp);
    return (
        <>
            <div className="Item">
                <div className='head_cnt'>
                    <h3>{exp.position}</h3>
                    <div className="btns">
                        <i className="fa fa-edit edit_btn" style={{fontSize:"25px"}} title="edit Item" onClick={()=>navigate(`/myprofile/updateExperience/${exp._id}`)}></i>
                        <i className="fa fa-trash delete_btn" style={{fontSize:"25px"}} title="Delete Item" onClick={handle_delete}></i>
                    </div>
                </div>
                <p>Organisation: <spam>{exp.org}</spam></p>
                <p>Start Year: <spam>{new Date(exp.start_year).getMonth()}/{new Date(exp.start_year).getFullYear()}</spam></p>
                <p>End Year: <spam>{new Date(exp.end_year).getMonth()}/{new Date(exp.end_year).getFullYear()}</spam></p>
                {/* <p>{note.tags}</p> */}
            </div>
        </>
    )
}
export default NoteItem;
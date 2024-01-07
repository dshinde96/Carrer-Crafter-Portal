
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import stucontext from '../../../../context/stucontext';
// import './Item.css';
const NoteItem = (props) => {
    const { edu } = props;
    const {delete_education}=useContext(stucontext);
    const navigate=useNavigate();
    // console.log(edu);
    const handle_delete=()=>{
        // console.log(project._id);
        delete_education(edu._id);
    }
    return (
        <>
            <div className="Item">
                <div className='head_cnt'>
                    <h3>{edu.title}</h3>
                    <div className="btns">
                        <i className="fa fa-edit edit_btn" style={{fontSize:"25px"}} title="edit Item" onClick={()=>navigate(`/myprofile/updateEducation/${edu._id}`)}></i>
                    </div>
                </div>
                <p>School/college/university: <spam>{edu.school}</spam></p>
                <p>Percentage/CGPA: <spam>{edu.percentage}</spam></p>
                <p>Start Year: <spam>{new Date(edu.start_year).getFullYear()}</spam></p>
                <p>End Year(Completed/Expected to Complete): <spam>{new Date(edu.end_year).getFullYear()}</spam></p>
                {/* <p>{note.tags}</p> */}
            </div>
        </>
    )
}
export default NoteItem;
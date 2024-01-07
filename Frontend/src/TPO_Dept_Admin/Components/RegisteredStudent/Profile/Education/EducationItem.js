
import { useContext } from 'react';
// import './Item.css';
const NoteItem = (props) => {
    const { edu } = props;
    // console.log(edu);
    return (
        <>
            <div className="Item">
                <div className='head_cnt'>
                    <h3>{edu.title}</h3>
                </div>
                <p>School/college/university: <spam>{edu.school}</spam></p>
                <p>Start Year: <spam>{new Date(edu.start_year).getFullYear()}</spam></p>
                <p>End Year: <spam>{new Date(edu.end_year).getFullYear()}</spam></p>
                {/* <p>{note.tags}</p> */}
            </div>
        </>
    )
}
export default NoteItem;
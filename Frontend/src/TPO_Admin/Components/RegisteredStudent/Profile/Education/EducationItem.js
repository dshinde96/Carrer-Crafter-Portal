
import { useContext } from 'react';
const NoteItem = (props) => {
    const { edu } = props;
    return (
        <>
            <div className="Item">
                <div className='head_cnt'>
                    <h3>{edu.title}</h3>
                </div>
                <p>School/college/university: <spam>{edu.school}</spam></p>
                <p>Start Year: <spam>{new Date(edu.start_year).getFullYear()}</spam></p>
                <p>End Year: <spam>{new Date(edu.end_year).getFullYear()}</spam></p>
            </div>
        </>
    )
}
export default NoteItem;
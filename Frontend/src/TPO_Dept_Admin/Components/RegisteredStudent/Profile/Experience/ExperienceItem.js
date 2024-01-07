import { useContext } from 'react';
// import './Item.css';
const NoteItem = (props) => {
    const { exp } = props;
    // console.log(exp);
    return (
        <>
            <div className="Item">
                <div className='head_cnt'>
                    <h3>{exp.position}</h3>
                </div>
                <p>Oranisation: <spam>{exp.org}</spam></p>
                <p>Start Year: <spam>{new Date(exp.start_year).getMonth()}/{new Date(exp.start_year).getFullYear()}</spam></p>
                <p>End Year: <spam>{new Date(exp.end_year).getMonth()}/{new Date(exp.end_year).getFullYear()}</spam></p>
                {/* <p>{note.tags}</p> */}
            </div>
        </>
    )
}
export default NoteItem;
import { useContext } from "react";
import stucontext from "../../../context/stucontext";


const PlacementStatus = () => {
    const { student } = useContext(stucontext).profile;
    return (
        <>
            <div className="profile_item">
                <div className="btn_cnt">
                    <h3>Placemnt Status</h3>
                    <p>Status:<spam>{student.placed ? "Placed" : "Unplaced"}</spam></p>
                </div>
                <div className="profile_cnt" id="experience">
                    {student.placed ? <div className="Item">
                        <div className='head_cnt'>
                            <h5>Placed Companies</h5>
                        </div>{
                            student.CompanyName.map((ele) => {
                                return (
                                    <>

                                        <p>Company: <spam>{ele}</spam></p>
                                        {/* <p>{note.tags}</p> */}
                                    
                            </>
                        )
                    })}</div > : ""}
                </div>
            </div>
        </>
    )
}

export default PlacementStatus;
import { useContext } from "react"

import TpoAdminContext from "../../context/TpoAdminstate";


const Body = () => {
    const { Alldrives } = useContext(TpoAdminContext);

    console.log({"All":Alldrives})
    
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center mt-3 " >
                <div className=" rounded" style={{width:'50%'}} id="drives">
                    <h2 className="text-center text-ehite">Upcoming Drives...</h2>
                    <ul className="list-group">
                    {Alldrives && Alldrives.map((ele) => <li className="list-group-item">{ele.CompanyName}</li>)}
                    </ul>

                </div>
                
            </div>
        </>
    )
}

export default Body;
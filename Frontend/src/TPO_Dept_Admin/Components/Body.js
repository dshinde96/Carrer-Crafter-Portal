
const Body = () => {
    const drives = ["TCS","Forvia","Atlas Copco", "Microsoft", "Infosys","T-System","Accenture","L&T"];
    const events = ["Page Activity", "Coding test"]
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center mt-3 " >
                <div className=" rounded" style={{width:'50%'}} id="drives">
                    <h2 className="text-center text-ehite">Upcoming Drives...</h2>
                    <ul className="list-group">
                        {
                            drives.map((ele) => {
                                return (
                                    <>
                                        <li className="list-group-item">{ele}</li>
                                    </>
                                )
                            })
                        }
                    </ul>
                    
                </div>
                {/* <div className="sub_cnt" id="event">
                    <h2>Upcoming events...</h2>
                    <ul>
                        {
                            events.map((ele) => {
                                return (
                                    <>
                                        <li>{ele}</li>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div> */}
            </div>
        </>
    )
}

export default Body;
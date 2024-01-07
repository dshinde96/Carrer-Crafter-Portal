
const Body = () => {
    const drives = ["TCS", "Microsoft", "Google"];
    const events = ["Page Activity", "Coding test"]
    return (
        <>
            <div className="body_cnt">
                <div className="sub_cnt" id="drives">
                    <h2>Upcoming Drives...</h2>
                    <ul>
                        {
                            drives.map((ele) => {
                                return (
                                    <>
                                        <li>{ele}</li>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="sub_cnt" id="event">
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
                </div>
            </div>
        </>
    )
}

export default Body;
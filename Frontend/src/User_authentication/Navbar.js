import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

const Navbar = () => {
    const navigate=useNavigate();
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">GCEK</a>
                    <div className="Auth_btns">
                    <button type="button" class="btn btn-primary mx-3" onClick={()=>{navigate('/login')}}>Login</button>
                    <button type="button" class="btn btn-primary mx-3" onClick={()=>{navigate('/Signup')}}>Signup</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
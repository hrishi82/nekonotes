import {Navbar} from "../../components/NavBar/NavBar"
import "./landingpage.css"
import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"
import { useAuth } from "../../context/authContext"
import { useData } from "../../context/dataContext"

export const LandingPage = ()=> {

    const {token} = useAuth()
    const navigate = useNavigate()

    const logoutHandler = (e) =>{
        e.preventDefault()
        if (e.target.innerText === "Home"){
            navigate("/homepage")
        }else{
            navigate("/loginpage")
        }
    }


    return (
        <div className="landingpg-container">
        <header className="hero-container">
            <section className="hero-content-section">
                <h1 className="hero-heading text-xl">nekoNote</h1>
                <p className="hero-para">{token ? "Click on HOME to check out your saved notes" : "Login to start"}</p>

                <button className="btn btn-primary pill-btn hero-btn" onClick={e=>logoutHandler(e)}>{token ? "Home" : "Login"}</button>
            </section>

            <section className="hero-img-container">
                <img src="https://res.cloudinary.com/dac2rwutk/image/upload/v1650267376/notelandingpg_hkwgic.svg" alt="hero image" className="img-responsive" />
            </section>
        </header>
        </div>
    )
}

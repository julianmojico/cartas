import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { AiOutlineCoffee } from 'react-icons/ai'

const Footer = () => {
    return (
        <div className="footer">
            <a href="https://cafecito.app/tirandoaverde" target="_blank">
                <AiOutlineCoffee color="white" size="medium"/>
            </a>
            <a href="https://www.instagram.com/tirandoaverde_arte/" target="_blank">
                <BsInstagram color="white" size="medium"/>
            </a>
        </div>
    )
}

export default Footer;
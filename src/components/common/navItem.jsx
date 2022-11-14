import React from 'react'
import { Link } from 'react-router-dom'

export default function NavItem({ isActive, itemName, url }) {

    return (
        <li className="nav-item">
            <a className={isActive ? 'nav-link active' : 'nav-link'} href={url}>{itemName}
                {
                    isActive ??
                    (<span className="visually-hidden">(current)</span>)
                }

            </a>
        </li>
    )
}
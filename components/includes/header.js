import React from 'react';
import Link from 'next/link';
import auth0Serv from '../../lib/appAuth';

const Header = () => (
    <>
        <header>
            <div className="wrapper">
                <div className="top_nav">
                    <Link href="/">
                        <a className="logo">
                            <img src="/static/images/pizzaria_logo.png" alt="logo" />
                        </a>
                    </Link>
                </div>
                <div className="nav_section">
                    <nav>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>
                                        <i className="fas fa-pizza-slice"></i>
                                        <span>Our Pizzas</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/about">
                                    <a>
                                        <i className="fas fa-store"></i>
                                        <span>About Us</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact">
                                    <a>
                                        <i className="fas fa-map"></i>
                                        <span>Contact</span>
                                    </a>
                                </Link>
                            </li>

                        </ul>
                    </nav>
                </div>
                <div
                    className="login_btn"
                    onClick={()=> auth0Serv.login()}
                >
                    <span>User area</span>

                </div>

            </div>
        </header>
    </>
)

export default Header;
import '../styles/navbar.css';
import { FaInstagramSquare, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';

const Navbar = () => {
	const [showMediaIcon, setShowMediaIcon] = useState(false);

	return (
		<>
			<nav className="main-nav">
				{/* first header part */}

				<div className="logo">
					<h2>
						<span>U</span>rl
						<span>S</span>hortner
					</h2>
				</div>

				{/* menu navigation part */}

				<div className={showMediaIcon ? 'menu-link mobile-menu-link' : 'menu-link'}>
					<ul>
						<li>
							<a href="#">Home</a>
						</li>
						<li>
							<a href="#">About</a>
						</li>
						<li>
							<a href="#">Service</a>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
					</ul>
				</div>
				{/*----- social media link -----*/}

				<div className="social-media">
					<ul className="social-media-desktop">
						<li>
							<a href="#" target="_blank">
								<FaLinkedin className="linkedIn" />
							</a>
						</li>
						<li>
							<a href="#" target="_blank">
								<FaInstagramSquare className="instagram" />
							</a>
						</li>
						<li>
							<a href="#" target="_blank">
								<FaYoutube className="youtube" />
							</a>
						</li>
					</ul>
					{/* ---------- HAMBURGER menu */}

					<div className="hamburger-menu">
						<a href="#" onClick={() => setShowMediaIcon(!showMediaIcon)}>
							<GiHamburgerMenu />
						</a>
					</div>
				</div>
			</nav>
			{/*-------------------- hero section------------ */}

			<section className="hero-section">
				<p>Welcome to</p>
				<h1>Toxic hub</h1>
			</section>
		</>
	);
};

export default Navbar;

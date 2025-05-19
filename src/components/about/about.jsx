import React, { useState, useEffect } from 'react'
import './about.css'
import about_img from '../../assets/about-img.jpg'
import AnchorLink from 'react-anchor-link-smooth-scroll';

const hobbies = [
    '🥾 Hiking and skiing in the Rockies, or...',
    '🏃‍♀️ Running around the neighbourhood, or...',
    '📚 Getting lost in fictional worlds, or...',
    '🎹 Playing the piano and singing (badly), or...',
];

const About = () => {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx(prev => (prev + 1) % hobbies.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='about'>
            <div className="about-content">

                <div className="about-desc">
                    <h1>About Me</h1>
                    <p> I've always loved problem solving, and I fell in love with programming when I joined my highschool's robotics team.</p>
                    <p>With 5 years of programming experience, I'm fluent in <span>Java, Python, and C</span>.</p>
                    <p>As I develop this portfolio website, I'm learning <span>React, JavaScript, and CSS</span>.</p>
                    <h2>My Skills:</h2>
                    <ul className='skills'>
                        <li className='languages'>Java</li>
                        <li className='languages'>Python</li>
                        <li className='languages'>C/C++</li>
                        <li className='languages'>Node.js</li>
                        <li className='languages'>React</li>
                        <li className='languages'>JavaScript</li>
                        <li className='languages'>HTML/CSS</li>
                        <li className='libraries'>Pandas</li>
                        <li className='libraries'>Numpy</li>
                        <li className='libraries'>Pytorch</li>
                        <li className='libraries'>Tensorflow</li>
                        <li className='libraries'>SQL</li>
                        <li className='libraries'>OpenCV</li>
                        <li className='libraries'>NLP</li>
                        <li className='libraries'>FastAPI</li>
                        <li className='libraries'>Streamlit</li>
                    </ul>
                    <h2>Aside from coding, you can find me: </h2>
                    <ul className='interests'>
                        {hobbies.map((hobby, idx) => (
                            <li key={idx} className={activeIdx === idx ? 'active' : ''}>
                                {hobby}
                            </li>
                        ))}
                    </ul>
                </div>
                <img src={about_img} width='450px' height='600px' />
            </div>

            <div id='projects' className="scrollButton">
                <AnchorLink className='anchor-link' href='#projects'><p className="scrollIcon"> ↓ </p></AnchorLink>
            </div>
        </div>
    )
}

export default About
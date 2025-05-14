import React, { useState, useEffect }from 'react'
import './about.css'
import about_img from '../../assets/about-img.jpg'

const hobbies = [
    '🥾 Hiking and skiing in the Rockies, or...',
    '🏃‍♀️ Running around the neighbourhood, or...',
    '📚 Reading and getting lost in fictional worlds, or...',
    '🎹 Playing the piano/guitar (somewhat decently) and singing (very badly), or...',
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
        <div id='about' className='about'>
            <img src={about_img} width='450px' height='600px' />
            <div className="about-desc">
                <h1>About Me</h1>
                <p> I've always loved problem solving, and I fell in love with programming when I joined my highschool's robotics team.</p>
                <p>With 5 years of programming experience, I'm fluent in <span>Java, Python, and C</span>.</p>
                <p>As I develop this portfolio website, I'm learning <span>React, JavaScript, and CSS</span>.</p>
                <h2>Some of my areas of interest include:</h2>
                <ul className='cs-interests'>
                    <li>Artificial Intelligence</li>
                    <li>Machine Learning</li>
                    <li>Quantitative Finance</li>
                    <li>Human Computer Interactions</li>
                    <li>Cybersecurity</li>
                    <li>Quantum Computing</li>
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
        </div>
    )
}

export default About
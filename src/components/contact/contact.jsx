import React from 'react'
import './contact.css'
import github_icon from '../../assets/icons/github.png'
import linkedin_icon from '../../assets/icons/linkedin.png'
import mail_icon from '../../assets/icons/mail.png'


const Contact = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "948c5bd2-9f01-4d3d-a83a-40238f680070");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <div className='contact'>
            <div className="contact-desc">
                <h1>Let's Talk!</h1>
                <p>I'm currently open to work as well as new projects. Feel free to reach out any time!</p>
                <form className='contact-form' onSubmit={onSubmit}>
                    <label htmlFor="">Your Name</label>
                    <input type="text" placeholder='Enter your name' name='name' />
                    <label htmlFor="">Your Email</label>
                    <input type="email" placeholder='Enter your email' name='email' />
                    <label htmlFor="">Write your message here</label>
                    <textarea name='message' rows="8" placeholder='Enter your message'></textarea>
                    <button type="submit" className='contact-submit'>Submit</button>
                </form>
            </div>

            <div className="contact-links">
                <h1>Connect With Me</h1>
                <div className="contact-icons">
                    <a href="mailto:someone@example.com"><img src={mail_icon} alt="" /></a>
                    <a href="https://www.linkedin.com/in/jenjiang5/" target="_blank"><img src={linkedin_icon} alt="" /></a>
                    <a href="https://github.com/jen051" target="_blank"><img src={github_icon} alt="" /></a>
                </div>
            </div>
        </div>
    )
}

export default Contact
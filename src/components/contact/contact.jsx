import React from 'react'
import './contact.css'

const Contact = () => {
    return (
        <div id='contact' className='contact'>
            <div className="contact-desc">
                <h1>Let's Talk!</h1>
                <p>I'm currently open to work as well as new projects. Feel free to reach out any time!</p>
            </div>
            <form className='contact-form'>
                <label htmlFor="">Your Name</label>
                <input type="text" placeholder='Enter your name' name='name' />
                <label htmlFor="">Your Email</label>
                <input type="email" placeholder='Enter your email' name='email' />
                <label htmlFor="">Write your message here</label>
                <textarea name='message' rows="8" placeholder='Enter your message'></textarea>
                <button type="submit" className='contact-submit'>Submit</button>
            </form>
        </div>
    )
}

export default Contact
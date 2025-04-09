import React from 'react';
import { Button} from 'react-bootstrap';
import Popup from 'reactjs-popup';
import '../CSS/footer.css'



export function Footer(){
    const [aboutOpen, setAboutOpen] = React.useState(false);
    const [contactOpen, setContactOpen] = React.useState(false);

    function aboutClose(){
        setAboutOpen(false)
    }
    
    function contactClose(){
        setContactOpen(false)
    }

    return (
        <div className = "footer">
            <Button id = 'footer-button' onClick={() => {setAboutOpen(true)}}>
                About Us
            </Button>
            <Popup open = {aboutOpen} onClose = {aboutClose} modal nested className = "footer-popup">
                {
                  <div className = "footer-popup">
                    <h2>About Us</h2>
                    <p>We are a team of passionate developers dedicated to creating the best quiz experience for our users.</p>
                    <p>Our goal is to provide a platform that is both fun and educational.</p>
                    <p>We hope you enjoy using our quiz app!</p>
                    <p>If you have any questions or feedback, please feel free to contact us.</p>
                    <p>Team:</p>
                    <ul>
                      <li>Manager: Tristan Dendorfer</li>
                      <li>Zhenyuan Wang</li>
                      <li>Jia Qi Liu</li>
                      <li>Jacob Gordon</li>
                    </ul>
                    <Button onClick={aboutClose} id= 'footer-button'>Close</Button>
                  </div>
                }
              </Popup>
            <Button id = 'footer-button' onClick={() => {setContactOpen(true)}}>
                Contact Us
            </Button>
            <Popup open = {contactOpen} onClose = {contactClose} modal nested className = "footer-popup">
                {
                  <div className = "footer-popup">
                    <h2>Contact Us</h2>
                    <p>If you have any questions or feedback, please feel free to contact us.</p>
                    <p>Emails:</p>
                    <ul>
                        <li>tdendorf@udel.edu</li>
                        <li>zywang@udel.edu</li>
                        <li>qijai@udel.edu</li>
                        <li>jfgordon@udel.edu</li>
                    </ul>
                    <Button onClick={contactClose} id = 'footer-button'>Close</Button>
                  </div>
                }
              </Popup>
            
        </div>
    )
    
}
import React from 'react';
import { Button } from 'react-bootstrap';
import '../CSS/footer.css'

export function Footer(){
    return (
        <div className = "footer">
            <Button className = 'footer-button'>
                About Us
            </Button>
            <Button className = 'footer-button'>
                Contact Us
            </Button>
            
        </div>
    )
    
}
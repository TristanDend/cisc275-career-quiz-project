import React from 'react';
import { Button } from 'react-bootstrap';
import '../CSS/header.css'

export function Header(){
    return (
        <div className = 'header'>
            <Button className = 'header-button'>
                Home
            </Button>
            <Button className = 'header-button'>
                Simple Quiz
            </Button>
            <Button className = 'header-button'>
                Detailed Quiz
            </Button>
        </div>
    )
    
}
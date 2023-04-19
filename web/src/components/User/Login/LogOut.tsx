import * as React from 'react';
import { Component } from 'react';
import { Button } from "antd";

function LogOut() {

    const handleClick = () => {
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_token_time");
        console.log("local storage cleared");
        window.location.reload();
    }

    return (
        <Button onClick={handleClick}>log out</Button>
    )
}

export default LogOut
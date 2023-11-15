import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Protected = (props) => {
    const navigate = useNavigate();
    const { Component } = props;
    const userLogin = localStorage.getItem("userLogin");
    useEffect(() => {

        if(!userLogin){
            navigate("/signin", {replace: true});
        }
    }, []);
 
    return(
        <Component />
    );
}

export default Protected
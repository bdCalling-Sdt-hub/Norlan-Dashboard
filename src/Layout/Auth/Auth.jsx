import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
    return (
        <div
            style={{
                background: "linear-gradient(#000a738c, #000a738c)",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div
                style={{
                    background: "#ffffff",
                    padding: 5,
                    borderRadius: 10,
                    width: 510,
                    boxShadow: "0 0 2px rgb(66, 66, 66)"
                }}
            >
                <Outlet />
            </div>
    </div>
    )
}

export default Auth
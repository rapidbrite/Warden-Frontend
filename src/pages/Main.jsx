import React, { useEffect, useState } from 'react'



const Main = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUser = () => {
            fetch("https://zwvqkv-3333.preview.csb.app/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    if (response.status === 200) return response.json();
                    throw new Error("authentication has been failed!");
                })
                .then((resObject) => {
                    console.log(resObject);
                    setUser(resObject.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
        console.log(user);
    }, []);
    return (
        <div>Dashboard</div>
    )
}

export default Main;
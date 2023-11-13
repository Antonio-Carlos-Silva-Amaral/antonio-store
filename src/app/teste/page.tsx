"use client"
import { signIn } from "next-auth/react";

const Teste = () => {

    const handleLogin = async () =>{
        await signIn('google')
    }

    return (   
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Sign In with Google</button>
        </div> );
}
 
export default Teste;
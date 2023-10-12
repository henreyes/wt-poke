"use client";
import { signOut, useSession } from "next-auth/react"
import React from 'react'
import { signIn } from "next-auth/react";

function SignInButton() {
    const { data: session, status } = useSession()
   
    if (session && session.user){
        console.log(session?.user)
        return (
            <div>
                <p className="text-white text-lg">{session.user.username}</p>
                <button onClick={(e)=> {
                   e.preventDefault(); signOut()}}>Sign out</button>
            </div>
        );
    }
  return (
    <button className="mb-3 text-2xl font-semibold" onClick={(e) => {e.preventDefault();signIn()}}>
        Sign in
    </button>
  )
}

export default SignInButton
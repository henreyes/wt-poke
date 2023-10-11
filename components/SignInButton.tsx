"use client";
import { signOut, useSession } from "next-auth/react"
import React from 'react'
import { signIn } from "next-auth/react";

function SignInButton() {
    const{ data: session } = useSession();

    if (session && session.user){
        return (
            <div>
                <p>{session.user.name}</p>
                <button onClick={()=> signOut()}>Sign out</button>
            </div>
        );
    }
  return (
    <button className="mb-3 text-2xl font-semibold" onClick={() => signIn()}>
        Sign in
    </button>
  )
}

export default SignInButton
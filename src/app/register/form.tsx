'use client';

import { FormEvent } from 'react';

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("register pushed");
    const formData = new FormData(e.currentTarget);
    const postRequest = await fetch(`/api/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            username:formData.get('username'),
            password: formData.get('password'),
        }),
    });



  
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <input
        name="username"
        className="border border-black text-black"
        type="username"
      />
      <input
        name="password"
        className="border border-black  text-black"
        type="password"
      />
      <button type="submit">Register</button>
    </form>
  );
}
import React from 'react'

export default function Login() {
    function handleSubmit(event){
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
 
    }

    return (
        <div className='b'>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="p-6 m-auto bg-white w-11/12 lg:w-full rounded-md shadow-xl shadow-slate-300  ring-2 ring-[#5858ec] lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-[#5858ec] underline uppercase decoration-wavy">
                   Sign in
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="block w-full px-4 py-2 mt-2 text-[#5858ec]  bg-white border rounded-md focus:border-[#5858ec]/40 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="block w-full px-4 py-2 mt-2 text-[#5858ec]   bg-white border rounded-md focus:border-[#5858ec]/40 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-[#5858ec] hover:underline"
                    >
                        Forgot Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#5858ec] rounded-md hover:bg-[#0e0e6b] focus:outline-none focus:bg-[#5858ec]">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-[#5858ec] hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
     </div>
    );
}
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef, useState } from 'react'
import Loader from '../components/Loader';
import Fox from '../modal/Fox';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

function Contact() {
    const formRef = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [currentAnimation,setCurrentAnimation] = useState('idle');
    const handleChange =(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const { alert, showAlert, hideAlert} = useAlert()

    const handleFocus = () => setCurrentAnimation('walk')
    const handleBlur = () => setCurrentAnimation('idle')
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentAnimation('hit');
        // implement mail
        setTimeout(()=>{
            setIsLoading(false);
            showAlert({show:true, text:"Message sent successfully!",type:'success'})
            setCurrentAnimation('idle');
            setForm({name:'',email:'',message:''})
        },5000)
        setTimeout(() => {
            hideAlert()
        }, 8000)
    }
    return (
        <section className='relative flex lg:flex-row flex-col max-container h-[100vh]'>
            <div className="flex-1 min-w-[50%] flex flex-col">
                {alert.show && <Alert {...alert}/>}
                <h1 className='head-text'>Get in Touch</h1>
                <form className='w-full flex flex-col gap-7 mt-14' onSubmit={handleFormSubmit}>
                    <label className='text-black-500 font-semibold'>
                        Name
                        <input type='text'
                            name="name"
                            className='input' placeholder='Enter your name'
                            value={form.name}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            required />
                    </label>
                    <label className='text-black-500 font-semibold'>
                        Email
                        <input type='email'
                            name="email"
                            className='input' placeholder='Enter your email'
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required />
                    </label>
                    <label className='text-black-500 font-semibold'>
                        Your Message
                        <textarea className='input resize-none'
                            name="message"
                            placeholder='Let me know how I can help you!'
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required 
                            />
                    </label>
                    <button
                        type='submit'
                        className='btn'
                        disabled={isLoading}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        {isLoading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
            <Canvas
                camera={{
                    position:[0,0,5],
                    fov:75,
                    near:0.1,
                    far:1000
                }}
            >
                <directionalLight intensity={2.5} position={[0,0,1]}/>
                <ambientLight intensity={0.5}/>
                <Suspense fallback={<Loader/>}>
                    <Fox
                        position={[0.5,0.35,0]}
                        rotation={[12.625,-0.6,0]}
                        scale={[0.5,0.5,0.5]}
                        currentAnimation={currentAnimation}
                    />
                </Suspense>
            </Canvas>
            </div>

        </section>
    )
}

export default Contact

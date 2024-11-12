import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../modal/Island'
import Sky from '../modal/Sky'
import Bird from '../modal/Bird'
import Plane from '../modal/Plane'
import HomeInfo from '../components/HomeInfo'
import blueBird from '../../assets/NarutoBlueBird.mp3'
import soundoff from '../../assets/icons/soundoff.png'
import soundon from '../../assets/icons/soundon.png'

function Home() {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const audioRef = useRef(new Audio(blueBird));
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
    const [isPlayingMusic, setIsPlayingMusic] = useState(false);
    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        const screenPosition = [0, -6.5, -43];
        const rotation = [0.1, 4.7, 0]
        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else screenScale = [1, 1, 1];
        return [screenScale, screenPosition, rotation];
    }
    const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition;
        if (window.innerWidth < 768) {
            screenScale = [1.5, 1.5, 1.5];
            screenPosition = [0, -1.5, 0];
        } else {
            screenScale = [3, 3, 3];
            screenPosition = [0, -4, -4]
        }
        return [screenScale, screenPosition];
    }
    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
    const [planeScale, planePosition] = adjustPlaneForScreenSize();
    useEffect(() => {
        if (isPlayingMusic) audioRef.current.play();
        else audioRef.current.pause();
    }, [isPlayingMusic])
    return (
        <section className='w-full h-screen relative'>
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>
            <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intenity={2} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight skyColor="#b121ff" groundColor="#000" />
                    <Sky isRotating={isRotating} />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Bird isRotating={isRotating} />
                    <Plane
                        isRotating={isRotating}
                        scale={planeScale}
                        position={planePosition}
                        rotation={[0, 20, 0]}
                    />
                </Suspense>
            </Canvas>
            <div className="absolute bottom-2 left-2">
                <img src={!isPlayingMusic ? soundoff : soundon}
                    alt="sound"
                    className='w-10 h-10 cursor-pointer object-contain'
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                />
            </div>
        </section>
    )
}

export default Home

import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
    const { progress, active, loaded, total } = useProgress();

    return (
        <Html center>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin'></div>
                {active && (
                    <div className='mt-4 text-blue-500 font-medium'>
                        <p className='text-sm'>Loading 3D models...</p>
                        <p className='text-xs text-center mt-1'>{Math.round(progress)}%</p>
                        <p className='text-xs text-gray-600 text-center'>
                            {loaded} / {total} assets
                        </p>
                    </div>
                )}
            </div>
        </Html>
    );
};

export default Loader;
import { useRef, useEffect } from 'react';

const UploadWidget = ({ setUploadResult }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: import.meta.env.VITE_CLOUD_NAME,
            uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
        }, function (error, result) {
            console.log(result);
            if (result.info.files) {
                console.log(result.info.files[0].uploadInfo.secure_url);
                setUploadResult(result.info.files[0]);
            }
        });
    }, []);
    return (
        <button onClick={() => widgetRef.current.open()}>Upload</button>
    );
}
export default UploadWidget;
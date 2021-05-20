import React from 'react';

import image from  "./Image.module.css";

const Image = ({src, alt}) => {
    const[show, setShow] = React.useState(false);

    const showImage = () => {
        if(show){
            return setShow(false);
        }
        else{
            return setShow(true);
        }
    };

    return (
        <div
            className={show ? image.wrap__fixed : image.wrap} onClick={showImage}>
            <img
                src = {src}
                alt = {alt}
                className={image.img}
            />
        </div>
    );
};

export default Image;
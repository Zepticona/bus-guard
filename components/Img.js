// ALways use width and height by a className.

import Image from 'next/image';

export default function Img({src, className, alt, ...rest}) {
    return (
        <div {...rest} style={{position: 'relative'}} className={className} >
            <Image
                alt={alt}
                src={src}
                layout='fill'
                className="Img"
            />
        </div>
    )
}
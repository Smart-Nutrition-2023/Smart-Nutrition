import Image from "next/image";
import { useCallback, useState } from "react";

const SmileClick = () => {

    const smileUrl = ["/yellowsmile.svg", "/greensmile.svg", "/redsmile.svg"];
    const [count, setCount] = useState(0);
    const smileChange = useCallback(() => {
        setCount((count+1)%3);
    }, [count]);
    
    return (
        <div onClick={(e)=>{smileChange()}}>
            <Image src={smileUrl[count]} layout="fill" />
        </div>
    );
};

export default SmileClick;
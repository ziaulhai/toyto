import { useEffect } from 'react';

const useDynamicTitle = (title) => {
    
    useEffect(() => {
       
        document.title = `${title} | ToyTopia`; 
        
        

    }, [title]); 
};


export default useDynamicTitle;
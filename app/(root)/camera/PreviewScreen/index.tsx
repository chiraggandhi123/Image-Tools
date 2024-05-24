import React, { useEffect, useState } from 'react'
import './index.scss';
import SearchBox from '@/components/shared/SearchBox';
import { createWorker } from 'tesseract.js';

const Preview = ({showImage, setShowImage, image}:{showImage:boolean, setShowImage:(v:boolean)=>void, image:string | null}) => {
    const [query, setQuery] = useState<string | null>(null);
      useEffect(()=>{
        (async()=>{
            const worker = await createWorker({
                logger: m => console.log(m)
              });
              await worker.loadLanguage('eng');
              await worker.initialize('eng');
              if(image){
                  const { data: { text } } = await worker.recognize(image);
                  text && setQuery(text);
              }
              await worker.terminate();
              
        })()
      },[image])
    
  return (
    <div className="preview-screen-wrapper">
        <div
        className='image-preview'
        style={image ? {backgroundImage: `url(${image})`} : {}}
          onClick={() => {
            setShowImage(!showImage);
          }}
        />
        <div className='search-box'>
            {query ? <SearchBox query={query} onSearch={()=>{}}/> : <p className='loading'>loading...</p>}
        </div>
        </div>
  )
}

export default Preview

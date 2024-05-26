import React, { useEffect, useRef, useState } from 'react'
import './index.scss';
import SearchBox from '@/components/shared/SearchBox';
import Tesseract from 'tesseract.js';
import logo from './z.png';
import {convertStaticImageDataToBase64} from './utils';
const Preview = ({showImage, setShowImage, image}:{showImage:boolean, setShowImage:(v:boolean)=>void, image:string | null}) => {
    const [query, setQuery] = useState<string | null>(null);

  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [base64Image,setBase64Image] = useState('');
  const imageRef =  useRef(null);
//   useEffect(() => {
//     convertStaticImageDataToBase64(image)
//       .then(setBase64Image)
//       .catch(setError);
//   }, [image]);

    const handleExtractText = async (img : string) => {
        setError('');
        setLoading(true);
        setExtractedText('');
        try {
          const { data } = await Tesseract.recognize(img, 'eng', {
            logger: (m) => console.log(m), // Optional logging
          });
          setExtractedText(data.text);
        } catch (err) {
          setError(`Error extracting text: ${err}`);
        } finally {
          setLoading(false);
        }
      };
      useEffect(()=>{
        handleExtractText(image).then(res=>{console.log('res', res)});
      },[base64Image])
      {console.log('ex====>', extractedText);}

  return (
    <div className="preview-screen-wrapper">
        <div
        ref={imageRef}
        className='image-preview'
        style={image ? {backgroundImage: `url(${image})`} : {}}
          onClick={() => {
            setShowImage(!showImage);
          }}
        />
         {loading && <p>Loading...</p>}
      {extractedText && (
        <div>
          <p>Extracted Text:</p>
          <div
            contentEditable
            suppressContentEditableWarning
            style={{ border: '1px solid black', padding: '10px', whiteSpace: 'pre-wrap' }}
          >
            {extractedText}
          </div>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='search-box'>
            {query ? <SearchBox query={query} onSearch={()=>{}}/> : <p className='loading'>loading...</p>}
        </div>
        </div>
  )
}

export default Preview

import React, { useRef, useState } from "react"

import Button from "./Button"

import "./ImageUpload.css"

const ImageUpload = (props) => {

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  const pickedFileHandler = event => {
    console.log(event.target); // Console log the file input element
  }

  const pickImageHandler = () => {
    filePickerRef.current.click();
  }

  return (
    <div className="form-control">
      <input id={props.id} ref={filePickerRef} style={{display: "none"}} type="file" accept=".jpg,.png,.jpeg" onChange={pickedFileHandler}/>
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
        <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
    </div>
  )
}

export default ImageUpload
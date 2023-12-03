import React, { useEffect, useRef, useState } from "react"

import Button from "./Button"

import "./ImageUpload.css"

const ImageUpload = (props) => {

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader(); // Create a new file reader object

    fileReader.onload = () => {
      setPreviewUrl(fileReader.result); // Set the preview url to the file reader result
    };
    fileReader.readAsDataURL(file); // Read the file
  }, [file])

  const pickedFileHandler = event => {
    console.log(event.target); // Console log the file input element

    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]; // Get the file
      setFile(pickedFile); // Set the file to the file that is picked
      setIsValid(true); // Set the file to valid
      fileIsValid = true; // Set the file to valid
    } else {
      setIsValid(false); // Set the file to invalid
      fileIsValid = false // Set the file to invalid
    }
    props.onInput(props.id, pickedFile, fileIsValid); // Send the file to the parent component (NewPlace.jsx)

  }

  const pickImageHandler = () => {
    filePickerRef.current.click();
  }

  return (
    <div className="form-control">
      <input id={props.id} ref={filePickerRef} style={{display: "none"}} type="file" accept=".jpg,.png,.jpeg" onChange={pickedFileHandler}/>
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
        <img src={previewUrl} alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
    </div>
  )
}

export default ImageUpload
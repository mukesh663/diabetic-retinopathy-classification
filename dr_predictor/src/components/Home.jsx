import React, { useState } from "react";
import Navbar from "./Navbar";

function Home() {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [responseData, setResponseData] = useState(null);

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    if(!image.raw) {
      alert("Please upload an image"); 
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("http://127.0.0.1:8000/result/", {
      method: "POST",
      body: formData
    }).then((response) => response.json())
    .then((data) => 
      setResponseData(data)
    )
    .catch((error) => console.log(error));

  };

  return (
    /*
    diabetic retinopathy (DR) is a leading cause of blindness in working-age adults.
    With our app, you can upload an image of your retina and get a prediction of whether you have DR or not.
    */
    <>
    <Navbar />
    <div className="items-center mt-20 justify-center text-center">
      <p className="text-gray-700 text-2xl leading-loose" >
          Diabetic retinopathy (DR) is a leading cause of blindness in working-age adults.
      </p>
      <p className="text-2xl font-medium leading-loose">
        Get accurate predictions in seconds!
      </p>

    </div>

    <div className="mt-20">

      {image.preview ? (
          <div className="flex items-center justify-center">
            <img src={image.preview} alt="dummy" width="400" height="400" />
          </div>
        ) : (
          <div className="flex items-center justify-center">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-1/3 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (display - 400x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleChange}/>
          </label>
          </div> 
        )}
       
        <div className="flex m-10 items-center justify-center">
        <button className="flex justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleUpload}>Upload</button>
        </div>

        {responseData && (
          <div className="flex m-10 justify-center">
            <div className="flex w-96 h-16 justify-center items-center border-4 rounded-lg border-green-400">
              <p className="text-gray-600 text-xl font-semibold">Prediction: </p>
              <p className="text-gray-600 text-xl ml-2">{responseData.result}</p>
            </div>
          </div>
        )}
    </div>
    </>
  )
}

export default Home
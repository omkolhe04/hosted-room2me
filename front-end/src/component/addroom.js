import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header.js";
import Navbar from "./navbar.js";
import Footer from "./footer.js";
import "../css/addroom.css";
import { useDropzone } from "react-dropzone";


const AddRoom = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    roomType: "",
    roomFloor: "",
    numberOfRooms: "",
    numberOfKitchens: "",
    toiletAndBathroom: "",
    electricityBills: "",
    colony: "",
    area: "",
    landmark: "",
    city: "",
    expectedRent: "",
  });

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const fileArray = [];

      for (const file of acceptedFiles) {
        const dataUrl = await readFileAsDataURL(file);
        fileArray.push({ path: dataUrl });
      }

      setFiles([...files, ...fileArray]);
    },
    [files]
  );

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
  const token = localStorage.getItem('jwt');
  console.log(token);


  try {
    const response = await fetch("/addRoom", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // 401 unauthorzed solved here
      },
      body: JSON.stringify({
        ...formData,
        images: files.map((file) => file.path),
      }),
      });
      console.log(token)

      if (response.ok) {

        console.log("Room added successfully!");
        navigate("/");
      } else {
        console.error(
          "Failed to add room:",
          response.status,
          response.statusText
        );
        // Handle error, show a message, etc.
      }
    } catch (error) {
      console.error("Error submitting room:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="addroom">
      <Header />
      <Navbar />
      <div className="all-content">
        <div className="form">
          <div>
            <h4>-- ADD YOUR OWN ROOM --</h4>
          </div>
          <div className="select-div">
            <select
              className="select"
              name="roomType"
              onChange={handleInputChange}
              value={formData.roomType}
            >
              <option value="Room">SELECT ROOM TYPE</option>
              <option value="Rooms">ROOMS</option>
              <option value="1-BHK">1-BHK</option>
              <option value="2-BHK">2-BHK</option>
              <option value="3-BHK">3-BHK</option>
            </select>
            <select
              className="select"
              name="roomFloor"
              onChange={handleInputChange}
              value={formData.roomFloor}
            >
              <option value="Floor">SELECT ROOM FLOOR</option>
              <option value="Ground Floor">GROUND FLOOR</option>
              <option value="First Floor">FIRST FLOOR</option>
              <option value="Second Floor">SECOND FLOOR</option>
              <option value="Third Floor">THIRD FLOOR</option>
              <option value="3rd+Floor">MORE...</option>
            </select>
          </div>
          <div className="select-div">
            <select
              className="select"
              name="numberOfRooms"
              onChange={handleInputChange}
              value={formData.numberOfRooms}
            >
              <option value="">NO. OF ROOMS</option>
              <option value="single Room">SINGLE ROOM</option>
              <option value="Two Rooms">TWO ROOMS</option>
              <option value="Three Rooms">THREE ROOMS</option>
              <option value="Four Rooms">FOUR ROOMS</option>
            </select>
            <select
              className="select"
              name="numberOfKitchens"
              onChange={handleInputChange}
              value={formData.numberOfKitchens}
            >
              <option value="0">NUMBER OF KITCHEN</option>
              <option value="No Kitchen">NO KITCHEN</option>
              <option value="One Kitchen">1 - KITCHEN</option>
              <option value="Two Kitchen">2 - KITCHEN</option>
              <option value="Cooking Not Alowed">COOKING NOT ALOWED</option>
            </select>
          </div>
          <div className="select-div">
            <select
              className="select"
              name="toiletAndBathroom"
              onChange={handleInputChange}
              value={formData.toiletAndBathroom}
            >
              <option value="0">TOILET AND BATTHROOM</option>
              <option value="1-Toilet, 1-Bathrooms">1-TOILET, 1-BATHROOM</option>
              <option value="1-Toilet, 2-Bathrooms">1-TOILET, 2-BATHROOM</option>
              <option value="2-Toilet, 1-Bathrooms">2-TOILET, 1-BATHROOM</option>
              <option value="2-Toilet, 2-Bathrooms">2-TOILET, 2-BATHROOM</option>
            </select>
            <select
              className="select"
              name="electricityBills"
              onChange={handleInputChange}
              value={formData.electricityBills}
            >
              <option value="0">ELECTICITY BILLS</option>
              <option value="Added to Room Rent">ADDED TO ROOM RENT</option>
              <option value="Separated from Rent">SEPARATED FROM RENT</option>
            </select>
          </div>
          <div className="address-div">
            <h4>ENTER YOUR ADDRESS DETAILS</h4>
            <div>
              <label>Colony :</label>
              <input
                type="text"
                name="colony"
                onChange={handleInputChange}
                value={formData.colony}
              />
            </div>
            <div>
              <label>Area Name :</label>
              <input
                type="text"
                name="area"
                onChange={handleInputChange}
                value={formData.area}
              />
            </div>
            <div>
              <label>Land-Mark :</label>
              <input
                type="text"
                name="landmark"
                onChange={handleInputChange}
                value={formData.landmark}
              />
            </div>
            <div>
              <label>City :</label>
              <input
                type="text"
                name="city"
                onChange={handleInputChange}
                value={formData.city}
              />
            </div>
          </div>
          <div className="address-div">
            <h4>-- RENT --</h4>
            <div>
              <label>Expected Rent :</label>
              <input
                type="number"
                placeholder="Rupees"
                name="expectedRent"
                onChange={handleInputChange}
                value={formData.expectedRent}
              />
            </div>
          </div>
          <div className="img-section" style={{ padding: "16px" }}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p style={{ color: "green" }}>Drop the Files here...</p>
              ) : (
                <p>Drag 'n' Drop Some Files here, or click to select files</p>
              )}
              <em>
                (Images with *.jpeg, *.png, *.jpg extension will be accepted)
              </em>
            </div>
            <div className="uploaded-images">
              <h4 style={{ cursor: "pointer" }}>Uploaded Images</h4>
              <div className="image-preview">
                {files.map((file, index) => (
                  <div key={index} className="image-container">
                    <img src={file.path} alt={`uploaded-${index}`} />

                    <button
                      className="delete-button"
                      onClick={() => removeImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              {files.length > 0 && (
                <button className="upload-button" onClick={handleSubmit}>
                  Save
                </button>
              )}
            </div>
          </div>
          <div>
            <button className="upload-button" >
              Cancel All
            </button>
            <button
              className="upload-button"
              onClick={handleSubmit}
            >
              Upload Room
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddRoom;

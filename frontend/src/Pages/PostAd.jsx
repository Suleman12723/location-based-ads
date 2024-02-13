import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import axios from "axios";
import LocationContext from "../Context/Location";

function PostAd() {
  const fileRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const { location } = LocationContext.useLocationAccess();
  const [latitude, setLatitude] = useState(location?.lat || "");
  const [longitude, setLongitude] = useState(location?.long || "");

  const handleFileClick = () => {
    fileRef.current.click();
  };

  useEffect(() => {
    if (location) {
      setLatitude(location.lat);
      setLongitude(location.long);
    }
  }, [location]);

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = {
        location: {
          latitude: parseFloat(e.target.latitude.value),
          longitude: parseFloat(e.target.longitude.value),
          radius: parseInt(e.target.radius.value),
        },
        files: e.target.files.files,
      };
      if (data.files && data.files.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < data.files.length; i++) {
          console.log(data.files[i]);
          formData.append("files", data.files[i]);
        }

        const filesData = await axios.post(
          "http://localhost:3000/upload/uploadFile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        data.image = filesData.data.map((file) => {
          return {
            name: file.filename,
            format: file.mimetype,
            size: file.size / 1000,
          };
        })[0];
      }

      const resp = await axios.post("http://localhost:3000/ad", data);
      if (resp.data.success) {
        alert("Ad posted successfully");
      } else {
        alert("Ad posting failed");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary min-h-screen">
      <div className="self-center flex flex-col justify-center w-full max-w-full md:w-[50%] md:max-w-[50%]  rounded-lg bg-primary  p-5 md:p-10 m-10 space-y-5">
        <p className="text-heading font-heading text-3xl md:text-5xl text-center">
          Post an AD
        </p>
        <p className="text-text font-text text-center">
          Fill in the form below to get your ad posted
        </p>
        <form onSubmit={submitForm} className="flex flex-col space-y-5">
          <input
            type="text"
            placeholder="latitude"
            className="border border-border rounded-md p-2"
            name="latitude"
            required
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="text"
            placeholder="longitude"
            className="border border-border rounded-md p-2"
            name="longitude"
            required
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <input
            type="number"
            placeholder="radius in KM"
            className="border border-border rounded-md p-2"
            name="radius"
            required
            min={1}
          />
          <div
            onClick={handleFileClick}
            className="flex items-center justify-center p-2 rounded-md bg-[#3275fa57] text-secondary w-full cursor-pointer md:max-w-[30%]"
          >
            <input
              required
              name="files"
              type="file"
              multiple
              className="hidden"
              ref={fileRef}
            />
            <p className="text-center">Upload Ad Image</p>
          </div>
          <Button loading={loading} type={"submit"} text="Post" />
        </form>
      </div>
    </div>
  );
}

export default PostAd;

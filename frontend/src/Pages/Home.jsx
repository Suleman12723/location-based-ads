import React, { useEffect } from "react";
import LocationContext from "../Context/Location";
import Button from "../Components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { location, accessGranted } = LocationContext.useLocationAccess();
  const [loading, setLoading] = React.useState(false);
  const [ads, setAds] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getAds = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(
          `http://localhost:3000/ad?lat=${location?.lat}&lon=${location?.long}`
        );
        setAds(resp.data.ads);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (location) getAds();
  }, [location]);

  return (
    <div className="flex-1 bg-primary w-full h-full">
      <div className="flex justify-end p-5">
        <Button
          text="Post Ad"
          onClick={() => {
            //navigate to post ad page using react router
            navigate("/post-ad");
          }}
        />
      </div>
      <div className="flex flex-1">
        {
          //if location access is not granted
          !accessGranted && (
            <div className="flex justify-center items-center w-full h-full">
              <p className="text-[red]">Location access is not granted</p>
            </div>
          )
        }
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <p>Loading...</p>
          </div>
        ) : ads.length < 0 ? (
          <div className="flex justify-center items-center w-full h-full">
            <p>No ads found</p>
          </div>
        ) : (
          <div className="flex flex-row items-center flex-wrap  space-x-3">
            {ads.map((ad, index) => {
              return (
                <div
                  key={index}
                  className="w-[300px] h-[300px] relative border-[2px] border-[#3275fa57] rounded-md overflow-hidden"
                >
                  <img
                    src={`http://localhost:3000/upload/image/${ad.image.name}`}
                    alt="ad"
                    className="w-full h-full object-cover"
                  />
                  <p className="legend absolute bottom-0 text-[orange]">
                    AD based on your location
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

import React, {useState,useEffect, useRef} from "react";
import Header from "./header.js";
import Footer from "./footer.js";
import Navbar from "./navbar.js";
import postpic from "../img/post-pic.png"
import '../css/myacc.css'
import { useNavigate } from "react-router-dom";

const Myacc = () => {
  const hiddenFileInput = useRef(null);
  const [myroom, setMyroom] = useState([]);
  const [show, setShow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [item, setItem] = useState([]);
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

    //FUNCTION FOR  IMAGE SLIDER IN MORE-SECTION--------------------
  const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  }
//FUNCTION FOR NEXT-IMG BUTTON IN MORE-SECTION--------------------
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.images.length);
    };
//FUNCTION FOR PREV-IMG BUTTON INN MORE-SECTION----------------------
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length);
    };
     //FUNCTION FOR ADJUSTING THE POSITION OF MORE-SECTION ON SCREEN---------------------
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
   //FUNCTION FOR SHOW AND HIDE THE MORE-SECTION---------------------
   const toggleMore = (rooms) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(rooms);
      console.log(item)
    }
  };
  //FUNCTION FOR STOP SCROLLING WHEN SHOW IS TRUE---------------------
  useEffect(() => {
    if (show) {
      // Add a class to the body to prevent scrolling
      document.body.classList.add("no-scroll");
    } else {
      // Remove the class to allow scrolling
      document.body.classList.remove("no-scroll");
    }
  }, [show]);

    useEffect(() => {
                fetch('/myrooms', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res=>res.json())
                .then((result)=>{
                    setMyroom(result)
                    console.log(myroom)
                })
    },[]);

    const removeRoom=(roomId)=>{
      if(window.confirm("Do you want to delete the Room ?")){

        fetch(`/deleteRoom/${roomId}`, {
          method:"delete",
          headers: {
              Authorization: `Bearer ${token}`
            },
       })
       .then((res)=>res.json())
       .then((result)=>{
        console.log(result)
        navigate("/")
       })
      }
    }

 const handleClick = ()=>{
    hiddenFileInput.current.click()
 }

  return (
    <div>
      <Header />
      <Navbar/>
      <div className="profile">
        <div className="profile-frame">
          <div className="profile-pic">
            <img src={postpic} alt="" />
          </div>
          <div className="profile-data">
            <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
            <div className="profile-info">
              <p>Email: {JSON.parse(localStorage.getItem("user")).email}</p>
              <p>{myroom.length} Added Content</p>
            </div>
          </div>
        </div>
          <hr className="hr-tag" />
          <h2 className="title-h2" style={{textAlign:"center"}}>-- YOUR UPLOADED ROOMS --</h2>
        <div className="gallery">
        {myroom.length === 0 ? (
          <div className="no-rooms-message">
            <p>Oops! You haven't uploaded any rooms yet.</p>
          </div>
        ) : (
          myroom.map((myroom)=>{
                return(
                    <div className="post" id="post-myacc" >
                    <div className="post-header">
                        <div className="post-pic">
                            <img src={postpic} alt="P" />
                        </div>
                        <div className="user-detail" style={{width:"606px"}}>
                            <h5>{myroom.postedBy.name}</h5>
                            <h5>- {myroom.city}</h5>
                        </div>
                        <a className='post-button' id='delete-btn' onClick={()=>{removeRoom(myroom._id)}}><span class="material-symbols-outlined">delete</span> Delete Room</a>
                        <a className="post-button" id="more" onClick={() => {toggleMore(myroom);}}><span class="material-symbols-outlined">expand_circle_right</span>More...</a>                        
                    </div>
                    <div className='image-content'>
                        <div className="post-image">
                        {myroom.images.length > 0 && (
                           <img src={myroom.images[0]} alt='' />
                         )}
                        </div>
                        <div className="post-content">
                            <h5 >- {myroom.roomType} on {myroom.roomFloor}</h5>
                            <p>- Details: {myroom.numberOfRooms}, {myroom.numberOfKitchens}, {myroom.toiletAndBathroom}</p>
                            <p>- Electricity Bill will {myroom.electricityBills}</p>
                            <p>- Adress: {myroom.colony}, {myroom.area}, {myroom.landmark}, {myroom.city}</p>
                            <p style={{color:"#3dd42c", textShadow:"1px 1px darkred"}}>- Expected Rent: {myroom.expectedRent}/-</p>
                        </div>
                    </div>
                </div>
                )
            }))}
        </div>
      </div>
      <Footer/>
      {show && (
        <div className="more-section"    style={{ top: `${scrollPosition}px` }}>
          <div className="close-more" >
            <span
              style={{ fontSize: "50px" }}
              class="material-symbols-outlined"
              onClick={()=>{toggleMore()}}
            >
              close
            </span>
          </div>
          <div className="container">
            <div className="img-user">
              <div className="all-image">
              <div className="image-slider">
                <img src={item.images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
                <div className="slider-nav">
                  <button className="slider-btn" onClick={prevImage}>&#10094;</button>
                  <button className="slider-btn" onClick={nextImage}>&#10095;</button>
                </div>
              </div>
              </div>
              <div className="user-info">
                <div className="user">
                  <img src={postpic} alt="" />
                    <h2 style={{textShadow: "0px 0px 5px #1f60ff"}}>{item.postedBy.name}</h2>
                    <h4 style={{textShadow: "0px 0px 5px #1f60ff"}}>id: {item.postedBy._id}</h4>
                    <div className="more-btn" >
                    <a className='post-button' id='delete-btn' onClick={()=>{removeRoom(item._id)}}> Delete Room</a>
                    </div>
                    <h2 className="more-rent">RENT: {item.expectedRent}/-</h2>
                </div>
                </div>
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
            <div className="room-info">
              <div style={{display:"flex",flexDirection:"row"}}>
                <p>- Room Type : {item.roomType}</p>
                <p>- Room Floor : {item.roomFloor}</p>
              </div>
                <p>- Electicity Bill will {item.electricityBills}</p>
                <p>- Details : {item.numberOfRooms}, {item.numberOfKitchens}, {item.toiletAndBathroom}</p>
                <p>- Address : {item.colony}, {item.area}, {item.landmark}, {item.city}</p>
              </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myacc;

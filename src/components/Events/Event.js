import { useRef, React, useEffect, useState, useContext } from 'react'
import { BsFillPlusSquareFill } from 'react-icons/bs';
import banner from "./images/words.webp"
import { addDoc, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import "./Event.css"
import face from "./images/face.webp"
import { auth, db } from '../../Firebase/FirebaseConfig';
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../context/Authcontext';
// import { useHistory, useNavigate } from 'react-router-dom';

const Event = () => {
    // ________DATA CREATE__________________
const [eventname, seteventname] = useState("")
const [Date, setDate] = useState()
const [Vehicles, setVehicles] = useState(Number)
const [Workers, setWorkers] = useState(Number)
const [Location, setLocation] = useState("")
const [Venue, setVenue] = useState("")
const [Username, setUsername] = useState("")
const [dummyState,rerender] = useState(1);



     // ________DATA CREATE__________________
    const [displayCreateEvent, setdisplayCreateEvent] = useState(true)
    const [displayFormcreate, setdisplayFormcreate] = useState("CreateEvent_form_contaniner_show hide")
    const [Items, setItems] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const userID = currentUser.uid;
    console.log(userID);
    // console.log(displayCreateEvent)
    const getUsername = async () => {
        const snap = await getDoc(doc(db, 'user', userID))
        if (snap.exists()) {
            console.log(snap.data())
            setUsername(snap.data().Username)
            console.log(Username)
        }
        else {
            console.log("No such document")
        }
        // console.log("successfull" + getUsername)
        return snap.data().Username;
    }
console.log("this is" + Username)
    const handleDisplayCreateEvent = () => {
        if (displayCreateEvent === true) {
            setdisplayCreateEvent(false)
            console.log(displayCreateEvent)
            setdisplayFormcreate("CreateEvent_form_contaniner_show")

        }
        if (displayCreateEvent === false) {
            setdisplayCreateEvent(true)
            console.log(displayCreateEvent)
            setdisplayFormcreate("CreateEvent_form_contaniner_show hide")
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "EVENTCARDS"));
            const itemsArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItems(itemsArray);
        };

        fetchData();
    }, []);
    console.log(Items)

    const scrollContainerRef = useRef(null);

    const handleScroll = (evt) => {
        evt.preventDefault();
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.scrollLeft += evt.deltaY;
    };
    const handleData = async (e) => {
        e.preventDefault()
        const res = await addDoc(collection(db, "EVENTCARDS"), {
          eventname: eventname,
          EventPlanner: Username,
          Vehicles: Vehicles,
          Workers: Workers,
          Location: Location,
          Venue: Venue,
          timeStamp: serverTimestamp()
        });
        console.log("this is res" + res)
      }
      const handleCloseCreate = () =>{
        setdisplayFormcreate("CreateEvent_form_contaniner_show hide")
      }
      const [value,setValue] = useState();

      const handlecreate = () => {
        setValue({});
        rerender(dummyState + 1);
        setdisplayFormcreate("CreateEvent_form_contaniner_show hide")
    }
    return (
        <>
            <Navbar />
            <div className='Event_container'>
                <div className='create_Event_Container' ref={scrollContainerRef} onWheel={handleScroll}>
                    <div onClick={handleDisplayCreateEvent} className='box create'>
                        <div className='plus'>
                            <BsFillPlusSquareFill />
                        </div>
                        <h3 className='ceate_text'>Create Event</h3>
                    </div>
                    {Items.map((Items) => {
                        return (<div className='boxCreate event_data' key={Items.id} id={Items.id}>
                            <div className='banner'>
                                <img src={banner} alt='' />
                            </div>
                            <div className='profile_pic_circle_container'>
                                <img className='face' src={face} alt='' />
                            </div>
                            <div className='date_time_container'>
                                <p>Date : 23-7-23</p>
                                <p>Time : 12:00pm</p>
                            </div>
                            <div className='date_time_container'></div>
                            <div className='date_time_container active'>
                                <p>Active</p>
                                <div className='active_circle'></div>
                            </div>
                            <div className='date_time_container active'>
                                <p><strong>EP: </strong>{Items.EventPlanner}</p>
                            </div>
                            <div className='date_time_container active'>
                                <p><strong>Event: </strong>{Items.eventname}</p>
                            </div>
                            <div className='date_time_container active'>
                                <p><strong>Vehicle: </strong>{Items.Vehicles}</p>
                                <p><strong>workers: </strong>{Items.Workers}</p>
                            </div>
                            <div className='date_time_container divide'></div>
                            <div className='date_time_container divide'>
                                <p><strong>Location: </strong>{Items.Location}</p>
                                <p><strong>Venue: </strong>{Items.Venue}</p>
                            </div>

                        </div>
                        )
                    })}
                </div>
                <div className='sort_container'></div>
                <div className='Event_list_container'></div>
                <div className={displayFormcreate}>
                    <form onSubmit={handleData}>
                        <label>Event Name</label>
                        <input type='text' onChange={(e) => seteventname(e.target.value)} />
                        <label>Event Date</label>
                        <input type='date' onChange={(e) => setDate(e.target.value)}/>
                        <label>Vehicles</label>
                        <input type='number' onChange={(e) => setVehicles(e.target.value)} />
                        <label>Workers</label>
                        <input type='number' onChange={(e) => setWorkers(e.target.value)} />
                        <label>Event location</label>
                        <input type='text' onChange={(e) => setLocation(e.target.value)}/>
                        <label>Event Venue</label>
                        <input type='text' onChange={(e) => setVenue(e.target.value)} />
                        <div className='form_buttons'>
                            <button onClick={handleCloseCreate}>Close</button>
                            <button onClick={handlecreate} type='submit'>Create Event</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Event
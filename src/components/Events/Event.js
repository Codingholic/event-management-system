import { useRef, React } from 'react'
import { BsFillPlusSquareFill } from 'react-icons/bs';
import banner from "./images/words.webp"
import "./Event.css"
import face from "./images/face.webp"

const Event = () => {

    const scrollContainerRef = useRef(null);

    const handleScroll = (evt) => {
        evt.preventDefault();
        const scrollContainer = scrollContainerRef.current;
        scrollContainer.scrollLeft += evt.deltaY;
    };


    return (
        <div className='Event_container'>
            <div className='create_Event_Container' ref={scrollContainerRef} onWheel={handleScroll}>
                <div className='box create'>
                    <div className='plus'>
                        <BsFillPlusSquareFill />
                    </div>
                    <h3 className='ceate_text'>Create Event</h3>
                </div>

                <div className='box event_data'>
                    <div className='banner'>
                        <img src={banner} alt=''/>
                    </div>
                    <div className='profile_pic_circle_container'>
                        <img className='face' src={face} alt=''/>
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
                        <p><strong>EP: </strong>James Patrick</p>
                    </div>
                    <div className='date_time_container active'>
                        <p><strong>Event: </strong>Apprenticeship Training Program</p>
                    </div>
                    <div className='date_time_container active'>
                        <p><strong>Vehicle: </strong>1</p>
                        <p><strong>workers: </strong>1</p>
                    </div>
                    <div className='date_time_container divide'></div>
                    <div className='date_time_container divide'>
                        <p><strong>Location: </strong>Margao</p>
                        <p><strong>Venue: </strong>Rajesh hall</p>
                    </div>
                </div>
                <div className='box event_data'></div>
                <div className='box event_data'></div>
                <div className='box event_data'></div>
                <div className='box event_data'></div>
                <div className='box event_data'></div>
            </div>
            <div className='sort_container'></div>
            <div className='Event_list_container'></div>
        </div>
    )
}

export default Event
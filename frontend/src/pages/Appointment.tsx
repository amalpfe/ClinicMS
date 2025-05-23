import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import verifiedIcon from "../assets/verified_icon.svg";
import infoIcon from "../assets/info_icon.svg";
import { Doctor } from "../context/AppContext";
 import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Add this at the top if not already
import RelatedDoctors from "../components/RelatedDoctors";
//update
function Appointment() {
  const { docId } = useParams();
  const context = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState<Doctor | null>(null);
  const [docSlots, setDocSlots] = useState<
    { datetime: Date; time: string }[][]
  >([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const getAvailableSlots = async () => {
    const today = new Date();
    const newSlots: { datetime: Date; time: string }[][] = [];

    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const startTime = new Date(date);
      const endTime = new Date(date);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const now = new Date();
        startTime.setHours(now.getHours() > 10 ? now.getHours() + 1 : 10);
        startTime.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      const daySlots: { datetime: Date; time: string }[] = [];
      while (startTime < endTime) {
        daySlots.push({
          datetime: new Date(startTime),
          time: startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      newSlots.push(daySlots);
    }

    setDocSlots(newSlots);
  };

  useEffect(() => {
    if (context) {
      const found = context.doctors.find((doc) => doc._id === docId);
      setDocInfo(found || null);
    }
  }, [context, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    setSlotTime("");
  }, [slotIndex]);

  const handleBooking = () => {
    if (!slotTime) return;

    // Here you could send the selected datetime to a backend if needed

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  if (!context || !docInfo) return null;

  const { currencySymbol } = context;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-purple-600 w-full sm:max-w-72 rounded-lg"
            src={docInfo.Image}
            alt="doctor"
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img src={verifiedIcon} alt="verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={infoIcon} alt="info" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p>
            Appointment fee:
            <span className="text-gray-900">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>

        {/* Days Row */}
        <div className="flex gap-3 items-center w-full mt-4 overflow-x-scroll scrollbar-hide">
          {docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index
                  ? "bg-purple-600 text-white"
                  : "border border-gray-200"
              }`}
              key={index}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots Row */}
        <div className="flex items-center gap-3 w-full mt-4 overflow-x-scroll scrollbar-hide">
          {docSlots[slotIndex] &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          disabled={!slotTime}
          className={`${
            slotTime
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-white text-sm font-light px-14 py-3 rounded-full my-6 transition duration-200`}
        >
          Book an appointment
        </button>

        {/* Success Message */}
        {showSuccess && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="animate-fade-in-up text-green-800 bg-green-100 border border-green-300 rounded-lg px-6 py-4 shadow-lg text-center max-w-lg w-full mx-4">
      <p className="text-lg font-medium">
        Appointment confirmed for{" "}
        <strong>
          {docSlots[slotIndex][0].datetime.toDateString()} at {slotTime}
        </strong>
        .
      </p>
      <p className="text-sm mt-1 text-green-700">
        Thank you for booking with us. We look forward to seeing you!
      </p>
    </div>
    
  </div>
)}



{/* Below the booking button */}


<button
  onClick={() => navigate(`/review/${docInfo._id}`)}
  className="flex items-center gap-2 mt-6 px-5 py-2 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-200 shadow-sm"
>
  <FaStar />
  Leave a Review for Dr. {docInfo.name}
</button>


      </div>
    {/* Related Doctors Section */}
<RelatedDoctors docId={docInfo._id} speciality={docInfo.speciality} />

    </div>
  );
}

export default Appointment;





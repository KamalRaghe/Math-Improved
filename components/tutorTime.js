import { ref } from "firebase/database";
import { push } from "firebase/database";
import { rdb } from "@/firebase";
export default function TomorrowSchedule({day}) {
    const hours = Array.from({ length: 8 }, (_, i) => i + 10); // [10, 11, ..., 17]
  
    const handleClick = (hour) => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + day);
      tomorrow.setHours(hour, 0, 0, 0);
      console.log('Scheduled Time:', tomorrow.toString());
    };

    function set(){
      const usersRef = ref(rdb, `${tomorrow.toString()}`)
        const AddList = push(usersRef)
        set(AddList,{
           user: true,
        })
    }
  
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">
            {new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(new Date(Date.now() + 86400000*day))}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {hours.map((hour) => (
            <button
              key={hour}
              onClick={() => {handleClick(hour);set()}}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
            </button>
          ))}
        </div>
      </div>
    );
  }

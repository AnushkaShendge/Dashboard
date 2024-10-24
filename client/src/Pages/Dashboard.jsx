import SideBarComp from "./SideBarComp"
import { Link  } from "react-router-dom"
import { useState , useEffect } from "react";
import CallLogTable from "../Components/Table";
import CallPieChart from "../Components/CallPieChart";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x-axis
    LinearScale, // y-axis
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function Dashboard(){
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [rows, setRows] = useState([]); // State to hold the data
    const [totCall , setTotCall] = useState('0'); // State to hold the total call count
    const [callDuration , setCallDuration] = useState('0'); // State for call duration
    const [callLen , setCallLen] = useState('0'); // State for average call length

    // Fetch call overview data
    async function fetchData(){
        const res = await axios.get('http://localhost:4000/call-matrics/overview/');
        if(res.data){
            setTotCall(res.data.totalCallsMade);
            setCallDuration(res.data.totalCallDuration);
            setCallLen(res.data.averageCallLength);
        }
    }

    // Fetch call logs data from the backend using Axios
    useEffect(() => {
      axios.get('/api/calls/logs/') // Replace with your backend route
        .then(response => {
          // Ensure response data is an array, otherwise default to empty array
          setRows(Array.isArray(response.data) ? response.data : []);
        })
        .catch(error => {
          console.error('Error fetching call data:', error);
          setRows([]); // Set to empty array on error
        });
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Function to get call counts (incoming, outgoing, missed)
    function getCallCount(rows) {
        const callCount = {
          incoming: 0,
          outgoing: 0,
          missed: 0
        };

        // Ensure rows is an array before proceeding
        if (!Array.isArray(rows)) {
          return callCount; // Return default counts if rows is not an array
        }

        rows.forEach(row => {
          if (row.callType.toLowerCase() === 'incoming') {
            callCount.incoming++;
          } else if (row.callType.toLowerCase() === 'outgoing') {
            callCount.outgoing++;
          } else if (row.callType.toLowerCase() === 'missed') {
            callCount.missed++;
          }
        });

        return callCount;
    }

    // Mockup data for Call Duration chart
    const callDurationData = {
        labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
        datasets: [
            {
                label: 'Call Duration (minutes)',
                data: [10, 20, 15, 30, 50, 45, 60, 55], // Replace with real data if available
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4, // Curved line
            },
        ],
    };

    const callDurationOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    // Get call counts based on the rows
    const callCount = getCallCount(rows);
    
    return (
        <div className="bg-gradient-to-tr from-teal-100 to-pink-200 p-6">
            <div className="flex rounded-2xl bg-white">
                <div className={`${sidebarOpen ? "w-64" : "w-20"}  transition-all duration-300}`}>
                    <SideBarComp sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                </div>
                <div className="flex-grow w-full mt-8 p-5 ">
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4">
                        <div className="bg-gradient-to-br from-[#7CF7FF] to-[#4B73FF] h-52 p-4 rounded-3xl flex items-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                            <div>
                                <h4 className="text-2xl font-bold">Total Calls Made : {totCall}</h4>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#FFEB3A] to-[#4DEF8E] h-52 p-4 rounded-3xl flex items-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                            <div>
                                <h4 className="text-2xl font-bold">Total Call Duration : {callDuration}</h4>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#8A88FB] to-[#D079EE] h-52 p-4 rounded-3xl flex items-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                            <div>
                                <h4 className="text-2xl font-bold">Average Call Length : {callLen}</h4>
                            </div>
                        </div>
                    </div>

                    {/* Render Call Log Table */}
                    <CallLogTable rows={rows} />

                    {/* Render Charts */}
                    <div className="grid grid-cols-2 gap-5">
                        <div className="mt-8 p-5 shadow-xl rounded-xl">
                            <h2 className="text-2xl font-semibold mb-4 p-4">Incoming vs Outgoing</h2>
                            <CallPieChart
                                incomingCalls={callCount.incoming}
                                outgoingCalls={callCount.outgoing}
                                missedCalls={callCount.missed}
                            />
                        </div>
                        <div className="mt-8 p-5 shadow-xl rounded-xl">
                            <h2 className="text-2xl font-semibold mb-4">Call Duration Over the Day</h2>
                            <Line data={callDurationData} options={callDurationOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

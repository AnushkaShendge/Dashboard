import SideBarComp from "./SideBarComp"
import { Link  } from "react-router-dom"
import { useState } from "react";
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);


function Dashboard(){
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Sample data for call logs
    const rows = [
        { employee: 'John Doe', callType: 'Outgoing', duration: '5:23', timestamp: '22 March 2024, 3:45 PM', sentimentScore: 'Positive'},
        { employee: 'Jane Smith', callType: 'Incoming', duration: '8:10', timestamp: '21 March 2024, 1:15 PM', sentimentScore: 'Neutral'},
        { employee: 'Chris Adams', callType: 'Missed', duration: '0:00', timestamp: '20 March 2024, 4:10 PM', sentimentScore: 'Negative'},
        { employee: 'Diana Prince', callType: 'Outgoing', duration: '2:45', timestamp: '19 March 2024, 11:10 AM', sentimentScore: 'Positive'},
    ];

    // Function to get call counts
    function getCallCount(rows) {
        const callCount = {
          incoming: 0,
          outgoing: 0,
          missed: 0
        };
      
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
        <div className="bg-gradient-to-tr from-pink-100 to-teal-100 p-6">
            <div className="flex rounded-2xl bg-white">
                <div className={`${sidebarOpen ? "w-64" : "w-20"}  transition-all duration-300`}>
                    <SideBarComp sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                </div>
                <div className="flex-grow w-full mt-8 p-5 ">
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4">
                        <div className="bg-gradient-to-br justify-center from-[#9ef1f9] to-[#6e8bf5] h-52 p-4 rounded-3xl flex items-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                            <div>
                                <h4 className="text-2xl font-bold">Total Calls Made</h4>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br  justify-center from-[#fff7ab] to-[#81feb3] h-52 p-4 rounded-3xl flex items-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                            <div>
                                <h4 className="text-2xl font-bold">Total Call Duration</h4>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br justify-center from-[#7f7dfa] to-[#da7afa] h-52 p-4 rounded-3xl flex items-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400">
                            <div>
                                <h4 className="text-2xl font-bold">Average Call Length</h4>
                            </div>
                        </div>
                    </div>
                    <CallLogTable/>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="mt-8 p-5 shadow-xl rounded-xl">
                            <h2 className="text-2xl font-semibold mb-4 p-4">Incomming vs Outgoing</h2>
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

export default Dashboard;

import { useState, useEffect } from "react";
import axios from "axios";

function Employee({ id }) {
  const [callHist, setCallHist] = useState([]);
  const [employee, setEmployee] = useState({});

  // Fetch call details and employee info
  async function fetchCallDetails(id) {
    const res = await axios.get(`http://localhost:4000/employee/${id}`);
    if (res.data) {
      setEmployee(res.data.employee);
      setCallHist(res.data.employee.callHistory);
    }
  }

  useEffect(() => {
    fetchCallDetails(id);
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-blue-100 shadow-lg rounded-lg">
      {/* Employee Info */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{employee.name}</h2>
        <p className="text-gray-600">{employee.email}</p>
      </div>

      {/* Call History Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Call ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Call Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {callHist.length > 0 ? (
              callHist.map((call) => (
                <tr key={call.callId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {call.callId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {call.callType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {call.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(call.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No call history available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;

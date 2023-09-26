import React from 'react'

function AdminAttendanceSheet() {

  // Sample data (you can replace this with your actual data)
  const dates = ['2023-09-01', '2023-09-02', '2023-09-03', '2023-09-04'];
  const employees = ['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4'];
  
  // Initialize an empty attendance matrix
  const attendance = [];

  // Generate the attendance matrix with sample data (you can replace this with your actual data)
  employees.forEach((employee) => {
    const row = [];
    dates.forEach((date) => {
      // Here, you can fetch actual attendance data for each employee and date
      // For this example, let's assume 'P' for Present and 'A' for Absent
      const status = Math.random() < 0.8 ? 'P' : 'A';
      row.push(status);
    });
    attendance.push(row);
  });

  return (
    <div className="overflow-x-auto mx-16">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            
            <th className="px-4 py-2">Employees</th>
            {dates.map((date) => (
              <th key={date} className="px-4 py-2 text-center">{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee}>
              <td className="px-4 py-2">{employee}</td>
              {attendance[index].map((status, i) => (
                <td
                  key={`${employee}-${dates[i]}`}
                  className={`px-4 py-2 text-center ${
                    status === 'P' ? 'bg-green-300' : 'bg-red-300'
                  }`}
                >
                  {status}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  )
}

export default AdminAttendanceSheet
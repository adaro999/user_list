import React from 'react';
import jsPDF from 'jspdf';

const UserListPDF = ({ users }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(12);
    doc.text('User List', 20, 10);
    
    users.forEach((user) => {
      doc.text(`Name: ${user.name}`, 20, y);
      doc.text(`Email: ${user.email}`, 20, y + 10);
      y += 20;
    });

    doc.save('userlist.pdf');
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default UserListPDF;
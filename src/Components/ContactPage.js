import React from 'react';
import '../CSS/ContactPage.css';

const contacts = [
  { name: 'Chen Bochao', email: 'john@example.com', img: 'cbc.jpg' },
  { name: 'Fan Yazhuoting', email: 'jane@example.com', img: 'fyzt.jpg' },
  { name: 'Zhang Yuxuan', email: 'bob@example.com', img: 'zyx.jpg' },
  { name: 'Chen Yuhang', email: 'alice@example.com', img: 'cyh.jpg' },
  { name: 'Lu Shuwen', email: 'charlie@example.com', img: 'lsw.jpg' },
  { name: 'Liang Chang', email: 'emily@example.com', img: 'lc.jpg' },
];

const ContactPage = () => {
  return (
    <div className="contact-page">
      {contacts.map((contact, index) => (
        <div className="contact-card" key={index}>
          <div className="contact-image">
            <img src={`/member/${contact.img}`} alt={contact.name} />
          </div>
          <div className="contact-info">
            <p className="contact-name">{contact.name}</p>
            <p className="contact-email">{contact.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactPage;
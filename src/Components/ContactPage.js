import React from 'react';
import '../CSS/ContactPage.css';

const contacts = [
  { name: 'Chen Bochao', email: 'e1133132@u.nus.edu', img: 'cbc.jpg' },
  { name: 'Fan Yazhuoting', email: 'e1280877@u.nus.edu', img: 'fyzt.jpg' },
  { name: 'Zhang Yuxuan', email: 'e1216649@u.nus.edu', img: 'zyx.jpg' },
  { name: 'Chen Yuhang', email: 'e1133130@u.nus.edu', img: 'cyh.jpg' },
  { name: 'Lu Shuwen', email: 'e1241986@u.nus.edu', img: 'lsw.jpg' },
  { name: 'Liang Chang', email: 'e1133133@u.nus.edu', img: 'lc.jpg' },
];

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className='contact-title'>
      <h1>Development Team</h1>
      </div>
      {contacts.map((contact, index) => (
        <div className="contact-card" key={index}>
          <div className="contact-image">
            <img src={`/member/${contact.img}`} alt={contact.name} />
          </div>
          <div className="contact-info">
            <p className="contact-name">{contact.name}</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>          
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactPage;
### SmartBrain - Face Detection App 👁️✨

> **Personal Description:**  
> _SmartBrain is a milestone project that brings together all the skills I acquired in my full-stack development journey. Through this app, I aimed to create a practical and interactive face detection solution, combining React for the front end, Node.js and Express.js for the back end (see [SmartBrain API](https://github.com/Hokkyokukou/smart-brain-api)), and PostgreSQL as the database. This project showcases a hands-on approach to programming with machine learning applications and serves as a potential foundation for implementing future features in AI and computer vision._

---

### Key Features 🌟

- **Face Detection**: Using the Clarifai API, SmartBrain detects faces in uploaded images, providing an interactive and engaging user experience.
- **React Front-End**: The front end is built with React, creating a responsive and dynamic interface focused on simplicity and usability.
- **Node.js and Express Back-End**: This app uses a Node.js and Express server architecture to handle API logic efficiently (see [SmartBrain API](https://github.com/Hokkyokukou/smart-brain-api)).
- **PostgreSQL Database**: User data and interactions are stored in a PostgreSQL database, ensuring data integrity and persistence.

### Project Objectives 🏆
SmartBrain is designed as a showcase of practical full-stack skills. Specifically, this app demonstrates:
- _Basic knowledge of machine learning and external API integration for visual detection._
- _The ability to build a complete system, from front end to back end and database._
- _Experience in deploying applications on cloud platforms._

### Setup & Run 💻

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hokkyokukou/smart-brain-api.git
   cd smart-brain-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root folder with the following variables:
   ```plaintext
   CLARIFAI_API_KEY=your_key
   APP_ID=face-recognition-brain
   DATABASE_DB=your_database_db
   DATABASE_HOST=your_database_host
   DATABASE_PW=your_database_pw
   DATABASE_URL=your_database_url
   DATABASE_USER=your_database_user
   USER_ID=your_user_id
   ```

4. **Start the server:**
   ```bash
   node server.js
   ```

---

> **Note**: This project works in conjunction with the back end application. To see how the two components interact, please visit the [SmartBrain API Repository](https://github.com/Hokkyokukou/smart-brain-api).

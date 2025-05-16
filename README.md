# 🖥️ IUM Analyst Programmer Challenge – Frontend

Welcome to the **Frontend Repository** for the Analyst Programmer Technical Challenge. This is where you will build the user interface for the **Student Registration Dashboard**.

## 👤 Candidate Details

Please provide your personal details **exactly as they appear on your CV**:

- **Full Name**: Collin Nehemia
- **Email Address**: collinnadilu@gmail.com 
- **Phone Number**: +264 81 5713080 
- **Other Information (Optional)**: https://www.linkedin.com/in/collin-nehemia-05643520a/

⚠️ **Submissions without valid personal details will be disqualified.**

---

## 🔀 Branching Instructions

Create a **new branch** from the `main` branch using the format below: challenge-CANDIDATE-FULL-NAME
> Example:  
> `challenge-Jane-Doe`

Commit your work regularly, and submit a **pull request (PR)** from your branch to `main` once complete.

---

## 🎯 Dashboard Requirements

Using **React**, build a responsive frontend that displays:

- ✅ Total Registrations (Widget)
- ✅ Bar Chart: Registrations by Programme
- ✅ Line/Bar Chart: Registrations by Academic Year
- ✅ Table: Top 10 Secondary Schools
- ✅ Optional: Filters (e.g., academic year, programme)

You may use any of the following libraries or tools:
- Axios / Fetch API
- Recharts / Chart.js
- Tailwind / Bootstrap / CSS Modules

---

## 📄 Submission Checklist

- [ ] Dashboard UI complete and functional
- [ ] React components organized cleanly
- [ ] API integration tested with working backend
- [ ] `README.md` fully filled with your details
- [ ] Branch and PR named correctly

---

## 🔒 Rules Reminder

- Bring and use your own laptop and internet connection
- Work must be completed independently, on-site
- No external help
- You may use AI Assistants such as ChatGPT

---

**Best of luck!**  
*Centre for Digital Initiatives – IUM*


## 🚀 How to Run the Frontend

### Prerequisites
- Node.js and npm installed

### Setup and Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Access the application**:
   The dashboard will be available at `http://localhost:3000`

### Features

- **Dashboard Overview**: View key metrics and registration data
- **Academic Filtering**: Filter by academic year, including "Not Specified" option
- **Programme Filtering**: Filter by specific academic programmes
- **Data Visualization**: Interactive charts showing registration distribution
- **Responsive Design**: Works on desktop and mobile devices
- **Student Records**: Detailed view of student registration data with search and filter capabilities

### Backend Connection

The frontend connects to the backend API at `http://localhost:8000`. Make sure the backend server is running before using the dashboard.

---

## 📷 Screenshot Gallery

The dashboard includes several key views and features as shown in these screenshots. The screenshots are available in the `src/assets` folder:

1. **Dashboard Home**: 
   - Key performance indicators showing total students, new registrations, and total registrations
   - Filter controls for academic year and programme selection
   - "Not Specified Year" filter showing 984 students with no academic year assigned

2. **Registration Analytics**:
   - Horizontal bar chart displaying registrations by programme 
   - Color-coded bars for better visual differentiation
   - Sort and filtering controls for data exploration
   - Top programmes include DIPLOMA IN WATER RESOURCES MANAGEMENT and BACHELOR IN HUMAN RESOURCE MANAGEMENT

3. **Top Feeder Schools**:
   - Tabular display of secondary schools with highest student counts
   - Ranked listing showing Holy Cross Convent School as the top feeder school with 182 students
   - Academic year filter applied showing schools contributing students with no specified academic year

4. **Student Records Page**:
   - Comprehensive searchable student database
   - Filterable by academic year and programme
   - Displays student ID, name, email, programme, school, year and status
   - Shows students with specified years (2023) and those with "Not Specified" year

5. **Demographic Data**:
   - Gender distribution pie chart showing gender breakdown of students
   - Equal distribution between Male (45%) and Female (45%) with smaller percentages for other gender identities
   - Color-coded segments for easy identification

6. **Dashboard Overview**:
   - Complete dashboard with navigation and all components visible

### 🖼️ Image Files

The following screenshot files are available in the `src/assets` directory:

- Dashboard Home: `Screenshot 2025-05-16 at 12.29.57 PM.png`
- Registration Analytics: `Screenshot 2025-05-16 at 12.30.06 PM.png`
- Top Feeder Schools: `Screenshot 2025-05-16 at 12.30.16 PM.png`
- Student Records: `Screenshot 2025-05-16 at 12.30.20 PM.png`
- Demographic Data: `Screenshot 2025-05-16 at 12.30.26 PM.png`
- Dashboard Overview: `Screenshot 2025-05-16 at 12.36.39 PM.png`

---

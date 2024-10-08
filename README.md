
## Vibe & Talk

## Table of Contents

1. About the Project
*Background
*Libraries Used
*Known Issues*

2. Getting Started
*Prerequisites
*Installation
*Running the Application

3. Contact

## About the Project

### Background

Vibe & Talk is a dynamic chat forum designed for seamless community interactions. It emphasizes front-end development with React and incorporates a variety of modern technologies to ensure a smooth and engaging user experience. The project includes features such as user authentication, thread creation, comment management, and moderator functionalities. This forum supports a global state to manage real-time updates and user roles effectively.

The key components of the forum include:

Thread creation and comment systems.
Q&A thread types, where users can mark a comment as an accepted answer.
User roles such as administrators, thread creators, and moderators with specific privileges.
Thread locking and unlocking capabilities for administrators.
Clean and responsive UI, ensuring the application works seamlessly across different devices.

### Libraries Used

- [React]: A powerful JavaScript library for building interactive user interfaces.
- [Next.js]: A framework for building React applications with server-side rendering and static site generation.
- [Clerk]: A complete user management system to handle authentication and user profiles.
- [TypeScript]: A statically-typed superset of JavaScript, providing type safety and enhanced development tools.
- [Tailwind CSS]: A utility-first CSS framework used for designing modern, responsive layouts.
- [Lucide-React]: A React component library for icons.
- [React Icons]: A library of popular icons for use in React applications

### Bugs

- Thread Lock/Unlock: There is a minor delay when locking/unlocking threads which can cause a mismatch between the UI and actual thread status.

## Getting Started

Follow these steps to get the project up and running on your local machine:

Ensure you have the following installed:

- Node.js (v14.x or later)
- npm or yarn (latest version)


1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ALbert-Sezkir/Group-assignment-Chat-Forum-.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd internet-forum

    Setup Environment: 
1. Create a .env.local file in the root directory of your project if it does not already exist.
Add the Clerk API keys from your Clerk dashboard to this file:

NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api-key>
CLERK_API_KEY=<your-clerk-api-key>

2. - Replace <your-clerk-frontend-api-key> with the frontend API key from Clerk.
Replace <your-clerk-api-key> with the backend Clerk API key.


   ```
3. **Run the development server:**
   ```bash
   npm run dev

4. Access the Application: Once the server is running, you can access the chat forum at:
    http://localhost:3000

## Contact 

For any questions or feedback regarding the project, feel free to reach out:

Your Name: albertsezkir@gmail.com
GitHub: https://github.com/ALbert-Sezkir


  
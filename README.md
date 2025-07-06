# Back-Test Project

## Project Summary

This project is a web application built with React and Vite, styled using Tailwind CSS. It provides a platform for managing and viewing data related to events, users, schools, projects, and more. The application features multiple pages for different user roles, including learners, conveners, and administrators. Data population scripts are included for initializing or updating the application's dataset.

## Server URLs

- **Frontend (dev):** http://localhost:5173
- **Backend (dev):** http://localhost:3001

## API Endpoints

| Endpoint                                  | Method | Params/Body Example                                      | Description                     | Response Example           |
| ----------------------------------------- | ------ | -------------------------------------------------------- | ------------------------------- | -------------------------- |
| `/api/user/login`                         | POST   | `{ email, password }`                                    | User login                      | `{ user, token }` or error |
| `/api/user/register/learner`              | POST   | `{ ...learnerData, photo }`                              | Register learner                | `{ user }` or error        |
| `/api/user/register/teacher`              | POST   | `{ ...teacherData, photo }`                              | Register teacher                | `{ user }` or error        |
| `/api/user/register/judge`                | POST   | `{ ...judgeData, photo, document}`                       | Register judge                  | `{ user }` or error        |
| `/api/upload-photo`                       | POST   | `{ base64 }` or FormData                                 | Upload user photo               | `{ url }`                  |
| `/api/upload-document`                    | POST   | `{ base64 }` or FormData                                 | Upload document                 | `{ url }`                  |
| `/api/schools/names`                      | GET    |                                                          | Get all school names            | `[ ...names ]`             |
| `/api/schools`                            | GET    |                                                          | Get all schools                 | `[ ...schools ]`           |
| `/api/schools/:id`                        | GET    | `schoolId`                                               | Get school by ID                | `{ ...school }`            |
| `/api/schools`                            | POST   | `{ ...schoolData }`                                      | Create school                   | `{ ...school }`            |
| `/api/schools/:id`                        | PUT    | `{ ...schoolData }`                                      | Update school                   | `{ ...school }`            |
| `/api/schools/:id`                        | DELETE | `schoolId`                                               | Delete school                   | `{ success: true }`        |
| `/api/projects`                           | GET    |                                                          | Get all projects                | `[ ...projects ]`          |
| `/api/projects/:id`                       | GET    | `projectId`                                              | Get project by ID               | `{ ...project }`           |
| `/api/projects`                           | POST   | `{ ...projectData, supportingdocument, timeregistered }` | Create project                  | `{ ...project }`           |
| `/api/projects/:id`                       | PUT    | `{ ...projectData }`                                     | Update project                  | `{ ...project }`           |
| `/api/projects/:id`                       | DELETE | `projectId`                                              | Delete project                  | `{ success: true }`        |
| `/api/projects/allocate/:eventId`         | POST   |                                                          | Allocate projects for event     | `{ ... }`                  |
| `/api/projects/allocated/:judgeId`        | GET    |                                                          | Get projects allocated to judge | `[ ...projects ]`          |
| `/api/learners`                           | GET    |                                                          | Get all learners                | `[ ...learners ]`          |
| `/api/learners/:id`                       | GET    | `learnerId`                                              | Get learner by ID               | `{ ...learner }`           |
| `/api/learners`                           | POST   | `{ ...learnerData }`                                     | Create learner                  | `{ ...learner }`           |
| `/api/learners/:id`                       | PUT    | `{ ...learnerData }`                                     | Update learner                  | `{ ...learner }`           |
| `/api/learners/:id`                       | DELETE | `learnerId`                                              | Delete learner                  | `{ success: true }`        |
| `/api/events`                             | GET    |                                                          | Get all events                  | `[ ...events ]`            |
| `/api/events/:id`                         | GET    | `eventId`                                                | Get event by ID                 | `{ ...event }`             |
| `/api/events`                             | POST   | `{ ...eventData }`                                       | Create event                    | `{ ...event }`             |
| `/api/events/:id`                         | PUT    | `{ ...eventData }`                                       | Update event                    | `{ ...event }`             |
| `/api/events/:id`                         | DELETE | `eventId`                                                | Delete event                    | `{ success: true }`        |
| `/api/events/attend`                      | POST   | `{ ...attendeeData }`                                    | Attend event                    | `{ ... }`                  |
| `/api/events/:id/attendees`               | GET    | `eventId`                                                | Get event attendees             | `[ ...attendees ]`         |
| `/api/conveners/event/:eventId/conveners` | GET    | `eventId`                                                | Get conveners for event         | `[ ...conveners ]`         |
| `/api/conveners/appoint/:eventId`         | POST   |                                                          | Appoint convener for event      | `{ ... }`                  |
| `/api/conveners/updateConvener`           | POST   | `{ ...updateData }`                                      | Update convener                 | `{ ... }`                  |

> **Note:** Replace `{ ...data }` with the actual fields required by your backend. All endpoints return either the requested data or an error object.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. (Optional) Populate data:
   ```sh
   node populate_data.mjs
   # or
   node populate_data_pretty.mjs
   ```

## Project Structure

- `src/` - Main source code (components, pages, layouts)
- `public/` - Static assets
- `populate_data.mjs` - Script to populate the database
- `README.md` - Project documentation

---

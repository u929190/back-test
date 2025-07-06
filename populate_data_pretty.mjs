import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";
const categories = [
  "agricultural sciences",
  "animal sciences",
  "biomedical and medical sciences",
  "chemistry and biochemistry",
  "computer sciences and software development",
  "earth sciences",
  "energy",
  "engineering",
  "environmental studies",
  "mathematics",
  "plant sciences",
  "physics, astronomy & space sciences",
  "social sciences",
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function createJudges() {
  console.log("Creating 50 judges...");
  for (let i = 0; i < 50; i++) {
    // Ensure two unique categories for each judge
    let firstCategory = getRandomItem(categories);
    let secondCategory;
    do {
      secondCategory = getRandomItem(categories);
    } while (secondCategory === firstCategory);
    const judgeData = {
      title: "Dr.",
      firstName: `JudgeF${i}`,
      lastName: `JudgeL${i}`,
      email: `judge${i}@example.com`,
      password: "password123",
      contact: `1234567${100 + i}`,
      altContact: `0987654${100 + i}`,
      dob: "1980-01-01",
      gender: "Male",
      race: "Other",
      institution: `University ${i}`,
      qualification: "PhD",
      province: "Gauteng",
      region: "Johannesburg",
      years: `${(i % 10) + 1}`,
      expoForums: "Regional",
      judgeExperience: `${(i % 5) + 1}`,
      categories: [firstCategory, secondCategory],
      Role: "judge",
      photo: "",
      document: "",
    };
    try {
      const res = await axios.post(
        `${API_BASE_URL}/user/register/judge`,
        judgeData
      );
      // Get userId from response (assuming same structure as learner registration)
      const userId =
        res.data.result && res.data.result.userId
          ? res.data.result.userId
          : res.data.userId || res.data.id;
      // Get eventId (assume first event exists, or fetch it)
      let eventId;
      try {
        const events = await axios.get(`${API_BASE_URL}/events`);
        if (events.data.length > 0) {
          eventId = events.data[0].eventid;
        } else {
          throw new Error("No event found for judge attendance");
        }
      } catch (e) {
        throw new Error("Failed to fetch event for judge attendance");
      }
      // Register judge as attending the event
      await axios.post(`${API_BASE_URL}/events/attend`, { eventId, userId });
      process.stdout.write(`\rJudge ${i + 1}/50 created and attending event.`);
    } catch (error) {
      console.error(
        `\nError creating judge ${i + 1}:`,
        error.response ? error.response.data : error.message
      );
      throw new Error("Stopping script due to error.");
    }
  }
  console.log("\nFinished creating judges.");
}

async function createLearnersAndProjects() {
  console.log("Creating 100 learners and 100 projects...");
  // 1. Get or create a school
  let schoolId;
  try {
    let schools = await axios.get(`${API_BASE_URL}/schools`);
    if (schools.data.length > 0) {
      schoolId = schools.data[0].schoolid;
      console.log(`\nUsing existing school with ID: ${schoolId}`);
    } else {
      console.log("\nNo schools found. Creating a new one...");
      const newSchool = await axios.post(`${API_BASE_URL}/schools`, {
        schoolname: "Test High School",
        region: "Test Region",
        district: "Test District",
        province: "Gauteng",
      });
      schoolId = newSchool.data.schoolid;
      console.log(`\nCreated new school with ID: ${schoolId}`);
    }
  } catch (e) {
    console.error(
      "\nError getting/creating school:",
      e.response ? e.response.data : e.message
    );
    throw new Error("Stopping script due to error.");
  }
  // 2. Get or create an event
  let eventId;
  try {
    let events = await axios.get(`${API_BASE_URL}/events`);
    if (events.data.length > 0) {
      eventId = events.data[0].eventid;
      console.log(`\nUsing existing event with ID: ${eventId}`);
    } else {
      console.log("\nNo events found. Creating a new one...");
      const newEvent = await axios.post(`${API_BASE_URL}/events`, {
        type: "Regional Science Fair",
        name: "Gauteng Science Fair 2025",
        startdate: "2025-08-20",
        enddate: "2025-08-22",
        regopendate: "2025-06-01",
        regclosedate: "2025-07-31",
        starttime: "08:00:00",
        endtime: "17:00:00",
        region: "Gauteng",
        venue: "Expo Center",
      });
      eventId = newEvent.data.eventid;
      console.log(`\nCreated new event with ID: ${eventId}`);
    }
  } catch (e) {
    console.error(
      "\nError getting/creating event:",
      e.response ? e.response.data : e.message
    );
    throw new Error("Stopping script due to error.");
  }
  for (let i = 0; i < 100; i++) {
    try {
      // 3. Create User for Learner
      const learnerUserData = {
        firstName: `LearnerF${i}`,
        lastName: `LearnerL${i}`,
        email: `learner${i}@example.com`,
        password: "password123",
        contact: `2345678${100 + i}`,
        altContact: `9876543${100 + i}`,
        dob: "2008-01-01",
        gender: "Female",
        race: "Other",
        disabilityType: "None",
        province: "Gauteng",
        region: "Johannesburg",
        schoolName: "Test High School",
        grade: `${(i % 5) + 8}`,
        disabilityDescription: "",
        Role: "learner",
        photo: "",
      };
      const userRes = await axios.post(
        `${API_BASE_URL}/user/register/learner`,
        learnerUserData
      );
      const userId = userRes.data.result.userId;
      // No need to create a separate learner record; use userId directly for project
      const projectData = {
        schoolid: schoolId,
        learnerid: userId,
        projectname: `Project Title ${i}`,
        description: `A fascinating project about topic ${i}.`,
        category: getRandomItem(categories),
        status: "Registered",
        badge: "None",
        ethicalstatus: "Pending",
        eventid: eventId,
        supportingdocument: "",
      };
      await axios.post(`${API_BASE_URL}/projects`, projectData);
      process.stdout.write(`\rLearner and Project ${i + 1}/100 created.`);
    } catch (error) {
      console.error(
        `\nError creating learner/project ${i + 1}:`,
        error.response ? error.response.data : error.message
      );
      throw new Error("Stopping script due to error.");
    }
  }
  console.log("\nFinished creating learners and projects.");
}

async function main() {
  try {
    await createJudges();
    await createLearnersAndProjects();
    console.log("\nData population script finished successfully!");
  } catch (e) {
    console.error("\nScript stopped due to an error.");
  }
}

main();

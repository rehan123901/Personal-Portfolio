import './style.css'

type ResumeApiData = {
  name: string
  role: string
  email: string
  contact: string
  github: string
  linkedin: string
  leetcode: string
}

const fallbackData: ResumeApiData = {
  name: 'SYED REHAN AHMED',
  role: 'MERN Stack Developer',
  email: 'srehanahmed59@gmail.com',
  contact: '+916309723296',
  github: 'https://github.com/rehan123901',
  linkedin: 'https://www.linkedin.com/in/rehanahmed-syed-17ba73378',
  leetcode: 'https://leetcode.com/problemset/'
}

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

function renderPage(data: ResumeApiData) {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<main class="resume-page">
  <section class="hero section reveal">
    <p class="tag">${data.role}</p>
    <h1>${data.name}</h1>
    <p class="summary">
      Results-oriented MERN Stack Developer and aspiring AI Engineer with hands-on experience building scalable, responsive, and user-focused web applications.
    </p>
    <div class="contact-grid">
      <a href="mailto:${data.email}">${data.email}</a>
      <a href="tel:${data.contact}">${data.contact}</a>
      <a href="${data.github}" target="_blank" rel="noreferrer">GitHub</a>
      <a href="${data.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
      <a href="${data.leetcode}" target="_blank" rel="noreferrer">LeetCode</a>
    </div>
  </section>

  <section class="section reveal">
    <h2>Professional Summary</h2>
    <article class="card reveal from-left">
      <p>
        I am a skilled full-stack developer with practical expertise in MongoDB, Express.js, React.js, and Node.js, along with strong foundations in Java and Python.
      </p>
      <p>
        My work combines clean frontend experiences, efficient backend APIs, and strong problem-solving to build production-style applications that are reliable and easy to use.
      </p>
      <p>
        Alongside web development, I focus on AI integration to create intelligent user experiences, and I have strengthened teamwork and execution through internship and hackathon experience.
      </p>
    </article>
  </section>

  <section class="section reveal">
    <h2>Work Experience</h2>
    <article class="card reveal from-right">
      <h3>Full Stack Web Developer Intern - Future Interns</h3>
      <p>
        Worked on full-stack web applications with modern JavaScript tooling and practical team-based development workflows.
      </p>
    </article>
  </section>

  <section class="section reveal">
    <h2>Projects</h2>
    <div class="cards">
      <article class="card reveal from-left">
        <h3>AI Chatbot</h3>
        <p>
          Built an AI-powered chatbot using the MERN stack with real-time conversational response flow and a responsive chat interface.
        </p>
        <ul class="detail-list">
          <li>Designed full-stack architecture and API flow for chat request/response handling.</li>
          <li>Integrated AI capability to return context-aware responses to user prompts.</li>
          <li>Focused on smooth user interaction, performance, and modern UI behavior.</li>
        </ul>
      </article>
      <article class="card reveal from-right">
        <h3>Currency Converter</h3>
        <p>
          Developed a MERN-based currency converter that fetches and displays real-time exchange values across multiple currencies.
        </p>
        <ul class="detail-list">
          <li>Implemented API-driven exchange rate fetching and conversion logic.</li>
          <li>Built responsive UI with simple input flow and clear conversion output.</li>
          <li>Optimized state handling for accurate, fast, and user-friendly results.</li>
        </ul>
        <a href="https://monumental-sprinkles-3533bb.netlify.app/" target="_blank" rel="noreferrer">Live Demo</a>
      </article>
      <article class="card reveal from-left">
        <h3>Train Booking Website</h3>
        <p>
          Created a train booking platform that simulates real-world reservation flow from route search to seat selection and booking actions.
        </p>
        <ul class="detail-list">
          <li>Developed multi-step booking interactions for routes, timings, and seat options.</li>
          <li>Added practical user-flow features inspired by real ticketing systems.</li>
          <li>Structured the platform for clarity, convenience, and end-to-end booking usability.</li>
        </ul>
        <a href="https://friendly-sherbet-42c3a4.netlify.app/" target="_blank" rel="noreferrer">Live Demo</a>
      </article>
    </div>
  </section>

  <section class="section reveal">
    <h2>Skills</h2>
    <ul class="skills-list">
      <li>MongoDB</li>
      <li>Express.js</li>
      <li>React.js</li>
      <li>Node.js</li>
      <li>JavaScript</li>
      <li>Java</li>
      <li>Python</li>
      <li>Blockchain Technology</li>
    </ul>
  </section>

  <section class="section reveal">
    <h2>Education</h2>
    <div class="cards">
      <article class="card reveal from-right">
        <h3>Computer Science and Engineering</h3>
        <p>Matrusri Engineering College</p>
      </article>
      <article class="card reveal from-left">
        <h3>XII (Intermediate)</h3>
        <p>SR Educenter</p>
        <p>95% - 2021</p>
      </article>
      <article class="card reveal from-right">
        <h3>X</h3>
        <p>Tejaswi High School</p>
        <p>10 CGPA - 2019</p>
      </article>
    </div>
  </section>

  <section class="section reveal">
    <h2>Achievements</h2>
    <article class="card reveal from-left">
      <p>
        Participated in national-level hackathons, demonstrating strong problem-solving and teamwork under tight deadlines.
      </p>
    </article>
  </section>
</main>
`
}

function setupScrollAnimations() {
  const revealElements = document.querySelectorAll<HTMLElement>('.reveal')
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.18 }
  )

  revealElements.forEach((element) => observer.observe(element))
}

async function init() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/resume`)
    if (!response.ok) throw new Error('Failed to fetch resume data')
    const data = (await response.json()) as ResumeApiData
    renderPage(data)
  } catch {
    renderPage(fallbackData)
  }

  setupScrollAnimations()
}

init()

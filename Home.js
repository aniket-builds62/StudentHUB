document.addEventListener("DOMContentLoaded", () => {
  const projectsData = [
    {
      id: 1,
      title: "Arduino Fire Alarm",
      desc: "A simple fire detection and alert system using Arduino.",
      category: "Arduino & IoT",
      tech: "Arduino, Electronics",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "ESP8266 Weather Station",
      desc: "A weather monitoring project using sensors and ESP8266.",
      category: "Arduino & IoT",
      tech: "IoT, ESP8266",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Student Expense Tracker",
      desc: "A web application for tracking daily student expenses.",
      category: "Web Development",
      tech: "HTML, CSS, JavaScript",
      difficulty: "Intermediate"
    },
    {
      id: 4,
      title: "College Event Portal",
      desc: "A platform for discovering and registering for college events.",
      category: "Web Development",
      tech: "HTML, CSS, JavaScript",
      difficulty: "Intermediate"
    },
    {
      id: 5,
      title: "Smart Plant Monitor",
      desc: "Arduino-based plant monitoring system.",
      category: "Arduino & IoT",
      tech: "Arduino, Sensors",
      difficulty: "Beginner"
    },
    {
      id: 6,
      title: "Quiz Application",
      desc: "A beginner-friendly JavaScript quiz application.",
      category: "Web Development",
      tech: "JavaScript",
      difficulty: "Beginner"
    }
  ];

  const searchInput = document.getElementById("searchInput");
  const catPills = document.querySelectorAll(".cat-pill");
  const featuredGrid = document.getElementById("featuredProjectsGrid");
  const branchPicker = document.getElementById("branchPicker");
  const commitTimeline = document.getElementById("commitTimeline");
  const fileDirectory = document.getElementById("fileDirectory");
  const publishBtn = document.getElementById("publishBtn");
  const aiInput = document.getElementById("aiMentorInput");
  const aiSendBtn = document.getElementById("aiMentorSendBtn");
  const mentorCards = document.querySelectorAll(".mentor-card");

  let activeCategory = "all";

  function renderProjects(query = "") {
    if (!featuredGrid) return;
    featuredGrid.innerHTML = "";

    const filtered = projectsData.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const matchSearch =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.tech.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      featuredGrid.innerHTML = `<p style="color: var(--text-muted); padding: 12px;">No projects found matching your search.</p>`;
      return;
    }

    filtered.forEach((p) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="meta-row">
          <span class="tag">${p.tech}</span>
          <span class="difficulty">${p.difficulty}</span>
        </div>
        <a href="project-details.html?id=${p.id}" class="btn-card">View Project</a>
      `;
      featuredGrid.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `explore.html?search=${encodeURIComponent(query)}`;
        } else {
          renderProjects();
        }
      }
    });

    searchInput.addEventListener("input", (e) => {
      renderProjects(e.target.value.trim());
    });
  }

  catPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      catPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-cat");
      renderProjects(searchInput ? searchInput.value.trim() : "");
    });
  });

  if (branchPicker) {
    branchPicker.addEventListener("change", (e) => {
      const branch = e.target.value;
      if (branch === "dev") {
        commitTimeline.innerHTML = `
          <div class="commit-item">
            <span class="node active-node"></span>
            <div class="commit-info">
              <strong>Dev: Added Firebase Rules</strong>
              <small>Committed 20 mins ago</small>
            </div>
          </div>
          <div class="commit-item">
            <span class="node"></span>
            <div class="commit-info">
              <strong>Dev: Testing Auth UI</strong>
              <small>Committed 3 hours ago</small>
            </div>
          </div>
        `;
        fileDirectory.innerHTML = `
          <li class="file-entry dir">&#128193; src/</li>
          <li class="file-entry">&#128196; dev-test.js</li>
          <li class="file-entry">&#128196; auth.config.js</li>
          <li class="file-entry">&#128196; README.md</li>
        `;
      } else {
        commitTimeline.innerHTML = `
          <div class="commit-item">
            <span class="node active-node"></span>
            <div class="commit-info">
              <strong>Initial Setup</strong>
              <small>Committed 13 days ago</small>
            </div>
          </div>
          <div class="commit-item">
            <span class="node"></span>
            <div class="commit-info">
              <strong>Added User Login</strong>
              <small>Committed 13 days ago</small>
            </div>
          </div>
          <div class="commit-item">
            <span class="node"></span>
            <div class="commit-info">
              <strong>Fixed Navbar Bug</strong>
              <small>Committed 17 hours ago</small>
            </div>
          </div>
        `;
        fileDirectory.innerHTML = `
          <li class="file-entry dir">&#128193; src/</li>
          <li class="file-entry">&#128196; index.html</li>
          <li class="file-entry">&#128196; style.css</li>
          <li class="file-entry">&#128196; app.js</li>
          <li class="file-entry">&#128196; README.md</li>
        `;
      }
    });
  }

  if (publishBtn) {
    publishBtn.addEventListener("click", () => {
      publishBtn.disabled = true;
      publishBtn.innerText = "Deploying...";
      setTimeout(() => {
        publishBtn.innerText = "Published Live ✓";
        publishBtn.style.backgroundColor = "var(--accent-teal)";
        publishBtn.style.color = "#000";
      }, 1500);
    });
  }

  function handleAiQuery() {
    if (!aiInput) return;
    const text = aiInput.value.trim();
    if (!text) return;

    if (mentorCards[0]) {
      const outputList = mentorCards[0].querySelector(".mentor-points");
      if (outputList) {
        outputList.innerHTML = `
          <li><strong>Q:</strong> "${text}"</li>
          <li><strong>AI:</strong> Check index.html and app.js logic. In simple words: function execution flow verified!</li>
        `;
      }
    }
    aiInput.value = "";
  }

  if (aiSendBtn) {
    aiSendBtn.addEventListener("click", handleAiQuery);
  }

  if (aiInput) {
    aiInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleAiQuery();
    });
  }

  renderProjects();
});
fetch('cv-data.json')
    .then(response => response.json())
    .then(data => {
        // Populate personal information
        document.querySelector("h1").innerText = data.personalInfo.name;
        document.querySelector(".lead").innerText = `${data.personalInfo.title} | Remote`;
        document.querySelector("a[href^='mailto']").innerText = data.personalInfo.email;
        document.querySelector("a[href^='mailto']").href = `mailto:${data.personalInfo.email}`;
        document.querySelector("a[href^='https://linkedin']").href = data.personalInfo.linkedin;
        document.querySelector("a[href^='https://github']").href = data.personalInfo.github;

        // Populate work experience
        const workExperienceSection = document.querySelector("section");
        data.workExperience.forEach(job => {
            const jobDiv = document.createElement("div");
            jobDiv.classList.add("mb-4");

            const title = document.createElement("h3");
            title.classList.add("fw-bold");
            title.innerText = job.title;

            const date = document.createElement("p");
            date.classList.add("text-muted");
            date.innerText = job.date;

            const tasks = document.createElement("ul");
            job.tasks.forEach(task => {
                const taskItem = document.createElement("li");
                taskItem.innerText = task;
                tasks.appendChild(taskItem);
            });

            jobDiv.appendChild(title);
            jobDiv.appendChild(date);
            jobDiv.appendChild(tasks);
            workExperienceSection.appendChild(jobDiv);
        });

        // Populate education
        const educationSection = document.querySelectorAll("section")[1];
        educationSection.querySelector("p:first-of-type").innerText = data.education.degree;
        educationSection.querySelector("p:last-of-type").innerText = `${data.education.school} | ${data.education.location}`;
    });

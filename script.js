const form = document.getElementById("resumeForm");
const resumeList = document.getElementById("resumeList");

let resumes = JSON.parse(localStorage.getItem("resumes")) || [];

function displayResumes() {
    resumeList.innerHTML = "";
    resumes.forEach((item, index) => {
        resumeList.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.skills}</td>
                <td>
                    <a href="${item.file}" download="resume${index}.pdf">Download</a>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const skills = document.getElementById("skills").value;
    const fileInput = document.getElementById("resume");

    const reader = new FileReader();
    reader.onload = function () {
        resumes.push({
            name: name,
            skills: skills,
            file: reader.result
        });

        localStorage.setItem("resumes", JSON.stringify(resumes));
        displayResumes();
        form.reset();
    };

    reader.readAsDataURL(fileInput.files[0]);
});

displayResumes();
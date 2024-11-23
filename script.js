"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("resumeForm");
const resumePage = document.getElementById("resumePage");
const resumeContent = document.getElementById("resumeContent");
const editButton = document.getElementById("editButton");
const downloadPdf = document.getElementById("downloadPdf");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeEducation = document.getElementById("resumeEducation");
const resumeDegree = document.getElementById("resumeDegree");
const resumeSkills = document.getElementById("resumeSkills");
const resumeExperience = document.getElementById("resumeExperience");
const resumePicture = document.getElementById("resumePicture");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const education = document.getElementById("education").value;
    const degree = document.getElementById("degree").value;
    const skills = document.getElementById("skills").value;
    const experience = document.getElementById("experience").value;
    const pictureInput = document.getElementById("picture");
    let pictureBase64 = "";
    if (pictureInput.files && pictureInput.files[0]) {
        pictureBase64 = yield fileToBase64(pictureInput.files[0]);
        resumePicture.src = pictureBase64;
    }
    resumeName.textContent = name;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.textContent = `Phone: ${phone}`;
    resumeEducation.textContent = `Education: ${education}`;
    resumeDegree.textContent = `Degree: ${degree}`;
    resumeSkills.textContent = `Skills: ${skills}`;
    resumeExperience.textContent = `Experience: ${experience}`;
    form.classList.add("hidden");
    resumePage.classList.remove("hidden");
}));
const shareButton = document.getElementById('shareButton');
shareButton === null || shareButton === void 0 ? void 0 : shareButton.addEventListener('click', () => {
    shareResume();
});
function shareResume() {
    var _a;
    const resumeData = (_a = document.querySelector('.resumeContent')) === null || _a === void 0 ? void 0 : _a.innerHTML;
    if (navigator.share) {
        navigator.share({
            title: 'My Resume',
            text: 'Check out my resume!',
            url: window.location.href // Current URL
        }).then(() => {
            console.log('Resume shared successfully!');
        }).catch(err => {
            console.error('Error sharing resume:', err);
        });
    }
    else {
        alert('Sharing not supported in this browser.');
    }
}
editButton.addEventListener("click", () => {
    form.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
downloadPdf.addEventListener("click", () => {
    const element = resumeContent;
    html2pdf().from(element).save("resume.pdf");
});
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

declare const html2pdf :any;
const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumeContent = document.getElementById("resumeContent") as HTMLElement;
const editButton = document.getElementById("editButton") as HTMLButtonElement;
const downloadPdf = document.getElementById("downloadPdf") as HTMLButtonElement;

const resumeName = document.getElementById("resumeName") as HTMLElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLElement;
const resumePhone = document.getElementById("resumePhone") as HTMLElement;
const resumeEducation = document.getElementById("resumeEducation") as HTMLElement;
const resumeDegree = document.getElementById("resumeDegree") as HTMLElement;
const resumeSkills = document.getElementById("resumeSkills") as HTMLElement;
const resumeExperience = document.getElementById("resumeExperience") as HTMLElement;
const resumePicture = document.getElementById("resumePicture") as HTMLImageElement;

form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const degree = (document.getElementById("degree") as HTMLInputElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const pictureInput = document.getElementById("picture") as HTMLInputElement;

    let pictureBase64 = "";
    if (pictureInput.files && pictureInput.files[0]) {
        pictureBase64 = await fileToBase64(pictureInput.files[0]);
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
});
const shareButton = document.getElementById('shareButton');
shareButton?.addEventListener('click', () => {
    shareResume();
});
function shareResume() {
    const resumeData = document.querySelector('.resumeContent')?.innerHTML;
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
    } else {
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


function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

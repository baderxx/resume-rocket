type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : any;
};

const resumeInformationSchema = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  country: "",
  city: "",
  address: "",
  postalCode: "",
  drivingLicense: "",
  nationality: "",
  placeOfBirth: "",
  dateOfBirth: "",
  professionalSummary: "", // rich text needs to figure this out
  employmentHistory: [
    {
      jobTitle: "",
      employer: "",
      startAndEndDate: "",
      city: "",
      description: "", // rich text needs to figure this one out
    },
  ],
  projects: [
    {
      projectName: "",
      url: "",
      startAndEndDate: "",
      description: "", // rich text needs to figure this one out
    },
  ],
  education: [
    {
      school: "",
      degree: "",
      startAndEndDate: "",
      city: "",
      description: "", // rich text needs to figure this one out
    },
  ],
  socialLinks: [
    {
      label: "",
      url: "",
    },
  ],
  skills: [
    {
      skillName: "",
      expertiseLevel: 0,
    },
  ],
  languages: [
    {
      language: "",
      fluency: "",
    },
  ],
  courses: [
    {
      courseName: "",
      institution: "",
      startAndEndDate: "",
    },
  ],
  hobbies: "",
  extraCurricularActivities: [
    {
      activityTitle: "",
      startAndEndDate: "",
      description: "", // rich text needs to figure this one out
    },
  ],
  references: [
    {
      referenceFullName: "",
      company: "",
      phone: "",
      email: "",
    },
  ],
};

export function useResumeInformation() {
  const resumeData: Ref<DeepPartial<any>> = ref(resumeInformationSchema);

  return {
    resumeData,
  };
}

/*
type ResumeRenderer = {
    renderTextElement: (context: CanvasRenderingContext2D, text: string) => void;
    renderSectionTitle: (context: CanvasRenderingContext2D, title: string) => void;
    renderSeparator: (context: CanvasRenderingContext2D) => void;
    renderList: (context: CanvasRenderingContext2D, items: string[]) => void;
    renderEmploymentHistory: (context: CanvasRenderingContext2D, employmentHistory: EmploymentHistory) => void;
    renderProject: (context: CanvasRenderingContext2D, project: Project) => void;
    renderEducation: (context: CanvasRenderingContext2D, education: Education) => void;
    renderSocialLinks: (context: CanvasRenderingContext2D, socialLinks: SocialLink[]) => void;
    renderSkills: (context: CanvasRenderingContext2D, skills: Skill[]) => void;
    renderLanguages: (context: CanvasRenderingContext2D, languages: Language[]) => void;
    renderCourses: (context: CanvasRenderingContext2D, courses: Course[]) => void;
    renderExtraCurricularActivities: (context: CanvasRenderingContext2D, activities: ExtraCurricularActivity[]) => void;
    renderReferences: (context: CanvasRenderingContext2D, references: Reference[]) => void;
};


function renderResumeOnCanvas(canvas: HTMLCanvasElement, resume: ResumeInformation, renderer: ResumeRenderer) {
    const context = canvas.getContext('2d');

    // Set up the canvas and context styling
    context.font = '14px Arial';
    context.fillStyle = 'black';

    // Render personal information
    renderer.renderSectionTitle(context, 'Personal Information');
    renderer.renderTextElement(context, `Name: ${resume.firstName} ${resume.lastName}`);
    renderer.renderTextElement(context, `Email: ${resume.email}`);
    renderer.renderTextElement(context, `Phone: ${resume.phoneNumber}`);
    renderer.renderTextElement(context, `Country: ${resume.country}`);
    renderer.renderSeparator(context);

    // Render professional summary
    renderer.renderSectionTitle(context, 'Professional Summary');
    renderer.renderTextElement(context, resume.professionalSummary);
    renderer.renderSeparator(context);

    // Render Employment History
    renderer.renderSectionTitle(context, 'Employment History');
    resume.employmentHistory.forEach((employment) => {
        renderer.renderEmploymentHistory(context, employment);
    });
    renderer.renderSeparator(context);

    // Render Projects
    renderer.renderSectionTitle(context, 'Projects');
    resume.projects.forEach((project) => {
        renderer.renderProject(context, project);
    });
    renderer.renderSeparator(context);

    // Render Education
    renderer.renderSectionTitle(context, 'Education');
    resume.education.forEach((education) => {
        renderer.renderEducation(context, education);
    });
    renderer.renderSeparator(context);

    // Render Social Links
    renderer.renderSectionTitle(context, 'Social Links');
    renderer.renderSocialLinks(context, resume.socialLinks);
    renderer.renderSeparator(context);

    // Render Skills
    renderer.renderSectionTitle(context, 'Skills');
    renderer.renderSkills(context, resume.skills);
    renderer.renderSeparator(context);

    // Render Languages
    renderer.renderSectionTitle(context, 'Languages');
    renderer.renderLanguages(context, resume.languages);
    renderer.renderSeparator(context);

    // Render Courses
    renderer.renderSectionTitle(context, 'Courses');
    resume.courses.forEach((course) => {
        renderer.renderCourses(context, resume.courses);
    });
    renderer.renderSeparator(context);

    // Render Extra-Curricular Activities
    renderer.renderSectionTitle(context, 'Extra-Curricular Activities');
    resume.extraCurricularActivities.forEach((activity) => {
        renderer.renderExtraCurricularActivities(context, activity);
    });
    renderer.renderSeparator(context);

    // Render References
    renderer.renderSectionTitle(context, 'References');
    renderer.renderReferences(context, resume.references);
}



type ResumeRenderer = {
    renderTextElement: (context: CanvasRenderingContext2D, text: string) => void;
    renderSectionTitle: (context: CanvasRenderingContext2D, title: string) => void;
    renderSeparator: (context: CanvasRenderingContext2D) => void;
};

function dynamicRenderResumeOnCanvas(canvas: HTMLCanvasElement, resume: ResumeInformation, renderer: ResumeRenderer) {
    const context = canvas.getContext('2d');

    // Set up the canvas and context styling
    context.font = '14px Arial';
    context.fillStyle = 'black';

    // Render each section dynamically
    for (const [sectionTitle, sectionData] of Object.entries(resume)) {
        if (sectionTitle === 'firstName' || sectionTitle === 'lastName') {
            // Skip personal information (handled separately)
            continue;
        }

        // Render section title
        renderer.renderSectionTitle(context, sectionTitle);

        if (Array.isArray(sectionData)) {
            // Render each item in the array
            sectionData.forEach((item: any) => {
                if (typeof item === 'object' && item !== null) {
                    // If it's an object, render its properties
                    for (const [property, value] of Object.entries(item)) {
                        renderer.renderTextElement(context, `${property}: ${value}`);
                    }
                    renderer.renderSeparator(context);
                } else {
                    // If it's a simple value, render it as text
                    renderer.renderTextElement(context, `${item}`);
                }
            });
        } else {
            // Render non-array sections
            renderer.renderTextElement(context, `${sectionData}`);
        }

        renderer.renderSeparator(context);
    }
}
*/

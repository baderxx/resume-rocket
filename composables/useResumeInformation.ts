const resumeInformationSchema = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    drivingLicense: '',
    nationality: '',
    placeOfBirth: '',
    dateOfBirth: '',
    professionalSummary: '', // rich text needs to figure this out
    employmentHistory: [
        {
            jobTitle: '',
            employer: '',
            startAndEndDate: '',
            city: '',
            description: '' // rich text needs to figure this one out
        }
    ],
    projects: [
        {
            projectName: '',
            url: '',
            startAndEndDate: '',
            description: '' // rich text needs to figure this one out
        }
    ],
    education: [
        {
            school: '',
            degree: '',
            startAndEndDate: '',
            city: '',
            description: '' // rich text needs to figure this one out
        }
    ],
    socialLinks: [
        {
            label: '',
            url: ''
        }
    ],
    skills: [
        {
            skillName: '',
            expertiseLevel: 0
        }
    ],
    languages: [
        {
            language: '',
            fluency: ''
        }
    ],
    courses: [
        {
            courseName: '',
            institution: '',
            startAndEndDate: '',
        }
    ],
    hobbies: '',
    extraCurricularActivities: [
        {
            activityTitle: '',
            startAndEndDate: '',
            description: '' // rich text needs to figure this one out
        }
    ],
    references: [
        {
            referenceFullName: '',
            company: '',
            phone: '',
            email: ''
        }
    ]
}
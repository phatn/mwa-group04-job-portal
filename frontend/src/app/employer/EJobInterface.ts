export interface Ejob {
  _id: string,
  title: string,
  description: string,
  skills: [
    { skill: string }
  ],
  job_type: string,
  location: {
    address: string,
    city: string,
    state: string,
    country: string
  },
  timestamp_created: number,
  created_by: string,
  employer: {
    _id: string,
    email: string,
    fullname: string,
    organization: string
  },
  applied_by: [
    {
      _id: string,
      email: string,
      fullname: string,
      resume: string,
      education: string,
      skill_set: [
        { skill: string }
      ],
      yoe: number,
      status: string
    },
  ],
  status: string
}

const seniorityList = [
  '',
  'Trainee',
  'Junior',
  'Mid-level',
  'Senior',
  'Staff',
  'Master',
]

const jobList = [
  '.NET Developer',
  'AWS DevOps Engineer',
  'AWS Solutions Architect',
  'Admin Big Data',
  'Agile Project Manager',
  'Android Developer',
  'Ansible Automation Engineer',
  'Ansible Development Engineer',
  'Ansible Operations Engineer',
  'AppDynamics Engineer',
  'Application Security Engineer',
  'Artifactory Administrator',
  'Artifactory Engineer',
  'Artificial Intelligence',
  'Artificial Intelligence Architect',
  'Artificial Intelligence Researcher',
  'Azure DevOps Engineer',
  'Business Systems Analyst',
  'Bamboo Engineer',
  'Big Data',
  'Big Data Architect',
  'Big Data Engineer',
  'Big Data Specialist',
  'Bitbucket Engineer',
  'Blockchain Developer',
  'Build Engineer',
  'C# Developer',
  'CNC Programmer',
  'Chef InSpec Engineer',
  'Chef Operations Engineer',
  'Cloud Administrator',
  'Cloud Architect',
  'Cloud Automation Engineer',
  'Cloud Engineer',
  'Cloud Network Engineer',
  'Cloud Security Engineer',
  'Computer Graphics Animator',
  'Computer Hardware Engineer',
  'Computer Network Architect',
  'Confluence Engineer',
  'Coverage Engineer',
  'DBA',
  'Data Architect',
  'Data Analyst',
  'Data Engineer',
  'Data Modeler',
  'Data Scientist',
  'Datadog Engineer',
  'DevOps Architect',
  'DevOps Engineer',
  'DevOps Manager',
  'DevSecOps Architect',
  'DevSecOps Engineer',
  'Docker Engineer',
  'ELK Engineer',
  'Embedded Software Engineer',
  'Envoy Engineer',
  'Falco Engineer',
  'FluentD Engineer',
  'Fortify Engineer',
  'Frameworks Specialist',
  'Frontend Designer',
  'Frontend Developer',
  'Frontend Web Developer',
  'Full Stack Developer',
  'Full Stack JAVA Developer',
  'Full Stack Python Developer',
  'GCP DevOps Engineer',
  'Game Developer',
  'Gerrit Administrator',
  'Gerrit Engineer',
  'Git Engineer',
  'GitLab Engineer',
  'Github Engineer',
  'Grad Software Engineer',
  'Gradle Engineer',
  'Grafana Engineer',
  'Groovy Engineer',
  'IOS Developer',
  'IT Manager',
  'Information Architect',
  'Information Security Analyst',
  'Interaction Designer',
  'Istio Engineer',
  'JIRA Engineer',
  'JUnit Engineer',
  'JaCoCO Engineer',
  'Java Developer',
  'JavaScript Developer',
  'Jenkins Engineer',
  'Jira Administrator',
  'Kubernetes Administrator',
  'Kubernetes Engineer',
  'Kubernetes Operations Engineer',
  'MAVEN Engineer',
  'Machine Learning Engineer',
  'Microservices Engineer',
  'Mobile Application Developer',
  'Mulesoft Developer',
  'Nagios Engineer',
  'Network Engineer',
  'Network and Systems Administrator',
  'Nexus Engineer',
  'Nomad Engineer',
  'Notary Engineer',
  'Octopus Deploy Engineer',
  'OpenShift Engineer',
  'OpenStack Engineer',
  'Operations Engineer',
  'Oracle Developer',
  'Oracle SQL Developer',
  'PHP Developer',
  'Packer Engineer',
  'Powershell Engineer',
  'Production Support Engineer',
  'Prometheus Engineer',
  'Puppet Engineer',
  'Puppet Operations Engineer',
  'PyTest Engineer',
  'Python Developer',
  'QA Engineer',
  'QA Specialist',
  'React Developer',
  'Relic Engineer',
  'Robotics Engineer',
  'Ruby on Rails Developer',
  'SQL Developer',
  'SRE Architect',
  'SRE Engineer',
  'Salesforce Developer',
  'Search Engine Optimization',
  'Security Specialist',
  'Selenium Engineer',
  'Sharepoint Developer',
  'Site Reliability Engineer',
  'SonarQube Engineer',
  'Splunk Engineer',
  'Splunk Security Engineer',
  'TFS Engineer',
  'TeamCity Engineer',
  'Tech Lead',
  'Tech Sales Engineer',
  'Terraform Engineer',
  'Twistkock Engineer',
  'UDeploy Engineer',
  'UI Designer',
  'UI Developer',
  'UX Designer',
  'Unity Developer',
  'Vault Engineer',
  'Web Designer',
  'Web Developer',
  'WordPress Developer',
  'XL Deploy Engineer',
  'Zabbix Engineer',
]

const getProjects = (num) => Math.abs(Math.random() * (num - 1) + 1).toFixed()

const randomItem = (list) => list[(list.length * Math.random()) | 0]

const getSeniority = (seniorityList) => randomItem(seniorityList)

const getJob = (jobList) => randomItem(jobList)

const fetchRobots = async (num) => {
  const randomUserData = await fetch(
    `https://randomuser.me/api/?results=${num}`
  )
  const randomUserJSONData = await randomUserData.json()
  const randomUsers = randomUserJSONData.results.map(
    ({
      name: { first, last },
      email,
      login: { uuid, username },
      location: { city, country },
    }) => ({
      photo: '',
      uuid,
      username,
      name: `${first} ${last}`,
      projects: getProjects(num),
      job: `${getSeniority(seniorityList)} ${getJob(jobList)}`,
      email,
      location: `${city}, ${country}`,
      hired: false,
    })
  )

  const getRobotURL = (id) => `https://robohash.org/${id}.png`

  const genRobotPromises = (num, robots) =>
    Array(num)
      .fill()
      .map((_, index) => ({
        url: getRobotURL(robots[index].uuid),
        robot: robots[index],
      }))

  await Promise.all(
    genRobotPromises(num, randomUsers).map((result) =>
      fetch(result.url).then((data) => (result.robot.photo = data.url))
    )
  )

  return randomUsers
}

export default fetchRobots

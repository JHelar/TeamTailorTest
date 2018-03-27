import Job from '@/components/JobComponent';
import JobList from '@/components/JobListComponent';

export default [
    { path: '/job/:id', component: Job, name: 'job', props: true },
    { path: '/', component: JobList }
]
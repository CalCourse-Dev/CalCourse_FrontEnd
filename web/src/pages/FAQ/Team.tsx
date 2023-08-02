import React from 'react';

// TODO: work on abstraction

// Define the type for a Team Member
type TeamMember = {
    id: number;
    firstName: string;
    lastName: string;
    title: string;
    shortDescription: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        title: 'Software Engineer',
        shortDescription: 'John is a full-stack developer with 5 years of experience...'
    },
    // add more team members as needed
];

const TeamPage: React.FC = () => {
    return (
        <div>
            <h1>Our Team</h1>
            {teamMembers.map(member => (
                <div key={member.id} className="team-member">
                    <img src={`${process.env.PUBLIC_URL}/images/${member.firstName}_${member.lastName}.jpg`} alt={`${member.firstName} ${member.lastName}`} />
                    <h2>{member.firstName} {member.lastName}</h2>
                    <h3>{member.title}</h3>
                    <p>{member.shortDescription}</p>
                </div>
            ))}
        </div>
    );
}

export default TeamPage;

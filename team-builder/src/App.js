import React, { useState } from 'react';
import uuid from 'uuid';
import './App.css';

const initialTeamMembers = [
  {id: uuid(), name: 'Martin', email: 'Martin@gmail.com', role: 'Team Lead'},
  {id: uuid(), name: 'Temi', email: 'Temi@gmail.com', role: 'FSW Student'},
  {id: uuid(), name: 'Justin', email: 'Justin@gmail.com', role: 'FSW Student'},
  {id: uuid(), name: 'Femi', email: 'Femi@gmail.com', role: 'FSW Student'},
  {id: uuid(), name: 'Alison', email: 'Alison@gmail.com', role: 'FSW Student'},
  {id: uuid(), name: 'David', email: 'David@gmail.com', role: 'FSW Student'},
];

const initialFormValues = {
  name: '',
  email: '',
  role: '',
}

function TeamMember({ teamMember, memberToEdit }) {
  return (
    <div>
      <span>{teamMember.name}</span>
      <span>{teamMember.email}</span>
      <span>{teamMember.role}</span>
      <span>
        <button onClick={()=> memberToEdit(teamMember.id)}>Edit Member</button>
      </span>
    </div>
  );
}

function TeamList({ teamMembers, memberToEdit }) {
  return (
    <>
      <h2>Team List</h2>
      <div className="formHeading">
        <span>Name</span>
        <span>Email</span>
        <span>Role</span>
      </div>
      <div className="member">
      <span>{teamMembers.map(teamMember => <TeamMember teamMember={ teamMember } memberToEdit={memberToEdit} key={TeamMember.id}/>)}</span>
      </div>
    </>
  );
} 

function Form({formValues, handleChange, onSubmit, isDisabled}) {
  // debugger
  return (
    <>
      <h2>Add Team Member</h2>
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input value={formValues.name} onChange={handleChange} type='text' id='name' />
        </div>
        <div>
          <label htmlFor='title'>Email</label>
          <input value={formValues.email} onChange={handleChange} type='text' id='email' />
        </div>
        <div>
          <label htmlFor='title'>Role</label>
          <input value={formValues.role} onChange={handleChange} type='text' id='role' />
        </div>
        <button onClick={onSubmit} disabled={isDisabled()} >Submit</button>
      </form>
    </>
  );
}

function App() {

  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(editMode) {
      initialTeamMembers.filter(member => {
        console.log(member.id === formValues.id)
      })
    }
    setTeamMembers( [...teamMembers, {...formValues, id: uuid()} ]);
    setFormValues(initialFormValues);
  }

  const isDisabled = () => !(formValues.name &&  formValues.email && formValues.role);

  const memberToEdit = (memberId) => {
    setFormValues(teamMembers.find(teamMember => teamMember.id === memberId))
    setEditMode(true)
  }

  return (
    <>
      <div className="App">
        <div className='form'>
          <Form 
            formValues={formValues}
            handleChange={handleChange}
            onSubmit={onSubmit}
            isDisabled={isDisabled}
            editMode={editMode}
          />
        </div>
        <div className='team'>
          <TeamList teamMembers={ teamMembers } memberToEdit={memberToEdit} />
        </div>
      </div>
    </>
  );
}

export default App;
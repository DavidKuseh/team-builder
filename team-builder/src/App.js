import React, { useState } from 'react';
import uuid from 'uuid';
import './App.css';

const initialTeamMembers = [
  {id: uuid(), name: 'Martin', role: 'Team Lead'},
  {id: uuid(), name: 'Temi', role: 'FSW Student'},
  {id: uuid(), name: 'Justin', role: 'FSW Student'},
  {id: uuid(), name: 'Femi', role: 'FSW Student'},
  {id: uuid(), name: 'Alison', role: 'FSW Student'},
  {id: uuid(), name: 'David', role: 'FSW Student'},

];

const initialFormValues = {
  name: '',
  role: '',
}

function TeamMember({ teamMember }) {
  return (
    <div>
      <span>{teamMember.name}</span>
      <span>{teamMember.role}</span>
    </div>
  );
}

function TeamList({ teamMembers }) {
  return (
    <>
      <h2>Team List</h2>
      <div className="formHeading">
        <span>Name</span>
        <span>Role</span>
      </div>
      <div className="member">
      <span>{teamMembers.map(teamMember => <TeamMember teamMember={ teamMember } key={uuid()}/>)}</span>
      </div>
    </>
  );
} 

function Form({formValues, handleChange, onSubmit, isDisabled}) {
  return (
    <>
      <h2>Add Team Member</h2>
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input value={formValues.name} onChange={handleChange} type='text' id='name' />
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

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setTeamMembers( [...teamMembers, {...formValues, id: uuid()} ]);
    setFormValues(initialFormValues);
  }

  const isDisabled = () => !(formValues.name &&  formValues.role);

  return (
    <>
      <div className="App">
        <div className='form'>
          <Form 
            formValues={formValues}
            handleChange={handleChange}
            onSubmit={onSubmit}
            isDisabled={isDisabled}
          />
        </div>
        <div className='team'>
          <TeamList teamMembers={ teamMembers } />
        </div>
      </div>
    </>
  );
}

export default App;
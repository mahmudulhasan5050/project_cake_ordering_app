import React, { useState } from 'react';

import UserForm from '../components/forms/UserForm';
import UserTable from '../components/tables/usersTable/UsersTable';

const UserDetails = () => {
  const [userId, setUserId] = useState('');

  return (
    <div>
      <UserTable setUserId={setUserId} />
      <UserForm userId={userId} setUserId={setUserId} />
    </div>
  );
};

export default UserDetails;

/* eslint-disable react/no-unescaped-entities */

import WeeklyPlanner from '../components/WeeklyPlanner';

const Admin = () => {
  // eslint-disable-next-line no-unused-vars
  const handleSave = (updatedData) => {
    // Appeler une fonction pour sauvegarder les données modifiées
    // saveUpdatedData(updatedData);
    console.log('update datas');
  };
  return (
    <div>
      <WeeklyPlanner editable onSave={handleSave} />
    </div>
  );
};

export default Admin;

import React, { useState } from "react";
import UserManagementTable from "./UserManagementTable";
import UserManagementForm from "./UserManagementForm";
import MainLayout from "../../MainLayout";



const ConfigUserManagement: React.FC = ()  => {

  const [ isDrawerOpen, setIsDrawerOpen] = useState(false);
  const showDrawer = () => setIsDrawerOpen(true);
  const [ shouldRefresh, setShouldRefreshed ] = useState(false);

  const refreshUserTable = () => {
    setShouldRefreshed(prev => !prev);
  }
 
  return (

  <MainLayout title="Configuration > User Management">
      <UserManagementTable onAddUserClick={showDrawer} shouldRefresh={shouldRefresh}></UserManagementTable>
      <UserManagementForm
        isDrawerOpen={isDrawerOpen}
        closeDrawer={() => setIsDrawerOpen(false)} onUserAdded={refreshUserTable}></UserManagementForm>
  </MainLayout>
  );
  
};

export default ConfigUserManagement;

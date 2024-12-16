import PageTitle from "../../components/common/PageTitle";
import UserComponent from "./components/table/UserComponent";
import { UserDialogProvider } from "../../contexts/userDialogContext/userDialogContextProvider";

const UserPage = () => {
  return (
    <div>
      <UserDialogProvider>
        <PageTitle title="User List" />
        <UserComponent />
      </UserDialogProvider>
    </div>
  );
};

export default UserPage;

import PageTitle from "../../components/common/PageTitle";
import {
  UserDialogContext,
  UserDialogProvider,
} from "../../contexts/userDialogContext/userDialogContextProvider";
import UserComponent from "./components/table/UserComponent";

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

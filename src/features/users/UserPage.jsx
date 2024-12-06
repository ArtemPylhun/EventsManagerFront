import PageTitle from "../../components/common/PageTitle";
import UserComponent from "./components/table/UserComponent";

const UserPage = () => {
  return (
    <div>
      <PageTitle title="User List" />
      <UserComponent />
    </div>
  );
};

export default UserPage;

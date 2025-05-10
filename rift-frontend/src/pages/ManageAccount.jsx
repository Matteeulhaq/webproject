// src/pages/ManageAccount.jsx
import ManageAccountForm from "../components/account/ManageAccountForm";
import BackButton from "../components/common/BackButton";

function ManageAccount() {
  return (
    <div className="container">
      <BackButton />
      <h1 className="font-heading text-2x1 text-center">Manage Account</h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <ManageAccountForm />
      </div>
    </div>
  );
}

export default ManageAccount;
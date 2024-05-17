import Breadcrumb from "../components/Breadcrumb";
import CreateCommissionForm from "../components/CreateCommissionForm";

function CommissionPage() {
  return (
    <div>
      <Breadcrumb
        paths={[
          { name: "Home", link: "/galleries" },
          { name: "Commissions", link: "/commissions" },
          { name: "new", link: "/commissions/new" },
        ]}
      />
      <CreateCommissionForm />
    </div>
  );
}

export default CommissionPage;

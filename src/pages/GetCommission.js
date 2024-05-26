import Breadcrumb from "../components/Breadcrumb";
import CommssionGrid from "../components/CommissionGrid";

function CommissionGetPage() {
  return (
    <div>
      <Breadcrumb
        paths={[
          { name: "Home", link: "/galleries" },
          { name: "Commissions", link: "/commissions" },
        ]}
      />
      <CommssionGrid />
    </div>
  );
}

export default CommissionGetPage;

import Breadcrumb from "../components/Breadcrumb";
import Commission from "../components/commission";

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
      <Commission />
    </div>
  );
}

export default CommissionPage;

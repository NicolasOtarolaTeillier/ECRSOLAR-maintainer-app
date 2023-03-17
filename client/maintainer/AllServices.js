import { useQuery } from "@apollo/client";
import GET_ALL_SERVICES from "../api/service/queries"



export default function AllServices() {
  const { data, loading, error } = useQuery(GET_ALL_SERVICES);

  if (loading) {
    return <h2><a href="#loading" aria-hidden="true" class="aal_anchor" id="loading"></a>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const countries = data.allServices

  return (
    <div >
      {countries.map((service) => (
        <div key={service.id} >
          <p>
            {service.id} - {service.purchase_order}
          </p>
        </div>
      ))}
    </div>
  );
}
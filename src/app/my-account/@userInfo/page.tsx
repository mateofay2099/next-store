import { validateAccessToken } from "app/utils/auth/validateAccessToken";

export default async function MyAccountPage() {
  const customer = await validateAccessToken();

  return (
    <div>
      <section>
        <h2>Your info</h2>
        <h1>Name: {customer.name}</h1>
        <p>Email: {customer.email}</p>
      </section>
    </div>
  );
}

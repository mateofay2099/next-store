import { validateAccessToken } from "app/utils/auth/validateAccessToken";

export const dynamic = "force-dynamic";

export default async function MyAccountPage() {
  const customer = await validateAccessToken();

  return (
    <div>
      <h2>Account info</h2>
      <section>
        <h1>Name: {customer?.firstName}</h1>
        <p>Email: {customer?.email}</p>
      </section>
    </div>
  );
}

"use server";
import { GraphQLClientSingleton } from "app/graphql";
import { createCartMutation } from "app/graphql/mutations/createCartMutation";
import { createUserMutation } from "app/graphql/mutations/createUserMutation";
import { createAccessToken } from "app/utils/auth/createAccessToken";
import { redirect } from "next/navigation";
import { validateAccessToken } from "app/utils/auth/validateAccessToken";
import { cookies } from "next/headers";

export const handleCreateUser = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData);
  delete formDataObject["password_confirmation"];
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const variables = {
    input: {
      ...formDataObject,
      phone: "+54" + formDataObject.phone,
    },
  };

  const { customerCreate } = await graphqlClient.request(
    createUserMutation,
    variables
  );
  const { customer } = customerCreate;
  if (customer?.firstName) {
    await createAccessToken(
      formDataObject.email as string,
      formDataObject.password as string
    );
    redirect("/store");
  }
};

export const handleLogin = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData);
  await createAccessToken(
    formDataObject.email as string,
    formDataObject.password as string
  );
  redirect("/store");
};

export const handleCreateCart = async (items: CartItem[]) => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;

  if (!accessToken) redirect("/login");

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const customer = await validateAccessToken();
  const variables = {
    input: {
      buyerIdentity: {
        customerAccessToken: accessToken,
        email: customer?.email,
      },
      lines: items.map((item) => ({
        merchandiseId: item.merchandiseId,
        quantity: item.quantity,
      })),
    },
  };

  const {
    cartCreate,
  }: {
    cartCreate?: {
      cart?: {
        checkoutUrl: string;
      };
    };
  } = await graphqlClient.request(createCartMutation, variables);

  return cartCreate?.cart?.checkoutUrl;
};

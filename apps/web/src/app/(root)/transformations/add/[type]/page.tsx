import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const getUserData = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_SERVER_URL}/api/user/${userId}`,
  );

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const user = await response.json();
  return user;
};

const AddTransformationType = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if (!userId) redirect("/sign-in");

  const user = await getUserData(userId);

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user.id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationType;

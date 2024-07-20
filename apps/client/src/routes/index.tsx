import { use } from "react";

async function loader() {
  const data = await Bun.$`nu -c "ls | to json"`.text();
  return { data };
}

export const Route = () => {
  const { data } = use(loader());
  return <pre dangerouslySetInnerHTML={{ __html: data }} />;
};

import { use } from "react"

async function loader() {
	const data = await Bun.$`nu -c "ls"`.text()
	return { data }
};

export const Route = () => {
	const { data } = use(loader())
	return <pre>{data}</pre>
}

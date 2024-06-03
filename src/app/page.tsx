import { Dropdown } from "@/app/components/dropdown";

interface ItemProps {
  id: number;
  name: string;
}
export default function Home() {
  const items: ItemProps[] = [
    {
      id: 0,
      name: "Peter",
    },
    {
      id: 1,
      name: "Dan",
    },
    {
      id: 2,
      name: "Sarah",
    },
  ];

  return (
    <main className="flex p-24">
      <Dropdown
        id="dropdown"
        items={items}
        title="Select an option"
        // selectedId={2}
      />
    </main>
  );
}

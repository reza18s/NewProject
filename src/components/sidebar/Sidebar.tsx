import Link from "next/link";
import { HiFilter } from "react-icons/hi";
import { categories } from "@/constants/strings";

function Sidebar() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <p className="ml-1 flex text-base font-normal text-foreground">
          <HiFilter className="ml-1 text-primary" />
          دسته بندی
        </p>
        <Link href="/" className="m-1 text-sm font-normal text-foreground/60">
          همه
        </Link>
        {Object.keys(categories).map((i) => (
          <Link
            className="m-1 text-sm font-normal text-foreground/60"
            key={i}
            href={{
              pathname: "/",
              query: { category: i },
            }}
          >
            {
              // @ts-expect-error bec
              categories[i]
            }
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

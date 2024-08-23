import type { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren & {
  overview: ReactNode;
};
function PeopleLayout({ children, overview }: Props) {
  return (
    <div className="flex gap-2 w-full overflow-x-hidden">
      {children}
      {overview}
    </div>
  );
}

export default PeopleLayout;

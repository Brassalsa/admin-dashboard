import type { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren & {
  overview: ReactNode;
};
function PeopleLayout({ children, overview }: Props) {
  return (
    <>
      {children}
      {overview}
    </>
  );
}

export default PeopleLayout;

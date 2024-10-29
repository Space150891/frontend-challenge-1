import { Image, AppShell, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { PAGES } from "~/routes";

export default function Navbar() {
  return (
    <AppShell.Header p={15}>
      <Link to={PAGES.main}>
        <div className="flex transition-opacity hover:opacity-60 items-center gap-1">
          <Image className="w-5 h-5" src="favicon.ico" fallbackSrc="https://placehold.co/600x400" />
          <Title order={5}>Machine Readable Files</Title>
        </div>
      </Link>
    </AppShell.Header>
  );
}

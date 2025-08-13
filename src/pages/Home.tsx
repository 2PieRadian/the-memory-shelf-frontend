import Navbar from "@/components/Navbar";

interface User {
  email: string;
}

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  return (
    <div className=" dark:bg-primary-bg h-screen">
      <Navbar />
    </div>
  );
}

import { Sidebar } from "../../sidebar/ui/sidebar";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <div>
        <Sidebar />
      </div>
      {children}
    </>
  );
};

export { Layout };

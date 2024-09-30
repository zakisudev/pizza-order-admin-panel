import Header from '@/components/ui/Header';

const layout = ({ children }) => {
  return (
    <div className="relative flex flex-col w-full max-w-hxl min-h-screen mx-auto bg-bodyBg">
      <Header />
      {children}
    </div>
  );
};

export default layout;

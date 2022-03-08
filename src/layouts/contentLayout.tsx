export const ContentLayout: React.FC = (props) => {
  return (
    <div className="flex items-center justify-around mb-6 mx-auto py-8 w-11/12 bg-blue-100 rounded-lg shadow-lg sm:flex-wrap">
      {props.children}
    </div>
  );
};
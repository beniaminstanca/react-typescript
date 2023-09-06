import classes from "./PageContent.module.css";

const PageContent:React.FC<{title: string, children:React.ReactNode }> = ({ title, children }) => {
  return (
    <div className={classes.content}>
      {children}
    </div>
  );
}

export default PageContent;

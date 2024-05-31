import { Children, createContext, ReactNode, useContext } from "react";
import Loader, { PageLoader } from "../Loader/Loader";

export type Rootprops = {
  children: ReactNode;
  isLoading: boolean;
  isSuccess: boolean;
  isEmpty: boolean;
  loaderType?: "page" | "component";
};

const AsyncContext = createContext<Omit<Rootprops, "children">>({
  isLoading: false,
  isSuccess: false,
  isEmpty: false,
});

const Root = ({
  children,
  isLoading,
  isSuccess,
  isEmpty,
  loaderType = "page",
}: Rootprops) => {
  const LoaderComponent = loaderType === "page" ? PageLoader : Loader;

  const Success = Children.toArray(children).filter(
    ({ type: { name } }: any) => name === "Success"
  )?.[0];

  if (!Success) {
    throw new Error("Success Screen Not Found!");
  }

  return (
    <AsyncContext.Provider value={{ isLoading, isSuccess, isEmpty }}>
      <>{isLoading ? <LoaderComponent /> : <>{children}</>}</>
    </AsyncContext.Provider>
  );
};

const Success = ({ children }: { children: ReactNode }) => {
  const { isSuccess, isEmpty } = useContext(AsyncContext);

  if (isSuccess && !isEmpty) return <>{children}</>;
  return null;
};

const Empty = ({ children }: { children: ReactNode }) => {
  const { isSuccess, isEmpty } = useContext(AsyncContext);

  if (isSuccess && isEmpty) return <>{children}</>;
  return null;
};

const Async = { Root, Success, Empty };

export default Async;

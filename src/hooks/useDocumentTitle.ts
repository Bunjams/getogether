import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - Getogether`;
  }, [title]);
};

export default useDocumentTitle;

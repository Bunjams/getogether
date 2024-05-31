import * as RDialog from "@radix-ui/react-dialog";
import cx from "classnames";
import { X } from "lucide-react";
import { forwardRef, HTMLAttributes, ReactNode, useEffect } from "react";
import Button from "../Button/Button";

enum ModalSize {
  small = "w-[440px]",
  regular = "w-[560px]",
  large = "w-[680px]",
  xl = "w-[960px]",
  xxl = "w-[1140px]",
  xxxl = "w-screen",
}

type ModalProps = {
  children?: React.ReactNode;
  size?: keyof typeof ModalSize;
  useCustomOverlay?: boolean;
  className?: string;
} & RDialog.DialogContentProps;

const Header = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cx(
        "flex flex-shrink-0 items-center justify-between border-0 border-b border-solid border-b-neutral-100 py-4 px-6 shadow-modal-header",
        props.className || ""
      )}
    />
  );
};

const Title = (
  props: RDialog.DialogTitleProps &
    React.RefAttributes<HTMLHeadingElement> & { titleIcon?: JSX.Element }
) => {
  return (
    <RDialog.Title
      asChild
      className={cx("mb-0 text-h5-medium" || props.className || "")}
      {...props}
    >
      <span className="flex justify-between">
        {props?.children}
        {props?.titleIcon}
      </span>
    </RDialog.Title>
  );
};

const Close = (props: RDialog.DialogCloseProps) => (
  <RDialog.Close {...props} asChild>
    <span>
      <Button title="Close Modal" type="text">
        <X size={16} />
      </Button>
    </span>
  </RDialog.Close>
);

const Body = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cx("overflow-auto p-6", props.className || "")}
    />
  );
};

const Footer = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cx(
        "flex-shrink-0 px-6 py-4 border-0 border-t border-solid border-t-neutral-100 shadow-modal-footer",
        props.className || ""
      )}
    />
  );
};

const Content = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      // The default overlay removed scroll from the elements which renders in the portal (Body)
      useCustomOverlay = false,
      size = "regular",
      className = "",
      ...rest
    }: ModalProps,
    forwardedRef
  ) => {
    return (
      <RDialog.Portal>
        {useCustomOverlay ? <CustomOverlay /> : <Overlay />}
        <RDialog.Content
          {...rest}
          className={cx(
            "fixed left-1/2 top-1/2 z-modal flex max-h-[80vh] -translate-x-1/2 -translate-y-1/2 flex-col rounded-sm bg-white container max-w-[90vw]",
            ModalSize[size],
            className
          )}
          ref={forwardedRef}
        >
          {children}
        </RDialog.Content>
      </RDialog.Portal>
    );
  }
);

const CustomOverlay = (
  props: RDialog.DialogOverlayProps & React.RefAttributes<HTMLDivElement>
) => {
  useEffect(() => {
    document.body.classList.add("t-pointer-events-none");

    return () => {
      document.body.classList.remove("t-pointer-events-none");
    };
  }, []);

  return (
    <div
      className={cx(
        "fixed inset-0 z-modal bg-neutral-900 opacity-50",
        props.className || ""
      )}
    />
  );
};

const FooterButtonGroup = ({ children }: { children: ReactNode }) => (
  <Footer>
    <div className="flex gap-2 items-center justify-end">{children}</div>
  </Footer>
);

const Overlay = ({
  ...props
}: RDialog.DialogOverlayProps & React.RefAttributes<HTMLDivElement>) => (
  <RDialog.Overlay
    {...props}
    className={cx(
      "fixed inset-0 z-modal bg-neutral-900 opacity-50",
      props.className || ""
    )}
  />
);

const Modal = {
  ...RDialog,
  Header,
  Title,
  Close,
  Body,
  Footer,
  FooterButtonGroup,
  Content,
  RawContent: RDialog.Content,
  RawClose: RDialog.Close,
  Overlay,
};

export default Modal;

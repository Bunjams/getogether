import Button from "../Button/Button";

const EmptyScreen = ({
  img,
  actionText,
  onClick,
  subtitle,
  title,
  noAction = false,
}: {
  img: string;
  title: string;
  subtitle: string;
  actionText?: string;
  onClick?: () => void;
  noAction?: boolean;
}) => {
  return (
    <section className="flex w-full flex-col gap-2 h-full justify-center items-center">
      <img
        src={img}
        className="rounded-3xl overflow-hidden w-72 h-56"
        loading="lazy"
      />
      <h4 className="text-h4 font-semibold text-neutral-900">{title}</h4>
      <p className="text-body-regular text-neutral-900">{subtitle}</p>
      {!noAction && (
        <Button type="primary" size="large" onClick={onClick}>
          {actionText}
        </Button>
      )}
    </section>
  );
};

export default EmptyScreen;

import LazyImage from "components/Design/Image/Image";

const OnbordingSideImage = ({
  fallbackimg,
  img,
}: {
  img: string;
  fallbackimg: string;
}) => {
  return (
    <LazyImage
      src={img}
      fallbackimg={fallbackimg}
      alt="SignInSignUpSide"
      className="md:block hidden"
      fallbackClassName="rounded-3xl overflow-hidden"
      fallbackStyle={{ width: "524px", height: "674px", borderRadius: "16" }}
    />
  );
};

export default OnbordingSideImage;

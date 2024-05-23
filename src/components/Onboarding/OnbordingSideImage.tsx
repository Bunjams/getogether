import ImageLazy from "components/Design/Image/ImageLazy";

const OnbordingSideImage = ({
  fallbackimg,
  img,
}: {
  img: string;
  fallbackimg: string;
}) => {
  return (
    <ImageLazy
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

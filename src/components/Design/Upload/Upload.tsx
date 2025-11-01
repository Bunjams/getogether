import { UserOutlined } from "@ant-design/icons";
import { Avatar, Image } from "antd";
import React from "react";
import {
  Accept,
  DropEvent,
  DropzoneOptions,
  DropzoneState,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import Button from "../Button/Button";

type UploadProps = {
  acceptFileType?: Accept;
  name?: string;
  children: (state: DropzoneState) => React.ReactNode;
  src?: string | null;
} & DropzoneOptions;

const Upload = ({
  acceptFileType = {
    "image/*": [".png", ".jpeg", ".jpg", ".webp", ".avif"],
    "application/pdf": [".pdf"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
    "text/csv": [".csv"],
  },
  name,
  children,
  ...restProps
}: UploadProps) => {
  const { getRootProps, getInputProps, open, ...rest } = useDropzone({
    ...restProps,
    noClick: true,
    noKeyboard: true,
    maxSize: 25000000,
    accept: acceptFileType,
  });

  return (
    <div {...getRootProps()}>
      <input name={name} {...getInputProps()} />
      {children({ getRootProps, getInputProps, open, ...rest })}
    </div>
  );
};

const UploadAvatar = ({ src, ...restProps }: Omit<UploadProps, "children">) => {
  const [file, setFile] = React.useState<File | string>(src || "");

  const onDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    setFile(acceptedFiles[0]);
    restProps?.onDrop?.(acceptedFiles, fileRejections, event);
  };

  return (
    <Upload
      acceptFileType={{ "image/*": [".png", ".jpeg", ".jpg"] }}
      {...restProps}
      onDrop={onDrop}
    >
      {({ open }) => (
        <span className="flex flex-col items-start">
          {file ? (
            <Avatar
              shape="square"
              size={64}
              icon={
                <Image
                  width={64}
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                />
              }
            />
          ) : (
            <Avatar
              shape="square"
              size={64}
              icon={<UserOutlined />}
              onClick={open}
              className="cursor-pointer"
            />
          )}
          <div className="-ml-2">
            <Button type="link" size="small" onClick={open}>
              {file ? "Update avatar" : "Upload avatar"}
            </Button>
          </div>
        </span>
      )}
    </Upload>
  );
};

export default Upload;
export { UploadAvatar };

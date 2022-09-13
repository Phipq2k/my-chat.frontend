import { useEffect } from "react";
import { useState } from "react";

function UploadFile({
  children,
  types = [],
  htmlFor,
  onUpload = () => {},
}) {
  const [fileState, setFileState] = useState(null);
  useEffect(() => {
    if(fileState){
      onUpload(fileState, true);
    }
  },[fileState]);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const ext = file?.name.split(".").pop().toLowerCase();
    if (types.length) {
      const isValidTypeFile = types.some((type) => type === ext);
      if (isValidTypeFile) {
        setFileState(file);
      } else {
        window.alert("Định dạng không hợp lệ");
      }
    }
  };
  return (
    <>
      <label htmlFor={htmlFor}> {children} </label>{" "}
      <input onChange={handleChangeFile} id={htmlFor} type="file" />
    </>
  );
}
export default UploadFile;

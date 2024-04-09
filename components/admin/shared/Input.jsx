import { forwardRef, useCallback, useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../../api";

function Input(
  { label, onFile, defaultFile, full, required, isLoading, value, ...rest },
  ref
) {
  const [previewImage, setPreviewImage] = useState(defaultFile || null);
  const { mutateAsync: uploadFile } = useMutation(API.MISC.UPLOAD_FILE);

  const handleFiles = useCallback(async (files) => {
    isLoading?.(true);
    const [file] = files;
    if (!file) return;
    // setPreviewImage(URL.createObjectURL(file));
    const { data } = await uploadFile([file]);
    // console.log(data);
    if (!data?.photo?.[0]?.path) return;
    setPreviewImage(data?.photo?.[0]?.path);
    onFile?.(data?.photo?.[0]?.path);
    isLoading?.(false);
  }, []);

  return (
    <div className="adminInput">
      <label
        style={{
          display: full ? "block" : "inline-block",
        }}
      >
        {label && (
          <span>
            {label}
            {required && <span style={{ color: "red" }}>*</span>}
          </span>
        )}
        {rest?.type === "file" ? (
          <div
            style={{
              minWidth: full ? "100%" : "70vw",
            }}
          >
            <img
              width={40}
              height={40}
              src={previewImage || "https://via.placeholder.com/150"}
              alt=""
            />
            <input
              type="text"
              {...rest}
              ref={ref}
              onChange={({ target }) => handleFiles(target.files)}
            />
          </div>
        ) : (
          <input
            style={{
              minWidth: full ? "100%" : "70vw",
            }}
            type="text"
            {...rest}
            ref={ref}
            {...(rest.type === "number" ? { min: 0, step: "any" } : {})}
            value={value}
          />
        )}
      </label>
    </div>
  );
}

export default forwardRef(Input);

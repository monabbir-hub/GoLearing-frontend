import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { http } from "../../../lib/axios";

const UPLOAD_ENDPOINT = "/file/upload";
function Textarea(
  { label, onEditorChange, defaultEditorValue, required, ...rest },
  ref
) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorData, setEditorData] = useState(defaultEditorValue || null);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const { CKEditor, ClassicEditor } = editorRef.current || {};

  return (
    <div className="adminTextarea">
      <div
        style={{
          maxWidth: rest?.width || 400,
        }}
      >
        {label && (
          <span>
            {label}
            {required && <span style={{ color: "red" }}>*</span>}
          </span>
        )}
        {rest?.type === "editor" && editorLoaded ? (
          <CKEditor
            config={{
              extraPlugins: [uploadPlugin],
              placeholder: rest.placeholder,
              link: {
                addTargetToExternalLinks: true,
              },
            }}
            editor={ClassicEditor}
            data={editorData}
            onChange={(e, editor) => {
              const content = editor.getData();
              setEditorData(content);
              onEditorChange?.(e, content);
            }}
          />
        ) : (
          <textarea {...rest} ref={ref} />
        )}
      </div>
    </div>
  );
}

export default forwardRef(Textarea);

function uploadAdapter(loader) {
  return {
    upload: () =>
      new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then((file) => {
          body.append("photo", file);
          http({
            method: "POST",
            data: body,
            url: `${UPLOAD_ENDPOINT}`,
          })
            .then(({ data }) => {
              resolve({
                default: data.photo[0].path,
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      }),
  };
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
    uploadAdapter(loader);
}

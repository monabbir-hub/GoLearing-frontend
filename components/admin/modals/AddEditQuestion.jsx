import { cloneElement, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { API } from "../../../api";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";

Modal.setAppElement("#modal");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
    width: "50vw",
    overflowX: "hidden",
  },
};

const DEFAULT_VALUE = {
  identifier_title: "",
  subject: "",
  chapter: "",
  topic: "",
  title: "",
  description: "",
  a: "",
  b: "",
  c: "",
  d: "",
  right_ans: [],
  mark: 1,
  negative_mark: 0.25,
};
export default function AddEditQuestion({
  children,
  data,
  additionalInfo = {},
  onCreated,
  onUpdated,
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [disabledCheckboxes, setDisabledCheckboxes] = useState([]);
  const { register, handleSubmit, watch, setValue, getValues, reset } = useForm(
    {
      defaultValues: data
        ? {
            ...data,
          }
        : {
            ...DEFAULT_VALUE,
            ...additionalInfo,
          },
    }
  );
  const { mutateAsync: createQuestion } = useMutation(
    API.QUESTIONS.CREATE_QUESTION
  );
  const { mutateAsync: updateQuestion } = useMutation(
    API.QUESTIONS.UPDATE_QUESTION
  );

  const onSubmit = useCallback(
    async (formData) => {
      try {
        if (data?._id) {
          const { data } = await updateQuestion({
            ...formData,
            _id: undefined,
            __v: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            id: formData._id,
          });
          onUpdated?.(data.data);
        } else {
          const { data } = await createQuestion(formData);
          onCreated?.(data.data);
        }
        toast.success(
          `Successfully ${data?._id ? "updated" : "created"} a quiz`
        );
        reset(DEFAULT_VALUE);
        setDisabledCheckboxes([]);
        setOpen(false);
      } catch (err) {
        toast.error(err?.response?.data?.msg || err?.message);
      }
    },
    [data]
  );

  return (
    <>
      {children &&
        cloneElement(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel={data?._id ? "Add New" : "Update" + "Question"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Input
              full
              label="Identifier Title"
              placeholder="Identifier title of the question"
              {...register("identifier_title")}
            />
          </div>
          <div className="form-group">
            <Input
              full
              label="Subject"
              placeholder="Subject of the question"
              {...register("subject")}
            />
          </div>
          <div className="form-group">
            <Input
              full
              label="Chapter"
              placeholder="Chapter of the question"
              {...register("chapter")}
            />
          </div>
          <div className="form-group">
            <Input
              full
              label="Topic"
              placeholder="Topic of the question"
              {...register("topic")}
            />
          </div>
          <div className="form-group">
            <Input
              full
              label="Title"
              placeholder="Title of the question"
              {...register("title")}
            />
          </div>
          <div className="form-group">
            <Textarea
              width="100%"
              type="editor"
              label="Description"
              placeholder="Description of the question"
              defaultEditorValue={watch("description")}
              onEditorChange={(_, content) => setValue("description", content)}
            />
          </div>
          <div className="form-group d-flex align-align-items-end gap-3">
            <div style={{ flex: "1 0 0" }}>
              <Input
                full
                label="Option A"
                placeholder="Option a of the question"
                {...register("a")}
              />
            </div>
            <div
              style={{ flex: "40px 0 0" }}
              className="d-flex align-items-end"
            >
              <Input
                full
                type="checkbox"
                disabled={disabledCheckboxes.includes("a")}
                checked={watch("right_ans").includes("a")}
                onChange={({ target }) => {
                  setDisabledCheckboxes(target.checked ? ["b", "c", "d"] : []);
                  setValue(
                    "right_ans",
                    target.checked
                      ? [...getValues("right_ans"), "a"]
                      : getValues("right_ans").filter(
                          (item) => String(item) !== "a"
                        )
                  );
                }}
              />
            </div>
          </div>
          <div className="form-group d-flex align-align-items-end gap-3">
            <div style={{ flex: "1 0 0" }}>
              <Input
                full
                label="Option B"
                placeholder="Option b of the question"
                {...register("b")}
              />
            </div>
            <div
              style={{ flex: "40px 0 0" }}
              className="d-flex align-items-end"
            >
              <Input
                full
                type="checkbox"
                disabled={disabledCheckboxes.includes("b")}
                checked={watch("right_ans").includes("b")}
                onChange={({ target }) => {
                  setDisabledCheckboxes(target.checked ? ["a", "c", "d"] : []);
                  setValue(
                    "right_ans",
                    target.checked
                      ? [...getValues("right_ans"), "b"]
                      : getValues("right_ans").filter(
                          (item) => String(item) !== "b"
                        )
                  );
                }}
              />
            </div>
          </div>
          <div className="form-group d-flex align-align-items-end gap-3">
            <div style={{ flex: "1 0 0" }}>
              <Input
                full
                label="Option C"
                placeholder="Option c of the question"
                {...register("c")}
              />
            </div>
            <div
              style={{ flex: "40px 0 0" }}
              className="d-flex align-items-end"
            >
              <Input
                full
                type="checkbox"
                disabled={disabledCheckboxes.includes("c")}
                checked={watch("right_ans").includes("c")}
                onChange={({ target }) => {
                  setDisabledCheckboxes(target.checked ? ["b", "a", "d"] : []);
                  setValue(
                    "right_ans",
                    target.checked
                      ? [...getValues("right_ans"), "c"]
                      : getValues("right_ans").filter(
                          (item) => String(item) !== "c"
                        )
                  );
                }}
              />
            </div>
          </div>
          <div className="form-group d-flex align-align-items-end gap-3">
            <div style={{ flex: "1 0 0" }}>
              <Input
                full
                label="Option D"
                placeholder="Option d of the question"
                {...register("d")}
              />
            </div>
            <div
              style={{ flex: "40px 0 0" }}
              className="d-flex align-items-end"
            >
              <Input
                full
                type="checkbox"
                disabled={disabledCheckboxes.includes("d")}
                checked={watch("right_ans").includes("d")}
                onChange={({ target }) => {
                  setDisabledCheckboxes(target.checked ? ["b", "c", "a"] : []);
                  setValue(
                    "right_ans",
                    target.checked
                      ? [...getValues("right_ans"), "d"]
                      : getValues("right_ans").filter(
                          (item) => String(item) !== "d"
                        )
                  );
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <Input
              full
              label="Mark"
              type="number"
              placeholder="Mark of the question"
              {...register("mark", {
                valueAsNumber: 0,
              })}
            />
          </div>
          <div className="form-group">
            <Input
              full
              label="Negative mark"
              type="number"
              placeholder="Negative mark of the question"
              {...register("negative_mark", {
                valueAsNumber: 0,
              })}
            />
          </div>

          <div className="form-group d-flex justify-content-end">
            <Button type="submit">{data?._id ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

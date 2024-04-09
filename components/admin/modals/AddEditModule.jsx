import { cloneElement, useCallback, useEffect, useMemo, useState } from "react";
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
    overflowX: "hidden",
  },
};

const DEFAULT_VALUE = {
  title: "",
  serial: "",
};
export default function AddEditModule({
  children,
  data,
  course_id,
  parent_module_id,
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: useMemo(() => {
      return data ? data : DEFAULT_VALUE;
    }, [data]),
  });
  const { mutateAsync: createModule } = useMutation(API.MODULES.CREATE_MODULE);
  const { mutateAsync: updateModule } = useMutation(API.MODULES.UPDATE_MODULE);

  const onSubmit = useCallback(
    async (formData) => {
      try {
        if (data?._id) {
          await updateModule({
            ...formData,
            _id: undefined,
            __v: undefined,
            id: formData._id,
            parent_module_id: formData?.parent_module_id || undefined,
            serial: formData?.serial + "",
          });
        } else {
          await createModule({
            ...formData,
            course_id: course_id,
            parent_module_id: parent_module_id || undefined,
            serial: formData?.serial + "",
          });
        }
        await queryClient.refetchQueries(
          parent_module_id ? "GET_SUB_MODULES" : API.MODULES.GET_MODULES.name
        );
        toast.success(
          `Successfully ${data?._id ? "updated" : "created"} a course`
        );
        reset(DEFAULT_VALUE);
        setOpen(false);
      } catch (err) {
        toast.error(err?.response?.data?.msg || err?.message);
      }
    },
    [data, course_id, parent_module_id]
  );

  return (
    <>
      {children &&
        cloneElement(children, {
          onClick: (e) => {
            e.stopPropagation();
            setOpen(true);
            if (data) reset(data);
          },
        })}
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel={data?._id ? "Add New" : "Update" + "Module"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Input
              label="Title"
              placeholder="Title of the module"
              {...register("title")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Serial"
              placeholder="Serial number of the module"
              {...register("serial")}
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

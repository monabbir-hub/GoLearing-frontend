import { cloneElement, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Select from "react-select/creatable";
import { toast } from "react-toastify";
import { API } from "../../../api";
import Button from "../shared/Button";
import FormLabel from "../shared/FormLabel";
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
  name: "",
  parent_id: "",
  banner: "",
};
export default function AddEditCategoryModal({
  children,
  data,
  category,
  type,
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: useMemo(() => (data ? data : DEFAULT_VALUE), [data]),
  });
  const { mutateAsync: createCategory } = useMutation(
    API.CATEGORIES.CREATE_CATEGORY
  );
  const { mutateAsync: updateCategory } = useMutation(
    API.CATEGORIES.UPDATE_CATEGORY
  );

  // console.log(category);
  const onSubmit = useCallback(
    async (formData) => {
      // console.log(formData);
      delete formData.rating;
      delete formData.immediate_category;
      try {
        if (data?._id) {
          // console.log("1st condition " + type);
          if (type === "update") {
            await updateCategory({
              id: formData._id,
              name: formData.name,
              banner: formData.banner,
              // parent_id: category._id,
            });
          } else if (type === "add") {
            // console.log("2nd" + formData);
            await createCategory({
              name: formData.name,
              parent_id: formData._id,
              banner: formData.banner,
            });
          }
        } else {
          // console.log("3rd" + type);
          await createCategory(formData);
        }

        await queryClient.refetchQueries(API.CATEGORIES.GET_CATEGORIES.name);
        // await queryClient.refetchQueries(API.COURSES.GET_COURSE_FILTERS.name);
        toast.success(
          `Successfully ${data?._id ? "updated" : "created"} a category`
        );
        reset(DEFAULT_VALUE);
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
          onClick: () => {
            setOpen(true);
            if (data) reset(data);
          },
        })}
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}

        // contentLabel={category ? "Add New" : "Update" + "Category"}
      >
        <h5>{type === "add" ? "Add New " : "Update "} category</h5>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Input
              label="Enter New Category Name Here"
              placeholder="Category"
              required
              {...register("name")}
            />
          </div>
          {data?._id && data.parent_id && (
            <div className="form-group">
              <Input
                value={category?._id}
                label="Parent Category ID"
                {...register("parent_id")}
              />
            </div>
          )}
          <div className="form-group">
            <Input
              label="Banner"
              type="file"
              placeholder="Banner of the category"
              defaultFile={watch("banner")}
              onFile={(file) => setValue("banner", file)}
              required
            />
          </div>
          {type === "add" ? (
            category?.name ? (
              <p>Parent Category: {category?.name}</p>
            ) : (
              <p>Parent Category: None</p>
            )
          ) : (
            <p></p>
          )}
          <div className="form-group d-flex justify-content-end">
            <Button type="submit">
              {type === "add" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

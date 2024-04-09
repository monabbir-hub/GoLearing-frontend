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
import { BiRefresh } from "react-icons/bi";

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
  alias_name: "",
  description: "",
  overview: "",
  curriculum: "",
  instructor_name: "",
  original_price: "",
  price: 0,
  duration: "",
  access: "",
  google_form_link: "",
  banner: "",
  preview: "",
  thumbnail: "",
  filter: [],
  category_id: "",
  total_lecture: 0,
  total_quiz: 0,
  language: "Bangla",
  certificate: false,
  // isFree: false,
  // coupon: "",
  // hasDiscount: false,
  // discounted_price: 0,
  meta_keyword: "",
  meta_desc: "",
  discount_bkash_link: "",
  original_bkash_link: "",
};

export default function AddEditCourse({ children, data }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [isFree, setIsFree] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const handleFreeCheckbox = (event) => {
    // if (event.target.checked) {
    //   console.log("free Checkbox is checked");
    //   setPrice("0");
    // } else {
    //   console.log("free Checkbox is NOT checked");
    // }
    setIsFree((current) => !current);
  };

  const handleDiscountCheckbox = (event) => {
    // setDiscountPrice("");
    setHasDiscount((current) => !current);
  };

  const { data: coursesFiltersData } = useQuery(
    [API.COURSES.GET_COURSE_FILTERS.name],
    API.COURSES.GET_COURSE_FILTERS
  );
  const {
    data: rootCategories,
    status,
    error,
    refetch,
  } = useQuery(
    [
      API.CATEGORIES.GET_CATEGORIES.name,
      {
        root: true,
      },
    ],
    API.CATEGORIES.GET_CATEGORIES
  );

  const [subCat, setSubCat] = useState("");
  const [subCatName, setSubCatName] = useState(
    data?.immediate_category.name || ""
  );

  //subcategory testing
  const { data: subCategories } = useQuery(
    [
      API.CATEGORIES.GET_CATEGORIES.name,
      {
        parent_id: subCat,
      },
    ],
    API.CATEGORIES.GET_CATEGORIES
  );

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: useMemo(() => (data ? data : DEFAULT_VALUE), [data]),
  });
  const { mutateAsync: createCourse } = useMutation(API.COURSES.CREATE_COURSE);
  const { mutateAsync: updateCourse } = useMutation(API.COURSES.UPDATE_COURSE);

  const onSubmit = useCallback(
    async (formData) => {
      // console.log(formData?.category_id[0]?._id);
      // console.log(formData);
      delete formData.rating;
      delete formData.immediate_category;
      try {
        if (data?._id) {
          await updateCourse({
            // ...formData,
            _id: undefined,
            __v: undefined,
            id: formData._id,
            title: formData.title,
            banner: formData.banner,
            thumbnail: formData.thumbnail,
            preview: formData.preview,
            // overview: formData.overview,
            // curriculum: formData.curriculum,
            description: formData.description,
            instructor_name: formData.instructor_name,
            original_price: formData.original_price,
            price: formData.price,
            duration: formData.duration,
            access: formData.access,
            alias_name: formData.alias_name,
            total_lecture: formData.total_lecture,
            total_quiz: formData.total_quiz,
            // category_id: formData.category_id,
            category_id: formData?.category_id[0]?._id || formData?.category_id,
            certificate: formData.certificate,
            language: "Bangla",
            filter: ["string"],
            discount_bkash_link: formData.discount_bkash_link,
            original_bkash_link: formData.original_bkash_link,
          });
        } else {
          await createCourse(formData);
        }
        await queryClient.refetchQueries(API.COURSES.GET_COURSES.name);
        await queryClient.refetchQueries(API.COURSES.GET_COURSE_FILTERS.name);
        toast.success(
          `Successfully ${data?._id ? "updated" : "created"} a course`
        );
        reset(DEFAULT_VALUE);
        setOpen(false);
      } catch (err) {
        toast.error(err?.response?.data?.msg || err?.message);
      }
    },
    [data]
  );
  console.log(data);
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
        contentLabel={data?._id ? "Add New" : "Update" + "Course"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Input
              label="Title"
              placeholder="Name of the course"
              required
              {...register("title")}
            />
          </div>
          {/* <div className="form-group">
            <Input
              label="Overview"
              placeholder="Overview of the course"
              {...register("overview")}
            />
          </div> */}
          <div className="form-group">
            <Textarea
              type="editor"
              label="Description"
              placeholder="Description of the course"
              defaultEditorValue={watch("description")}
              onEditorChange={(_, content) => setValue("description", content)}
              width="70vw"
              required
            />
          </div>
          <div className="form-group">
            <Input
              label="Banner (1920x500)"
              type="file"
              placeholder="Banner of the course"
              defaultFile={watch("banner")}
              onFile={(file) => setValue("banner", file)}
              required
            />
          </div>
          <div className="form-group">
            <Input
              label="Thumbnail (16:9)"
              type="file"
              placeholder="Thumbnail of the course"
              defaultFile={watch("thumbnail")}
              onFile={(file) => setValue("thumbnail", file)}
              required
            />
          </div>
          <div className="form-group">
            <Input
              label="Preview (video)"
              placeholder="Youtube video id"
              {...register("preview")}
            />
          </div>

          <div className="form-group">
            <FormLabel label="Category">
              {subCat ? (
                <>
                  <Select
                    options={subCategories?.data?.data.map((item) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                    // isMulti
                    isClearable
                    isSearchable
                    create
                    onChange={(value) => {
                      setValue("category_id", value.value);
                      setSubCat(value.value);
                      setSubCatName(value.label);
                      // console.log(value);
                    }}
                    value=""
                  />
                </>
              ) : (
                <>
                  <Select
                    options={rootCategories?.data?.data.map((item) => ({
                      label: item.name,
                      value: item._id,
                    }))}
                    // isMulti
                    isClearable
                    isSearchable
                    create
                    onChange={(value) => {
                      setValue("category_id", value.value);
                      setSubCat(value.value);
                      setSubCatName(value.label);
                      // console.log(value);
                    }}
                    value=""
                  />
                </>
              )}
              <BiRefresh
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSubCat("");
                  setSubCatName("");
                }}
              />
              <span style={{ fontWeight: "bold" }}>
                <span style={{ color: "red" }}>*</span> Category Chosen:{" "}
                {subCatName}
              </span>
            </FormLabel>
          </div>

          <div className="form-group">
            <Input
              label="Alias Name"
              placeholder="Alias name of the course"
              {...register("alias_name")}
              required
            />
          </div>
          {/* <div className="form-group">
            <Input
              label="Curriculum"
              placeholder="Curriculum of the course"
              {...register("curriculum")}
            />
          </div> */}
          <div className="form-group">
            <Input
              label="Instructor Name"
              placeholder="Instructor name of the course"
              {...register("instructor_name")}
            />
          </div>
          {/* <div className="form-group">
            <FormLabel label="Language">
              <Select
                options={[
                  { label: "Bangla", value: "bangla" },
                  { label: "English", value: "english" },
                ]}
                isClearable
                isSearchable
                create
                onChange={(value) => {
                  setValue("language", value.value);
                }}
              />
            </FormLabel>
          </div> */}

          {/* <div className="form-group">
            <Input
              label="Coupon"
              // placeholder="Price of the course"
              type="text"
              {...register("coupon")}
            />
          </div> */}

          {/* <div className="form-group">
            <span>Check if this is a free course </span>
            <input
              type="checkbox"
              {...register("isFree")}
              onChange={handleFreeCheckbox}
              value={isFree ? true : false}
            />
          </div> */}

          <div className="form-group">
            <Input
              label="Original_Price"
              placeholder="Original Price"
              type="number"
              required
              {...register("original_price", {
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="form-group">
            <Input
              label="Discounted_Price"
              placeholder="Discounted Price"
              type="number"
              required
              {...register("price", {
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="form-group">
            <Input
              label="Lectures"
              type="number"
              placeholder="total lectures"
              {...register("total_lecture")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Quizzes"
              type="number"
              placeholder="total quizzes"
              {...register("total_quiz")}
            />
          </div>

          <div className="form-group d-flex align-align-items-end gap-3">
            <div
              style={{ flex: "40px 0 0" }}
              className="d-flex align-items-end"
            >
              <Input full type="checkbox" {...register("certificate")} />
            </div>
            <div
              style={{ flex: "1 0 0" }}
              className="d-flex align-items-center"
            >
              Certificate
            </div>
          </div>

          {/* <div className="form-group">
            <span>Check if this course has a discount </span>
            <input
              type="checkbox"
              {...register("hasDiscount")}
              onChange={handleDiscountCheckbox}
              value={hasDiscount ? true : false}
            />
          </div> */}

          {/* <div className="form-group">
            <Input
              label="Discounted Price"
              placeholder="Discounted price of the course"
              type="number"
              required={hasDiscount ? true : false}
              {...register("discounted_price", {
                valueAsNumber: true,
              })}
            />
          </div> */}

          <div className="form-group">
            <Input
              label="Duration - (Example - 2 hours 15 minutes)"
              placeholder="Duration of the course"
              type="text"
              {...register("duration", {
                valueAsNumber: false,
              })}
            />
          </div>

          <div className="form-group">
            <Input
              label="Access"
              placeholder="Access of the course"
              {...register("access")}
            />
          </div>

          {/* <div className="form-group">
            <FormLabel label="Filters">
              <Select
                options={JSON.parse(
                  coursesFiltersData?.data?.data || JSON.stringify([])
                ).map((item) => ({
                  label: item._id,
                  value: item._id,
                }))}
                isMulti
                isClearable
                isSearchable
                defaultValue={watch("filter").map((item) => ({
                  label: item,
                  value: item,
                }))}
                create
                onChange={(value) =>
                  setValue(
                    "filter",
                    value.map((item) => item.value)
                  )
                }
              />
            </FormLabel>
          </div> */}

          {/* <div className="form-group">
            <FormLabel label="Subcategory">
              <Select
                options={subCategories?.data?.data.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
                isClearable
                isSearchable
                create
                // onChange={(value) => {setValue("category_id", value.value);setSebCat(value.value)}}
              />
            </FormLabel>
          </div> */}

          <div className="form-group">
            <Input
              label="Discount Bkash Link"
              // placeholder="Curriculum of the course"
              {...register("discount_bkash_link")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Original Bkash Link"
              // placeholder="Curriculum of the course"
              {...register("original_bkash_link")}
            />
          </div>
          <div className="form-group">
            <Input
              label="Meta Keyword"
              // placeholder="Curriculum of the course"
              {...register("meta_keyword")}
            />
          </div>
          <div className="form-group">
            <Textarea
              type="editor"
              label="Meta Description"
              defaultEditorValue={watch("meta_desc")}
              onEditorChange={(_, content) => setValue("meta_desc", content)}
              width="70vw"
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

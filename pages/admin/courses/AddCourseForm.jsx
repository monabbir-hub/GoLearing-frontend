import React from "react";
import { cloneElement, useCallback, useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Select from "react-select/creatable";
import { toast } from "react-toastify";
import { API } from "../../../api";
import Button from "../../../components/admin/shared/Button";
import FormLabel from "../../../components/admin/shared/FormLabel";
import Input from "../../../components/admin/shared/Input";
import Textarea from "../../../components/admin/shared/Textarea";
import { BiRefresh } from "react-icons/bi";
import AdminPage from "../../../components/admin/shared/AdminPage";
import router, { useRouter } from "next/router";
import { ADMIN_SIDEBAR } from "../../../components/admin/AdminSidebar";

const AddCourseForm = ({ children, data }) => {
  const queryClient = useQueryClient();
  const [isFree, setIsFree] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const { query, replace } = useRouter();
  const [subCat, setSubCat] = useState("");
  const [subCatName, setSubCatName] = useState("");
  const handleFreeCheckbox = (event) => {
    setIsFree((current) => !current);
  };

  const DEFAULT_VALUE = {
    title: "",
    alias_name: "",
    description: "",
    overview: "",
    curriculum: "",
    instructor_name: "",
    original_price: 0,
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
    meta_keyword: "",
    meta_desc: "",
  };

  const handleDiscountCheckbox = (event) => {
    // setDiscountPrice("");
    setHasDiscount((current) => !current);
  };

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
      console.log(formData);
      delete formData.rating;
      delete formData.immediate_category;
      try {
        if (data?._id) {
          await updateCourse({
            ...formData,
            _id: undefined,
            __v: undefined,
            id: formData._id,
          });
        } else {
          await createCourse(formData);
        }
        await queryClient.refetchQueries(API.COURSES.GET_COURSES.name);
        await queryClient.refetchQueries(API.COURSES.GET_COURSE_FILTERS.name);
        toast.success(
          `Successfully ${data?._id ? "updated" : "created"} a course`
        );
        replace(ADMIN_SIDEBAR.COURSES.PATH);
        reset(DEFAULT_VALUE);
        // setOpen(false);
      } catch (err) {
        toast.error(err?.response?.data?.msg || err?.message);
      }
    },
    [data]
  );

  return (
    // <AdminPage>

    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        // maxWidth: "80%",
        padding: "5%",
        border: "1px solid #DCDCDC",
        marginTop: "-30px",
      }}
    >
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
          width="50vw"
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
        <Input
          label="Alias Name"
          placeholder="Alias name of the course"
          {...register("alias_name")}
          required
        />
      </div>
      <div className="form-group" style={{ width: "300px", zIndex: "10000" }}>
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
        <div style={{ flex: "40px 0 0" }} className="d-flex align-items-end">
          <Input full type="checkbox" {...register("certificate")} />
        </div>
        <div style={{ flex: "1 0 0" }} className="d-flex align-items-center">
          Certificate
        </div>
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
          label="Original Price"
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
          label="Discounted Price"
          placeholder="Discounted Price"
          type="number"
          required
          {...register("price", {
            valueAsNumber: true,
          })}
        />
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

      <div className="form-group">
        <Input
          label="Meta Keyword"
          // placeholder="Curriculum of the course"
          {...register("meta_keyword")}
        />
      </div>
      <div className="form-group" style={{ zIndex: "-100000" }}>
        <Textarea
          type="editor"
          width="50vw"
          label="Meta Description"
          defaultEditorValue={watch("meta_desc")}
          onEditorChange={(_, content) => setValue("meta_desc", content)}
          // width="70vw"
        />
      </div>
      <div className="form-group d-flex justify-content-start">
        <Button type="submit">{data?._id ? "Update" : "Create"}</Button>
      </div>
    </form>
    // </AdminPage>
  );
};

export default AddCourseForm;

import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BiChevronRight, BiEditAlt, BiTrashAlt, BiVideo } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { IoMdPaper } from "react-icons/io";
import { TiEdit, TiPlus, TiTimes } from "react-icons/ti";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { API } from "../../../../api";
import { ADMIN_SIDEBAR } from "../../../../components/admin/AdminSidebar";
import AddEditModule from "../../../../components/admin/modals/AddEditModule";
import AddEditQuestion from "../../../../components/admin/modals/AddEditQuestion";
import AdminPage from "../../../../components/admin/shared/AdminPage";
import AdminTabs from "../../../../components/admin/shared/AdminTabs";
import Button from "../../../../components/admin/shared/Button";
import ErrorBoundary from "../../../../components/admin/shared/ErrorBoundary";
import Input from "../../../../components/admin/shared/Input";
import QueryState from "../../../../components/admin/shared/QueryState";
import Textarea from "../../../../components/admin/shared/Textarea";
import { deleteConfirmation } from "../../../../lib/sweetAlert";
import ManageCourseProvider, {
  useManageCourse,
} from "../../../../providers/ManageCourseProvider";

export default function ManageCourse() {
  const { query, replace } = useRouter();

  return (
    <AdminPage>
      <ManageCourseProvider>
        <div className="container py-5">
          <div className="adminManageCourse">
            <div className="mb-3">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => replace(ADMIN_SIDEBAR.COURSES.PATH)}
              >
                Back to Courses
              </Button>
            </div>
          </div>
          <div className="adminManageCourse">
            <CourseModules id={query?.id} />
            <ManageContent />
          </div>
        </div>
      </ManageCourseProvider>
    </AdminPage>
  );
}

function ManageContent() {
  const { query } = useRouter();
  const {
    clickedContent,
    clickedChapter,
    clickedModule,
    counter,
    setClickedContent,
  } = useManageCourse();
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    data: courseData,
    status,
    error,
  } = useQuery(
    [
      "GET_COURSE",
      {
        _id: query?.id,
      },
    ],
    API.COURSES.GET_COURSES,
    {
      enabled: !!query?.id,
    }
  );

  const currentContentTab = useMemo(() => {
    return (
      currentIndex ||
      (clickedContent?.content_type === "lecture"
        ? 0
        : clickedContent?.content_type === "resource"
        ? 1
        : clickedContent?.content_type === "quiz"
        ? 2
        : 0)
    );
  }, [clickedContent, currentIndex]);

  return clickedContent || clickedChapter ? (
    <QueryState status={status} error={error}>
      <ErrorBoundary>
        <div
          className="adminManageCourse__content"
          key={`ManageContent_${counter}`}
        >
          <h3>
            <span>
              {courseData?.data?.[0]?.title} <BiChevronRight />
            </span>
            <span>
              {clickedModule?.title} <BiChevronRight />
            </span>
            <span>
              {clickedChapter?.title} <BiChevronRight />
            </span>
            <span>
              {clickedContent ? clickedContent?.title : "New Content"}
            </span>
          </h3>

          <h4>CONTENT TYPE</h4>
          <AdminTabs
            key={clickedContent?.title}
            currentTab={currentContentTab}
            onTabClick={(ind) => {
              setClickedContent(null);
              setCurrentIndex(ind);
            }}
            options={[
              {
                name: "VIDEO",
                element: (
                  <ManageCourseVideo
                    course={courseData?.data?.[0]}
                    data={clickedContent}
                  />
                ),
              },
              {
                name: "RESOURCE",
                element: (
                  <ManageCourseResource
                    course={courseData?.data?.[0]}
                    data={clickedContent}
                  />
                ),
              },
              {
                name: "QUIZ",
                element: (
                  <ManageCourseQuiz
                    course={courseData?.data?.[0]}
                    data={clickedContent}
                  />
                ),
              },
            ]}
          />
        </div>
      </ErrorBoundary>
    </QueryState>
  ) : (
    <div className="adminManageCourse__nothing">
      <div className="p-5">
        <center>Please select a content to edit!</center>
      </div>
    </div>
  );
}

const DEFAULT_QUIZ_CONTENT = {
  title: "",
  module_id: "",
  questions: [
    {
      right_ans: [],
      mark: 0,
      negative_mark: 0,
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
    },
  ],
  serial: 0,
  duration: 0,
  description: "",
  locked:false,
  public_to_access:false,
};
function ManageCourseQuiz({ data, course }) {
  const { clickedModule, clickedChapter, setClickedContent, setCounter } =
    useManageCourse();

  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm({
      defaultValues: useMemo(() => {
        return data?._id ? data : DEFAULT_QUIZ_CONTENT;
      }, [data]),
    });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (data?.questions?.length) {
      setQuestions(data.questions);
    }
  }, [data]);

  const { mutateAsync: createContent } = useMutation(
    API.CONTENTS.CREATE_CONTENT
  );
  const { mutateAsync: updateContent } = useMutation(
    API.CONTENTS.UPDATE_CONTENT
  );

  const onSubmit = useCallback(async () => {
    const formData = getValues();
    try {
      if (data?._id) {
        console.log("hello sakib")
        const { data } = await updateContent({
          ...formData,
          __v: undefined,
          _id: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          content_type: undefined,
          id: formData._id,
          module_id: clickedChapter?._id,
          type: "quiz",
          serial: formData.serial + "",
          questions: questions.map(({ id, _id, __v, ...rest }) => _id),
        });
        setClickedContent(data?.data);
      } else {
        console.log("hello sakib fahad")
        await createContent({
          ...formData,
          module_id: clickedChapter?._id,
          type: "quiz",
          questions: questions.map(({ id, _id, ...rest }) => _id),
        });
      }
      await queryClient.refetchQueries([
        API.CONTENTS.GET_CONTENTS.name,
        {
          module_id: clickedChapter?._id,
        },
      ]);
      toast.success(
        `Successfully ${data?._id ? "updated" : "created"} a content`
      );
      setCounter((value) => value + 1);
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.message);
    }
  }, [data, clickedChapter, questions]);

  return (
    <div className="py-3">
      <div>
        <div className="form-group d-flex align-align-items-end gap-3">
          <div style={{ flex: "40px 0 0" }} className="d-flex align-items-end">
            <Input full type="checkbox" {...register("public_to_access")} />
          </div>
          <div style={{ flex: "1 0 0" }} className="d-flex align-items-center">
            Make it public
          </div>
        </div>
        <div className="form-group d-flex align-align-items-end gap-3">
          <div style={{ flex: "40px 0 0" }} className="d-flex align-items-end">
            <Input full type="checkbox" {...register("locked")} />
          </div>
          <div style={{ flex: "1 0 0" }} className="d-flex align-items-center">
            lock
          </div>
        </div>
      </div>
      <div>
        <div className="form-group">
          <Input
            full
            type="number"
            label="Serial"
            placeholder="Serial number of the Resource"
            {...register("serial", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="form-group">
          <Input
            full
            type="number"
            label="Duration"
            placeholder="Duration in minutes"
            {...register("duration", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="form-group">
          <Input
            full
            label="Quiz Title"
            placeholder="Name of the Quiz"
            {...register("title")}
          />
        </div>
        <div className="form-group">
          <Textarea
            width="100%"
            type="editor"
            label="Quiz Description"
            placeholder="Description"
            defaultEditorValue={watch("description")}
            onEditorChange={(_, c) => setValue("description", c)}
          />
        </div>
        <div className="form-group">
          <h4 className="adminManageCourse__label d-flex align-items-center justify-content-between">
            Questions
            <AddEditQuestion
              additionalInfo={{
                identifier_title: course?.title || "",
                subject: clickedModule?.title || "",
                chapter: clickedChapter?.title || "",
              }}
              onCreated={(data) => setQuestions((values) => [...values, data])}
            >
              <Button>+ Add</Button>
            </AddEditQuestion>
          </h4>
          <div className="adminManageCourse__questions">
            {!!questions.length &&
              questions.map((item, ind) => (
                <div
                  className="adminManageCourse__question"
                  key={item?._id || ind}
                >
                  <h1>{String(ind + 1).padStart(2, "0")}</h1>
                  <span>
                    <div>
                      <h4>{item.title}</h4>
                      {item.identifier_title && (
                        <small>{item.identifier_title}</small>
                      )}
                      <ul className="mt-3 ita">
                        <li>{item.a}</li>
                        <li>{item.b}</li>
                        <li>{item.c}</li>
                        <li>{item.d}</li>
                      </ul>
                    </div>
                    <div>
                      <AddEditQuestion
                        data={item}
                        onUpdated={(newValue) =>
                          setQuestions((values) =>
                            values.map((v) =>
                              v._id === item._id ? newValue : v
                            )
                          )
                        }
                      >
                        <TiEdit />
                      </AddEditQuestion>
                    </div>
                  </span>
                </div>
              ))}
            {!questions.length && (
              <div className="adminManageCourse__emptyQuestions">
                <p>
                  No questions found, Please click add button to create a new
                  question for this quiz.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <Button onClick={onSubmit}>
            {data?._id ? "UPDATE" : "SAVE"} CONTENT
          </Button>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_RESOURCE_CONTENT = {
  title: "",
  module_id: "",
  public_to_access: false,
  locked: false,
  link: [
    {
      id: uuid(),
      name: "",
      link: "",
    },
  ],
  serial: 0,
  description: "",
};
function ManageCourseResource({ data }) {
  const [fileUploading, setFileUploading] = useState(false);
  const { clickedChapter, setClickedContent, setCounter } = useManageCourse();
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, watch, control } = useForm({
    defaultValues: useMemo(() => {
      return data?._id
        ? {
            ...data,
            link: data?.link?.length
              ? data.link
              : DEFAULT_RESOURCE_CONTENT.link,
          }
        : DEFAULT_RESOURCE_CONTENT;
    }, [data]),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "link",
    keyName: "id",
  });
  const { mutateAsync: createContent } = useMutation(
    API.CONTENTS.CREATE_CONTENT
  );
  const { mutateAsync: updateContent } = useMutation(
    API.CONTENTS.UPDATE_CONTENT
  );

  const onSubmit = useCallback(
    async (formData) => {
      try {
        if (data?._id) {
          const { data } = await updateContent({
            ...formData,
            __v: undefined,
            _id: undefined,
            content_type: undefined,
            id: formData._id,
            module_id: clickedChapter?._id,
            type: "resource",
            serial: formData.serial + "",
            link: formData.link.map(({ id, _id, __v, ...rest }) => rest),
          });
          setClickedContent(data?.data);
        } else {
          await createContent({
            ...formData,
            module_id: clickedChapter?._id,
            type: "resource",
            link: formData.link.map(({ id, ...rest }) => rest),
          });
        }
        await queryClient.refetchQueries([
          API.CONTENTS.GET_CONTENTS.name,
          {
            module_id: clickedChapter?._id,
          },
        ]);
        toast.success(
          `Successfully ${data?._id ? "updated" : "created"} a content`
        );
        setCounter((value) => value + 1);
      } catch (err) {
        toast.error(err?.response?.data?.msg || err?.message);
      }
    },
    [data, clickedChapter]
  );

  return (
    <div className="py-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="form-group d-flex align-align-items-end gap-3">
            <div
              style={{ flex: "40px 0 0" }}
              className="d-flex align-items-end"
            >
              <Input full type="checkbox" {...register("public_to_access")} />
            </div>
            <div
              style={{ flex: "1 0 0" }}
              className="d-flex align-items-center"
            >
              Make it public
            </div>
          </div>
          <div className="form-group d-flex align-align-items-end gap-3">
            <div
              style={{ flex: "40px 0 0" }}
              className="d-flex align-items-end"
            >
              <Input full type="checkbox" {...register("locked")} />
            </div>
            <div
              style={{ flex: "1 0 0" }}
              className="d-flex align-items-center"
            >
              lock
            </div>
          </div>
        </div>
        <div className="form-group">
          <Input
            full
            type="number"
            label="Serial"
            placeholder="Serial number of the Resource"
            {...register("serial", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="form-group">
          <Input
            full
            label="Resource Title"
            placeholder="Name of the Resource"
            {...register("title")}
          />
        </div>
        <div className="form-group">
          <Textarea
            width="100%"
            type="editor"
            label="Resource Description"
            placeholder="Description"
            defaultEditorValue={watch("description")}
            onEditorChange={(_, c) => setValue("description", c)}
          />
        </div>
        <div className="form-group">
          <h4 className="adminManageCourse__label">File List</h4>
          <div className="adminManageCourse__linkList">
            {fields.map((item, ind) => (
              <div
                className="adminManageCourse__listItem"
                key={item?._id || item?.id}
              >
                <div>
                  <Input
                    full
                    type="file"
                    defaultFile={item?.link}
                    isLoading={(value) => setFileUploading(value)}
                    onFile={(link) => {
                      setFileUploading(false);
                      setValue(`link[${ind}].link`, link);
                    }}
                  />
                </div>
                <div>
                  <Input
                    full
                    placeholder="File Name"
                    {...register(`link[${ind}].name`)}
                  />
                </div>
                <div style={{ display: "none" }}>
                  {ind === fields?.length - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        append(DEFAULT_RESOURCE_CONTENT["link"][0])
                      }
                    >
                      <TiPlus />
                    </button>
                  ) : (
                    <button type="button" onClick={() => remove(ind)}>
                      <TiTimes />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <Button disabled={fileUploading} type="submit">
            {data?._id ? "UPDATE" : "SAVE"} CONTENT
          </Button>
        </div>
      </form>
    </div>
  );
}

const DEFAULT_VIDEO_CONTENT = {
  title: "",
  module_id: "",
  serial: 0,
  description: "",
  public_to_access: false,
  locked: false,
  time_stamp: [
    {
      id: uuid(),
      title: "",
      time: "",
    },
  ],
  link: "",
};
function ManageCourseVideo({ data }) {
  const { clickedChapter, setClickedContent, setCounter } = useManageCourse();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control: lectureControl,
  } = useForm({
    defaultValues: useMemo(() => {
      return data?._id
        ? {
            ...data,
            time_stamp: data?.time_stamp?.length
              ? data.time_stamp
              : DEFAULT_VIDEO_CONTENT.time_stamp,
          }
        : DEFAULT_VIDEO_CONTENT;
    }, [data]),
  });
  const { fields, append, remove } = useFieldArray({
    control: lectureControl,
    keyName: "id",
    name: "time_stamp",
  });
  const { mutateAsync: createContent } = useMutation(
    API.CONTENTS.CREATE_CONTENT
  );
  const { mutateAsync: updateContent } = useMutation(
    API.CONTENTS.UPDATE_CONTENT
  );

  const onSubmit = useCallback(
    async (formData) => {
      try {
        if (data?._id) {
          const { data } = await updateContent({
            ...formData,
            __v: undefined,
            _id: undefined,
            content_type: undefined,
            id: formData?._id,
            module_id: clickedChapter?._id,
            type: "lecture",
            serial: formData.serial + "",
            time_stamp: formData.time_stamp.map(({ id, ...rest }) => rest),
          });
          setClickedContent(data?.data);
        } else {
          await createContent({
            ...formData,
            time_stamp: formData.time_stamp.map(({ id, ...rest }) => rest),
            module_id: clickedChapter?._id,
            type: "lecture",
          });
        }
        await queryClient.refetchQueries([
          API.CONTENTS.GET_CONTENTS.name,
          {
            module_id: clickedChapter?._id,
          },
        ]);
        toast.success(
          `Successfully ${data?._id ? "updated" : "created"} a content`
        );
        setCounter((value) => value + 1);
      } catch (err) {
        toast.error(err?.response?.data?.msg || err?.message);
      }
    },
    [data, clickedChapter]
  );

  return (
    <div className="py-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="form-group d-flex align-align-items-end gap-3">
            <div
              style={{ flex: "40px 0 0" }}
              className="d-flex align-items-end"
            >
              <Input full type="checkbox" {...register("public_to_access")} />
            </div>
            <div
              style={{ flex: "1 0 0" }}
              className="d-flex align-items-center"
            >
              Make it public
            </div>
          </div>
          <div className="form-group d-flex align-align-items-end gap-3">
            <div
              style={{ flex: "40px 0 0" }}
              className="d-flex align-items-end"
            >
              <Input full type="checkbox" {...register("locked")} />
            </div>
            <div
              style={{ flex: "1 0 0" }}
              className="d-flex align-items-center"
            >
              lock
            </div>
          </div>
        </div>
        <div className="form-group">
          <Input
            full
            type="number"
            label="Serial"
            placeholder="Serial number of the Video"
            {...register("serial", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="form-group">
          <Input
            full
            label="Video Title"
            placeholder="Name of the Video"
            {...register("title")}
          />
        </div>
        <div className="form-group">
          <Input
            full
            label="Video Embed URL"
            placeholder="Embedded link"
            {...register("link")}
          />
        </div>
        <div className="form-group">
          <Textarea
            width="100%"
            type="editor"
            label="Video Description"
            placeholder="Description of the video"
            defaultEditorValue={watch("description")}
            onEditorChange={(_, c) => setValue("description", c)}
          />
        </div>
        <div className="form-group">
          <h4 className="adminManageCourse__label">Timestamps</h4>
          <div className="adminManageCourse__linkList">
            {fields.map((item, ind) => (
              <div
                className="adminManageCourse__listItem"
                key={item?._id || item?.id}
              >
                <div>
                  <Input
                    full
                    placeholder="Title"
                    {...register(`time_stamp[${ind}].title`)}
                  />
                </div>
                <div>
                  <Input
                    full
                    placeholder="Min:Sec, e.g. 02:00"
                    {...register(`time_stamp[${ind}].time`)}
                  />
                </div>
                <div>
                  {ind === fields?.length - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        append(DEFAULT_VIDEO_CONTENT["time_stamp"][0])
                      }
                    >
                      <TiPlus />
                    </button>
                  ) : (
                    <button type="button" onClick={() => remove(ind)}>
                      <TiTimes />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <Button type="submit">{data?._id ? "UPDATE" : "SAVE"} CONTENT</Button>
        </div>
      </form>
    </div>
  );
}

function CourseModules({ id }) {
  const {
    data: modulesData,
    status,
    error,
  } = useQuery(
    [
      API.MODULES.GET_MODULES.name,
      {
        course_id: id,
      },
    ],
    API.MODULES.GET_MODULES,
    {
      enabled: !!id,
    }
  );

  return (
    <div className="d-flex flex-column gap-1 courseModules">
      <QueryState status={status} error={error}>
        <>
          {modulesData?.data?.data
            ?.filter((item) => !item.parent_module_id)
            .map((mod) => (
              <CourseModule key={mod._id} mod={mod} />
            ))}
        </>
      </QueryState>
      <AddEditModule course_id={id}>
        <Button>+ Add Module</Button>
      </AddEditModule>
    </div>
  );
}

function CourseModule({ mod }) {
  const queryClient = useQueryClient();
  const { setClickedModule } = useManageCourse();
  const { mutateAsync: deleteModule } = useMutation(API.MODULES.DELETE_MODULE);

  const handleDeleteModule = useCallback(async (id) => {
    try {
      const { isConfirmed } = await deleteConfirmation();
      if (!isConfirmed) return;
      await deleteModule(id);
      await queryClient.refetchQueries(API.MODULES.GET_MODULES.name);
      toast.success("Successfully deleted module");
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.message);
    }
  }, []);

  return (
    <div className="adminModule">
      <div
        className="adminModule__trigger"
        onClick={() =>
          setClickedModule((value) =>
            value && String(value?._id) === String(mod?._id) ? null : mod
          )
        }
      >
        <span>{mod.title}</span>
        <button>
          <FiChevronDown />
        </button>
        <span>
          <AddEditModule data={mod}>
            <button>
              <BiEditAlt />
            </button>
          </AddEditModule>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteModule(mod._id);
            }}
          >
            <BiTrashAlt />
          </button>
        </span>
      </div>
      <CourseChapters mod={mod} />
    </div>
  );
}

function CourseChapters({ mod }) {
  const { query } = useRouter();
  const { clickedModule } = useManageCourse();
  const {
    data: chaptersData,
    status,
    error,
  } = useQuery(
    [
      "GET_SUB_MODULES",
      {
        parent_module_id: clickedModule?._id,
      },
    ],
    API.MODULES.GET_MODULES,
    {
      enabled: !!clickedModule?._id,
    }
  );

  return (
    <div
      className={`d-flex flex-column gap-1 courseChapters ${
        String(clickedModule?._id) === String(mod?._id) ? "active" : "inactive"
      }`}
    >
      <QueryState status={status} error={error}>
        <>
          {chaptersData?.data?.data?.map((chap) => (
            <CourseChapter key={chap._id} chap={chap} />
          ))}
        </>
      </QueryState>
      <AddEditModule parent_module_id={clickedModule?._id} course_id={query.id}>
        <Button>+ Add Chapter</Button>
      </AddEditModule>
    </div>
  );
}

function CourseChapter({ chap }) {
  const queryClient = useQueryClient();
  const { setClickedChapter } = useManageCourse();
  const { mutateAsync: deleteModule } = useMutation(API.MODULES.DELETE_MODULE);

  const handleDeleteModule = useCallback(async (id) => {
    try {
      const { isConfirmed } = await deleteConfirmation();
      if (!isConfirmed) return;
      await deleteModule(id);
      await queryClient.refetchQueries("GET_SUB_MODULES");
      toast.success("Successfully deleted chapter");
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.message);
    }
  }, []);

  return (
    <div className="courseChapter">
      <div
        className="courseChapter__trigger"
        onClick={() =>
          setClickedChapter((value) =>
            value && String(value?._id) === String(chap?._id) ? null : chap
          )
        }
      >
        <span>{chap.title}</span>
        <button>
          <FiChevronDown />
        </button>
        <span>
          <AddEditModule
            key={chap?.updatedAt}
            parent_module_id={chap.parent_module_id}
            course_id={chap.course_id}
            data={chap}
          >
            <button>
              <BiEditAlt />
            </button>
          </AddEditModule>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteModule(chap._id);
            }}
          >
            <BiTrashAlt />
          </button>
        </span>
      </div>
      <CourseContents chap={chap} />
    </div>
  );
}

function CourseContents({ chap }) {
  const { clickedChapter, setClickedChapter, setClickedContent, setCounter } =
    useManageCourse();
  const {
    data: contentsData,
    status,
    error,
  } = useQuery(
    [
      API.CONTENTS.GET_CONTENTS.name,
      {
        module_id: clickedChapter?._id,
      },
    ],
    API.CONTENTS.GET_CONTENTS,
    {
      enabled: !!clickedChapter?._id,
    }
  );

  return (
    <div
      className={`d-flex flex-column gap-1 courseContents ${
        String(clickedChapter?._id) === String(chap?._id)
          ? "active"
          : "inactive"
      }`}
    >
      <QueryState status={status} error={error}>
        <>
          {contentsData?.data?.data?.map((con) => (
            <CourseContent key={con._id} con={con} />
          ))}
        </>
      </QueryState>
      <Button
        onClick={() => {
          setClickedChapter(clickedChapter);
          setClickedContent(null);
          setCounter((value) => value + 1);
        }}
      >
        + Add Content
      </Button>
    </div>
  );
}

function CourseContent({ con }) {
  const queryClient = useQueryClient();
  const { setClickedContent } = useManageCourse();
  const { mutateAsync: deleteContent } = useMutation(
    API.CONTENTS.DELETE_CONTENT
  );

  const handleDeleteContent = useCallback(
    async (id, type) => {
      try {
        const { isConfirmed } = await deleteConfirmation();
        if (!isConfirmed) return;
        await deleteContent({
          _id: id,
          type,
        });
        await queryClient.refetchQueries([
          API.CONTENTS.GET_CONTENTS.name,
          {
            module_id: con.module_id,
          },
        ]);
        toast.success("Successfully deleted content");
      } catch (err) {
        toast.error(err?.response?.data?.msg || err?.message);
      }
    },
    [con]
  );

  return (
    <div className="courseContent">
      <div
        className="courseContent__trigger"
        onClick={() => setClickedContent(con)}
      >
        <span className="flex-row gap-2 align-items-center">
          {con.content_type === "lecture" ? (
            <BiVideo className="align-self-center" />
          ) : con.content_type === "quiz" ? (
            <BsQuestionCircle />
          ) : con.content_type === "resource" ? (
            <IoMdPaper />
          ) : (
            <BiVideo />
          )}{" "}
          {con.title}
        </span>
        <button></button>
        <span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteContent(con?._id, con?.content_type);
            }}
          >
            <BiTrashAlt />
          </button>
        </span>
      </div>
    </div>
  );
}

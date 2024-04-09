import React from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
// import { PlusOutlined } from "react-icons/PlusOutlined";
// import { Button, Input, notification } from "antd";
import { Fragment, useCallback, useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useQuery, useQueryClient, useMutation } from "react-query";
import AddEditCategoryModal from "../../../components/admin/modals/AddEditCategoryModal";
import Button from "../../../components/admin/shared/Button";
import { API } from "../../../api";
import { useRouter } from "next/router";
import classes from "../../../styles/Category_admin.module.css";
import AreYouSure from "./AreYouSure";
import { deleteConfirmation } from "../../../lib/sweetAlert";
import { toast } from "react-toastify";
export default function Categories() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);
  const [sort, setSort] = useState(null);
  const [render, setRender] = useState(true);

  const {
    data: categoriesData,
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
  return (
    <AdminLayout>
      <div className="dashboardCategories">
        <h3>All Categories</h3>
        <div style={{ display: "flex", margin: "10px 0px" }}>
          {/* <Search
            defaultValue={searchQuery}
            onSearch={(value) => setSearchQuery(value)}
          /> */}

          <AddEditCategoryModal type="add">
            <Button
              // style={{ marginLeft: "15px" }}
              type="primary"
              // icon={<PlusOutlined />}
            >
              Add Category
            </Button>
          </AddEditCategoryModal>
        </div>
        <AllCategories categories={categoriesData?.data?.data} />
      </div>
    </AdminLayout>
  );
}

function AllCategories({ categories = [], parent = null }) {
  const queryClient = useQueryClient();
  // const admin = useSelector(selectAdmin);
  const [selectedCategory, setSelectedCategory] = useState();
  const { data: categoriesData, refetch } = useQuery(
    ["GET_CATEGORIES_BY_PARENT", { parent_id: selectedCategory?._id }],
    API.CATEGORIES.GET_CATEGORIES,
    {
      enabled: !!selectedCategory?._id,
    }
  );
  const { mutateAsync: deleteCat } = useMutation(
    API.CATEGORIES.DELETE_CATEGORY
  );

  const handleDeleteCategory = useCallback(async (id) => {
    try {
      const { isConfirmed } = await deleteConfirmation();
      if (!isConfirmed) return;
      await deleteCat(id);
      // await refetch();
      await queryClient.refetchQueries(API.CATEGORIES.GET_CATEGORIES.name);

      toast.success("Successfully deleted category");
    } catch (err) {
      toast.error(err?.response?.data?.msg || err?.message);
    }
  }, []);
  // console.log(categories);
  return (
    <div
      className={`${classes.dashboardCategories__wrapper} ${
        parent ? "pl-3" : ""
      }`}
      style={{ marginLeft: "20px", marginTop: "5px" }}
    >
      {categories.map((cat) => (
        <Fragment key={cat._id}>
          <div
            onClick={() =>
              setSelectedCategory((prevCat) =>
                prevCat?._id === cat?._id ? null : cat
              )
            }
            className={`${classes.dashboardCategories__item}`}
          >
            <img
              src={cat.photo || "https://via.placeholder.com/150"}
              width="30"
              alt=""
            />
            <span>{cat.name}</span>
            <div
              className={`${classes.dashboardCategories__actions}`}
              onClick={(e) => e.stopPropagation()}
            >
              <>
                <AddEditCategoryModal type="add" category={cat} data={cat}>
                  <button type="button">
                    <FaPlus />
                  </button>
                </AddEditCategoryModal>
                <AddEditCategoryModal category={cat} data={cat} type="update">
                  <button type="button">
                    <FaEdit />
                  </button>
                </AddEditCategoryModal>
                {/* <AreYouSure
                  okText="Delete"
                  onOk={() => handleDeleteCategory(cat._id)}
                > */}
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat?._id)}
                >
                  <FaTrash />
                </button>
                {/* </AreYouSure> */}
              </>
            </div>
          </div>
          {cat?._id === selectedCategory?._id && (
            <AllCategories
              categories={categoriesData?.data?.data}
              parent={selectedCategory?._id}
            />
          )}
          {/* <AddEditCategoryModal type="add" category={cat} data={cat}>
            <button type="button" style={{backgroundColor:''}}>
              <FaPlus /> Add New
            </button>
          </AddEditCategoryModal> */}
        </Fragment>
      ))}

      {/* <AddEditCategoryModal type="add">
        <button type="button">
          <FaPlus /> Add New
        </button>
      </AddEditCategoryModal> */}
    </div>
  );
}
